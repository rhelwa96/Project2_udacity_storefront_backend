import bcrypt from 'bcrypt'
import Client from '../database'
import User from '../types/user.type'
import config from '../config'

const DigestPasword = (p:string) =>{
  const s =parseInt(config.salt as string,10)
  return bcrypt.hashSync(`${p}${config.pepper}`,s)

}

class UserModel {
  async create(u: User): Promise<User> {
      try {
        const conn = await Client.connect()   
        const sql = 'INSERT INTO users (username,password_digest,first_name,last_name,email) values ($1,$2,$3,$4,$5) returning  id,username,first_name,last_name,email'
        const result = await conn.query(sql, [ u.username,DigestPasword(u.password_digest),u.first_name,u.last_name,u.email])
        conn.release()      
        return  result.rows[0]

    } catch (error) {
        throw new Error(`Could not add new user ${u.username}. Error: ${error as Error}`)
    }
  }

  async RetrieveAll(): Promise<User[]> {
    try {
    const sql = 'SELECT id,username,first_name,last_name,email FROM users'

    const conn = await Client.connect()

    const result = await conn.query(sql)

    conn.release()

    return result.rows
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
  }
  
  async RetrieveSingle(id: string): Promise<User> {
    try {
    const sql = 'SELECT id,username,first_name,last_name,email FROM users WHERE id=($1)'
   
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async updateSingle(u: User): Promise<User> {
    try {
    const sql = `UPDATE users
                SET username=$1, password_digest=$2, first_name=$3 ,last_name=$4 ,email=$5
                WHERE id=$6
                RETURNING id,username,first_name,last_name,email`

    const conn = await Client.connect()

    const result = await conn.query(sql, [u.username,
      DigestPasword(u.password_digest),
                                          u.first_name,
                                          u.last_name,
                                          u.email,
                                          u.id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${u.username}. Error: ${err}`)
    }
  }

  async deleteSingle(id: string): Promise<User> {
      try {
    const sql = `DELETE FROM users WHERE id=($1)
                RETURNING id,username,first_name,last_name,email`
  
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not delete user ${id}. Error: ${err}`)
      }
  }

 async authenticateUser(e:string,password_digest:string): Promise<User | null> {
  try {
    const sql = `SELECT password_digest FROM users where email=$1`
    const conn = await Client.connect()
    const result = await conn.query(sql, [e])

    if(result.rows.length){
      const hash=result.rows[0].password_digest

      const isValid = bcrypt.compareSync(`${password_digest}${config.pepper}`, hash)
      if(isValid){
        const info = await conn.query(
          'SELECT id,username,first_name,last_name,email FROM users where email=($1)',[e]
        )
        return info.rows[0]
      }
    }
    conn.release()
    return null
    } catch (err) {
        throw new Error(`Could not authenticate! Error: ${err}`)
    }
  
 }


}

export default UserModel
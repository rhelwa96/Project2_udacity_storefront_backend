import Client from '../database'
import Product from '../types/product.type'

export class products {
    async RetrieveAll(): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }
        catch (err){
            throw new Error(`Cannot get products ${err}`)
        }
    }

    
  async RetrieveSingle(id: string): Promise<Product> {
    try {
    const sql = 'SELECT * FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  async create(p: Product): Promise<Product> {
      try {
    const sql = 'INSERT INTO products (product_name, product_description, product_price, product_link) VALUES($1, $2, $3, $4) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

  const result = await conn.query(sql, [p.product_name,p.product_description,p.product_price,p.product_link])

     const product = result.rows[0]

    conn.release()

    return product
      } catch (err) {
        throw new Error(`Could not add new product ${p.id}. Error: ${err}`)
      }
  }
  async updateSingle(p: Product): Promise<Product> {
    try {  
    const sql = `UPDATE products
                SET product_name=$1, product_description=$2, product_price=$3 ,product_link=$4 
                WHERE id=$5
                RETURNING id,product_name,product_description,product_price,product_link`

    const conn = await Client.connect()

    const result = await conn.query(sql, [p.product_name,p.product_description,p.product_price, p.product_link,p.id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product  ${p.product_name}. Error: ${err}`)
    }
  }

  async deleteSingle(id: string): Promise<Product> {
      try {
    const sql = 'DELETE FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const product = result.rows[0]

    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not delete product ${id}. Error: ${err}`)
      }
  }
}
export default products
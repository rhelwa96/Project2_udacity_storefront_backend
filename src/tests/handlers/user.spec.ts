
import database from '../../database';
import supertest from "supertest"
import app from "../../index"
import User_Type from "../../types/user.type"
const request = supertest(app)
var token: string
var userID: string
describe('Testing Users Handlers', () => {
  const user: User_Type = {
    first_name: 'Ramy',
    last_name: 'Helwa',
    password_digest: '123',
    email:"rff@fff.com",
    username:"rhelw"
  };

  afterAll(async () => {
    const conn = await database.connect();
    const sql =
      'DELETE FROM users;';
    await conn.query(sql);
    conn.release();
  });
  it('USER TEST Endpoint: create user endpoint', async () => {
    await request
      .post('/api/users')
      .send(user)
      .expect(200)
      .then((res) => {
        userID=res.body.id
      });
  });
  it('USER TEST Endpoint: authenticate user endpoint', async () => {
    await request
      .post('/api/users/authenticate')
      .send(user)
      .expect(200)
      .then((res) => {
       token=res.body
      });
  });

  it('USER TEST Endpoint: retrieve all users ', async () => {
    await request
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('USER TEST Endpoint: Display 1 user only', async () => {
    await request
      .get(`/api/users/${userID}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      
  });

  it('USER TEST Endpoint: Delete user', async () => {
    await request
      .get(`/api/users/${userID}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
 
  });
});
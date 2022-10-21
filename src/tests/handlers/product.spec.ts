
import database from '../../database';
import supertest from "supertest"
import app from "../../index"
import product_Type from "../../types/product.type"
import User_Type from "../../types/user.type"
var token: string
var userID: string
const request = supertest(app)

var productID: string
describe('Testing Product Handlers', () => {
  const product: product_Type = {
    product_name: 'Playstation',
    product_description: 'Cool Game',
    product_link: 'hhtp:ps.co',
    product_category:"Games",
    product_price:30
  };
  beforeAll(async () => {

    const user: User_Type = {
        first_name: 'Ramy',
        last_name: 'Helwa',
        password_digest: '123',
        email:"rff@fff.com",
        username:"rhelw"
    };
    await request
      .post('/api/users')
      .send(user)
      .then((response) => {
        userID = response.body.id;
      });
      await request
      .post('/api/users/authenticate')
      .send(user)
      .then((response) => {
        token = response.body;
      });     
  });

  afterAll(async () => {
    const conn = await database.connect();
    const sql =
      'DELETE FROM products;';
    await conn.query(sql);
    conn.release();
  });
  it('Product TEST Endpoint: create product endpoint', async () => {
    await request
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(product)
      .expect(200)
      .then((res) => {
        productID=res.body.id
       

      });
  });

  it('Product TEST Endpoint: retrieve all products ', async () => {
    await request
      .get('/api/products')
      .expect(200);
  });

  it('Product TEST Endpoint: Display 1 product only', async () => {
    await request
      .get(`/api/products/${productID}`)
      .expect(200)
  });

  it('Product TEST Endpoint: Delete product', async () => {
    await request
      .get(`/api/products/${productID}`)
      .expect(200)
  });
});
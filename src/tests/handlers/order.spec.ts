import database from '../../database';
import supertest from "supertest"
import app from "../../index"
import Product_Type from "../../types/product.type"
import Order_Type from "../../types/order.type"
import User_Type from "../../types/user.type"
import Order_Product from '../../types/order_product.type'
const request = supertest(app)
var token: string
var productID: string
var orderID: string
var userID: string
describe('Testing Order Handlers', () => {
    const order: Order_Type = {
        user_id:userID,
        order_status:"ACTIVE"
    }

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
          const product: Product_Type = {
            product_name: 'Playstation',
            product_description: 'Cool Game',
            product_link: 'hhtp:ps.co',
            product_category:"Games",
            product_price:30
          }
          await request
          .post('/api/products')
          .send(product)
          .then((response) => {
            productID = response.body.id;;
          });
         
      });
    

  afterAll(async () => {
    const conn = await database.connect();
    const sql =
      'DELETE FROM products; DELETE FROM orders; DELETE FROM users;';
    await conn.query(sql);
    conn.release();
  });
  it('ORDER TEST Endpoint: create order endpoint', async () => {
    await request
      .post('/api/orders/create')
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect(200)
      .then((res) => {
        orderID=res.body.id
      });
  });
  it('ORDER TEST Endpoint: retrieve all orders ', async () => {
    await request
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
  
  it('ORDER TEST Endpoint: Update 1 orders only', async () => {
    const ordertemp: Order_Type={
        id:orderID,
        user_id:userID,
        order_status:"INACTIVE"
    }
    await request
      .patch(`/api/orders/${orderID}`)
      .set('Authorization', `Bearer ${token}`)
      .send(ordertemp)
      .expect(200)
  });

  it('ORDER TEST Endpoint: Display updated 1 orders only', async () => {
    await request
      .get(`/api/orders/${orderID}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.order_status).toBe('INACTIVE');
      });
  });
  it('ORDER TEST Endpoint: Add Order-Product Releation', async () => {
     const optemp: Order_Product={
        order_id:orderID,
        product_id:productID,
        order_quantity:5
    }
    await request
      .post(`/api/orders/add-product-order`)
      .set('Authorization', `Bearer ${token}`)
      .send(optemp)
      .expect(200)
  });

  it('ORDER TEST Endpoint: Delete 1 order', async () => {
    await request
      .delete(`/api/orders/${orderID}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  });
 
});
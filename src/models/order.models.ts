import Client from '../database'
import Order from '../types/order.type'
import Order_Product from '../types/order_product.type'

class orderModel {
  async create(o: Order): Promise<Order> {
      try {
        const conn = await Client.connect()   
        const sql = 'INSERT INTO orders (user_id,order_status) values ($1,$2) returning  id,user_id,order_status'
        const result = await conn.query(sql, [o.user_id,o.order_status])
        conn.release()      
        return  result.rows[0]

    } catch (error) {
        throw new Error(`Could not add new order ${o.id}. Error: ${error as Error}`)
    }
  }

  async RetrieveAll(): Promise<Order[]> {
    try {
    const sql = 'SELECT id,user_id,order_status FROM orders'

    const conn = await Client.connect()

    const result = await conn.query(sql)

    conn.release()

    return result.rows
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
  }
  
  async RetrieveSingle(id: string): Promise<Order> {
    try {
    const sql = 'SELECT id,user_id,order_status FROM orders WHERE id=($1)'
   
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async updateSingle(o: Order): Promise<Order> {
    try {
    const sql = `UPDATE orders
                SET user_id=$1, order_status=$2
                WHERE id=$3
                RETURNING id,user_id,order_status`

    const conn = await Client.connect()

    const result = await conn.query(sql, [o.user_id,o.order_status,o.id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${o.user_id,o.order_status, o.id}. Error: ${err}`)
    }
  }

  async deleteSingle(id: string): Promise<Order> {
      try {
    const sql = `DELETE FROM orders WHERE id=($1)
                RETURNING id,user_id,order_status`
  
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const order = result.rows[0]

    conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not delete order ${id}. Error: ${err}`)
      }
  }

  async createOrder_Product(o: Order_Product): Promise<Order> {
    try {
      const conn = await Client.connect()   
      const sql = 'INSERT INTO orders_products (order_id,product_id,order_quantity) values ($1,$2,$3) returning id,order_id,product_id,order_quantity'
      const result = await conn.query(sql, [o.order_id,o.product_id,o.order_quantity])
      conn.release()      
      return  result.rows[0]

  } catch (error) {
      throw new Error(`Could not link products with order. Error: ${error as Error}`)
  }
}
} 

export default orderModel
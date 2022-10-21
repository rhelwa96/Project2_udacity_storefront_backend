 import Order_Model  from '../../models/order.models'
 import Product_Model from '../../models/product.models'
 import User_Model from '../../models/user.models'

 const order_Model = new Order_Model()
 const product_Model = new Product_Model()
 const user_Model = new User_Model()

 var userId:string =""
 var productId:string=""
 var orderId:string=""

 describe('Order Model', () => {
     beforeAll(async () => {
        const user = await user_Model.create({
            username: 'flasjteam',
            first_name: 'barry',
            last_name: 'allem',
            password_digest: 'test123',
            email:"tes@gg.com"
        })
        userId = user.id as string
        const product = await product_Model.create({
             product_name: 'orchid',
             product_price: 40.0,
             product_category: 'Orchide',
             product_description:"lovel sprayed rose",
             product_link:"httproduc.com/1"
         })
         productId = product.id as string
        })
     afterAll(async () => {
         await product_Model.deleteSingle(productId)
         await user_Model.deleteSingle(userId)
     })

     it('create order', async () => {
         const result = await order_Model.create({
             user_id: userId,
             order_status: 'ACTIVE',
         })
         expect(result.order_status).toEqual('ACTIVE')
     })

     it('list of orders', async () => {
         const orders = await order_Model.RetrieveAll()
         expect(orders.length).toBeGreaterThanOrEqual(1)
     })

  
 })
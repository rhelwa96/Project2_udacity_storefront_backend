import {Router} from 'express'
import * as handlers from "../../handler/order.handler"
import auth_m_ware from '../../middleware/auth.middleware'

const routes= Router()
var bodyParser = require('body-parser')
routes.use( bodyParser.json() );       // to support JSON-encoded bodies
routes.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

routes.route('/create')
.post(auth_m_ware,handlers.create)

routes.route('/')
.get(auth_m_ware,handlers.RetrieveAll)

routes
.route('/:id')
.get(auth_m_ware,handlers.RetrieveSingle)
.patch(auth_m_ware,handlers.updateSingle)
.delete(auth_m_ware,handlers.deleteSingle)

routes.route('/add-product-order').post(auth_m_ware,handlers.createOrder_Product)

export default routes
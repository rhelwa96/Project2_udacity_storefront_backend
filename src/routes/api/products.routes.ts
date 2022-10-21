import {Router} from 'express'
import * as handlers from "../../handler/product.handler"
import auth_m_ware from '../../middleware/auth.middleware'

const routes= Router()
var bodyParser = require('body-parser')
routes.use( bodyParser.json() );       // to support JSON-encoded bodies
routes.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

routes.route('/')
.get(handlers.RetrieveAll)
.post(auth_m_ware,handlers.create)

routes
.route('/:id')
.get(handlers.RetrieveSingle)
.patch(handlers.updateSingle)
.delete(handlers.deleteSingle)

export default routes
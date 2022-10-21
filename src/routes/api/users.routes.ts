import {Router} from 'express'
import * as handlers from "../../handler/user.handler"
import auth_m_ware from '../../middleware/auth.middleware'

const routes= Router()
var bodyParser = require('body-parser')
routes.use( bodyParser.json() );       // to support JSON-encoded bodies
routes.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

routes.route('/')
.get(auth_m_ware,handlers.RetrieveAll)
.post(handlers.create)

routes
.route('/:id')
.get(auth_m_ware,handlers.RetrieveSingle)
.patch(auth_m_ware,handlers.updateSingle)
.delete(auth_m_ware,handlers.deleteSingle)

routes
.route('/authenticate')
.post(handlers.authenticate)

export default routes

## API Endpoints
#### Products
- Retrieve `/api/products` [GET]
- Create `/api/products/create` [POST] [token required]
- Read `/api/products/:id` [GET]
- Update `/api/products/:id` [PUT] [token required]
- Delete `/api/products/:id` [DELETE] [token required]

#### Users
- Retrieve `/api/users` [GET] [
- Create `/api/users/` [POST] 
- Read `/api/users/:id` [GET] 
- Update `/api/users/:id` [PUT] 
- Delete `/api/users/:id` [DELETE] 
- Auth `/api/users/auth` [POST]

#### Orders
- Retrieve `/api/orders/create` [GET]
- Create `/api/orders/` [POST] 
- Read `/api/orders/:id` [GET] 
- Update `/api/orders/:id` [PUT] 
- Delete `/api/orders/:id` [DELETE] 

#### Orders-Products
-  Create `/api/orders/add-product-order` [POST] 

## Data Structure
#### Product Table
- id `uuid DEFAULT uuid_generate_v4() PRIMARY KEY`
- product_name `VARCHAR(50)`
- product_description `VARCHAR(50)`
- product_price `INTEGER`
- product_link `VARCHAR(50)`

#### User
   - id `uuid DEFAULT uuid_generate_v4() PRIMARY KEY`
   - username `VARCHAR(50)`
   - password_digest `VARCHAR(255)`
   - first_name `VARCHAR(50)`
   - last_name `VARCHAR(50)`
   - email `VARCHAR(50)`

#### Orders Table
- id `SERIAL PRIMARY KEY`
- user_id `VARCHAR(255)` `REFERENCES users(id)`
- order_status `VARCHAR(50)`

#### Orders_Products Table
- order_id `VARCHAR(255)` `REFERENCES orders(id)` 
- product_id `VARCHAR(255)` `REFERENCES products(id)`
- order_quantity `INTEGER`
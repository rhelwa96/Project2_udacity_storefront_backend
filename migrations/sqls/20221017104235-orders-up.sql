/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid,
    order_status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_orders_users
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
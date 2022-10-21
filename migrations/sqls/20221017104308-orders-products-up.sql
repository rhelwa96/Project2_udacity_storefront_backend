/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders_products(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id uuid,
    product_id uuid,
    order_quantity INTEGER NOT NULL,
    CONSTRAINT fk_orders
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_products
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
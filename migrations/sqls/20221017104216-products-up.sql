/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_description VARCHAR(50) NOT NULL,
    product_price INTEGER NOT NULL,
    product_link VARCHAR(50) NOT NULL
);
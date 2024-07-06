# Product Verification System

## Overview

The Product Verification System is designed to generate unique 13-digit random codes for products, ensuring authenticity and preventing misuse. This system allows for one-time verification of product codes, stores user details for marketing analysis, and includes a CRUD API for managing product information.

## Features

- **Code Generation:** Generates unique 13-digit random codes for each product.
- **Excel Export:** Automatically downloads an Excel sheet containing all generated codes.
- **One-Time Verification:** Ensures product validity can be checked only once to prevent code misuse and counterfeiting.
- **User Data Storage:** Stores user verification details in a database, aiding marketing efforts and performance analysis.
- **CRUD API:** Provides endpoints for creating, reading, updating, and deleting product information.

## How It Works

1. **Generate Codes:**
   - Use the system to generate unique 13-digit codes for your products.
   - An Excel sheet with all the generated codes is automatically downloaded.

2. **Verify Product:**
   - Users verify their product using the unique code.
   - The system allows one-time verification to prevent code reuse.

3. **Data Storage:**
   - Upon verification, user details are stored in the database.
   - This data helps the marketing team analyze product performance across different regions.

4. **Manage Products:**
   - Use the provided CRUD API to manage product information.
   - Easily update product names or add new products as needed.

## API Endpoints

### Authentication

- **Login:**
  - Endpoint: `/auth/login`
  - Method: `POST`
  - Description: Authenticates a user and returns a JWT token.

### Code Generation and Verification

- **Generate Codes:**
  - Endpoint: `/codes`
  - Method: `POST`
  - Description: Generates unique 13-digit codes and returns an Excel sheet with the codes.
  - Middleware: `authenticateToken`, `authorizeAdmin`

- **Check Code:**
  - Endpoint: `/codes/check`
  - Method: `POST`
  - Description: Verifies the product using the provided code and stores user details in the database.

### Product Management (CRUD Operations)

- **Get Products:**
  - Endpoint: `/products`
  - Method: `GET`
  - Description: Retrieves a list of all products.
  - Middleware: None

- **Add Product:**
  - Endpoint: `/products`
  - Method: `POST`
  - Description: Adds a new product to the system.
  - Middleware: `authenticateToken`, `authorizeAdmin`

- **Update Product:**
  - Endpoint: `/products/:id`
  - Method: `PUT`
  - Description: Updates the information of a specific product.
  - Middleware: `authenticateToken`, `authorizeAdmin`

- **Delete Product:**
  - Endpoint: `/products/:id`
  - Method: `DELETE`
  - Description: Deletes a specific product from the system.
  - Middleware: `authenticateToken`, `authorizeAdmin`

### User Details

- **Get User Details:**
  - Endpoint: `/details`
  - Method: `GET`
  - Description: Retrieves user verification details from the database.
  - Middleware: `authenticateToken`, `authorizeAdmin`

## Getting Started

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-username/product-verification-system.git
   cd product-verification-system
   ```

2. **Install Dependencies:**
    ```sh
    npm install
    ```
3. **Enviornment Variables:**
  - Create a .env file and add necessary environment variables, including database connection strings and API keys.

4. **Run the Application:**
    ```sh
    npm start
    ```
## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
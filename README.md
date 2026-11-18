# Inventory Management REST API

A RESTful Inventory Management API developed using **Node.js, Express.js, and MongoDB**. This project provides CRUD (Create, Read, Update, Delete) operations to manage product inventory.

## 1. Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman
- JavaScript

## 2. Project Features

- Add new products to the inventory.
- Retrieve all available products.
- Retrieve a specific product using its ID.
- Update existing product information.
- Delete products from the inventory.
- Connect and store product data in MongoDB.
- Handle errors using custom error-handling middleware.

## 3. Project Structure

```text
inventory-management/
│
├── middleware/
│   └── errorHandler.js
│
├── models/
│   └── Product.js
│
├── routes/
│   └── products.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## 4. Installation and Setup

**Step 1:** Clone the repository.

```bash
git clone https://github.com/mafia-0001/wd3-a3.git
```

**Step 2:** Navigate to the project folder.

```bash
cd wd3-a3/inventory-management
```

**Step 3:** Install dependencies.

```bash
npm install
```

**Step 4:** Configure environment variables in `.env`.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/inventoryDB
```

**Step 5:** Start the MongoDB service and run the server.

```bash
node server.js
```

## 5. API Endpoints

Base URL: `http://localhost:5001`

| HTTP Method | Endpoint       | Description       |
| ----------- | -------------- | ----------------- |
| POST        | /api/products  | Add a new product |
| GET         | /api/products  | Get all products  |
| GET         | /api/products/ | Get product by ID |
| PUT         | /api/products/ | Update product    |
| DELETE      | /api/products/ | Delete product    |

## 6. Sample Product JSON

```json
{
  "name": "Samsung Galaxy S25",
  "sku": "MOB001",
  "category": "Electronics",
  "price": 75000,
  "quantity": 20,
  "reorderLevel": 5,
  "description": "Samsung smartphone"
}
```

## 7. Testing and Verification

The API was tested using Postman.

| Test                | Expected Result    | Actual Status |
| ------------------- | ------------------ | ------------- |
| Create Product      | Product created    | 201 Created   |
| Get All Products    | Products retrieved | 200 OK        |
| Get Product by ID   | Product retrieved  | 200 OK        |
| Update Product      | Product updated    | 200 OK        |
| Delete Product      | Product deleted    | 200 OK        |
| Get Deleted Product | Product not found  | 404 Not Found |

MongoDB Compass was also used to verify the database connection.

## 8. Screenshots / Proof of Execution

The following screenshots demonstrate the successful implementation and testing of the Inventory Management REST API.

### 8.1 MongoDB Database Connection

<img width="1470" height="956" alt="MongoDB-Database-Connection" src="https://github.com/user-attachments/assets/79423502-d6dd-4233-859a-a774885ee50e" />



### 8.2 Server Running Successfully

<img width="624" height="291" alt="Server-Running-Successfully" src="https://github.com/user-attachments/assets/6e74a83c-2090-463b-9c77-a441c9dca12f" />


### 8.3 Create Product – POST Request

<img width="1470" height="956" alt="POST-Request" src="https://github.com/user-attachments/assets/b235c219-b530-41a7-a087-0ee57ee986c2" />


### 8.4 Retrieve All Products – GET Request

<img width="1470" height="956" alt="GET-Request" src="https://github.com/user-attachments/assets/28b79655-b328-494b-9209-c774edd26784" />


### 8.5 Update Product – PUT Request

<img width="1470" height="956" alt="PUT-Request" src="https://github.com/user-attachments/assets/5c6644ac-3fdb-4fce-ae5b-68083b2a2534" />


### 8.6 Delete Product – DELETE Request

<img width="1470" height="956" alt="DELETE-Request" src="https://github.com/user-attachments/assets/f1433cef-94f8-41f1-8ed1-759601596a6c" />


### 8.7 Verify Deleted Product

<img width="1470" height="956" alt="Verify-Deleted" src="https://github.com/user-attachments/assets/820d464e-5624-49c0-8fb2-c17ecf47f97e" />


### 8.8 API Running

<img width="1470" height="956" alt="API-Running" src="https://github.com/user-attachments/assets/6417f7d7-29a8-47c3-b126-8f0adb794c08" />


### 8.9 Structure


<img width="676" height="562" alt="Structure" src="https://github.com/user-attachments/assets/adc38fd3-86fd-4243-b712-1892e8d6df8a" />



## 9. Conclusion

The Inventory Management REST API was successfully developed and tested using Node.js, Express.js, and MongoDB. All major CRUD operations were verified through Postman, and database connectivity was confirmed using MongoDB Compass.

The project demonstrates practical knowledge of REST API development, database integration, routing, middleware, and backend application development.

---

**Repository:** [https://github.com/mafia-0001/wd3-a3](https://github.com/mafia-0001/wd3-a3)

**Project:** Inventory Management REST API

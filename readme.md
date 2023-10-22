# Library Management System

## Description

The Library Management System is a backend solution designed to help manage and organize a library's user and book data. It provides functionalities like creating users, adding books, borrowing and returning books, along with listing all users and books. It also offers validation checks and robust error handling.

## Installation & Setup

### Prerequisites:

- Node.js

### Steps:

**Install Dependencies**

   ```bash
   npm install
   ```

**Building the Project**

To compile the TypeScript files:

```bash
npm run build
```


**Initialize the Database**

   Run the `initDB.js` script to set up the SQLite database.

   ```bash
   node dist/utils/initDB.js
   ```

**Starting the Server**

```bash
npm start
```

The server will start, and you can access the API endpoints as described below.

## API Endpoints



- **User Endpoints:**
  - **Create User:** POST `/users`
  - **List Users:** GET `/users`
  - **Get User by ID:** GET `/users/:id`
  - **Borrow Book:** POST `/users/:userId/borrow/:bookId`
  - **Return Book:** POST `/users/:userId/return/:bookId`

- **Book Endpoints:**
  - **Add Book:** POST `/books`
  - **List Books:** GET `/books`
  - **Get Book by ID:** GET `/books/:id`


## Database Design

The library system relies on SQLite for data storage. The database consists of three primary tables:

### 1. User Table

| Field | Type | Description |
|-------|------|-------------|
| id    | INT  | Primary key. Auto-incremented. |
| name  | TEXT | Name of the user. |

**Example Entry:** `{ "id": 1, "name": "John Doe" }`

### 2. Book Table

| Field | Type | Description |
|-------|------|-------------|
| id    | INT  | Primary key. Auto-incremented. |
| name  | TEXT | Title of the book. |

**Example Entry:** `{ "id": 1, "name": "Harry Potter" }`

### 3. Borrowing Table

| Field         | Type      | Description                                   |
|---------------|-----------|-----------------------------------------------|
| id            | INT       | Primary key. Auto-incremented.                |
| borrowed_date | DATE      | Date when the book was borrowed.              |
| returned_date | DATE (Nullable) | Date when the book was returned. If null, the book hasn't been returned. |
| score         | INT (Nullable) | Score (or rating) given by the user upon returning. If null, no score was given. |
| user_id       | INT       | Foreign key referencing the User table.       |
| book_id       | INT       | Foreign key referencing the Book table.       |

**Example Entry:** `{ "id": 1, "borrowed_date": "2023-10-05", "returned_date": null, "score": null, "user_id": 1, "book_id": 1 }`

Relationships are implemented to connect the `User`, `Book`, and `Borrowing` entities, making it easy to keep track of borrowing activities.


## Project Folder Structure

```
.
├── app.ts
├── server.ts
├── config/
│   ├── dbConfig.ts
│   └── loggerConfig.ts
├── controllers/
│   ├── bookController.ts
│   └── userController.ts
├── entities/
│   ├── Book.ts
│   ├── Borrowing.ts
│   └── User.ts
├── middleware/
│   ├── errorHandler.ts
│   ├── validateRequestBody.ts
│   └── validateRequestParams.ts
├── routes/
│   ├── bookRoutes.ts
│   └── userRoutes.ts
└── utils/
    ├── CustomError.ts
    └── initDB.ts
```

# Project Name

Transfer Fund

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Endpoints](#endpoints)
4. [Project Structure](#project-structure)
5. [How to Run](#how-to-run)
6. [Contributing](#contributing)
7. [Author](#author)

## Installation <a name="installation"></a>

- npm i || yarn install

```bash
# Clone the repository
git clone https://github.com/your-username/your-project.git

# Navigate to the project directory
cd your-project

# Install dependencies
npm install
```

## Usage </a>

A web application for transfering funds, creating, updating or deleting bank accounts & checking balances.

## Endpoints <a name="endpoints"></a>

### 1. `GET /transfer`

- **Description:** Get all accounts.
- **Parameters:** None
- **Example:**
  ```http
  GET /transfer
  ```

### 2. `POST /transfer/transaction`

- **Description:** Transfer funds between accounts.
- **Parameters:**
  - `sourceAccount` (string): Source account number.
  - `destinationAccount` (string): Destination account number.
  - `amount` (number): Transfer amount.
- **Example:**
  ```http
  POST /transfer/transaction
  Content-Type: application/json

  {
    "sourceAccount": "123456789",
    "destinationAccount": "987654321",
    "amount": 100.00
  }
  ```

### 3. `GET /transfer/:acc`

- **Description:** Get details of a specific account.
- **Parameters:**
  - `acc` (string): Account number.
- **Example:**
  ```http
  GET /transfer/123456789
  ```

### 4. `PATCH /transfer/:acc`

- **Description:** Update account details.
- **Parameters:**
  - `acc` (string): Account number.
  - `newAccount` (object): Updated account details.
- **Example:**
  ```http
  PATCH /transfer/123456789
  Content-Type: application/json

  {
    "newAccount": {
      "accountNumber": "987654321",
      "initialBalance": 200.00
    }
  }
  ```

### 5. `DELETE /transfer/:acc`

- **Description:** Delete an account.
- **Parameters:**
  - `acc` (string): Account number.
- **Example:**
  ```http
  DELETE /transfer/123456789
  ```

### 6. `GET /transfer/check-balance/:acc`

- **Description:** Check the balance of a specific account.
- **Parameters:**
  - `acc` (string): Account number.
- **Example:**
  ```http
  GET /transfer/check-balance/123456789
  ```

## Project Structure <a name="project-structure"></a>

Monolithic architecture project
```
your-project/
|-- config/
|   |-- database.js
|-- controller/
|   |-- transferController.js
|-- model/
|   |-- userModel.js
|-- routes/
|   |-- transferRoutes.js
|-- .gitignore
|-- app.js
|-- package.json
|-- README.md
```

## How to Run <a name="how-to-run"></a>

- npm start || yarn start
- 
```bash
# Install dependencies
npm i

# Run the application
npm start
```

## Contributing <a name="contributing"></a>

Anyone can clone the repo, run it on the localhost & try the project features.

## Author <a name="author"></a>
Ahmed Medhat

# Web API

## Introduction

Web API is a NodeJS Express project with PostgreSQL and thee use of several npm libraries / packages to achieve the goals of request validation, data retrieval, user authentication and unit-testing.

### Assumptions

 1. Stock data is seeded in the database table at the very beginning. My assumption is data might not come from database but will come from a data source with indexing in reality, hence I use database as it is easier for development. 
 
 2. Authentication is local authentication with email and password. Request validation is done to check if the incoming request body is correct. JWT and Bcrypt are used for security

 3. Order history / log storage should be store something in the cloud server or other data storage source instead of PSQL table, maybe like Elastic Search. Hence the current project does not have the function for order storage

 4. NodeJS Express is used due to the assumption of the server should be lightweight for stocks data retrieval & handling request for stock order ordering. It does not require heavy computing on handling request, like long query with PSQL database. However it requires loads connection and heavy computing like a micro-services, other multi-threaded languages like C# or GoLang are preferred.

### Packages 
- Sequelize
  - ORM for querying data from database table
  - Migrate database tables - stocks & users
  - Seed data in the database table for development

- Joi
  - REST API Request validation

- PassportJS
  - Local authentication for user sign up or log in
  - Also check against the payload & content of the JWT token

- JWT
  - Authentication token generation after use sign up or log in

- Bcrypt
  - Hash user password
  - compare hash password with plain password upon log in

- Jest
  - Unit Testing 

- dotenv
  - Store environment variables in project directory for development

---

## Project tree

 * [Entry File](./index.js)
 * [Routers](./routers)
   * [index.js](./routers/index.js)
 * [Services](./services)
   * [index.js](./services/index.js)
 * [Utils](./utils)
   * [app.js](./utils/app.js)
   * [passport.js](./utils/passport.js)
 * [Database Config](./database/)
 * [Shared Modules](./shared/)
 * [Config](./config/)
 * [README.md](./README.md)

---

## Quick Start

For development, you will need Node.js, PostgresSQL and a node global package, NPM / YARN, installed in your environment.

### Backend Development Prerequisite

1. Create a Database in PSQL

2. Create random string for JWT secret and random number for Bcrypt salt round

2. Create `.env` file & put it in root directory with the PSQL config url on it

    ```
      DATABASE_URL=
      JWT_SECRET=
      BCRYPT_HASH=
    ```

### Start Server
  - Project runs on http://localhost:8080

    ```
        $  npm install
        $  npm run start
    ```

### Generate PSQL Database seed
  - Seed stock data in the database table ___stocks___

    ```
        $ npm run seed:data
    ```

### Test

    $ npm run test
    
---

## API Endpoints

### /api/stock

1. GET __/__ - Retrieve stocks data with page

    - URL Query

      | Field | Type | Required | Description |
      | ---- | ----- | --- | ---- |
      | page | Integer | True | stocks page |

    - Response 

      | Field | Type | Description |
      | ---- | ----- | --- |
      | stocks | Array | Array contain stocks details |

2. GET __/search__ - Retrieve stocks data with searchValue and page

    - URL Query

      | Field | Type | Required | Description |
      | ---- | ----- | --- | ---- |
      | page | Integer | True | stocks page |
      | search | String | True | stock bloombergTickerLocal |

    - Response 

      | Field | Type | Description |
      | ---- | ----- | --- |
      | stocks | Array | Array contain stocks details |

3. GET __/total_pages__ - Retrieve total stocks pages

    - Response 

      | Field | Type | Description |
      | ---- | ----- | --- |
      | total_pages | number | Stock total Pages |

### /api/order

1. POST __/__ - Send stock orders request

    - URL body

      | Field | Type | Required | Description |
      | ---- | ----- | --- | --- |
      | side | string | True | Buy or Sell |
      | stockId | string | True | Stock stockId |
      | stockCode | string | True | Stock bloombergTickerLocal  |
      | executionMode | string | True | Market or Limit |
      | orderPrice | number | When executionMode is Limit | Stock orderPrice for execution |
      | shareAmount | number | True | Stock share amount for execution |

    - Response 

      | Field | Type | Description |
      | ---- | ----- | --- |
      | orderPrice | number | random number for Market executionMode, and orderPrice in request body for Limit executionMode |

### /api/auth

1. POST __/sign_up__ - Send user sign up request

    - URL body

      | Field | Type | Required | Description |
      | ---- | ----- | --- | --- |
      | email | string | True | User email |
      | password | string | True | User password  |

    - Response 

      | Field | Type | Description |
      | ---- | ----- | --- |
      | token | number | JWT token |

2. POST __/log_in__ - Send user log in request

    - URL body

      | Field | Type | Required | Description |
      | ---- | ----- | --- | --- |
      | email | string | True | User email |
      | password | string | True | User password  |

    - Response 

      | Field | Type | Description |
      | ---- | ----- | --- |
      | token | number | JWT token |


### TODO

  1. Endpoint to check if the jwt token is still alive (JWT expiry time is set to 30 mins)

  2. Services for storing user order history

  3. Endpoint for user order history retrieval
# Web GUI

## Introduction

Web GUI is a TypeScript React project with Redux Observable and the use of several npm libraries / packages to achieve the goals of good UXUI, HTTP request, routing and unit testing.

### Assumptions

 1. User can access the __/__ page before sign up / log in. It is the page user can sign up to create an account or log in to the portal

 2. After log in user can see the __/stock_list__ and __orders_basket__ pages. Default page is the __/stock_list__. And log out button is presented on the nav bar.
 
 2. JWT token is store in the redux. Current implementation does not store the token in the local storage for persistence purpose

 3. Stocks and Orders data are stored in the redux store and pass to certain connect components as props with the idea of Higher-Order Rendering

 4. Redux Observable is used but not redux thunk because it provides better performance when there is chained events between different actions in different files with the use of rsjx observable. In the case of handling the order POST request and frontend data update, it is preferred to use redux-observable.

 5. Error caching, if api request is returned with 401 status code in __/stock_list__ and __orders_basket__ pages. It will alert the user with the message of session timeout and force to log out of the portal. It is because there is expiry time of the JWT token and user has to log in again when the token is expired. It is better not to use refresh token in it for security concern.

 6. Used the idea of atoms designs, which makes the code more organized, testable and scalable. For reference, [ATOM Design](http://atomicdesign.bradfrost.com/chapter-2/)

### Packages 
- React Bootstrap
  - Packages for front-end UXUI

- Redux
  - Act as a database like system for storing data like stocks and orders which pass to different components for use
  - Pass data thru props in the connected components

- Redux Observable
  - Create epics for listening to certain actions invoked then pipe another redux actions accordingly
  - Use rxjs observable to chain redux action events together

- styled-components
  - For component stylings, avoid inline styling and the use of css

- typesafe-actions
  - Create actions for redux and redux observable

- react-router-dom
  - Page routing

- axios
  - Http request package

- Jest & Enzyme
  - Unit testing

- eslint & prettier
  - Format & Beautify code

---

## Project tree

 * [Entry File](./index.js)
 * [App.tsx](./App.tsx)
 * [src](./src)
    * [core](./src/core)
      * [components](./src/core/components)
      * [lib](./src/core/lib)
    * [pages](./src/pages)
      * [Home](./src/pages/Home)
      * [OrdersBasket](./src/pages/OrdersBasket)
      * [StockList](./src/pages/StockList)
    * [redux](./src/redux)
      * [actions](./src/redux/Home)
      * [constants](./src/redux/constants)
      * [epics](./src/redux/epics)
      * [reducers](./src/redux/reducers)
      * [services](./src/redux/services)
    * [types](./src/types)

---

## Quick Start

For development, you will need Node.js and a node global package, NPM, installed in your environment.

### Backend Development 

1. Get the endpoint base url

2. Create `.env` file & put the endpoint base url in the _REACT_APP_API_ENDPOINT_ field

    ```
      REACT_APP_API_ENDPOINT=
    ```

### Start Server
  - Project runs on http://localhost:3000

    ```
        $  npm install
        $  npm run start
    ```

### Test

    $ npm run test

### Format Code

    $ npm run format

### Build

    $ npm run build
    
---

### TODO

  1. Change the session timeout alert to proper modal alert or overlay alert

  2. Store use token in the local storage when it is received and retrieve the token in the local storage when the project run again

  3. Create service to send ping request to endpoint to check if the token is alive (For point 2)

  4. Create webpack config for build command
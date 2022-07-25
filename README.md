// SuperLogotype.image
// The super project is a little example of a more robust project construction,
// in this case a e-commerce with simulated processes like payment and delivery.
// If you have any suggestion or feedback, feel free to give it here: link.link.com

// ### How this project basic TDD workflow works:
// Every application have features that can be treated as a isolated module 
// or a group of isolated modules to implement. This workflow
// is based on this principle.

// Business model broke into -> Individual functionalities 
// Individual functionalities broke into -> Use cases specification
// Use cases specification broke into -> Functional requirements
// Use cases and functional requirements wrote into -> Integration and unit tests

// The first step is to turn our business model and functionalities into
// specific use cases, which will be used as integration tests. This way,
// every use case will be tested independently and guarantee that the
// application will work as expected to serve its needs.
// The second step is to turn our use cases into specific functional requirements 
// that will be used as unit tests.
// Each unit test will be a isolated and independent piece of functionality
// that will be tested independently, each one serving the use case needs.
// With this workflow alongside strong typing makes TDD the most organized way 
// to construct our application and maintain it. Giving us the ability to
// implement new features and change old ones without troubles 
// breaking the code or having to spend too much time understanding it, as 
// everything have isolated behaviors and behaviors that are independent of each other.

// ### Where should integration tests come from:
// As we said before, integration tests must come from the use cases, so each
// integration test is a representation of a single use case.

// ### Where should unit tests come from:
// A unit test is a code piece that is part of the an use case behavior, so
// each unit test must come from, and serve the behavior of a use case.

// ### How to implement all these concepts:
// first we transform all our business model requirements into use cases using:
// - ucfrmaker5000
// then after everything is organized and specified we can pass to our dev environment by:
// - downloading the json file containing all our use cases and functional requirements and using it.
// finally we can implement the tests by:
// - running the test generator script in testmaker.ts ```ts-node testmaker.ts```
// and make sure to check the script logs to maintain tests folder structure.

// yaehhhhhh this is a super project!
// this way, we have everything ready to start implementing our application from the tests.
// to make sure the app is ready to go to production without detectable bugs, run the tests and make sure they pass.
// - using jest: ```yarn jest```

// ### Main technologies used:
// - node.js
// - TypeScript
// - GraphQL
// - Jest
// - Postgres

## customer
have a proper schema with: id, possessorId
UCx1.x1 - explore catalog looking for PRODUCTs (name and price) -noAuth
UCx1.x2 - check the PRODUCT details -noAuth
UCx1.x3 - add a PRODUCT to the cart -noAuth
UCx1.x4 - go to ORDER directly with the PRODUCT alongside PRODUCTs in the cart clicking "buy now" -noAuth
UCx1.x5 - check the cart -noAuth
UCx1.x6 - save the cart -noAuth
UCx1.x7 - close the cart to proceed to the ORDER -noAuth
UCx1.x8 - sign up -noAuth
UCx1.x9 - login with email and password -noAuth
UCx1.xa - reset password using email
UCx1.xb - update profile info
UCx1.xc - check ORDER historic
UCx1.xd - have many SHIP_ADDRESS to insert
UCx1.xe - select a SHIP_ADDRESS to use in the ORDER 
UCx1.xf - check the fee for a SHIPMENT_METHOD
UCx1.x10 - select a SHIPMENT_METHOD
UCx1.x11 - have many PAYMENT_METHOD to insert
UCx1.x12 - select a PAYMENT_METHOD
UCx1.x13 - proceed with the ORDER created
UCx1.x14 - check the ORDER status
UCx1.x15 - retry the ORDER when payment status got refused if PRODUCTs still available
UCx1.x16 - open TICKET to get any kind of support  
## product
have a proper schema with id, name, price, stock, inactive, deletion
be inserted only by active manager
be searchable by all fields except deletion, and only active ones
be searchable by all fields, only by and active manager
UCx.x - be updated ITS
UCx.x - be inactivated ITS
UCx.x - be marked for deletion ITS
UCx.x - be deleted ITS
UCx.x - retain the identity of the MANAGER that made the insertion 
UCx.x - retain the identity of the MANAGER that made the update
UCx.x - retain the identity of the MANAGER that made the inactivation
UCx.x - retain the identity of the MANAGER that made the deletion mark
## manager
have a proper schema with: id, name, email, password, admin, inactive
login and get token -noAuth
insert products
see products
UCx.x - edit products
UCx.x - remove products
UCx.x - check support messages
UCx.x - check service orders
UCx.x - edit service order status
UCx.x - see all users and their roles in the system if admin
UCx.x - see user/product activities in the system if admin
UCx.x - manage other user's inactive mark if admin
## order
UCx.x - have a unique identifier
UCx.x - have the identity of the CUSTOMER
UCx.x - have the identity of the PRODUCT_ORDER_DETAILS
UCx.x - have the identity of the SHIP_ADDRESS
UCx.x - have the identity of the SHIPMENT_DETAILS
UCx.x - have a base total calculated as a som of all PRODUCT_ORDER_DETAILS totals and SHIPMENT_DETAILS price 
UCx.x - have the identity of the PAYMENT_DETAILS
UCx.x - have the identity of the ORDER_STATUS
UCx.x - have a closed indicator
### functional requirements
## sessions
FR8 - UCx7 
post email and password to login 
-> obtain a auth token as response || 4x || 4x1

FR9 - UCx8 
post email for password reset
-> receive ok and receive the email with || 4x || 4x1

FRa - UCx8 post new password and new password confirmation in the link  
## customers
FR4 - UCx6 
post name, email and password to create a costumer
-> created object excluding password || 4x

FR5 - UCx6
have a name (varchar)

FR6 - UCx6 
have a email (varchar)

FR7 - UCx6 
have a password (varchar)

## products
FRx - UCx 
get product list optionally passing (offset number and skip number) for pagination -noAuth 
-> product list || 4x

FR1 - UCx
have a unique identifier (varchar uuid)

FR2 - UCx
have name (varchar)

FR3 - UCx
have price (bigint)

# user creation
user should be able to be created without auth
user role can be only "admin", "manager" or "client"
user should be able to be created requiring name, email and password
created user role must be set as client by default
user admin should be able to list all users
user admin should be able to change other users role
user admin should be able to delete a user



### Non-Functional Requirements
NFR1 - 
the application should be modularized
the application development should be TDD based, providing coverage and testability for all modules
NFR2 - 
the Application should be horizontally scalable 
NFR3 - 
the API should use GraphQL to expose communication















// ### business model
// ## customer actions with products
// UCx1.x1 - explore catalog looking for some PRODUCTs (name and price) -noAuth
// UCx1.x2 - check the PRODUCT details -noAuth
// UXx1.x2.1 - PRODUCT management details should not be visible to non-manager users -noAuth 
// UCx1.x3 - add a PRODUCT to the cart -noAuth (front end)
// UCx1.x4 - go to ORDER directly with the PRODUCT alongside PRODUCTs in the cart clicking "buy now" -noAuth
// UCx1.x5 - check the cart -noAuth
// UCx1.x6 - save the cart -noAuth
// UCx1.x7 - close the cart to proceed to the ORDER -noAuth
// UCx1.x8 - sign up -noAuth
// UCx1.x9 - login with email and password -noAuth
// UCx1.xa - reset password using email
// UCx1.xb - update profile info
// UCx1.xc - check ORDER historic
// UCx1.xd - have many SHIP_ADDRESS to insert
// UCx1.xe - select a SHIP_ADDRESS to use in the ORDER 
// UCx1.xf - check the fee for a SHIPMENT_METHOD
// UCx1.x10 - select a SHIPMENT_METHOD
// UCx1.x11 - have many PAYMENT_METHOD to insert
// UCx1.x12 - select a PAYMENT_METHOD
// UCx1.x13 - proceed with the ORDER created
// UCx1.x14 - check the ORDER status
// UCx1.x15 - retry the ORDER when payment status got refused if PRODUCTs still available
// UCx1.x16 - open TICKET to get any kind of support  
// ## product
// UCx2.x1 - have a unique identifier
// UCx2.x2 - have a name
// UCx2.x2.1 - have a description
// UCx2.x3 - have a price
// UCx2.x4 - have a stock quantity number
// UCx2.x5 - have inactive mark
// UCx2.x6 - have deletion mark
// UCx2.x7 - be searchable
// UCx2.x8 - be inserted ITS
// UCx2.x9 - be searchable ITS
// UCx2.xa - be inserted ITS
// UCx2.xb - be updated ITS
// UCx2.xc - be inactivated ITS
// UCx2.xd - be marked for deletion ITS
// UCx2.xe - be deleted ITS
// UCx2.xf - retain the identity of the MANAGER that made the insertion 
// UCx2.x10 - retain the identity of the MANAGER that made the update
// UCx2.x11 - retain the identity of the MANAGER that made the inactivation
// UCx2.x12 - retain the identity of the MANAGER that made the deletion mark
// ## manager
// UCx3.x1 - have a unique identifier
// UCx3.x1.1 - have a name
// UCx3.x2 - have a email
// UCx3.3 - have a password
// UCx3.x4 - have a admin indicator
// UCx3.x5 - have inactive mark
// UCx3.x6 - have deletion mark
// UCx3.x7 - be created using name email and password 
// UCx3.x7.1 - be searchable only by admin
// UCx3.x7.2 - able to activate only by a admin user
// UCx3.x8 - login if it is activated -noAuth

// UCx3.x9 - see products with all details
// UCx3.xa - insert products
// UC3x.xb - edit products
// UC3x.xc - remove products
// UC3x.xd - check support messages
// UC3x.xe - check service orders
// UC3x.xf - edit service order status
// UC3x.x10 - see all users and their roles in the system if admin
// UC3x.x11 - see user/product activities in the system if admin
// UC3x.x12 - manage other user's inactive mark if admin
// ## order
// UCx.x - have a unique identifier
// UCx.x - have the identity of the CUSTOMER
// UCx.x - have the identity of the PRODUCT_ORDER_DETAILS
// UCx.x - have the identity of the SHIP_ADDRESS
// UCx.x - have the identity of the SHIPMENT_DETAILS
// UCx.x - have a base total calculated as a som of all PRODUCT_ORDER_DETAILS totals and SHIPMENT_DETAILS price 
// UCx.x - have the identity of the PAYMENT_DETAILS
// UCx.x - have the identity of the ORDER_STATUS
// UCx.x - have a closed indicator










// ### functional requirements
// ## products
// FRx1.x1 - be searchable in the public details without auth [UCx2.x7]
// FRx1.x1.1 - have a unique identifier [UCx2.x1, UCx1.x2]
// FRx1.x2 - have a name [UCx1.x1, UCx2.x2]
// FRx1.x2.1 - have a description [UCx2.x2.1]
// FRx1.x3 - have a price [UCx1.x1, UCx2.x3]
// FRx1.x4 - have a stock quantity number [UCx2.x4]
// FRx1.x7 - return a list of PRODUCTs with skip and take options [UCx1.x1]
// FRx1.x8 - return a PRODUCT by id with name, price, description and stock [UCx1.x2]
// FRx1.x5 - have inactive mark [UCx2.x5]
// FRx1.x6 - have deletion mark [UCx2.x6]
// ## managers
// FRx3.x1 - have a unique identifier [UCx3.x1]
// FRx3.x1.1 - have a name [UCx3.x1.1]
// FRx3.x2 - have a email [UCx3.x2]
// FRx3.x3 - have a password [UCx3.x3]
// FRx3.x4 - have a admin indicator (default false) [UCx3.x4]
// FRx3.x5 - have inactive mark (default false) [UCx3.x5]
// FRx3.x6 - have deletion mark (default false) [UCx3.x6]
// FRx3.x7 - be created using name email and password [UCx3.x7]
// FRx3.x7 - searchable listing every field besides password (only admin) [UCx3.x7.1]
// FRx3.x8 - able to be activated (only admin) [UCx3.x7.2]
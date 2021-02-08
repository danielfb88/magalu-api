<h1 align="center">LuizaLabs - Challenge</h1>

# Step 1
## Install dependences
```bash
$ npm i
```

# Step 2
## Environment vars
- Copy the `.env.example` file and rename to `.env`
- You don't need to change this file

# Step 3

## Running tests using Docker
```bash
$ npm run docker:test
```

# Step 4

## Running using Docker
```bash
$ npm run docker:dev
```

# Step 5

## Swagger documentation
Available in: http://localhost:3000/docs/
## Postman collection
Import the collection file `docs/Magalu.postman_collection.json` to Postman.

Create an user to get an `api-key`:
Send a POST request to: localhost:3000/v1/users/
```
{
  email: 'you-email@mail.com',
  password: '123456'
}
```
Use this api-key to make requests to clients resource.

# Techinical specifications
This project uses:
  - Node.js
  - Typescript;
  - Express.js
  - MongoDB
  - Docker
  - Swagger
  - Code linter (Eslint);
  - Commit message linter (git-commit-msg-linter); 
  - Code formatter (Prettier); 
  - Git hooks (Husky); 
  - TDD (Jest, Supertest)
  - Validator (express-validator)
  - Clean Code
  - SOLID principles
    - Single-responsability Principle
    - Open-closed Principle
    - Liskov Substitution Principle
    - Interface Segregation Principle
    - Dependency Inversion Principle

# Author
Name: Daniel Bonfim <br />
Email: daniel.fb88@gmail.com <br />
Linkedin: https://www.linkedin.com/in/daniel-bonfim-b730b739/ <br />
Github: https://github.com/danielfb88 <br />
Web card: http://www.danielbonfim.com.br/

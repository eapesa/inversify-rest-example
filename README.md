# Inversify REST API Example
This is my exploration of developing REST APIs using Inversify and Typescript. The REST APIs will be deployed in an AWS Lambda function via Serverless.

## Prerequisites
- Node.js; NPM
- Typescript
- AWS / Serverless

## Installation, Setup and Initialization
- Make sure Node.js is installed in your local. To check Node, run `node -v`. To check NPM, run `npm -v`.
- Install typescript and related libraries:
  ```
  sudo npm install -g typescript ts-node @types/node
  ```
  To check if Typescript is installed, run `tsc -v`.
- Install application dependencies: `npm install`.

## Usage

To start the application, run:
```
ts-node service.ts
```

## Test

### Echo endpoint
The echo endpoint can be tested via running the following in a terminal:
```
curl "http://localhost:3000/echo/elixamae"
```

The above should return the following:
```
{"code":200,"message":"OK","result":{"hello":"Ohayou elixamae! Ogenki desu ka? Kyou mo gambarimasu!"}}
```

Try the following commands as well to observe the response to change:
```
curl "http://localhost:3000/echo/elixamae12345"
curl "http://localhost:3000/echo"
```

### API doc endpoint
The API docs can be checked via accessing the following in your browser:

##### Statically-hosted HTML
```
http://localhost:3000/docs/index
```

##### Using a library: swagger-express-ts & swagger-ui-dist
```
http://localhost:3000/api-docs/swagger
```


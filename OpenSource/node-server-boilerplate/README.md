# Node Server Boilerplate

目前主要基于Koa+Webpack+Babel+Swagger.

## Install

```
npm i node-server-boilerplate
mv node_modules/node-server-boilerplate node-server-boilerplate
mv node_modules node-server-boilerplate
cd node-server-boilerplate
npm link
npm start
```

- 查看根路径

http://localhost:8080/

- 查看用户信息(路径参数)

http://localhost:8080/user/2

- 查看任意其他路径(权限控制下会自动跳转回根路径)

http://localhost:8080/aaa

- 查看Swagger Docs(静态资源处理)

http://localhost:8080/static/docs/

# Application Features

## File Directory

## Router

### Auth

## Controller

### Serve Static Files

## Model

### Service

## Logger

# Development Features

## Swagger

## Deploy

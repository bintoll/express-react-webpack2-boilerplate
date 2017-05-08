# express-react-webpack2-boilerplate
Simple minimal boilerplate with express, react, webpack2 and eslint.

#### Tech

[Express](https://github.com/expressjs/express) - Web framework that whole project based on.
[Webpack 2.x](https://webpack.github.io/) - to bundle server side code. It bundles code from ```./src``` to ```./server.js```
[eslint](https://github.com/eslint/eslint) - simple, not strict config.
[React](https://github.com/facebook/react) - It is implemented as a separate project in express project with it's own eslint config and package.json ```./client```
[Babel](https://github.com/babel/babel) - presets: "es2015", "stage-0", "react"; plugins: "transform-runtime", "transform-class-properties"

```
Important! This is two projects in one: 1.Server code in root; 2.Client code in root/client. So they both have own dependencies and package files.
```

#### Installation

```sh
$ yarn install && cd client/ && yarn install  
```
or
```sh
$ npm install && cd client/ && npm install  
```

### Usage

To start dev server
```sh
$ yarn dev  
```
or
```sh
$ npm run-script dev
```
# and
To start react app
```sh
$ cd client
$ yarn start  
```
or
```sh
$ cd client
$ npm run-script start
```

### Possible Issues

The chrome browser may exit after starting the server or the client because script tries to kill processes on port 3001 and 3002 and sometimes chrome app uses one of this port. You can remove this line ```lsof -ti:3002 | xargs kill -9;``` from pachage.json to avoid it. But without this lines you will have to write it manually every time you want to restart you server and client app.

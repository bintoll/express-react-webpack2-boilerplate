# express-react-webpack2-boilerplate
Simple minimal boilerplate with express, react, webpack2 and eslint.

#### Tech

[Express](https://github.com/expressjs/express) - Web framework that whole project based on.<br />
[Webpack 2.x](https://webpack.github.io/) - to bundle server side code. It bundles code from ```./src``` to ```./server.js```<br />
[eslint](https://github.com/eslint/eslint) - simple, not strict config.<br />
[React](https://github.com/facebook/react) - It is implemented as a separate project in express project with it's own eslint config and package.json ```./client```<br />
[Babel](https://github.com/babel/babel) - presets: "es2015", "stage-0", "react"; plugins: "transform-runtime", "transform-class-properties"<br />
<br />

```
Important! This is two projects in one: 1.Server code in root; 2.Client code in root/client. So they both have own dependencies and package files.
```

## Installation
```sh
$ yarn install && cd client/ && yarn install  
```
or
```sh
$ npm install && cd client/ && npm install  
```
## Usage
To start dev server
```sh
$ yarn dev  
```
or
```sh
$ npm run-script dev
```
#### and
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

## Deploy
To deploy you app you should run:
```sh
$ yarn deploy  
```
or
```sh
$ npm run-script deploy
```
#### and
To start react app
```sh
$ cd client
$ yarn deploy  
```
or
```sh
$ cd client
$ npm run-script deploy
```
After that you will get a buildServer folder in project root with server.js and package.json files. You should copy these files to server in one folder and run ```$ yarn install``` or ```$ npm install```. After the installation point server.js as entry file. 
In client folder you would get buildClient directory, you also should copy it to the server. After that point index.html as entry file.

## Remember! You will have to link client-side and server-side apps. If you use nginx you need proxy_pass 
Here is an example
```
# part of nginx config file of the client app, 9091 is an example port of server app

location /api/ {
    proxy_pass http://localhost:9091/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;
    proxy_redirect / /api/;
}
```


## Possible Issues

The chrome browser may exit after starting the server or the client because script tries to kill processes on port 3001 and 3002 and sometimes chrome app uses one of this port. You can remove this line ```lsof -ti:3002 | xargs kill -9;``` from two pachage.json to avoid it. But without this lines you will have to write it manually every time when you want to restart you server and client app.

# Todos
Todo app.

To check it out just run
```js
npm install
```
and then
```js
npm start
```
App uses ```webpack-dev-middleware```, serverside rendering, and has no persistent data storage. It will generate a certain defined number of todos (that can be changed in ```settings.js```) at the start of the server and will keep them in memory for the duration of the server run. New todos will be saved in memory as well.
So the command above will be just enough.

To build production ready files run
```
./build.sh
```
which will generate ```index.html``` file and compressed js and css files for the client in ```./dist``` folder and ```server.js``` file for the server at the root folder.

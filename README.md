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
which will generate ```index.html``` file, and compressed ```js``` and ```css``` files in ```./dist``` folder for the client, and ```server.js``` file at the root folder for the server.

---
Only special user ```admin``` is allowed to edit and remove todos. To become ```admin``` enter:
```admin``` as "Name" and ```123``` as "Password" in the log in form at the upper right corner of the app.

const args = require('./helpers/index').parseArgs(process.argv);
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Todos = require('./models/todos');
const settings = require('../../settings');

import * as actionTypes from '../client/store/actions/actionTypes';
import renderPage from './helpers/pageRenderer';
import createStore from '../client/store/index';

const port = process.env.PORT || args.port || GLOBAL__PORT;

Todos.generate( +args.generateTodos || settings.DEFAULT_GENERATED_TODOS_NUMBER );

if (process.env.NODE_ENV !== 'production') {
  require('./helpers/webpack-middleware')(app);
}

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.set('etag', false);

require('./routes/todos')(app);

app.get('/:pageNum/:sortField/:sortDirection', handleRequest);
app.get('/:pageNum/:sortField', (req, res) => res.redirect(prepareRedirect(req)));
app.get('/:pageNum', (req, res) => res.redirect(prepareRedirect(req)));

app.use((req, res) => res.redirect(settings.DEFAULT_ROUTE));

app.listen(port, () => console.log(`Todo app listening on port ${port}!`));

function handleRequest (req, res) {
  const store = getStoreForPage(req);
  const page = renderPage(req, store);
  res.send(page);
}

function prepareRedirect (req) {
  return settings.URL_PATH_PROPS.map((prop) => `/${req.params[prop] || settings['DEFAULT_' + prop]}`).join('');
}

function getStoreForPage (request) {
  const store = createStore();
  const data = Todos.get({
    page: request.params.pageNum,
    sort_field: request.params.sortField,
    sort_direction: request.params.sortDirection
  });
  
  store.dispatch({
    type: actionTypes.RENDER_TODOS,
    data: {
      currentList: data.tasks,
      todosLength: data.todosLength,
      ...request.params
    },
    sortType: {
      [request.params.sortField]: request.params.sortDirection
    }
  });

  return store;
}

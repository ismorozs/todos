const Chance = require('chance');
const chance = new Chance();
const settings = require('../../../settings');
const { getRandomInt } = require('../../helpers/index');
const { validateFields } = require('../helpers/index');
const { TodoScheme } = require ('../../dataSchemes/Todo');

const todos = [];

module.exports = {
  generate: generateTodos,
  get: getTodos,
  create: createTodo,
  update: updateTodo,
  remove: removeTodo,
};

const validateTodoFields = (fields, edit) => validateFields(fields, TodoScheme, edit);

function generateTodos (num) {
  for (let i = 0; i < num; i++) {
    const id = i;
    const username = chance.name();
    const email = chance.email();
    const sentenceNum = getRandomInt(1, 5)
    const text = chance.paragraph({ sentences: sentenceNum });
    const status = 0;
    const image = settings.RANDOM_IMAGE_URL + i;
    todos.push({ id, username, email, text, status, image });
  }
}

function getTodos (params) {
  const sortFunc = (a, b) => {
    if (params.sort_direction === 'asc') {
      return a[params.sort_field] < b[params.sort_field] ? -1 : 1;
    } else {
      return a[params.sort_field] > b[params.sort_field] ? -1 : 1;
    }
  }

  const start = settings.ITEMS_PER_PAGE * (params.page - 1);
  const fetchedTodos = todos.sort(sortFunc).slice(start, start + settings.ITEMS_PER_PAGE);
  return {
    tasks: fetchedTodos,
    todosLength: todos.length,
  }
}

function createTodo (params) {
  const fields = validateTodoFields(params);
  const id = todos.length;
  const todo = { ...fields, id, status: TodoScheme.status.initialValue };
  todos.push(todo);
  return todo;
}

function updateTodo (id, params) {
  const fields = validateTodoFields(params, true);
  const idx = todos.findIndex((el) => el.id === id);
  const todo = todos[idx];
  return todos[idx] = { ...todo, ...fields };
}

function removeTodo (id) {
  const idx = todos.findIndex((el) => el.id === id);
  todos.splice(idx, 1);
}

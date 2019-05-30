import { getProps } from '../../helpers/index';

export const modifyTodoModel = (Todo) => {
  const originalTodoUpdate = Todo.update;

  Todo.update = (id, params) => {
    const filteredParams = getProps(params, ['status', 'text']);
    return originalTodoUpdate(id, filteredParams)
      .then(() => filteredParams);
  }

  Todo.remove = () => Promise.resolve(true);

  return Todo;
}

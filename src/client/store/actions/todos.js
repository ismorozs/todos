import * as actionTypes from './actionTypes';
import { getProps } from '../../../helpers/index';

import Todos from '../../models/Todos';

import statuses from '../../../constants/statuses';
import settings from '../../../../settings';

export const renderTodos = (params = {}) => {
  return (dispatch, getState) => {
    const todosState = getState().todos;
    const fullParams = {
      ...getProps(todosState, settings.URL_PATH_PROPS),
      ...params
    };

    Todos.get(fullParams)
      .then((data) => {
        
        dispatch({
          type: actionTypes.RENDER_TODOS,
          data: {
            currentList: data.tasks,
            todosLength: data.total_task_count,
            ...fullParams
          },
          sortType: { [fullParams.sortField]: fullParams.sortDirection }
        });

      }).catch((e) => handleError(e, dispatch));
  }
}

export const updateTodoForm = (updateObj) => {
  return { type: actionTypes.UPDATE_TODO_FORM, updateObj }
}

export const createTodo = (params) => {
  return (dispatch) => {
    Todos.create(params)
      .then(() => dispatch(renderTodos()))
      .catch((e) => handleError(e, dispatch));
  }
}

export const switchCreateTodoModal = () => {
  return { type: actionTypes.SWITCH_CREATE_TODO_MODAL };
}

export const switchUpdateTodoModal = (id) => {
  return { type: actionTypes.SWITCH_UPDATE_TODO_MODAL, id };
}

export const editTodo = (id, params) => {
  return (dispatch) => {
    Todos.update(id, params)
      .then((todo) => dispatch({ type: actionTypes.EDIT_TODO, id, todo }))
      .catch((e) => handleError(e, dispatch));
  }
}

export const removeTodo = (id) => {
  return (dispatch) => {
    Todos.remove(id)
      .then(() => dispatch(renderTodos()))
      .catch((e) => handleError(e, dispatch));
  }
}

function handleError (e, dispatch) {
  switch (e.message) {
    case statuses.VALIDATION_ERROR:
      dispatch({ type: actionTypes.UPDATE_TODO_FORM, updateObj: e.details });
      return;

    default:
      dispatch({ type: actionTypes.NETWORK_ERROR })
  }
}

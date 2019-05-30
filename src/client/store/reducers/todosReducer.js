import * as actionTypes from '../actions/actionTypes';
import deepAssign from '../../../helpers/deepAssign';
import { fillStateForm } from './helpers';
import settings from '../../../../settings';

import { TodoScheme, prepareFormFields } from '../../../dataSchemes/index';

const initialState = {
  todoModalShown: false,
  currentList: [],
  form: {
    shown: false,
    edit: null,
    heading: 'Create Todo',
    submitText: 'Create',

    fields: prepareFormFields(TodoScheme),
  },

  todosLength: settings.ITEMS_PER_PAGE,

  sortTypes: {
    id: 'desc',
    username: 'desc',
    email: 'desc',
    status: 'desc',
  },

  networkError: false
};

export default (state = initialState, action) => {
  let shown;
  let newList;
  let editTodo;

  switch (action.type) {

    case actionTypes.SWITCH_CREATE_TODO_MODAL:
      shown = !state.form.shown;
      fillStateForm(state.form);
      return deepAssign(state, { form: { shown, edit: null } });

    case actionTypes.SWITCH_UPDATE_TODO_MODAL:
      shown = !state.form.shown;
      editTodo = state.currentList.find((el) => el.id === action.id);
      fillStateForm(state.form, editTodo);
      
      return deepAssign(state, { form: { shown, edit: action.id } });

    case actionTypes.EDIT_TODO:
      const todoIdx = state.currentList.findIndex((el) => el.id == action.id);
      editTodo = state.currentList[ todoIdx ];
      newList = [ ...state.currentList ];
      newList[todoIdx] = { ...editTodo, ...action.todo };
      
      return deepAssign({ 
        ...state, currentList: newList, networkError: false
      }, {
        form: { shown: false }
      });

    case actionTypes.RENDER_TODOS:
      return deepAssign({
        ...state, ...action.data, ...initialState.sortType
      }, {
        networkError: false,
        form: { shown: false },
        sortTypes: { ...action.sortType },
      });

    case actionTypes.UPDATE_TODO_FORM:
      return deepAssign(state, { form: { fields: action.updateObj }});

    case actionTypes.NETWORK_ERROR:
      return { ...state, networkError: true };

    default:
      return state;
  };

};

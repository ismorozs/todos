import * as actionTypes from '../actions/actionTypes';
import deepAssign from '../../../helpers/deepAssign';
import { UserScheme, prepareFormFields } from '../../../dataSchemes/index';

const initialState = {
  name: null,
  error: null,
  loginModalShown: false,

  form: {
    shown: false,

    fields: prepareFormFields(UserScheme),
  }
};

export default (state = initialState, action) => {
  
  switch (action.type) {
    case actionTypes.SWITCH_LOGIN_MODAL:
    const shown = !state.form.shown;
    return deepAssign(state, { form: { shown }});

    case actionTypes.LOGIN_USER:
      return { ...initialState, name: action.name };

    case actionTypes.LOGOUT_USER:
      return { ...initialState };

    case actionTypes.SHOW_LOGIN_ERROR:
      return { ...state, error: action.errorText };

    case actionTypes.UPDATE_LOGIN_FORM:
      return deepAssign(state, { form: { fields: action.updateObj }});

    default:
      return state;
  };

};

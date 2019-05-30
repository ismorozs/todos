import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index.js';

import styles from './TodoModal.css';

import Form from '../Form/Form.jsx';
import Modal from './Modal.jsx';

import { TodoScheme } from '../../../dataSchemes/index';

export class TodoForm extends Component {

  render () {
    let submitButtonText =  'Create';
    let formHeading = 'Create Todo';
    let formType = 'create';
    let onSubmit = (values) => this.props.createTodo(values);

    if (this.props.form.edit) {
      submitButtonText =  'Edit';
      formHeading = 'Update Todo';
      formType = 'edit';
      onSubmit = (values) => this.props.editTodo(this.props.form.fields.id.value, values);
    }

    return (
      <Modal show={this.props.show} className={styles.TodoModal} onBackdropClick={this.props.switchTodoModal}>
        <Form
          id="TodoModalForm"
          fieldOptions={TodoScheme}
          formState={this.props.form}
          updateForm={this.props.updateForm}
          onSubmit={onSubmit}
          afterSubmitError={this.props.createError}
          submitButtonText={submitButtonText}
          formHeading={formHeading}
          formType={formType}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    createError: state.todos.error,
    form: state.todos.form,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTodo: (values) => dispatch(actions.createTodo(values)),
    editTodo: (id, values) => dispatch(actions.editTodo(id, values)),
    switchTodoModal: () => dispatch(actions.switchCreateTodoModal()),
    updateForm: (updateObj) => dispatch(actions.updateTodoForm(updateObj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index.js';

import styles from './LoginModal.css';

import Modal from './Modal.jsx';
import Form from '../Form/Form.jsx';

import { UserScheme } from '../../../dataSchemes/index';

export class LoginModal extends Component {

  render () {
    return (
      <Modal show={this.props.show} className={styles.LoginModal} onBackdropClick={this.props.switchLoginModal}>
        <Form
          id="LoginModalForm"
          fieldOptions={UserScheme}
          formState={this.props.form}
          updateForm={this.props.updateForm}
          onSubmit={() => this.props.loginUser(this.props.form.fields.name.value, this.props.form.fields.password.value)}
          afterSubmitError={this.props.loginError}
          submitButtonText="Log in"
          formHeading="Log in"
        />
      </Modal>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    loginError: state.auth.error,
    form: state.auth.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (name, password) => dispatch(actions.loginUser(name, password)),
    switchLoginModal: () => dispatch(actions.switchLoginModal()),
    updateForm: (updateObj) => dispatch(actions.updateLoginForm(updateObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);

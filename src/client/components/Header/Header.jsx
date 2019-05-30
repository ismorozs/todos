import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index.js';

import LoginModal from '../Modals/LoginModal.jsx';

import styles from './Header.css';
import TodoModal from '../Modals/TodoModal.jsx';

export class Header extends Component {

  render () {
    const navigationButtonClasses = ['btn btn-primary', styles.navigationButton].join(' ')

    let authButton = <button className={navigationButtonClasses} onClick={this.props.switchLoginModal}>Log in</button>;

    if (this.props.username) {
      authButton = <button className={navigationButtonClasses} onClick={this.props.logoutUser}>Log out</button>;
    }

    const navigationClasses = ['d-flex justify-content-end', styles.navigation];

    return (
      <header className="clearfix">
        <h1 className={styles.heading}>Todos</h1>
        <nav className={navigationClasses.join(' ')}>
          <span className={styles.username}>{this.props.username}</span>
          <button className={navigationButtonClasses} onClick={this.props.switchTodoModal}>Create todo</button>
          <TodoModal show={this.props.todoModalShown} />
          {authButton}
          <LoginModal show={this.props.loginModalShown} />
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      loginModalShown: state.auth.form.shown,
      todoModalShown: state.todos.form.shown,
      username: state.auth.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logoutUser: () => dispatch(actions.logoutUser()),
      switchLoginModal: () => dispatch(actions.switchLoginModal()),
      switchTodoModal: () => dispatch(actions.switchCreateTodoModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

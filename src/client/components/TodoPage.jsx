import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';

import settings from '../../../settings';

import { getProps } from '../../helpers/index';

import TodoList from './TodoList/TodoList.jsx';
import SortPanel from './SortPanel/SortPanel.jsx';
import Paginator from './Paginator/Paginator.jsx';

export class TodoPage extends Component {

  componentDidMount () {
    if (this.needUpdateTodos()) {
      const params = getProps(this.props, settings.URL_PATH_PROPS);
      this.props.renderTodos(params);
    }
  }

  componentDidUpdate () {
    if (this.needUpdateTodos()) {
      const params = getProps(this.props, settings.URL_PATH_PROPS);
      this.props.renderTodos(params);
    }
  }

  needUpdateTodos () {
    let update = false;

    settings.URL_PATH_PROPS.forEach((prop) => {
      update = (this.props[prop] !== this.props['cur' + prop]) || update;
    });
    
    return update;
  }

  changeRoute = (params) => {
    const newPath = settings.URL_PATH_PROPS.map((prop) => `/${params[prop] || this.props[prop]}`).join('');

    this.props.history.push({ pathname: newPath });
  }

  render () {
    const networkError = this.props.networkError ? (
      <div className="alert alert-danger">
        An error occured while communicating with the server.
      </div>
    ) : null;

    return (
      <div>
        <h4>Page #{this.props.pageNum}</h4>
        {networkError}
        <SortPanel
          sortTypes={this.props.sortTypes}
          onClick={this.changeRoute}
          activeSortKey={this.props.sortField}
          activeSortDirection={this.props.sortDirection}
        />
        <TodoList
          list={this.props.todos}
          onStatusSwitch={this.props.editTodo}
          onEditClick={this.props.switchUpdateTodoModal}
          onRemoveClick={this.props.removeTodo}
          isAdmin={this.props.isAdmin}
        />
        <Paginator
          pageNum={this.props.pageNum}
          itemsPerPage={settings.ITEMS_PER_PAGE}
          maxPageLinks={9}
          onPageLinkClick={this.changeRoute}
          totalItemsLength={this.props.todosLength} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth.name,
    todos: state.todos.currentList,
    todosLength: state.todos.todosLength,
    sortTypes: state.todos.sortTypes,
    networkError: state.todos.networkError,
    curpageNum: state.todos.pageNum,
    cursortField: state.todos.sortField,
    cursortDirection: state.todos.sortDirection,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    renderTodos: (pageNum, sortField, sortDirection) => dispatch(actions.renderTodos(pageNum, sortField, sortDirection)),
    editTodo: (id, values) => dispatch(actions.editTodo(id, values)),
    switchUpdateTodoModal: (id) => dispatch(actions.switchUpdateTodoModal(id)),
    removeTodo: (id) => dispatch(actions.removeTodo(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);

import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';
import settings from '../../../settings';

import Header from './Header/Header.jsx';
import TodoPage from './TodoPage.jsx';

const MAIN_ROUTE_PATH = settings.URL_PATH_PROPS.map((prop) => `/:${prop}`).join('');

export class App extends Component {
  
  componentDidMount () {
    this.props.tryAutoLogin();
  }

  render () {

    return (
      <div className="container">
        <Header />
        <main>
          <Switch>
            <Route path={MAIN_ROUTE_PATH} render={(props) => <TodoPage {...props.match.params} history={props.history} /> } />
            <Redirect to={settings.DEFAULT_ROUTE} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryAutoLogin: () => dispatch(actions.tryAutoLogin()),
  }
};

export default connect(null, mapDispatchToProps)(App);

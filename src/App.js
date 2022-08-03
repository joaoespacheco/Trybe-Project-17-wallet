import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/carteira"
          render={ (props) => (
            <Wallet
              { ...props }
            />
          ) }
        />
        <Route
          path="/"
          render={ (props) => (
            <Login
              { ...props }
            />
          ) }
        />
      </Switch>
    );
  }
}

export default App;

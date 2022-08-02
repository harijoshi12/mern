import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';

function App() {
  return (
    <Router>
      <Switch>
        <Route path ="/" exact>
          <Users></Users>
        </Route>
        <Route path='/places/new' exact>
          <NewPlace></NewPlace>
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
    );
}

export default App;

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import RecipesPage from '../recipes/recipesdisplay';
import Login from '../login/login';



function Routes() {
    
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/recipes" component={RecipesPage} />
                <Route path="/displaygrid" component={DisplayGrid} />
                <Route path="/login" component={Login} />
            </Switch>
        </Router>
    );
}

    

export default Routes;
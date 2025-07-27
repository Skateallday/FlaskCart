import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import RecipesPage from '../recipes/recipesdisplay';



function Routes() {
    
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/recipes" component={RecipesPage} />
            </Switch>
        </Router>
    );
}

    

export default Routes;
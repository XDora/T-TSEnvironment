import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import App from '../pages';

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => (
                        <Redirect to="/app/systemHome" {...props} push />
                    )}
                />
                <Route exact path="/app/404" component={NotFound} />
                <Route path="/app/" render={(props) => <App {...props} />} />
                <Route render={() => <Redirect to="/app/404" />} />
            </Switch>
        </Router>
    );
}

export default AppRouter;

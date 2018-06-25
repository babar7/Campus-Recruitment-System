import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Signup from './components/signup';
import Signin from './components/signin';
import Students from './components/students';
import Company from './components/company';
import Admin from './components/admin';
import history from './History';

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Signin} />
                    <Route exact path="/signin" component={Signin} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/students" component={Students} />
                    <Route exact path="/company" component={Company} />
                    <Route exact path="/admin" component={Admin} />
                </div>
            </Router>
        )
    }
}

export default Routers;
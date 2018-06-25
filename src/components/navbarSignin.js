import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import history from '../History';


class NavbarSignin extends Component {

    gotoSigninForm(){
        history.push('/signin');
    } 
    gotoSignupForm(){
        history.push('/signup');
    } 
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/home">Campus Recruitment System</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            </li>
            <li className="nav-item">
            </li>
            </ul>
            
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.gotoSigninForm.bind(this)} >Sign in</button>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.gotoSignupForm.bind(this)}>Sign up</button>
           
            </div>
           
            
            
            </nav>
        )
    }
}

export default NavbarSignin;
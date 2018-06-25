import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {signinAction} from '../store/action/action'
import NavberSignin from './navbarSignin'


class Signin extends Component {
    constructor(){
        super()
        this.state = {
            email : "",
            password : ""
        }
    }
    
    onChangeHandler(ev){
        this.setState({ [ev.target.name] : ev.target.value })
            }
    
    onSubmitHandler(ev){
        ev.preventDefault()
        let user = {
            email : this.state.email,
            password : this.state.password
            }
    
            this.props.signinwithEmailPassword(user);
            
            this.setState({
                email : "",
                password : ""
            })
    
        }        

    render() {
        return (
        <div>
             <NavberSignin />
            <div className="container"  >
                <h1> Sign up Form </h1>
                <form onSubmit={this.onSubmitHandler.bind(this)}>
                <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" aria-describedby="emailHelp" name="email" onChange={this.onChangeHandler.bind(this)} value={this.state.email} placeholder="Enter email" required />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" onChange={this.onChangeHandler.bind(this)} value={this.state.password} placeholder="Password" required />
                </div>
                <div className="form-group">       
                <Link to="/signup" className="text-left">Don't have a account?</Link>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                </form>
            </div>
        </div>
            
        )
    }
}

function mapStateToProp(state) {
    return ({
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        signinwithEmailPassword: (logedinUser)=>{
            dispatch(signinAction(logedinUser));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signin);

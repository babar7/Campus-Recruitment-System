import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {signupAction} from '../store/action/action'
import NavbarSignin from './navbarSignin'





class Signup extends Component {
        constructor(){
            super()
            this.state = {
                userName : "",
                email : "",
                password : "",
                userType : ""
            }
            this._onChangeHandler = this.onChangeHandler.bind(this)
        }
        onChangeHandler(ev){
            this.setState({ [ev.target.name] : ev.target.value })
                   
                }
      
        onSubmitHandler(ev){
                ev.preventDefault()
                let user = {
                    userName : this.state.userName,
                    email : this.state.email,
                    password : this.state.password,
                    userType : this.state.userType,
                    }
            
                    this.props.signupwithEmailPassword(user);
                    // console.log(user, "user---------");
                    this.setState({
                        userName : "",
                        email : "",
                        password : "",
                        userType : ""
                    })
            
                }        
        

        render(){
            return (
            <div>    
                <NavbarSignin />
            <div className="container">
                <h1>  Sign up form</h1>

            <form onSubmit={this.onSubmitHandler.bind(this)} >
               
                <div className="form-group">
                <label htmlFor="userName">Username</label>
                <input type="text" className="form-control" value={this.state.userName} name="userName" onChange={this._onChangeHandler} placeholder="myusername123" required />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" value={this.state.email} name="email" onChange={this._onChangeHandler} placeholder="example@mail.com" required />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" value={this.state.password} name="password" onChange={this._onChangeHandler} placeholder="eg. xyz123" required/>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="userType" id="inlineRadio1" value="student" onChange={this._onChangeHandler} required />
                <label className="form-check-label" htmlFor="inlineRadio1">Student</label>
                </div> 
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="userType" id="inlineRadio2" value="company" onChange={this._onChangeHandler} required />
                <label className="form-check-label" htmlFor="inlineRadio2" >Company</label>
                </div>
                <div className="form-group">                
                <Link to="/signin" className="text-left">Already have a account</Link>
                <button type="submit" className="btn btn-primary">Sign in</button>
                <p><small>{this.props.errorMsg.message} </small> </p>
                </div>
             </form>
            </div>
        </div>    
            )
        }

}

function mapStateToProp(state) {
    // console.log(state.root.errorMsg);
    return ({
        errorMsg: state.root.errorMsg
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        signupwithEmailPassword: (userDetails)=>{
            dispatch(signupAction(userDetails));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);

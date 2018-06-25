import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NavbarComponent from './navbarComponent';
import { connect } from 'react-redux';
import {jobPostAction , getingMyAllPost , getingAllStudents} from '../store/action/action';



class Company extends Component {
        constructor(){
            super()
            this.state = {
                jobTitle : "",
                salary : "",
                jobDiscription : "",
                isPostJob : false,
                isMyPost : false,
                isStudents : false

            }
         
        }
        componentWillMount(){
            let uid = this.props.companyObj.uid;
            this.props.myAllJobPost(uid);
            this.props.getingStudents();

        }

        onChangeHandler(ev){
            this.setState({ [ev.target.name] : ev.target.value })
                     
          }
            
        viewComponent(name){
            if(name === "postJob"){
                this.setState({
                    isPostJob : true,
                    isMyPost : false,
                    isStudents : false
                })

            }
            else if(name === "myPost"){
                this.setState({
                    isPostJob : false,
                    isMyPost : true,
                    isStudents : false
                })
            }
            else if(name === "students"){
                this.setState({
                    isPostJob : false,
                    isMyPost : false,
                    isStudents : true
                })
            }
                
        }  
        
        postJobHandler(ev){
            ev.preventDefault()
            let jobPostObj = {
                email : this.props.companyObj.email,                
                uid : this.props.companyObj.uid,
                jobTitle : this.state.jobTitle,
                salary : this.state.salary,
                jobDiscription : this.state.jobDiscription
            }
            let uid = this.props.companyObj.uid;
            this.props.myAllJobPost(uid);

            this.props.createJobPost(jobPostObj);
            this.setState({
            
                    jobTitle : "",
                    salary : "",
                    jobDiscription : "",
                    isPostJob : false,
                    isMyPost : false,
                    isStudents : false

            })
        }
    render() {
        return (
            <div>
                <NavbarComponent />
                <div className="row">
                    <div className="col-3">
                      <h1> Company Information </h1>
                    <div className="card" >
                    <div className="card-body">
                    <h5 className="card-title">{this.props.companyObj.userName}</h5>
                    <Link to="#" className="card-link" onClick={this.viewComponent.bind(this, "postJob")} >Create Post Job</Link><br /><br />
                    <Link to="#" className="card-link" onClick={this.viewComponent.bind(this, "myPost")} >My Posts</Link><br /><br />
                    <Link to="#" className="card-link" onClick={this.viewComponent.bind(this, "students")} >All Students</Link>
                    </div>
                    </div>
                    </div>
                    <div className="col-1">
                    </div>                    

                {
                (this.state.isPostJob)? 
                    <div className="col-8">
                        <form onSubmit={this.postJobHandler.bind(this)} >
                        <h5 className="card-title">{this.props.companyObj.userName}</h5>                        
                        <div className="form-group col-md-7">
                        <label htmlFor="jobTitle">Job Title</label>
                        <input type="text" className="form-control" placeholder="Web Developer" name="jobTitle" value={this.state.jobTitle} onChange={this.onChangeHandler.bind(this)} />
                        </div>
                        <div className="form-group col-md-7">
                        <label htmlFor="jobSalary">Salary</label>
                        <input type="number" className="form-control"  placeholder="25000" name="salary" value={this.state.salary} onChange={this.onChangeHandler.bind(this)} />
                        </div>
                        <div className="form-group col-md-7">
                        <label htmlFor="jobDiscription">Job Discription</label>
                        <input type="text" className="form-control"  placeholder="We need a skillfull web developer" name="jobDiscription" value={this.state.jobDiscription} onChange={this.onChangeHandler.bind(this)} />
                        </div>
                        
                        <button type="submit" className="btn btn-primary"> Post </button>
                        </form>
                    </div>
                :
                (this.state.isMyPost)?
                    <div className="col-7">
                        <h1>  My Posts  </h1>
                    <table className="table">
                        <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Job Title</th>
                        <th scope="col">Discription</th>
                        <th scope="col">Salary</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.props.myJobPosts.map((value , index)=>{
                               return (                                 
                                    <tr key={index}>    
                                    <th scope="col">{index+1}</th>
                                    <th scope="col">{value.jobTitle}</th>
                                    <th scope="col">{value.jobDiscription}</th>
                                    <th scope="col">{value.salary}</th>
                                </tr>
                               )
                            })}
                        </tbody>
                    </table>
                </div>
                    
                :
                (this.state.isStudents)?
                
                    <div className="col-7">
                        <h1>   All Students </h1>
                        <table className="table">
                        <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Education</th>
                        <th scope="col">Marks/CGPA</th>
                        <th scope="col">Skills</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.props.allStudents.map((value , index)=>{
                               return (                                 
                                    <tr key={index}>    
                                    <th scope="col">{index}</th>
                                    <th scope="col">{value.fullName}</th>
                                    <th scope="col">{value.education}</th>
                                    <th scope="col">{value.division}</th>
                                    <th scope="col">{value.skills}</th>
                                </tr>
                               )
                            })}
                        </tbody>
                    </table>
                    </div>
                :
                    null 
                }    
            </div>  
          </div>
         )
    }
}

function mapStateToProp(state) {
    return ({
        companyObj : state.root.signedinUser,
        myJobPosts : state.root.myAllJobPost,
        allStudents : state.root.allStudents
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        
        createJobPost: (jobPostObj)=>{
            dispatch(jobPostAction(jobPostObj));
        },
        myAllJobPost : (uid) => {
            dispatch(getingMyAllPost(uid))
        },
        getingStudents : ()=> {
            dispatch(getingAllStudents())
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Company);
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import NavbarComponent from './navbarComponent';
import { getingAllStudents, getAllJobsAction, getingAccountsAction, deleteAction} from '../store/action/action';



class Admin extends Component {
    constructor(){
        super()
        this.state = {
            isStudents : false,
            isJobs : false,
            isAllAccounts : false
        }
    }

    componentWillMount(){
        this.props.getingStudents();
        this.props.getAllJobs();
        this.props.getingAllAccounts();

    }
    deleteSomething(index ,deleteType){
        
        this.props.deleteValue(index, deleteType);
    }

    viewComponent(name){
        if(name === 'students'){
            this.setState({
                isStudents : true,
                isJobs : false,
                isAllAccounts : false
            })
        }
        else if(name === 'jobs'){
            this.setState({
                isStudents : false,
                isJobs : true,
                isAllAccounts : false                

            })
        }
        else if(name === 'accounts'){
            this.setState({
                isStudents : false,
                isJobs : false,
                isAllAccounts : true

            })
        }

    }
    render() {
        return (
            <div>
                <NavbarComponent />
                <div className="row">
                    <div className="col-2">
                    <h1> Admin Component </h1>
                    <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                    <h5 className="card-title">Admin Panel</h5><br />
                    <Link to="#" className="card-link" onClick={this.viewComponent.bind(this, "students")} >All Students</Link><br /> <br />
                    <Link to="#" className="card-link" onClick={this.viewComponent.bind(this, "jobs")} >All Jobs</Link><br /> <br />
                    <Link to="#" className="card-link" onClick={this.viewComponent.bind(this, "accounts")} >All Accounts</Link><br /> <br />
                    </div>
                    </div>
                   </div>
                   <div className="col-1">
                    </div>                   
                {
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
                        <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.props.allStudents.map((value , index)=>{
                               return (                                 
                                    <tr key={index}>    
                                    <th scope="col">{index+1}</th>
                                    <th scope="col">{value.fullName}</th>
                                    <th scope="col">{value.education}</th>
                                    <th scope="col">{value.division}</th>
                                    <th scope="col">{value.skills}</th>
                                    <th scope="col"><button className="btn btn-outline-danger" onClick={this.deleteSomething.bind(this, index, "STUDENTDELETE")} >Delete</button></th>
                                </tr>
                               )
                            })}
                        </tbody>
                    </table>
                    </div>
                 :
                 (this.state.isJobs)?
                        <div className="col-7">

                        <h1> All Jobs </h1>
                        <table className="table">
                        <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Job Title</th>
                        <th scope="col">Discription</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Contect</th>
                        <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.allJobs.map((value , index)=>{
                        return (                                 
                            <tr key={index}>    
                            <th scope="col">{index+1}</th>
                            <th scope="col">{value.jobTitle}</th>
                            <th scope="col">{value.jobDiscription}</th>
                            <th scope="col">{value.salary}</th>
                            <th scope="col">{value.email}</th>
                            <th scope="col"><button className="btn btn-outline-danger" onClick={this.deleteSomething.bind(this, index, "COMPANYDELETE")} >Delete</button></th>
                        </tr>
                        )
                        })}
                        </tbody>
                        </table>
                        </div>
                 :
                 (this.state.isAllAccounts)?
                    <div className="col-7">
                        
                    <h1> All Accounts </h1>
                    <table className="table">
                        <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Type</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.allUsers.map((value , index)=>{
                            
                        return (                                 
                            <tr key={index}>    
                            <th scope="col">{index+1}</th>
                            <th scope="col">{value.userType}</th>
                            <th scope="col">{value.email}</th>
                            <th scope="col"><button className="btn btn-outline-danger" onClick={this.deleteSomething.bind(this, index, "USERDELETE" )} >Delete</button></th>
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
        allStudents : state.root.allStudents,
        allJobs : state.root.allJobs,
        allUsers : state.root.allUsers,
         })
}
function mapDispatchToProp(dispatch) {
    return ({
        getingStudents : ()=> {
            dispatch(getingAllStudents())
        },
        getAllJobs : () => {
            dispatch(getAllJobsAction())
        },
        getingAllAccounts : ()=>{
            dispatch(getingAccountsAction())
        },
        deleteValue : (index, deleteType)=> {
            dispatch(deleteAction(index, deleteType))
        }
        
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Admin);

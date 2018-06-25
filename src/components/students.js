import React, {Component} from 'react';
import NavbarComponent from './navbarComponent';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {addUserDetail, getAllJobsAction} from '../store/action/action';





class Students extends Component {
    constructor(){
        super()
        this.state = {
            education : "",
            division : "",
            skills : "",
            isDetail: false, 
            isViewJob: false
        }
    
    }
    componentWillMount(){
        this.props.getAllJobs()
    }
    viewComponent(name){
        if(name === 'detail'){
            this.setState({
                isDetail: true,
                isViewJob : false
            })
        }
        else if(name === 'viewJob'){
            this.setState({
                isDetail: false,
                isViewJob : true
            })
        }

    }
    onChangeHandler(ev){
      this.setState({ [ev.target.name] : ev.target.value })
               
    }
    detailSubmit(ev){
        ev.preventDefault();
        let userDetailObj = {
            fullName : this.props.studentObj.userName,
            email : this.props.studentObj.email,
            education : this.state.education,
            division : this.state.division,
            skills : this.state.skills
        }

        this.props.saveUserDetail(userDetailObj);

        this.setState({
            education : "",
            division : "",
            skills : "",
            isDetail: false, 
            isViewJob: false
        })

    }

    render() {
        return (
        <div>
            <NavbarComponent />
        <div className="row">
            <div className="col-2">
                <h1> Student Component </h1>
                <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                <h5 className="card-title">{this.props.studentObj.userName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{this.props.studentObj.email}</h6>
                <Link to="#" className="card-link" onClick={this.viewComponent.bind(this, "detail")} >Edit Details</Link><br /> <br />
                <Link to="#" className="card-link" onClick={this.viewComponent.bind(this, "viewJob")} >View All Jobs</Link>
                </div>
                </div>
            </div>
            <div className="col-2">
            
            </div>
            {(this.state.isDetail)?
            <div className="col-8">
                <form onSubmit={this.detailSubmit.bind(this)} >
                
                <div className="form-group col-md-7">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" className="form-control" readOnly value={this.props.studentObj.userName} />
                </div>
                <div className="form-group col-md-7">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" readOnly value={this.props.studentObj.email}/>
                </div>
                <div className="form-group col-md-7">
                <label htmlFor="education">Education</label>
                <input type="text" className="form-control" name="education" value={this.state.education} placeholder="Bachlor/Masters" onChange={this.onChangeHandler.bind(this)} />
                </div>
                <div className="form-group col-md-7">
                <label htmlFor="division">Marks / CGPA</label>
                <input type="text" className="form-control" name="division" value={this.state.division} placeholder="80% / 3.5" onChange={this.onChangeHandler.bind(this)} />
                </div>
                <div className="form-group col-md-7">
                <label htmlFor="skill">Skills</label>
                <input type="text" className="form-control" name="skills" value={this.state.skills} placeholder="React, React-Native " onChange={this.onChangeHandler.bind(this)} />
                </div>
                
                <div className="form-group">
                <div className="form-check">
                
                </div>
                </div>
                <button type="submit" className="btn btn-primary">Save Detail</button>
                </form>
            </div> 
            :(this.state.isViewJob)? 
            <div className="col-8">
                <h1> Jobs </h1>
                <table className="table">
                    <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Job Title</th>
                    <th scope="col">Discription</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Contect</th>
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
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div> 
            : 
            null }
        </div>
        </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        studentObj : state.root.signedinUser,
        allJobs : state.root.allJobs
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        saveUserDetail: (userDetailObj)=>{
            dispatch(addUserDetail(userDetailObj));
        },
        getAllJobs : () => {
            dispatch(getAllJobsAction())
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Students);

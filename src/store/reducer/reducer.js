import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    signedinUser : {},
    myAllJobPost : [],
    allStudents : [],
    allJobs : [],
    allUsers: [],
    errorMsg : {}
   
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.STUDENT:
            return ({
                ...state,
                signedinUser: action.payload
            })
        case ActionTypes.COMPANY:
            return ({
                ...state,
                signedinUser: action.payload
            })   
        case ActionTypes.ADMIN:
            return ({
                ...state,
                signedinUser: action.payload
            }) 
        case ActionTypes.MYALLPOSTS:
            
            return ({
                ...state,
                myAllJobPost: action.payload
            })
        case ActionTypes.ALLSTUDENTS:
            return ({
                ...state,
                allStudents: action.payload
            })
        case ActionTypes.ALLJOBS:
            return ({
                ...state,
                allJobs: action.payload
            })
        case ActionTypes.ALLUSERS:
            return ({
                ...state,
                allUsers: action.payload
            })
        case ActionTypes.USERDELETE:
            state.allUsers.splice(action.payload, 1);
            return ({
                ...state,
                allUsers: state.allUsers.concat()
            })
        case ActionTypes.STUDENTDELETE:
            state.allStudents.splice(action.payload, 1);
            return ({
                ...state,
                allStudents: state.allStudents.concat()
            })
        case ActionTypes.COMPANYDELETE:
            state.allJobs.splice(action.payload, 1);
            return ({
                ...state,
                allJobs: state.allJobs.concat()
            })
        case ActionTypes.ERRORMSG:
            return ({
                ...state,
                errorMsg: action.payload
            })
        default:
            return state;
    }

}
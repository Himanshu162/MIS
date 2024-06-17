import * as ActionTypes from '../constants/ActionTypes'
import merge from 'lodash/merge'
import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import LoginReducer from "../../../redux/reducers/LoginReducer";
import UserReducer from "../../../redux/reducers/UserReducer";
import LayoutReducer from "../../../redux/reducers/LayoutReducer";
import PDFReducer from "../../../redux/reducers/PDFReducer";
import ScrumBoardReducer from "../../../redux/reducers/ScrumBoardReducer";
import NotificationReducer from "../../../redux/reducers/NotificationReducer";
import EcommerceReducer from "../../../redux/reducers/EcommerceReducer";
import snackbarReducer from "../ducks/snackbar";
import passDataReducer from "../ducks/passData";
import apiTrigger from "./apiTrigger";
import LoadReducer from "../../../redux/reducers/LoadReducer";
import InboxReducer from "../../../redux/reducers/InboxReducer";
import RefreshReducer from "../../../redux/reducers/RefreshReducer";
import Refresh1Reducer from "../../../redux/reducers/Refresh1Reducer";
import CreatePersonalReducer from "../../../redux/reducers/CreatePersonalReducer";
import CreateFileReducer from "../../../redux/reducers/CreateFileReducer";
import SendReducer from "../../../redux/reducers/SendReducer";
// import passDataReducer from "../ducks/passData";

// Updates an entity cache in response to any action with response.entities.
const entities = (state = {}, action) => {
    const { type } = action;
    if (type === ActionTypes.TASK_SUBMITTED_SUCCESS || type === ActionTypes.TASK_SUBMITTED_FAILURE) {
        return merge({}, state, {
            redirect: '/eoffice/'
        })
    } else {
        state = merge({}, state, {
            redirect: null
        })
    }
    if (type === ActionTypes.NEW_PROCESS_INSTANCE_SUCCESS) {
        state.formKey = null
    }
    if (type === ActionTypes.FORM_KEY_SUCCESS) {
        state.processInstanceStarted = null
    }
    if (type === ActionTypes.TASKS_SUCCESS) {
        state.task = null
    }

    if (action.response && action.response.entities) {
        return merge({}, state, action.response.entities)
    }
    return state
};

const rootReducer = combineReducers({
    form: reduxFormReducer,
    entities,
    login: LoginReducer,
    user: UserReducer,
    layout: LayoutReducer,
    pdf: PDFReducer,
    scrumboard: ScrumBoardReducer,
    notification: NotificationReducer,
    ecommerce: EcommerceReducer,
    snackbar: snackbarReducer,
    passData: passDataReducer,
    subscribeApi: apiTrigger,
    loader: LoadReducer,
    refreshing: RefreshReducer,
    refreshings: Refresh1Reducer,
    createpersonal: CreatePersonalReducer,
    createfile: CreateFileReducer,
    sendfile: SendReducer,
    inboxer: InboxReducer,

});

export default rootReducer

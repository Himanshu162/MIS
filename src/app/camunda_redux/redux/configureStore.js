import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import api from './../../middleware/api'
import backend from './../../middleware/backend'
import rootReducer from './reducer/index'
import backendPA from "../../middleware/backendPA";
import backendMIS from "../../middleware/backendMIS";
import backendSau from "../../middleware/backendSau";
import backendMIS2 from "../../middleware/backendMIS2";
import backendSecretMIS from "../../middleware/backendSecretMIS";
import backendSecretMIS2 from "../../middleware/backendSecretMIS2";
import MisMicroService from "../../middleware/MisMicroService";
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk, api, backend, backendPA, backendMIS, backendSau, backendMIS2, backendSecretMIS, backendSecretMIS2, MisMicroService))
)

export default configureStore;

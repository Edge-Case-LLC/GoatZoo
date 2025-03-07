import { combineReducers } from 'redux';
import reducer from './reducer'
import socket from './socket';

const allReducers = combineReducers({
    reducer,
    socket
});

export default allReducers;
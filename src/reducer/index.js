import {combineReducers} from 'redux'
import Counter from './increment.js'
const allReducers=combineReducers({
    Counter:Counter
});
export default allReducers 
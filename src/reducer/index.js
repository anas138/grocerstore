import {combineReducers} from 'redux'
import Counter from './increment.js'
import ChangeCat from'./chnageCat.js'
const allReducers=combineReducers({
    Counter:Counter,
    ChangeCat:ChangeCat,
});
export default allReducers 
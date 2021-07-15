import {combineReducers} from 'redux'
import Counter from './increment.js'
import ChangeCat from'./chnageCat.js'
import Price from './Subtotal.js'
const allReducers=combineReducers({
    Counter:Counter,
    ChangeCat:ChangeCat,
    Price:Price,
});
export default allReducers 
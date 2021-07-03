import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {FaAlignJustify} from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import{Link} from 'react-router-dom';
import {Increment} from '../action/index.js'




 function NavBar() {
    const counter=useSelector(state=>state.Counter);
    const cartCounter=localStorage.getItem('counter');
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(Increment(localStorage.getItem('counter')));
    }) 
    return (
        <div className='Container' id='navBar'>
            <Link to='/categories'>
           <button type="button" className="btn btn-primary" id='catButton'><FaAlignJustify/>Categories</button>
           </Link>
           <input type='text' placeholder='Search' id='inputSearch' className="form-control"></input> 
           <div><FaShoppingCart id='bucketId'></FaShoppingCart>{cartCounter==null?'': <span id='counter'>{counter}</span>}</div>
           
        </div>
    )
}
export default(NavBar);
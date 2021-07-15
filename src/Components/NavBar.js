import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {FaAlignJustify} from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import{Link} from 'react-router-dom';
import {Increment,SubTotal1} from '../action/index.js'
import axios from 'axios'




 function NavBar() {
    const counter=useSelector(state=>state.Counter);
    const cartCounter=localStorage.getItem('counter');
    const dispatch=useDispatch();
    const [data,setData]=useState();
    useEffect(()=>{
        const d=JSON.parse( localStorage.getItem('cartItems'));
        if(d !== null)
        {
        const l=d.length-1;
        dispatch(Increment(l));
        }
        axios.get('http://localhost:3001/items').then(res=>{
        setData(res.data);
    });

    }) 
    const handleClick=()=>{
        let q=0;
       const items= JSON.parse( localStorage.getItem('cartItems'));
       console.log('items',items)
       console.log('data',data);
       items.forEach(data1=>{
           data.forEach(data2=>{
               if(data2._id===data1.id){
                   q= (q + (data2.price * data1.quantity));
                  
               }
           })
       })
       console.log(q);
       dispatch(SubTotal1(q));
       localStorage.setItem('subTotal',q.toString());
    }
    return (
        <div className='Container' id='navBar'>
            <Link to='/categories'>
           <button type="button" className="btn btn-primary" id='catButton'><FaAlignJustify/>Categories</button>
           </Link>
           <input type='text' placeholder='Search' id='inputSearch' className="form-control"></input> 
           <Link to='/cart' onClick={handleClick}>
           <div><FaShoppingCart id='bucketId'></FaShoppingCart>{cartCounter==null?'': <span id='counter'>{counter}</span>}</div>
           </Link>
           
        </div>
    )
}
export default(NavBar);
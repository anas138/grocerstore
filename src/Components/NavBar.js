import React from 'react'
import {useSelector} from 'react-redux'
import {FaAlignJustify} from "react-icons/fa";
import { BsBucketFill } from "react-icons/bs";
import{Link} from 'react-router-dom'

export default function NavBar() {
    const counter=useSelector(state=>state.Counter);
    return (
        <div className='Container' id='navBar'>
            <Link to='/categories'>
           <button type="button" className="btn btn-primary" id='catButton'><FaAlignJustify/>Categories</button>
           </Link>
           <input type='text' placeholder='Search' id='inputSearch' className="form-control"></input> 
           <BsBucketFill id='bucketId'/>
           
        </div>
    )
}
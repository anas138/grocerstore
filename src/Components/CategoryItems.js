import React,{useState} from 'react'
import { FaRegPlusSquare } from "react-icons/fa";

function CategoryItems() {
    const [cat,setCat]=useState(0);
    return (
        <div className='container'>


            
      {cat==1? <form id='category-form'>
                <buton type='button' className="btn btn-danger" onClick={()=>{setCat(0)}}>X</buton>
                    <input className='form-control'  placeholder='Enter name'></input>
                    <input className='form-control'  placeholder='Enter weight'></input>
                    <input className='form-control'  placeholder='Enter price'></input>
                    <button type="button" className="btn btn-primary" id='form-button' >Submit</button>
                </form>
       :''}
                    
            
            <div>
                <FaRegPlusSquare id='addCategory' onClick={()=>{setCat(1)}}/>
            </div>
        </div>
    )
}

export default CategoryItems

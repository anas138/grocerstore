import React,{useState} from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import {useDispatch,useSelector} from 'react-redux'
import{Change} from '../action/index'



function Categories() {
    const [cat,setCat]=useState(0);
    const UseDispatch=useDispatch();
    const [changeInput,setChangeInput]=useState();
    const change=useSelector(state=>state.ChangeCat);
    
    const click=()=>{
        console.log(changeInput);
    }
    const ChangeInput=async(e)=>{
        await UseDispatch(Change(e.target.value));
        setChangeInput(change);
        console.log('anas');
    }
    return (
        
        <div className='container'>
            <div>
            <div id='catDiv1'>
               <h1>Categories</h1>
               <FaRegPlusSquare id='addCategory' onClick={()=>{setCat(1)}}/>
               </div>
               {cat==1?<form id='category-form'>
                   <buton type='button' className="btn btn-danger" onClick={()=>{setCat(0)}}>X</buton>
                   <h2>Add category</h2>
                   <input className="form-control" placeholder='Enter category' id='form-input' value={change}
                   onChange={ChangeInput}></input>
                   <input className="form-control" placeholder='Enter category' id='form-input' 
                   onChange={(e)=>{setChangeInput(e.target.value);
                    console.log(changeInput)
                                   
                   }}></input>
                   <button type="button" className="btn btn-primary" id='form-button' onClick={click}>Submit</button>
               </form>
               : ''}
               



            </div>
            <div  id='mainid'>
                <div id='catDiv'>
                <h2 id='categories'>Fruits and Vegetables</h2>
                </div>
                <div id='main'>
                <div id='items'>
                    <img src='download (4).jpg' id='catImage'/>
                    <h5>Fruits</h5>
                </div>

               
                </div>
            </div>
            {change}
            <div>{changeInput}</div>
            
        </div>
    )
}

export default Categories

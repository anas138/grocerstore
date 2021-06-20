import React,{useState,useEffect} from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import {useDispatch,useSelector} from 'react-redux'
import{Change} from '../action/index'
import axios from 'axios';



function Categories() {
    const change=useSelector(state=>state.ChangeCat);
    const UseDispatch=useDispatch();
    useEffect(()=>{
        axios.get('http://localhost:3001/category')
        .then(res=>{
            console.log(res.data);
            UseDispatch(Change(res.data));
            console.log('anas',change)
        })

    },[])



    const [cat,setCat]=useState(0);
    
    const [changeInput,setChangeInput]=useState('');
    
    
    const click=()=>{
        //console.log(changeInput);
        axios.post('http://localhost:3001/category',{
            name:changeInput,
        }).then(res=>{
            console.log(res);
        })
    }
    const ChangeInput=async(e)=>{
        //await UseDispatch(Change(e.target.value));
        //setChangeInput(change);
        //console.log('anas');
        setChangeInput(e.target.value);
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
                   <input className="form-control" placeholder='Enter category' id='form-input'
                   onChange={ChangeInput}></input>
                   
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
                      
            
        </div>
    )
}

export default Categories

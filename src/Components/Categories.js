import React,{useState,useEffect} from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import {useDispatch,useSelector} from 'react-redux'
import{Change} from '../action/index'
import axios from 'axios';
import {Link} from 'react-router-dom'



function Categories() {
    const [cat,setCat]=useState(0);
    const [subCatcat,setSubCat]=useState(0);
    const [changeInput,setChangeInput]=useState('');
    const [changeSubCat,setChangeSubCat]=useState('');
    const [catFk,setCatFk]=useState('');
    const [subCatData,setSubCatData]=useState([]);
    const change=useSelector(state=>state.ChangeCat);
    const UseDispatch=useDispatch();
    useEffect(()=>{
        axios.get('http://localhost:3001/category')
        .then(res=>{
            console.log(res.data);
            UseDispatch(Change(res.data));
            //console.log(change)
        })
        axios.get('http://localhost:3001/subCat')
        .then(res=>{
            console.log(res.data);
            setSubCatData(res.data);
            //console.log(change)
        })

    },[])



    
    
    
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
    const subClickHandle=()=>{
        console.log(catFk);
        axios.post('http://localhost:3001/subCat',{
            name:changeSubCat,
            fkCat:catFk
                  
        }).then(res=>{
            console.log(res);
        });
    }
    return (
        
        <div className='container'>
            <div>
            <div id='catDiv1'>
               <h1>Categories</h1>
               <FaRegPlusSquare id='addCategory' onClick={()=>{setCat(1);
            setSubCat(0)}}/>
               </div>
               {cat==1?<form id='category-form'>
                   <buton type='button' className="btn btn-danger" onClick={()=>{setCat(0)}}>X</buton>
                   <h2>Add category</h2>
                   <input className="form-control" placeholder='Enter category' id='form-input'
                   onChange={ChangeInput}></input>
                   
                   <button type="button" className="btn btn-primary" id='form-button' onClick={click}>Submit</button>
               </form>
               : ''}
               {subCatcat==1?
                <form id='category-form'>
                <buton type='button' className="btn btn-danger" onClick={()=>{setSubCat(0)}} >X</buton>
                    <h2>Add sub category</h2>
                    <input className="form-control" placeholder='Enter sub category' id='form-input' onChange={(e)=>{
                        setChangeSubCat(e.target.value);
                    }}></input>
                    <input className="form-control"  id='form-input' type='file'></input>
                    <button type="button" className="btn btn-primary" id='form-button' onClick={subClickHandle} >Submit</button>
 
                </form>:''}
              
               



            </div>
            <div  id='mainid'>
                {change.map(index=>{
                   return <div id='subcat2'>
                     <div id='catDiv'>
                           <h2 id='categories'>{index.name}</h2>
                           </div>
                            
                            <div id='items'>
                            <FaRegPlusSquare id='addCategory' onClick={()=>{
                                setSubCat(1);
                                setCat(0);
                                setCatFk(index._id);
                            }} /> 
                            {subCatData.map(index2=>{
                                
                                if(index2.fkCat==index._id){
                                    return <div id='subcat2' >                             
                                    <Link to='/categories/items'>
                                    <img src='download (4).jpg' id='catImage' onClick={()=>{localStorage.setItem('subCatId',index2._id)}}/>
                                    </Link>
                                    <h5 id='heading'>{index2.name}</h5>
                                    </div> 
                                }
                            })} 
                            

                            </div>
            
                           
                            </div>
                            

                })}
                
                
            </div>
                      
            
        </div>
    )
}

export default Categories

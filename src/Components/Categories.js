import React,{useState,useEffect} from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import {useDispatch,useSelector} from 'react-redux'
import{Change} from '../action/index'
import axios from 'axios';
import {Link} from 'react-router-dom'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import Loading from './loading.js' 



function Categories() {
    const [cat,setCat]=useState(0);
    const [subCatcat,setSubCat]=useState(0);
    const [changeInput,setChangeInput]=useState('');
    const [changeSubCat,setChangeSubCat]=useState('');
    const [catFk,setCatFk]=useState('');
    const [subCatData,setSubCatData]=useState([]);
    const change=useSelector(state=>state.ChangeCat);
    const [image,setImage]=useState("null");
    const [imageUrl,setImageurl]=useState();
    const [animation,setAnimation]=useState(0);
    const [changeColor,setChangeColor]=useState();
    const [display1,setDisplay]=useState("none");
    const [changeColorImage,setChangeColorImage]=useState();
    const [loading,setLoading]=useState(0);
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

    })



    
    
    
    const click=()=>{
        if(changeInput===''){
            setChangeColor(changeColor=>"red");
            setDisplay(display1=>"block")
        }
        else{
            

        //console.log(changeInput);
        axios.post('http://localhost:3001/category',{
            name:changeInput,
        }).then(res=>{
            console.log(res);
        })
    }
    }
    const ChangeInput=async(e)=>{
        //await UseDispatch(Change(e.target.value));
        //setChangeInput(change);
        //console.log('anas');
        setChangeInput(changeInput=>e.target.value);
        setChangeColor(changeColor=>"");
        setDisplay(display1=>"none")
      
    }
    const subClickHandle=()=>{
       // console.log(catFk);
      
        console.log("anas",image);
        const formData=new FormData();
        formData.append('file',image);
        formData.append('upload_preset','zjxqum2o');
        if(changeSubCat==""||image=="null"){
            console.log("required")
            if(image=="null")
            {
            setChangeColor(changeColor=>"red");
            }else{setChangeColor(changeColor=>"");}
            if(changeSubCat==""){
                setChangeColorImage(changeColorImage=>"red");
            }else{setChangeColorImage(changeColorImage=>"");}
            

        }
        else{
        setLoading(loading=>1);
        
        axios.post('https://api.cloudinary.com/v1_1/dytyrk20i/image/upload',formData)
        .then(res=>{
            console.log(res.data.secure_url);
            setImageurl(res.data.secure_url);
            axios.post('http://localhost:3001/subCat',{
                name:changeSubCat,
                fkCat:catFk,
                image:res.data.secure_url
                      
            }).then(res=>{
                console.log(res);
                setSubCat(0);
                setLoading(loading=>0);
                document.body.style.overflow="";
                
                
            });
        })
        }
     
    }
const imageChange=(e)=>{
console.log(e.target.files[0]);
setImage(e.target.files[0])
}

    return (
        
        <div className='container'>
            <div>
            <div id='catDiv1'>
               <h1 >Categories</h1>
               <Tippy content="add new category">
               <a href="#category-form"><FaRegPlusSquare id='addCategory' onClick={()=>{setCat(1);
            setSubCat(0);}}/></a> 
            </Tippy>
               </div>
               {cat==1?<form id='category-form' >
                   <buton type='button' className="btn btn-danger" onClick={()=>{setCat(0)}}>X</buton>
                   <h2>Add category</h2>
                   <small style={{color:"red",display:display1}}>Required</small>
                   <input className="form-control" placeholder='Enter category' id='form-input'
                   onChange={ChangeInput} style={{borderColor:changeColor}}></input>
                   
                   
                   <button type="button" className="btn btn-primary" id='form-button' onClick={click}>Submit</button>
               </form>
               : ''}
               {subCatcat==1?
                <form id='category-form'>
                <buton type='button' className="btn btn-danger" onClick={()=>{setSubCat(0)}} >X</buton>
                    <h2>Add sub category</h2>
                    <input className="form-control" placeholder='Enter sub category' id='form-input' style={{borderColor:changeColorImage}} onChange={(e)=>{
                        setChangeSubCat(e.target.value);
                    }}></input>
                    <input className="form-control"  id='form-input' type='file' onChange={imageChange} style={{borderColor:changeColor}}></input>
                    <button type="button" className="btn btn-primary" id='form-button' onClick={subClickHandle} >Submit</button>
 
                </form>:''}
              
               



            </div>
            <div  id='mainid'>
                {change.map(index=>{
                   return <div id='subcat2'>
                     <div id='catDiv'>
                           <h2 id='categories'>{index.name}</h2>
                           </div>
                            
                            <div >
                            <Tippy content="add new item"> 
                            <a href="#category-form">
                               <FaRegPlusSquare id='addCategory' onClick={()=>{
                                setSubCat(1);
                                setCat(0);
                                setCatFk(index._id);
                            }} /> 
                           </a>
                           </Tippy>  <br/>
                           
                            
                            <div className='igrid' id='igrid'>
                            {subCatData.map(index2=>{
                                
                                if(index2.fkCat==index._id){
                                    return <div id='subcat2' >                             
                                    <Link to='/categories/items'>
                                    <img src={index2.image} id='catImage'   onClick={()=>{localStorage.setItem('subCatId',index2._id)}}/>
                                    </Link>
                                    <h5 id='heading'>{index2.name}</h5>
                                    </div> 
                                }
                            })} 
                            
                            </div>
                            </div>
            
                           
                            </div>
                            

                })}
                
                
            </div>
             {loading==1?<Loading/>:''} 
             
              
            
        </div>
    )
}

export default Categories

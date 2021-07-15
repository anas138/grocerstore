import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import {useDispatch} from 'react-redux'
import {Increment} from '../action/index'


function CategoryItems() {
    const [cat,setCat]=useState(0);
    const [changeName,setChangeName]=useState('');
    const [changeWeight,setChangeWeight]=useState('');
    const [changePrice,setChangePrice]=useState('');
    const[itemData,setItemData]=useState([]);
    const [image,setImage]=useState();
    const dispatch = useDispatch();
    
     useEffect(()=>{
         axios.get('http://localhost:3001/items').then(res=>{
            setItemData(res.data);
            console.log('i',res.data);
         })
     },[]);
    const handleClick=()=>{
        console.log(image);
        const formData=new FormData();
        formData.append('file',image);
        formData.append('upload_preset','zjxqum2o');
        axios.post('https://api.cloudinary.com/v1_1/dytyrk20i/image/upload',formData)
        .then(res=>{
            axios.post('http://localhost:3001/items',{
            name:changeName,
            weight:changeWeight,
            price:changePrice,
            image:res.data.secure_url,
            fkSubCat:localStorage.getItem('subCatId')
        }).then(res=>{
            console.log(res.data);
        })
            

        })

        

        
    }
    const handleAddToCart=(e)=>{
        
        let data=(localStorage.getItem('cartItems'));
        console.log('value',e.target.value);
       if(data!==null){
        
         
         data=JSON.parse(data); 
         if(data.indexOf(e.target.value)>-1){
            console.log('anas');
         }
         let dataArray=[];
         data.map(index=>{
             //console.log(index.id);
              dataArray=[...dataArray,index.id]
               

             
         })
         console.log(dataArray);
        
             if(parseInt( dataArray.indexOf( e.target.value))<=-1){
                  data.push({id:e.target.value,
                  quantity:1});
                  console.log('anas');
                  localStorage.setItem('cartItems',JSON.stringify(data));
                  let counter= + localStorage.getItem('counter')
                  counter+=1;
                  localStorage.setItem('counter',counter.toString());
                  const c= JSON.parse( localStorage.getItem('cartItems'));
                  const l= c.length - 1;
                  dispatch(Increment(l));

             }
         
         
        // console.log(data);
         //data=[...data,e.target.value];
         
         
               
           
       }
       else{
           const array=['anas',{
               id:e.target.value,
               quantity:1
            
            }]
        localStorage.setItem('cartItems',JSON.stringify(array));
        localStorage.setItem('counter','1');
        const c= JSON.parse( localStorage.getItem('cartItems'));
        const l= c.length - 1;
        dispatch(Increment(l));
        
        
       }
        
    // localStorage.setItem('cartItems',res.toString());

    }
    const imageChange=(e)=>{
        console.log(e.target.files[0]);
        setImage(e.target.files[0])
        }
    return (
        <div className='container'>


            
      {cat==1? <form id='category-form'>
                <buton type='button' className="btn btn-danger" onClick={()=>{setCat(0)}}>X</buton>
                    <input className='form-control'  placeholder='Enter name' onChange={(e)=>{setChangeName(e.target.value)}}></input>
                    <input className='form-control'  placeholder='Enter weight' onChange={(e)=>{setChangeWeight(e.target.value)}}></input>
                    <input className='form-control'  placeholder='Enter price' onChange={(e)=>{setChangePrice(e.target.value)}}></input>
                    <input className="form-control"  id='form-input' type='file' onChange={imageChange}></input>
                    <button type="button" className="btn btn-primary" id='form-button' onClick={handleClick} >Submit</button>
                </form>
       :''}
                    
            
            <div>
                <FaRegPlusSquare id='addCategory' onClick={()=>{setCat(1)}}/>    
            </div>
            
                 <div className='row itemDiv'>
                    {itemData.map(index=>{
                if(index.fkSubCat==localStorage.getItem('subCatId'))
                {
                       return <div className=' col-2 itemDiv1'>
                        <div className='imgdiv'>
                        <img src={index.image} width='100%' height='200px' id='catImage1'/>
                        </div>
                        <label className='nameItems'>{index.name}</label>
                        <label className='nameItems'>{index.weight}gm</label>
                        <label className='nameItems'>Rs. {index.price}</label>
                        <button type="button" className="btn btn-primary" id='form-button' value={index._id} onClick={handleAddToCart} >ADD TO CART</button>
                        </div>
                }   
            })} 
                    </div>
                    
                    
            
            
        </div>
    )
}

export default CategoryItems

import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { FaRegPlusSquare } from "react-icons/fa";


function CategoryItems() {
    const [cat,setCat]=useState(0);
    const [changeName,setChangeName]=useState('');
    const [changeWeight,setChangeWeight]=useState('');
    const [changePrice,setChangePrice]=useState('');
    const[itemData,setItemData]=useState([]);
    const[addCart,setAddCart]=useState([]);
    
     useEffect(()=>{
         axios.get('http://localhost:3001/items').then(res=>{
            setItemData(res.data);
         })
     })
    const handleClick=()=>{
        axios.post('http://localhost:3001/items',{
            name:changeName,
            weight:changeWeight,
            price:changePrice,
            fkSubCat:localStorage.getItem('subCatId')
        }).then(res=>{
            console.log(res.data);
        })
    }
    const handleAddToCart=(e)=>{
        
        let data=(localStorage.getItem('cartItems'));
        
          let res = data.concat(',',e.target.value)
        console.log(res);
        
        
     localStorage.setItem('cartItems',res.toString());

    }
    return (
        <div className='container'>


            
      {cat==1? <form id='category-form'>
                <buton type='button' className="btn btn-danger" onClick={()=>{setCat(0)}}>X</buton>
                    <input className='form-control'  placeholder='Enter name' onChange={(e)=>{setChangeName(e.target.value)}}></input>
                    <input className='form-control'  placeholder='Enter weight' onChange={(e)=>{setChangeWeight(e.target.value)}}></input>
                    <input className='form-control'  placeholder='Enter price' onChange={(e)=>{setChangePrice(e.target.value)}}></input>
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
                        <img src='download (4).jpg'/>
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

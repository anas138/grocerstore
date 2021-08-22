import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {Increment,SubTotal1} from '../action/index.js'
import Loading from './loading.js' 


function CartItems() {
    const [data,setData]=useState([]);
    const [localData,setLocalData]=useState([]);
    const UseDispath=useDispatch();
    const[subTotal,setSubTotal]=useState(0);
    const [loading,setLoading]=useState(0);
    const quantity=useSelector(state=>state.Price)
    useEffect(async()=>{
        setLoading(loading=>1);
      await  axios.get('http://localhost:3001/items').then(res=>{
            setData(res.data);
            setLoading(loading=>0);
            document.body.style.overflow="";
            
            
            
         })
         console.log('data',data);
         setLocalData(JSON.parse( localStorage.getItem('cartItems')));
         const t= + localStorage.getItem('subTotal');
         UseDispath(SubTotal1(t));
       
    },[]);
   
    const handeladdButton=(e)=>{
        console.log(e.target.value);
        localData.forEach(data=>{
            if(e.target.value===data.id)
            {
                 data.quantity = data.quantity + 1;
                 
            }
            localStorage.setItem('cartItems', JSON.stringify(localData));
            console.log(data);
            setLocalData(JSON.parse( localStorage.getItem('cartItems')));
        })

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
        UseDispath(SubTotal1(q));
        localStorage.setItem('subTotal',q.toString());
     
    }
    const handelminusButton=(e)=>{
        
        localData.forEach(data=>{
            if(e.target.value===data.id)
            {
                if(data.quantity > 1){
                 data.quantity = data.quantity - 1;
                }
                 
            }
            localStorage.setItem('cartItems', JSON.stringify(localData));
            console.log(data);
            setLocalData(JSON.parse( localStorage.getItem('cartItems')));
        })
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
        UseDispath(SubTotal1(q));
        localStorage.setItem('subTotal',q.toString());

    }
    const canceHandle=(e)=>{
        localData.forEach(data=>{
            if(data.id===e.target.value){
             const d=   localData.indexOf(data);
             console.log(d);
             localData.splice(d,1);
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(localData));
        const d=JSON.parse( localStorage.getItem('cartItems'));
        const l=d.length-1;
        UseDispath(Increment(l));
        setLocalData(JSON.parse( localStorage.getItem('cartItems')));

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
        UseDispath(SubTotal1(q));
        localStorage.setItem('subTotal',q.toString());

     

    }
    return (
        <div className='container'>
           { console.log(data)}
           <h3 className='billh'>My Cart</h3>
           {localData.map((index)=>{
               return <div>
             {data.map((data)=>{
                   
                   if(data._id===index.id){
                    

                    return  <div className='Mcart'>
                        
                           <button id='cancelCartButton'className="btn btn-danger"value={index.id} onClick={canceHandle}>x</button>
                           <div className='mainCart'>
                    
                           <img src={data.image} id='cartImage' height='100px' width='100px'></img>
                           <div className='cartItem'>
                              <label id='textCart'>{data.name}</label>
                              <small>{data.weight} mg</small> <small>Quantity {index.quantity}</small>
                              <label id='textCart'>RS. {data.price * index.quantity}</label>
                           </div>
                            <div className='cartButtons'>
                    
                                <button className="btn btn-primary"onClick={handeladdButton} value={index.id}>+</button><label id='quantityCart'>{index.quantity}</label><button className="btn btn-primary" onClick={handelminusButton} value={index.id}>-</button>
                            </div>
                            </div>
                           </div>

                   }
                   
               })}
               
               </div>
           })}

           <h3 className='billh'>Total Bill</h3>
            <div className='bill'>
                
                <div className='subBill'>
                       <label className='billText'>Sub Total</label>
                       <label className='billText'>Delivery Charges</label>
                       <label className='billText'>Total Bill</label>
                </div>
                <div className='subBill'>
                    <label className='billText'>Rs. {quantity}</label>
                    <label className='billText'>Rs. 29</label>
                    <label className='billText'>Rs. {quantity + 29}</label>

                </div>
            </div>
            <button className="btn btn-primary">Place Order</button>

            {loading==1?<Loading/>:''} 
        
        </div>
    )
}

export default CartItems

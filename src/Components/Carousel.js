import React,{useEffect,useState} from 'react'
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function CarouselComp() {
    const [itemData,setItemData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/items').then(res=>{
            setItemData(itemData=>res.data);
            console.log(itemData);
            
         })
     
    })
    return (
        <div >
            <Carousel className="cas" showThumbs={false} interval={3000} autoPlay={true}>
                {itemData.map((index)=>{
                    
                    
                  return  <div className="carousel-Div">
                     <img height='390px' width="80%" src={index.image} style={{borderRadius:"10px"}} />
                    </div>
                    

                })}
               
                
                
            </Carousel>
        </div>
    )
}

export default CarouselComp

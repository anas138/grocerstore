const Price=(state=0,action)=>{
    switch (action.type){
        case 'subtotal':{
            return action.payload
        }
        default:
            return state;
    }

}
export default Price
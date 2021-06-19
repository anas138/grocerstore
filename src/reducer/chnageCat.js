const ChangeCat=(state=0,action)=>{
    switch (action.type){
        case 'change':{
            return action.payload
        }
        default:
            return state;
    }

}
export default ChangeCat
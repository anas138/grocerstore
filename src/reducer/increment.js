const Counter=(state=0,action)=>{
    switch(action.type){
        case 'increment':
            return action.payload;
        default:
        return state;
    }
    

}
export default Counter
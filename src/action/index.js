export const Increment=()=>{
    return{
        type:'increment'
    }
}

export const Change=(nr)=>{
return{
    type:'change',
    payload:nr
}
}

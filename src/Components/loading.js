import React from 'react'
import { FaSpinner } from "react-icons/fa";
import LoadingIcons from 'react-loading-icons'
function Loading() {
    const unscrollable=()=>{
        document.body.style.overflow="hidden";
        window.scrollTo(0,0);
    }
    return (
        <div className="loading">
            <div className="loading-icon">
            <LoadingIcons.Bars />
            {unscrollable()}
            </div>
        </div>
    )
}

export default Loading

import React from 'react'

function Categories() {
    return (
        <div className='container'>
            <div>
               <h1>Categories</h1>
            </div>
            <div  id='mainid'>
                <div id='catDiv'>
                <h2 id='categories'>Fruits and Vegetables</h2>
                </div>
                <div id='main'>
                <div id='items'>
                    <img src='download (4).jpg' id='catImage'/>
                    <h5>Fruits</h5>
                </div>

                <div id='items'>
                    <img src='download (4).jpg' />
                    <h5 id='heading'>Fruits</h5>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Categories

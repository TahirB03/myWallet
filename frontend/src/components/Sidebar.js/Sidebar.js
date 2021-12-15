import React from 'react'
import './Sidebar.css'
import RoundedButtons from '../RoundedButtons'
const Sidebar = ({setSideBar})=> {
    return (
        <div className="sidebar">
            <div className="label">
                <p style={{display:"inline-block",fontWeight:"600",fontSize:"18px"}}>Filter</p>
                <div className="roundedClose" style={{display:"flex",justifyContent:"center"}} onClick={()=> setSideBar(false)}>
                    <img src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Close.png" alt="" width="60%" style={{margin:"auto 0"}} />
                </div>
            </div>
            <RoundedButtons selected={true} />
        </div>
    )
}

export default Sidebar

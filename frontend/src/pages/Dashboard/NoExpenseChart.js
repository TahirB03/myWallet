import React,{useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../../context/UserContext'

const NoExpenseChart = ()=> {
    const navigate = useNavigate();
    const userId = useContext(UserContext)
    return (
        <div className="NoExpenseChart">
            <h1 className='noExpenseHeader'>Try adding an expspense</h1>
            <button className="noExpenseButton" onClick={()=> navigate(`/addExspense/${userId}`)}>Get started!</button>
        </div>
    )
}

export default NoExpenseChart

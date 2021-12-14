import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import Box from "@mui/material/Box";
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import deposit from './deposit.png'
import withdraw from './withdraw.png'
import {UserContext} from '../../../src/context/UserContext'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import moment from 'moment'
import Filter from '../../images/Filter.png'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DashboardNavbar from "./DashboardNavbar";
import Settings from '../../images/Settings.png'

const floatingByttonStyles = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 100,
  left: 'auto',
  position: 'fixed',
};
const floatingByttonStyles1 = {
  margin: 0,
  top: 'auto',
  right: 25,
  bottom: 40,
  left: 'auto',
  position: 'fixed',
};


const Dashboard = () => {
  const navigate = useNavigate();
  const userId = useContext(UserContext)
  console.log(userId);
  const [user,setUser]=useState(null)
  const [monthIncome,setMonthIncome]=useState(null)
  const [monthExpenses,setMonthExpenses]=useState(null)
  const [expenses,setExpenses]=useState(null)
  const [userExpensesData,setUserExpensesData]=useState([])
  const data02 = [
    { name: "A1", value: 100 },
    { name: "A2", value: 300 },
    { name: "B1", value: 100 },
    { name: "B2", value: 80 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;
  // First day of the month to make the api calls
  const fd = moment().startOf("month").format("YYYY-MM-DD");

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = outerRadius * 1.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${userExpensesData[index].name}${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/users/getUserById/${userId}`
      );
      setUser(data.user);
      console.log(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserIncome = async () => {
    try {
      const { data } = await axios.get(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/events/getDeposits/${userId}`
      );
      let sum = 0;
      data.events.map((x) => (sum = sum + x.amount));
      setMonthIncome(sum);
    } catch (error) {
      getUserIncome();
    }
  };
  const getUserExpenses = async () => {
    try {
      const { data } = await axios.get(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/events/getAllWithdraws/${userId}`
      );
      setExpenses(data);
      let sum = 0;
      data.events.map((x) => (sum = sum + x.amount));
      setMonthExpenses(sum);
    } catch (error) {
      getUserExpenses();
    }
  };
  const getUserExpensesData = async () => {
    try {
      const { data } = await axios.post(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/events/getExpensesByUserMonth/${userId}`,
        { startingDate: fd }
      );
      setUserExpensesData(data.events);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
    getUserIncome();
    getUserExpenses();
    getUserExpensesData();
  }, [userId]);

  return (
    <div className="dashboardWrapper">
      <DashboardNavbar />
      <div className="dashboard">
      <div className="dashboardMonth">
        <h3 style={{textAlign:"center",color:"#3F3D56", fontSize:"16px",display:"inline-block"}}>{moment().format(' ddd, MMMM Do ')}</h3>
        <img src={Filter} alt="" width="25" />
      </div>
      <div className="events_byMonth">
        <Box
          onClick={() => navigate("/s")}
          className="boxContainer"
          sx={{
            marginTop: "30px",
            width: 160,
            height: 80,
            border: "1px solid gray",
            borderRadius: "25px",
            padding: "5px 10px",
          }}
        >
          <img
            src={deposit}
            style={{ marginTop: "10px" }}
            width={50}
            height={50}
          ></img>
          <div className="boxContainer_text">
            <p style={{ display: "block", color: "green" }}>Income</p>
            <p>$ {monthIncome}</p>
          </div>
        </Box>
        <Box
          onClick={() => navigate("/sa")}
          className="boxContainer"
          sx={{
            marginTop: "30px",
            width: 160,
            height: 80,
            border: "1px solid gray",
            borderRadius: "25px",
            padding: "5px 10px",
          }}
        >
          <img
            src={withdraw}
            style={{ marginTop: "10px" }}
            width={50}
            height={50}
          ></img>
          <div className="boxContainer_text">
            <p style={{ display: "block", color: "red" }}>Outcome</p>
            <p>$ {monthExpenses}</p>
          </div>
        </Box>
      </div>
      <Link to="/abs" style={{marginTop:"20px",textAlign:"center"}}>Show Details</Link>
      <h3 style={{marginTop:"20px",fontSize:"20px",color:"#3F3D56"}}>Categories</h3>
      <PieChart width={400} height={300}>
      <Pie
          style={{margin: "0 auto"}}
          data={userExpensesData}
          cx={180}
          cy={150}
          innerRadius={65}
          outerRadius={90}
          fill="#8884d8"
          dataKey="amount"
          isAnimationActive={false}
          label={renderCustomizedLabel}
        >
          {data02.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
    </PieChart>
      <Fab size="small" color="primary" aria-label="add" style={floatingByttonStyles}>
        <AddIcon />
      </Fab>
      <Fab size="medium"  aria-label="add" style={floatingByttonStyles1} onClick={()=> navigate('/profile')}>
          <img src={Settings} style={{width:"80%"}} />
      </Fab>
    </div>
    </div>
  );
};

export default Dashboard;

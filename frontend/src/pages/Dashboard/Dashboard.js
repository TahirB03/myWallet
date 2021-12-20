import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../src/context/UserContext";
import { PieChart, Pie, Cell } from "recharts";
import moment from "moment";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Drawer from "@mui/material/Drawer";
import DashboardNavbar from "./DashboardNavbar";
import Modal from "react-modal";
import Sidebar from "../../components/Sidebar.js/Sidebar";
import NoExpenseChart from "./NoExpenseChart";

const floatingByttonStyles = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 100,
  left: "auto",
  position: "fixed",
  zIndex: "10",
};
const floatingByttonStyles1 = {
  margin: 0,
  top: "auto",
  right: 25,
  bottom: 40,
  left: "auto",
  position: "fixed",
  zIndex: "10",
};
const floatingByttonStyles2 = {
  margin: 0,
  top: "auto",
  right: 25,
  bottom: 180,
  left: "auto",
  position: "fixed",
  zIndex: "10",
};
const customStyles = {
  content: {
    width: "20px",
    height: "20px",
    border: "transparent",
    backgroundColor: "transparent",
  },
};

Modal.setAppElement("#root");

const Dashboard = () => {
  const navigate = useNavigate();
  const userCredentials = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [isDepositModal, setIsDepositModal] = useState(false);
  const [userIncome, setUserIncome] = useState(0);
  const [userExpenses, setUserExpenses] = useState(0);
  const [userExpensesData, setUserExpensesData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const [filteredTime, setFilteredTime] = useState("Month");
  const [dateFormat, setTimeFormat] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );

  const RADIAN = Math.PI / 180;
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
      <text
        x={x}
        y={y}
        fill={userExpensesData[index].color}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={"13px"}
      >
        {`${userExpensesData[index].name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  
  const getUserFiltered = async () => {
    try {
      const { data } = await axios.post(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/events/getEventByDate/${userCredentials?.user}`,
        { startingDate: dateFormat },{headers:{"Authorization":userCredentials?.token}}
      );
      setUserExpenses(0);
      setUserIncome(0);
      data.events.map((x) => {
        if (x.category.isDeposit === true) {
          setUserIncome((prevState) => prevState + x.amount);
        } else {
          setUserExpenses((prevState) => prevState + x.amount);
        }
        return null;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/users/getUserById/${userCredentials?.user}`,{headers:{"Authorization":userCredentials.token}}
      );
      setUser(data?.user);
      if (data.user.nrOfDeposits === 0 && data.user.nrOfWithdraws === 0) {
        setIsDepositModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUserExpensesData = async () => {
    try {
      const { data } = await axios.post(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/events/getExpensesByUserMonth/${userCredentials?.user}`,
        { startingDate: dateFormat },{headers:{"Authorization":userCredentials?.token}}
      );
      setUserExpensesData(data.events);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserFiltered();
    getUserExpensesData();
    getUser();
  }, [dateFormat]);

  return (
    <div className="dashboardWrapper">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="floatedButtons" style={floatingByttonStyles2}>
          <div
            className="createDeposit"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                display: "inline-block",
                color: "white",
                marginRight: "10px",
              }}
            >
              Add income
            </p>
            <Fab
              size="medium"
              aria-label="add"
              onClick={() => navigate(`/addIncome/${userCredentials?.user}`)}
              sx={{ background: "rgba(255,255,255,1)" }}
            >
              <img
                src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Up.png"
                alt="up arrow"
                style={{ width: "60%" }}
              />
            </Fab>
          </div>
          <div
            className="createWithdraw"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                display: "inline-block",
                color: "white",
                marginRight: "10px",
              }}
            >
              Add expense
            </p>
            <Fab
              size="medium"
              aria-label="add"
              onClick={() => navigate(`/addExspense/${userCredentials?.user}`)}
              sx={{
                background: "rgba(255,255,255,1)",
                opacity: "1 !important",
              }}
            >
              <img
                src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Down.png"
                alt="down arrow"
                style={{ width: "60%" }}
              />
            </Fab>
          </div>
        </div>
      </Modal>
      <DashboardNavbar userDetail={user} />
      <div className="dashboard">
        <div className="dashboardMonth">
          <h3
            style={{
              textAlign: "center",
              color: "#3F3D56",
              fontSize: "16px",
              display: "inline-block",
            }}
          >
            {moment().format(" ddd, MMMM Do ")}
          </h3>
          <img
            onClick={() => setSideBar(true)}
            src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Filter.png"
            alt="filter"
            width="25"
          />
          <Drawer
            anchor="right"
            open={sideBar}
            onClose={() => setSideBar(false)}
          >
            <Sidebar
              setTimeFormat={setTimeFormat}
              filteredTime={filteredTime}
              setFilteredTime={setFilteredTime}
              setSideBar={setSideBar}
            />
          </Drawer>
        </div>
        <div className="events_byMonth">
          <Box
            className="boxContainer"
            sx={{
              marginTop: "30px",
              width: 170,
              height: 70,
              border: "1px solid lightgray",
              borderRadius: "25px",
              padding: "0 0 0 5px",
            }}
          >
            <img
              src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/income.png"
              alt="income logo"
              style={{ marginTop: "10px" }}
              width={45}
              height={45}
            ></img>
            <div className="boxContainer_text">
              <p style={{ display: "block", color: "green" }}>Income</p>
              <p>
                {user?.currency} {userIncome.toFixed(1)}
              </p>
            </div>
          </Box>
          <Box
            className="boxContainer"
            sx={{
              marginTop: "30px",
              width: 170,
              height: 70,
              border: "1px solid lightgray",
              borderRadius: "25px",
              padding: "0 0 0 5px",
            }}
          >
            <img
              src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/outcome.png"
              alt="outcome logo"
              style={{ marginTop: "10px" }}
              width={50}
              height={50}
            ></img>
            <div className="boxContainer_text">
              <p style={{ display: "block", color: "red" }}>Outcome</p>
              <p>
                {user?.currency} {userExpenses.toFixed(1)}
              </p>
            </div>
          </Box>
        </div>
        <Link
          to="/transactions"
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          Show Details
        </Link>
        <h3 style={{ marginTop: "20px", fontSize: "20px", color: "#3F3D56" }}>
          Categories
        </h3>
        {user?.nrOfWithdraws === 0 && <NoExpenseChart />}
        <PieChart
          width={500}
          height={300}
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <Pie
            style={{ margin: "0 auto" }}
            data={userExpensesData}
            cx={200}
            cy={150}
            innerRadius={65}
            outerRadius={90}
            fill="#8884d8"
            dataKey="amount"
            isAnimationActive={false}
            label={renderCustomizedLabel}
            style={{ overflow: "visible", margin: "0 auto" }}
          >
            {userExpensesData.map((index) => (
              <Cell key={`cell-${index}`} fill={index.color} />
            ))}
          </Pie>
        </PieChart>
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          style={floatingByttonStyles}
        >
          {modalIsOpen && (
            <img
              src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Close.png"
              alt="close windows"
              width="20"
              onClick={() => setIsOpen(false)}
            />
          )}
          {modalIsOpen === false && <AddIcon onClick={() => setIsOpen(true)} />}
        </Fab>
        <Fab
          size="medium"
          aria-label="add"
          style={floatingByttonStyles1}
          onClick={() => navigate("/profile")}
        >
          <img
            alt="settings"
            src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Settings.png"
            style={{ width: "80%" }}
          />
        </Fab>
      </div>
    </div>
  );
};

export default Dashboard;

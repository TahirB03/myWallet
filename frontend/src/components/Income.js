import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const Income = () => {
  const [income, setIncome] = useState(0);
  const navigate = useNavigate();

  const getUserIncome = async () => {
    try {
      const { data } = await axios.get(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/events/getDeposits/fc099009-220e-44eb-9900-ead7e2e0613b`
      );
      let sum = 0;
      data.events.map((x) => (sum = sum + x.amount));
      setIncome(sum);
    } catch (error) {
      getUserIncome();
    }
  };
  useEffect(() => {
    getUserIncome();
  }, []);

  return (
    <div>
      {" "}
      <Box
        onClick={() => navigate("/s")}
        className="boxContainer"
        sx={{
          marginTop: "15px",
          width: 160,
          height: 70,
          border: "1px solid lightgray",
          borderRadius: "25px",
          padding: "0 0 0 5px",
        }}
      >
        <img
          src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/income.png"
          style={{ marginTop: "10px" }}
          width={45}
          height={45}
        ></img>
        <div className="boxContainer_text">
          <p style={{ display: "block", color: "green" }}>Income</p>
          <p>$ {income}</p>
        </div>
      </Box>
    </div>
  );
};

export default Income;

import { TextField, Typography } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./transactions.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

export const Transactions = () => {
  const url =
    "https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/events/getEventByDate/fc099009-220e-44eb-9900-ead7e2e0613b";
  const [eventValues, setEventValues] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.post(url, { startingDate: 2020 - 12 - 10 }).then((response) => {
      console.log(response);
      console.log(response.data.events);
      setEventValues(response.data.events);
      setLoading(true);
    });
  }, [url]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className="monthContainer">
      <Navbar />
      <Slider {...settings}>
        <button className="months">Jan</button>
        <button className="months">Fec</button>
        <button className="months">Mar</button>
        <button className="months">Apr</button>
        <button className="months">May</button>
        <button className="months">June</button>
        <button className="months">July</button>
        <button className="months">Aug</button>
        <button className="months">Sep</button>
        <button className="months">Oct</button>
        <button className="months">Nov</button>
        <button className="months">Dec</button>
      </Slider>

      <div className="stats">
        <Typography className="typo">Income</Typography>
        <Typography className="typo">Outcome</Typography>
      </div>
      <div className="arrows">
        <CompareArrowsIcon />
        Transactions
      </div>
      <div className="amount">
        {loading &&
          eventValues.map((value) => (
            <div className="amountChild" key={value._id}>
              {value.amount}$
            </div>
          ))}
      </div>
    </div>
  );
};

import { Typography } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import "./transactions.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Transactions = () => {
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
    </div>
  );
};

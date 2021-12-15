import React from "react";
import Button from "@mui/material/Button";

const RoundedButtons = ({  name , setTime, time, setSideBar}) => {
    const backgroundColor = name===time ? "#FD7941" : "transparent"
    const color = name===time ? "white" : "black"
    const handleClick = (e)=>{
        setTime(e.target.name)
        setSideBar(false)
    }
  return (
    <Button
      variant="contained"
      color={name === time ? "warning" : "inherit"}
    //   value={value}
      onClick={handleClick}
      sx={{
        borderRadius: "40px",
        height: "45px",
        marginBottom: "10px",
        backgroundColor: backgroundColor,
        border: "solid 1px #CCCCCC",
        color: {color},
        boxShadow: 'none'
      }}
    >{name}</Button>
  );
};

export default RoundedButtons;
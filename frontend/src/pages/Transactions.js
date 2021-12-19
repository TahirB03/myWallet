import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import "./transactions.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import moment from "moment";
import Box from "@mui/material/Box";
import { UserContext } from "../context/UserContext";

export const Transactions = () => {
  const userId = useContext(UserContext);
  const [eventValues, setEventValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState("December");
  const [incomeList, setIncomeList] = useState([]);
  const [outcomeList, setOutcomeList] = useState([]);
  const [user, setUser] = useState("");
  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/users/getUserById/${userId}`
      );
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/events/getEventByUser/${userId}`
        );
        setEventValues(res.data.events);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
    getUser();
  }, [userId]);

  let incomeSum = 0;
  let outcomeSum = 0;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
  };

  return (
    <div className="monthContainer">
      <Navbar symbol={user?.currency} />
      <Slider className="slider" {...settings}>
        <button className="months" onClick={() => setMonth("Januray")}>
          Jan
        </button>
        <button className="months" onClick={() => setMonth("February ")}>
          Fec
        </button>
        <button className="months" onClick={() => setMonth("March ")}>
          Mar
        </button>
        <button className="months" onClick={() => setMonth("April")}>
          Apr
        </button>
        <button className="months" onClick={() => setMonth("Januray")}>
          May
        </button>
        <button className="months" onClick={() => setMonth("June")}>
          June
        </button>
        <button className="months" onClick={() => setMonth("July")}>
          July
        </button>
        <button className="months" onClick={() => setMonth("August")}>
          Aug
        </button>
        <button className="months" onClick={() => setMonth("September")}>
          Sep
        </button>
        <button className="months" onClick={() => setMonth("October ")}>
          Oct
        </button>
        <button className="months" onClick={() => setMonth("November ")}>
          Nov
        </button>
        <button className="months" onClick={() => setMonth("December")}>
          Dec
        </button>
      </Slider>

      <div className="stats">
        <Box
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
          {eventValues?.map((event) => {
            if (event?.category?.isDeposit === true) {
              if (moment(event.createdAt).format("MMMM") === month) {
                incomeSum = incomeSum + event.amount;
              }
            } else {
              if (moment(event.createdAt).format("MMMM") === month) {
                outcomeSum = outcomeSum + event.amount;
              }
            }
            return null;
          })}
          <img
            src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/income.png"
            style={{ marginTop: "10px" }}
            width={45}
            height={45}
            alt="income"
          ></img>

          <div className="boxContainer_text">
            <p style={{ display: "block", color: "green" }}>Income</p>
            <p key={incomeList._id}>
              {user?.currency} {incomeSum.toFixed(1)}
            </p>
          </div>
        </Box>
        <Box
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
            src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/outcome.png"
            style={{ marginTop: "10px" }}
            width={45}
            height={45}
            alt="outcome"
          ></img>

          <div className="boxContainer_text">
            <p style={{ display: "block", color: "red" }}>Outcome</p>
            <p key={outcomeList._id}>
              {user?.currency} {outcomeSum.toFixed(1)}
            </p>
          </div>
        </Box>
      </div>

      <div className="arrows">
        <img
          src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Transactions.png"
          alt="transaction icon"
          className="transactionsArrows"
        />
        Transactions
      </div>
      <div className="amount">
        {loading &&
          eventValues.map((value) => {
            if (
              value.category.categoryName === "Gift" &&
              value.category.isDeposit !== true &&
              moment(value.createdAt).format("MMMM") === month
            ) {
              return (
                <div className="transactionsContainer" key={value._id}>
                  <img
                    src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/gift.png"
                    className="categoryLogo"
                    alt="transaction icon"
                  />
                  <div className="amountChildExpense">
                    <h3 className="categoryName">
                      {" "}
                      {value.category.categoryName}
                    </h3>
                    <h4>
                      -{value.amount}
                      {user?.currency}
                    </h4>
                  </div>
                  <h5>{moment(value.createdAt).format(" DD MMM")}</h5>
                </div>
              );
            } else if (
              value.category.categoryName === "Clothing" &&
              value.category.isDeposit !== true &&
              moment(value.createdAt).format("MMMM") === month
            ) {
              return (
                <div className="transactionsContainer" key={value._id}>
                  <img
                    src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/clothes.png"
                    className="categoryLogo"
                    alt="transaction icon"
                  />
                  <div className="amountChildExpense">
                    <h3 className="categoryName">
                      {" "}
                      {value.category.categoryName}
                    </h3>
                    <h4>
                      -{value.amount}
                      {user?.currency}
                    </h4>
                  </div>
                  <h5>{moment(value.createdAt).format(" DD MMM")}</h5>
                </div>
              );
            } else if (
              value.category.categoryName === "Communcation" &&
              value.category.isDeposit !== true &&
              moment(value.createdAt).format("MMMM") === month
            ) {
              return (
                <div className="transactionsContainer" key={value._id}>
                  <img
                    src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/communication.png"
                    className="categoryLogo"
                    alt="transaction icon"
                  />
                  <div className="amountChildExpense">
                    <h3 className="categoryName">
                      {" "}
                      {value.category.categoryName}
                    </h3>
                    <h4>
                      -{value.amount}
                      {user?.currency}
                    </h4>
                  </div>
                  <h5>{moment(value.createdAt).format(" DD MMM")}</h5>
                </div>
              );
            } else if (
              value.category.categoryName === "Healthcare" &&
              value.category.isDeposit !== true &&
              moment(value.createdAt).format("MMMM") === month
            ) {
              return (
                <div className="transactionsContainer" key={value._id}>
                  <img
                    src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/health.png"
                    className="categoryLogo"
                    alt="transaction icon"
                  />
                  <div className="amountChildExpense">
                    <h3 className="categoryName">
                      {" "}
                      {value.category.categoryName}
                    </h3>
                    <h4>
                      -{value.amount}
                      {user?.currency}
                    </h4>
                  </div>
                  <h5>{moment(value.createdAt).format(" DD MMM")}</h5>
                </div>
              );
            } else if (
              value.category.categoryName === "Entertainment" &&
              value.category.isDeposit !== true &&
              moment(value.createdAt).format("MMMM") === month
            ) {
              return (
                <div className="transactionsContainer" key={value._id}>
                  <img
                    src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/entertainment.png"
                    className="categoryLogo"
                    alt="transaction icon"
                  />
                  <div className="amountChildExpense">
                    <h3 className="categoryName">
                      {" "}
                      {value.category.categoryName}
                    </h3>
                    <h4>
                      -{value.amount}
                      {user?.currency}
                    </h4>
                  </div>
                  <h5> {moment(value.createdAt).format(" DD MMM")}</h5>
                </div>
              );
            } else if (
              value.category.categoryName === "Transportation" &&
              value.category.isDeposit !== true &&
              moment(value.createdAt).format("MMMM") === month
            ) {
              return (
                <div className="transactionsContainer" key={value._id}>
                  <img
                    src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/transport.png"
                    className="categoryLogo"
                    alt="transaction icon"
                  />
                  <div className="amountChildExpense">
                    <h3 className="categoryName">
                      {" "}
                      {value.category.categoryName}
                    </h3>
                    <h4>
                      -{value.amount}
                      {user?.currency}
                    </h4>
                  </div>
                  <h5>{moment(value.createdAt).format(" DD MMM")}</h5>
                </div>
              );
            } else if (
              value.category.categoryName === "Other" &&
              value.category.isDeposit !== true &&
              moment(value.createdAt).format("MMMM") === month
            ) {
              return (
                <div className="transactionsContainer" key={value._id}>
                  <img
                    src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Other Deposits.png"
                    className="categoryLogo"
                    alt="transaction icon"
                  />
                  <div className="amountChildExpense">
                    <h3 className="categoryName">
                      {" "}
                      {value.category.categoryName}
                    </h3>
                    <h4>
                      -{value.amount}
                      {user?.currency}
                    </h4>
                  </div>
                  <h5>{moment(value.createdAt).format(" DD MMM")}</h5>
                </div>
              );
            } else if (
              value.category.categoryName === "Food" &&
              value.category.isDeposit !== true &&
              moment(value.createdAt).format("MMMM") === month
            ) {
              return (
                <div className="transactionsContainer" key={value._id}>
                  <img
                    src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/food.png"
                    className="categoryLogo"
                    alt="transaction icon"
                  />
                  <div className="amountChildExpense">
                    <h3 className="categoryName">
                      {" "}
                      {value.category.categoryName}
                    </h3>
                    <h4>
                      -{value.amount}
                      {user?.currency}
                    </h4>
                  </div>
                  <h5>{moment(value.createdAt).format(" DD MMM")}</h5>
                </div>
              );
            } else if (
              value.category.categoryName === "Sport" &&
              value.category.isDeposit !== true &&
              moment(value.createdAt).format("MMMM") === month
            ) {
              return (
                <div className="transactionsContainer" key={value._id}>
                  <img
                    src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/sport.png"
                    className="categoryLogo"
                    alt="transaction icon"
                  />
                  <div className="amountChildExpense">
                    <h3 className="categoryName">
                      {" "}
                      {value.category.categoryName}
                    </h3>
                    <h4>
                      -{value.amount}
                      {user?.currency}
                    </h4>
                  </div>
                  <h5>{moment(value.createdAt).format(" DD MMM")}</h5>
                </div>
              );
            } else if (
              value.category.categoryName === "Salary" &&
              value.category.isDeposit === true &&
              moment(value.createdAt).format("MMMM") === month
            ) {
              return (
                <div className="transactionsContainer" key={value._id}>
                  <img
                    src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Salary.png"
                    className="categoryLogo"
                    alt="transaction icon"
                  />
                  <div className="amountChildIncome">
                    <h3 className="categoryName">
                      {" "}
                      {value.category.categoryName}
                    </h3>
                    <h4 className="valueAmount">
                      +{value.amount}
                      {user?.currency}
                    </h4>
                  </div>
                  <h5>{moment(value.createdAt).format(" DD MMM")}</h5>
                </div>
              );
            } else if (
              value.category.categoryName === "Savings" &&
              value.category.isDeposit === true &&
              moment(value.createdAt).format("MMMM") === month
            ) {
              return (
                <div className="transactionsContainer" key={value._id}>
                  <img
                    src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Savings.png"
                    className="categoryLogo"
                    alt="transaction icon"
                  />
                  <div className="amountChildIncome">
                    <h3 className="categoryName">
                      {" "}
                      {value.category.categoryName}
                    </h3>
                    <h4 className="valueAmount">
                      +{value.amount}
                      {user?.currency}
                    </h4>
                  </div>
                  <h5>{moment(value.createdAt).format(" DD MMM")}</h5>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

import "./Sidebar.css";
import RoundedButtons from "../RoundedButtons";
import moment from "moment";

const Sidebar = ({
  setSideBar,
  filteredTime,
  setFilteredTime,
  setTimeFormat,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar_label">
        <p
          style={{
            display: "inline-block",
            fontWeight: "600",
            fontSize: "18px",
          }}
        >
          Filter
        </p>
        <div
          className="roundedClose"
          style={{ display: "flex", justifyContent: "center" }}
          onClick={() => setSideBar(false)}
        >
          <img
            src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Close.png"
            alt=""
            width="60%"
            style={{ margin: "auto 0" }}
          />
        </div>
      </div>
      <RoundedButtons
        name="Day"
        setTime={setFilteredTime}
        time={filteredTime}
        setSideBar={setSideBar}
        value={moment().startOf("day").format("YYYY-MM-DD")}
        setTimeFormat={setTimeFormat}
      />
      <RoundedButtons
        name="Week"
        setTime={setFilteredTime}
        time={filteredTime}
        setSideBar={setSideBar}
        value={moment().startOf("week").format("YYYY-MM-DD")}
        setTimeFormat={setTimeFormat}
      />
      <RoundedButtons
        name="Month"
        setTime={setFilteredTime}
        time={filteredTime}
        setSideBar={setSideBar}
        value={moment().startOf("month").format("YYYY-MM-DD")}
        setTimeFormat={setTimeFormat}
      />
      <RoundedButtons
        name="Year"
        setTime={setFilteredTime}
        time={filteredTime}
        setSideBar={setSideBar}
        value={moment().startOf("year").format("YYYY-MM-DD")}
        setTimeFormat={setTimeFormat}
      />
      <RoundedButtons
        name="Costum date"
        setTime={setFilteredTime}
        time={filteredTime}
        setSideBar={setSideBar}
        disabled={true}
      />
    </div>
  );
};

export default Sidebar;

import React, { Component, useState } from "react";
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Tooltip,
} from "@material-ui/core";
// import TableCard from "./TableCard";

const StatCards = (props) => {
  const [PACount, setPACount] = useState(0)
  const [PATodayCount, setPATodayCount] = useState(0)
  const callBackTotalCount = (val) => {
    setPACount(val)
  }

  return (
    // background: #98b4ec;
    // border: 2px solid #3f63ab;

    // <Grid container spacing={2} justifyContent="center" className="mt-2">
    //   <Grid item xs={12}>
    //     <Grid container spacing={2} justifyContent="center">
    //       <Grid item md={4} sm={6} xs={12}>
    <div className="tilebox-one correspondence" style={{ padding: '15px', height: '100%', border: `2px solid ${props.bgColor}`, background: `${props.bgColor}`, }}>
      <div className="graph">
        <h5 className="text-uppercase mt-0">{props.cardText}</h5>
        {/* <div className="radius">
          <span>Today</span>
          <span className="number" data-plugin="counterup">123</span>
        </div> */}
      </div>
      <div className="background">
        <div className="box">
          {/* <i className="fa fa-files-o" ></i> */}
          <h6 data-plugin="counterup" className="label-white">{props.cardData}</h6>
        </div>
      </div>
    </div>
    // </Grid>
    /* <Grid item md={4} sm={6} xs={12}>
      <div className="tilebox-one files" style={{ padding: '0px 0px 15px 15px' }}>
        <div className="graph">
          <h5 className="text-uppercase mt-0">My Personal Application</h5>
          <div className="radius">
            <span>Today</span>
            <span className="number" data-plugin="counterup">{PATodayCount}</span>
          </div>
        </div>
        <div className="background">
          <div className="box">
            <i className="fa fa-files-o"></i>

            <h6 data-plugin="counterup" className="label-white">{PACount}</h6>
          </div>
        </div>
      </div>
    </Grid> */
    // </Grid>
    // </Grid>
    /* <Grid item xl={8} md={8} className="widget" style={{ marginBottom: '26px' }}>
          <TableCard totalCountPA={callBackTotalCount} />
        </Grid> */
    // </Grid>
  );
};

export default StatCards;

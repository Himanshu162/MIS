import React, { Fragment } from "react";
import {Icon, Tooltip} from "@material-ui/core";
import { NavLink } from "react-router-dom";

const Breadcrumb = ({ routeSegments }) => {
  return (
    <div className="flex flex-middle position-relative">
        <Icon className="text-middle ml-8 mb-1" color="primary">
            <Tooltip title="Home" aria-label="Home"><Icon style={{fontSize : '20px', marginTop: '-7px', height: '25px'}}><img className="brdIcon" src={process.env.PUBLIC_URL+`/assets/icons/pie-chart-2-fill.png`} alt="Home" /></Icon></Tooltip>
        </Icon>
      {routeSegments ? (
        <Fragment>
          <h4 style={{fontSize:'12px'}} className="m-0 pb-2 font-size-16 capitalize text-middle brdCrum">
            {routeSegments[routeSegments.length - 1]["name"]}
          </h4>
        </Fragment>
      ) : null}
    </div>
  );
};

export default Breadcrumb;

import React from "react";

function Col(props) {
  const { text, mb, mt, styled, col, md, lg, mxOff } = props;

  return (
    <div
      style={styled}
      className={` ${mxOff ? null : " mx-auto"}
      col-${col ? col : "12"}
      ${md && ` col-md-${md}`}
      ${lg && ` col-lg-${lg}`}
        mb-${mb ? mb : "auto"}
        mt-${mt ? mt : "auto"}
        text-${text ? text : "center"}`}
    >
      {props.children}
    </div>
  );
}

export default Col;

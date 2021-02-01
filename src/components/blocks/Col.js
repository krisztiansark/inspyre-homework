import React from "react";

function Col(props) {
  const { text, mb, mt, styled, col, md, lg, mxOff, textSm, my } = props;

  return (
    <div
      style={styled}
      data-testid="col-component"
      className={` ${mxOff ? null : " mx-auto"} 
      col-${col ? col : "12"}
      ${md && ` col-md-${md}`}
      ${lg && ` col-lg-${lg}`}
        mb-${mb ? mb : "auto"}
        mt-${mt ? mt : "auto"}
        text-md-${text ? text : "center"}
        text-sm-${textSm ? textSm : "center"}
      ${my ? "my-auto" : "null"}

        `}
    >
      {props.children}
    </div>
  );
}

export default Col;

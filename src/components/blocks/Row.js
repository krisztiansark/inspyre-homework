import React from "react";

function Row(props) {
  const { justify, mb, mt, styled, w } = props;

  return (
    <div
      style={styled}
      className={`row mx-auto  text-center
        mb-${mb ? mb : "auto"}
        mt-${mt ? mt : "auto"}
        justify-content-${justify ? justify : "center"} 
        w-${w ? w : "100"}`}
    >
      {props.children}
    </div>
  );
}

export default Row;

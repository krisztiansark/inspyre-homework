import React from "react";

function Label(props) {
  const { htmlFor, justify, mb, mt, styled } = props;

  return (
    <label
      style={styled}
      className={`row mx-auto w-100 text-center
        mb-${mb ? mb : "auto"}
        mt-${mt ? mt : "auto"}
        justify-content-${justify ? justify : "center"}`}
      htmlFor={htmlFor}
    >
      {props.children}
    </label>
  );
}

export default Label;

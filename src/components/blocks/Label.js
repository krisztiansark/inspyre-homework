import React from "react";
import PropTypes from "prop-types";
function Label(props) {
  const { htmlFor, justify, mb, mt, styled } = props;

  return (
    <label
      style={styled}
      data-testid="label-component"
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
Label.propTypes = {
  justify: PropTypes.string,
  htmlFor: PropTypes.string,
  mt: PropTypes.string,
  styled: PropTypes.object,
  mb: PropTypes.string,
};

export default Label;

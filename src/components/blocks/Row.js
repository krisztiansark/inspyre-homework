import React from "react";
import PropTypes from "prop-types";
function Row(props) {
  const { justify, mb, mt, styled, w } = props;

  return (
    <div
      style={styled}
      data-testid="row-component"
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
Row.propTypes = {
  justify: PropTypes.string,
  mb: PropTypes.string,
  mt: PropTypes.string,
  styled: PropTypes.object,
  w: PropTypes.string,
};

export default Row;

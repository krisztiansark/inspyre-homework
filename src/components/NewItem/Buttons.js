import React from "react";
import { ButtonDiv, ButtonRow } from "./NewItemStyle";
import Row from "../blocks/Row";
import { COLORS } from "../../utils/styleConstants";
import { Button } from "../../utils/globalStyles";
import PropTypes from "prop-types";
function Buttons({
  activeStep,
  handleBack,
  handleReset,
  isInvalid,
  isInvalidEach,
  handleNext,
  steps,
}) {
  return (
    <>
      <Row
        mt="4"
        mb="1"
        styled={{
          borderTop: `3px solid ${COLORS.border}`,
        }}
      >
        <ButtonRow className="row mx-auto w-100 ">
          {activeStep === steps - 1 ? (
            <>
              <ButtonDiv className="col-6 col-md-3 mx-auto text-center">
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
              </ButtonDiv>
              <ButtonDiv className="col-6 col-md-3 text-center mx-auto">
                <Button
                  danger
                  className="mx-3 text-center"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </ButtonDiv>
              <ButtonDiv className="col-6 col-md-3 text-center mx-auto">
                <Button type="submit" className="mx-3 " disabled={isInvalid}>
                  Submit
                </Button>
              </ButtonDiv>
            </>
          ) : (
            <>
              <ButtonDiv className="col-6 col-md-3 mx-auto text-center">
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
              </ButtonDiv>
              <ButtonDiv className="col-6 col-md-3 mx-auto text-center">
                <Button
                  disabled={isInvalidEach[activeStep]}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </ButtonDiv>
            </>
          )}
        </ButtonRow>
      </Row>
    </>
  );
}
Buttons.propTypes = {
  activeStep: PropTypes.number,
  handleBack: PropTypes.func,
  handleReset: PropTypes.func,
  isInvalid: PropTypes.bool,
  isInvalidEach: PropTypes.array,
  handleNext: PropTypes.func,
  steps: PropTypes.number,
};
export default Buttons;

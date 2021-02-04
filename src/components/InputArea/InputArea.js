import React from "react";
import { Textarea, Input, P } from "../../utils/globalStyles";
import Row from "../blocks/Row";
import Col from "../blocks/Col";
import Label from "../blocks/Label";
import PropTypes from "prop-types";
function InputArea({
  name = "",
  description = "",
  onChange,
  placeholderName = "",
  placeholderDesc = "",
  labelName = "",
  labelDesc = "",
  mt = "auto",
}) {
  return (
    <>
      <Row mt={mt}>
        <Label htmlFor="name">{labelName}</Label>
        <Row>
          <Col mb="4">
            <Input
              data-testid="name-input"
              type="text"
              name="name"
              placeholder={placeholderName}
              value={name}
              onChange={onChange}
            />
          </Col>
        </Row>
      </Row>
      <Label htmlFor="description">{labelDesc}</Label>
      <Row mb="3" mt="2">
        <Col col="11" md="10">
          <Textarea
            data-testid="description-input"
            type="text"
            name="description"
            onChange={onChange}
            value={description}
            placeholder={placeholderDesc}
          />
        </Col>
        <P>Used {description.length} characters out of 150.</P>
      </Row>
    </>
  );
}
InputArea.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func,
  placeholderName: PropTypes.string,
  placeholderDesc: PropTypes.string,
  labelName: PropTypes.string,
  labelDesc: PropTypes.string,
  mt: PropTypes.string,
};
export default InputArea;

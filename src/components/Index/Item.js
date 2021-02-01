import React, { useState } from "react";

import { Button, H2, H1, H3, RouterLink } from "../../utils/globalStyles";
import {
  ContainerItem,
  DueSignal,
  DeleteDiv,
  ConfirmationDiv,
  Content,
} from "./ItemStyle";
import Row from "../blocks/Row";
import Col from "../blocks/Col";
import GetItemHook from "../../hooks/getItemHook";
import DeleteHook from "../../hooks/deleteHook";
import { COLORS } from "../../utils/styleConstants";

import Error from "../Error/Error";
function Item(props) {
  const { name, id } = props.item;
  const { odd } = props;
  const [item] = GetItemHook(id);
  const [isLoadingDelete, isErrorDelete, deleteApi] = DeleteHook(id);

  const [deleted, setDeleted] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  function handleConfirm() {
    setConfirm(!confirm);
  }
  function handleDelete() {
    deleteApi(id);
    setDeleted(true);
  }

  return (
    <>
      <Error open={isErrorDelete} background={COLORS.danger} />

      {deleted ? null : (
        <Col deleted={deleted} mt="3" md="6">
          <ContainerItem
            deleted={deleted}
            odd={odd}
            className="row mx-auto w-100 justify-content-center mx-auto mb-3 pb-2 pt-2 mt-3"
          >
            <ConfirmationDiv confirm={confirm}>
              <Col>
                <H2>Wanna remove item from the list?</H2>
                <Button danger className="m-3" onClick={handleDelete}>
                  Yes
                </Button>
                <Button className="m-3" onClick={handleConfirm}>
                  Keep
                </Button>
              </Col>
            </ConfirmationDiv>

            <Content confirm={confirm}>
              <Row>
                <Col col="12" md="6" textSm="center" text="left">
                  <H1>{name}</H1>
                </Col>

                <Col col="12" md="6" text="right">
                  <H3 anim>
                    <DueSignal due={item.dueDate < today}>➔</DueSignal>
                    {item.dueDate}
                  </H3>
                </Col>
              </Row>
              <Row w="100" mt="4" justify="around">
                <DeleteDiv>
                  <RouterLink to={`/item-details/${id}`}>
                    <Button onClick={handleConfirm}>Check Details</Button>
                  </RouterLink>
                </DeleteDiv>
                <DeleteDiv>
                  <Button danger onClick={handleConfirm}>
                    Remove Item
                  </Button>
                </DeleteDiv>
              </Row>
            </Content>
          </ContainerItem>
        </Col>
      )}
    </>
  );
}

export default Item;

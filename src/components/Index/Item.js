import React, { useState, useEffect } from "react";
import { deleteItem, getItem } from "../../utils/apiUtils";
import { Button, H2, H4, RouterLink } from "../../utils/globalStyles";
import {
  ContainerItem,
  DueSignal,
  DeleteDiv,
  ConfirmationDiv,
  Content,
} from "./ItemStyle";
import Row from "../blocks/Row";
import Col from "../blocks/Col";

function Item(props) {
  const { name, id } = props.item;
  const { odd } = props;

  const [item, setItem] = useState("");
  const [deleted, setDeleted] = useState(false);

  const [confirm, setConfirm] = useState(false);
  // CLICK OPENS PRODUCT PAGE ROUTE

  // DELETE ITEM WITH MODAL

  // OVERDUE ITEM NOTIFICATION

  const today = new Date().toISOString().slice(0, 10);

  function handleConfirm() {
    setConfirm(!confirm);
  }
  function handleDelete() {
    deleteItem(id);
    setDeleted(true);
  }

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      let fetch = async () => {
        let result = await getItem(id);

        return setItem(result);
      };
      fetch();
    }

    return () => {
      unmounted = true;
    };
  }, [id]);

  return (
    <>
      <ContainerItem
        odd={odd}
        deleted={deleted}
        className="row mx-auto w-100 justify-content-center mx-auto mb-3 pb-2 pt-2 mt-3"
      >
        <ConfirmationDiv
          confirm={confirm}
          // className="row mx-auto w-100 justify-content-center"
        >
          <Col mt="2">
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
            <Col col="6" text="left">
              <H2>{name}</H2>
            </Col>
            {/* <h2>Id : {id}</h2> */}
            <Col col="6" text="right">
              <H4>
                <DueSignal due={item.dueDate < today}>➔</DueSignal>
                🛒 {item.dueDate}
              </H4>
            </Col>
          </Row>
          {/* </RouterLink> */}
          <Row w="75" mt="4" justify="around">
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
    </>
  );
}

export default Item;

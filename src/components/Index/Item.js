import React, { useState, useEffect } from "react";
import { deleteItem, getItem } from "../../utils/apiUtils";
import { Button, H2, H4, RouterLink } from "../../utils/globalStyles";
import {
  ContainerItem,
  DueSignal,
  TitleDiv,
  DueDiv,
  DeleteDiv,
  ConfirmationDiv,
  Content,
} from "./ItemStyle";

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
    let fetch = async () => {
      let result = await getItem(id);

      return setItem(result);
    };
    fetch();

    return () => {};
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
          className="row mx-auto w-100 justify-content-center"
        >
          <div className="col-12 mt-2 mx-auto ">
            <H2>Wanna remove item from the list?</H2>
            <Button danger className="m-3" onClick={handleDelete}>
              Yes
            </Button>
            <Button className="m-3" onClick={handleConfirm}>
              Keep
            </Button>
          </div>
        </ConfirmationDiv>

        <Content confirm={confirm}>
          {/* <RouterLink to={`/item-details/${id}`}> */}
          <div className="row mx-auto  w-100 p-2 justify-content-around">
            <TitleDiv className="col-6 text-left">
              <H2>🛒 {name} </H2>
            </TitleDiv>
            {/* <h2>Id : {id}</h2> */}
            <DueDiv className="col-6  my-auto text-right">
              <H4>
                <DueSignal due={item.dueDate < today}>➔</DueSignal>{" "}
                {item.dueDate}
              </H4>
            </DueDiv>
          </div>
          {/* </RouterLink> */}
          <div className="row mx-auto w-75 justify-content-around">
            <DeleteDiv className="mt-2">
              <RouterLink to={`/item-details/${id}`}>
                <Button className="mx-auto text-center" onClick={handleConfirm}>
                  Check Details
                </Button>
              </RouterLink>
            </DeleteDiv>
            <DeleteDiv className="mt-2">
              <Button
                className="mx-auto text-center"
                danger
                onClick={handleConfirm}
              >
                Remove Item
              </Button>
            </DeleteDiv>
          </div>
        </Content>
      </ContainerItem>
    </>
  );
}

export default Item;

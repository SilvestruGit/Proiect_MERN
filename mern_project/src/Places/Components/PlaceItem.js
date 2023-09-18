import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/FormElements/Button";
import Modal from "../../Shared/Components/UIElements/Modal";
import Map from "../../Shared/Components/UIElements/Map";
import LoginContext from "../../Shared/Components/Context/login-context";
import useHttpClient from "../../Shared/Components/Hooks/http-hook";

import "./PlaceItem.css";

const PlaceItem = (props) => {
  const auth = useContext(LoginContext);
  const placeCreatorId = useParams().userId;

  const { sendRequest } = useHttpClient();

  const [showMap, setShowMap] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const openMap = () => {
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
  };

  const deleteHandler = () => {
    setConfirmDelete(true);
  };

  const cancelDeleteHandler = () => {
    setConfirmDelete(false);
  };

  const confirmDeleteHandler = async () => {
    // console.log('Deleting...');

    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (error) {
      console.log("error deleting");
    }

    setConfirmDelete(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onClick={closeMap}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map coordinates={props.coordinates} zoom={16} />
        </div>
      </Modal>
      {confirmDelete && (
        <Modal
          show={confirmDelete}
          onClick={cancelDeleteHandler}
          header="Are you sure?"
          footerClass="place-item__modal-actions"
          footer={
            <React.Fragment>
              <Button inverse onClick={cancelDeleteHandler}>
                CANCEL
              </Button>
              <Button danger onClick={confirmDeleteHandler}>
                DELETE
              </Button>
            </React.Fragment>
          }
        >
          Once you delete it can't be undone!
        </Modal>
      )}
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>
              View On Map
            </Button>
            {auth.userId === placeCreatorId && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}
            {auth.userId === placeCreatorId && (
              <Button danger onClick={deleteHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;

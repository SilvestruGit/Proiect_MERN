import React from "react";
import Card from "../../Shared/Components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../Shared/Components/FormElements/Button";

import "./PlacesList.css";

const PlaceList = (props) => {
  if (props.items === null || props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((item) => (
        <PlaceItem
          key={item._id}
          id={item._id}
          image={item.image}
          title={item.title}
          description={item.description}
          address={item.address}
          creatorId={item.creatorId}
          coordinates={item.coordinates}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
  );
};

export default PlaceList;

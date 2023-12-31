import React, { useEffect } from "react";
import Avatar from "../../Shared/Components/UIElements/Avatar";
import { Link } from "react-router-dom";
import Card from "../../Shared/Components/UIElements/Card";
import AuthContext from "../../Shared/Components/Hooks/http-hook";
import useHttpClient from "../../Shared/Components/Hooks/http-hook";

import "./UserItem.css";

const UserItem = (props) => {

  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.username} />
          </div>
          <div className="user-item__info">
            <h2>{props.username}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;

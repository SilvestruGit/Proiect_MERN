import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../Shared/Components/FormElements/Input";
import { VALIDATOR_MINLENGTH } from "../../Shared/Components/Util/validators";
import { VALIDATOR_REQUIRE } from "../../Shared/Components/Util/validators";
import Button from "../../Shared/Components/FormElements/Button";
import useForm from "../../Shared/Components/Hooks/form-hook";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import Card from "../../Shared/Components/UIElements/Card";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import useHttpClient from "../../Shared/Components/Hooks/http-hook";
import AuthContext from "../../Shared/Components/Context/login-context";

import "./PlaceForm.css";

const UpdatePlace = () => {
  const { isLoading, sendRequest, errorState, errorHandler } = useHttpClient();
  const [placeToUpdate, setPlaceToUpdate] = useState();
  const auth = useContext(AuthContext);

  const { placeId } = useParams();
  const navigate = useNavigate();

  const initialInputs = {
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
  };

  const [formState, inputHandler, setFormData] = useForm(initialInputs, false);

  // const placeToUpdate = DUMMY_PLACES.find((place) => place.id === placeId

  useEffect(() => {
    const getPlaceToUpdate = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setPlaceToUpdate(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    getPlaceToUpdate();
  }, [placeId, sendRequest, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log(formState);

    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      navigate(`/${auth.userId}/places`);
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!placeToUpdate) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place to update!</h2>
        </Card>
      </div>
    );
  }

  // console.log(placeToUpdate);
  return (
    <React.Fragment>
      <ErrorModal error={errorState} onClear={errorHandler} />
      {!isLoading && placeToUpdate && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            initialValue={placeToUpdate.title}
            initialIsValid={true}
            errorText="Please enter a valid title!"
          />
          <Input
            id="description"
            element="textarea"
            type="text"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            initialValue={placeToUpdate.description}
            initialIsValid={true}
            errorText="Please enter a valid description! (min 5 characters)"
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;

// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Empire State Building",
//     description: "One of the most famous sky scrapers in the world!",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
//     address: "20 W 34th St, New York, NY 10001",
//     coordinates: {
//       lat: 40.7484405,
//       lng: -73.9878584,
//     },
//     creatorId: 1,
//   },
//   {
//     id: "p2",
//     title: "Empire State Building",
//     description: "One of the most famous sky scrapers in the world!",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
//     address: "20 W 34th St, New York, NY 10001",
//     coordinates: {
//       lat: 40.7484405,
//       lng: -73.9878584,
//     },
//     creatorId: 2,
//   },
// ];

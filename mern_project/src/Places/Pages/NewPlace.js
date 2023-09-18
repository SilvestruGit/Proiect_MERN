import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Shared/Components/FormElements/Input";
import { VALIDATOR_MINLENGTH } from "../../Shared/Components/Util/validators";
import { VALIDATOR_REQUIRE } from "../../Shared/Components/Util/validators";
import Button from "../../Shared/Components/FormElements/Button";
import useForm from "../../Shared/Components/Hooks/form-hook";
import useHttpClient from "../../Shared/Components/Hooks/http-hook";
import AuthContext from "../../Shared/Components/Context/login-context";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";

import "./PlaceForm.css";

const NewPlace = () => {
  const initialInputs = {
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    address: {
      value: "",
      isValid: false,
    },
  };

  const initialIsValid = false;

  const [formState, inputHandler] = useForm(initialInputs, initialIsValid);
  const navigate = useNavigate();

  const { sendRequest, isLoading, errorState, errorHandler } = useHttpClient();
  const auth = useContext(AuthContext);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/places/",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creatorId: auth.userId,
        }),
        {
            "Content-Type": "application/json",
        }
      );
      navigate(`/${auth.userId}/places`);
    } catch (error) {}
  };

  return (
    <React.Fragment>
        {errorState && <ErrorModal error={errorState} onClear={errorHandler}/>}
      <form className="place-form" onSubmit={submitFormHandler}>
        {isLoading && <LoadingSpinner asOverlay={true}/>}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please enter a valid title!"
        />
        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText="Please enter a valid description! (min 5 characters)"
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please enter a valid address!"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;

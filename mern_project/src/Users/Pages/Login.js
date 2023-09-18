import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../Shared/Components/Util/validators";
import useForm from "../../Shared/Components/Hooks/form-hook";
import Card from "../../Shared/Components/UIElements/Card";
import AuthContext from "../../Shared/Components/Context/login-context";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import useHttpClient from "../../Shared/Components/Hooks/http-hook";

import "./Login.css";

const Login = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, errorState, sendRequest, errorHandler } = useHttpClient();
  const navigate = useNavigate();

  const initialInputs = {
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  };

  const [formState, inputHandler, setFormData] = useForm(initialInputs, false);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.loggedinUser._id);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        console.log(responseData);
        auth.login(responseData.newUser._id);
        navigate("/");
      } catch (error) {
        console.log('Unable to signup');
      }
    }
  };

  const isLoginModeHandler = () => {
    let newInputs = {};
    let formIsValid = false;

    if (!isLoginMode) {
      // console.log('undef');
      newInputs = {
        ...formState.inputs,
        username: undefined,
      };
      formIsValid =
        formState.inputs.password.isValid && formState.inputs.email.isValid;
    } else {
      // console.log('def');
      newInputs = {
        ...formState.inputs,
        username: {
          value: "",
          isValid: false,
        },
      };
      formIsValid = false;
      // console.log(formIsValid);
    }

    setFormData(newInputs, formIsValid);
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <React.Fragment>
      {errorState && <ErrorModal error={errorState} onClear={errorHandler} />}
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <Card className="authentication">
        <h2>{isLoginMode ? "Welcome Back!" : "Create New Account!"}</h2>
        <hr />
        <form className="place-form" onSubmit={submitFormHandler}>
          {!isLoginMode && (
            <Input
              id="username"
              title="Username"
              element="input"
              label="Username"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Please enter a valid username! (min 5 characters)"
            />
          )}
          <Input
            id="email"
            title="Email"
            element="input"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
            errorText="Please enter a valid email address!"
          />
          <Input
            id="password"
            title="Password"
            type="password"
            // element='input'
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            errorText="The password is not long enough!"
          />
          <Button
            type="submit"
            // onClick={auth.login}
            disabled={!formState.isValid}
          >
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={isLoginModeHandler}>
          {isLoginMode ? "SWITCH TO SIGNUP" : "SWITCH TO LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Login;

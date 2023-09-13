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

import "./Login.css";

const Login = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setError] = useState();
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
    setIsLoading(true);

    if (isLoginMode) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();

        if (response.ok) {
          setIsLoading(false);
          auth.login();
          navigate("/");
        } else {
          throw new Error(responseData.message);
        }
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();

        if (response.ok) {
          setIsLoading(false);
          auth.login();
          navigate("/"); // redirect to home after succesful signup
        } else {
          // alert(responseData.message);
          throw new Error(responseData.message);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(error.message);
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

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {<ErrorModal error={errorState} onClear={errorHandler} />}
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

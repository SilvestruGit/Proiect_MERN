import React, { useState, useContext } from "react";
import {Link} from 'react-router-dom';
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL
} from "../../Shared/Components/Util/validators";
import useForm from "../../Shared/Components/Hooks/form-hook";
import Card from "../../Shared/Components/UIElements/Card";
import AuthContext from '../../Shared/Components/Context/login-context';

import "./Login.css";

const Login = () => {
    const auth = useContext(AuthContext);
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

  const [isLoginMode, setIsLoginMode] = useState(true);

  const submitFormHandler = (event) => {
    auth.login();
    event.preventDefault();
    console.log(formState.inputs);
  };

  const isLoginModeHandler = () => {
    let newInputs = {};
    let formIsValid = false;
    if (isLoginMode) {
      newInputs = {
        ...formState.inputs,
        username: {
          value: "",
          isValid: false,
        },
      };
    } else {
      newInputs = {
        ...formState.inputs,
        username: undefined,
      };
      formIsValid =
        formState.inputs.password.isValid && formState.inputs.email.isValid;
    }

    setFormData(newInputs, formIsValid);
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <Card className="authentication">
      <h2>{isLoginMode ? "Welcome Back!" : "Create New Account!"}</h2>
      <hr />
      <form className="place-form" onSubmit={submitFormHandler}>
        {!isLoginMode && (
          <Input
            id="username"
            title="Username"
            // element='input'
            label="Username"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Please enter a valid username! (min 5 characters)"
          />
        )}
        <Input
          id="email"
          title="Email"
          // element='input'
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
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="The password is not correct!"
        />
        <Link to='/'>
            <Button type="submit" onClick={auth.login} disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
        </Link>
      </form>
      <Button inverse onClick={isLoginModeHandler}>
        {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Login;

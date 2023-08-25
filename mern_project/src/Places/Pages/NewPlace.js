import React, {useCallback, useReducer} from 'react';
import Input from '../../Shared/Components/FormElements/Input';
import {VALIDATOR_MINLENGTH} from '../../Shared/Components/Util/validators';
import { VALIDATOR_REQUIRE } from '../../Shared/Components/Util/validators';
import Button from '../../Shared/Components/FormElements/Button';

import './NewPlace.css';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const input in state.inputs) {
                if (input === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[input].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {val: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            };

        case 'DESCRIPTION_CHANGE':
            return {};

        default:
            return state;
    }
}

const NewPlace = () => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }

        },
        isValid: false
    })

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            inputId: id,
            isValid: isValid
        });
    }, []);

    const submitFormHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return (
        <form className='place-form' onSubmit={submitFormHandler}>
            <Input
                id='title'
                element='input'
                type='text'
                label='Title'
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText='Please enter a valid title!' />
            <Input
                id='description'
                element='textarea'
                type='text'
                label='Description'
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
                errorText='Please enter a valid description! (min 5 characters)' />
            <Input
                id='address'
                element='input'
                type='text'
                label='Address'
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText='Please enter a valid address!' />
            <Button type='submit' disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
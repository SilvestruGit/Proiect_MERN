import React from 'react';
import Input from '../../Shared/Components/FormElements/Input';
import { VALIDATOR_MINLENGTH } from '../../Shared/Components/Util/validators';
import { VALIDATOR_REQUIRE } from '../../Shared/Components/Util/validators';
import Button from '../../Shared/Components/FormElements/Button';
import useForm from '../../Shared/Components/Hooks/form-hook';

import './PlaceForm.css';

const NewPlace = () => {

    const initialInputs = {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    };

    const initialIsValid = false;

    const [formState, inputHandler] = useForm(
        initialInputs,
        initialIsValid
    );

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
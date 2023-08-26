import React from 'react';
import {useParams} from 'react-router-dom';
import Input from '../../Shared/Components/FormElements/Input';
import { VALIDATOR_MINLENGTH } from '../../Shared/Components/Util/validators';
import { VALIDATOR_REQUIRE } from '../../Shared/Components/Util/validators';
import Button from '../../Shared/Components/FormElements/Button';
import useForm from '../../Shared/Components/Hooks/form-hook';

import './PlaceForm.css';

const DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      coordinates: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creatorId: 1
    },
    {
      id: 'p2',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      coordinates: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creatorId: 2
    }
  ];

const UpdatePlace = () => {
    const {placeId} = useParams();

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

    const placeToUpdate = DUMMY_PLACES.find(place => place.id === placeId);

    console.log(placeToUpdate);

    const initialIsValid = true;

    const [formState, inputHandler, setFormData] = useForm(initialInputs, initialIsValid);

    setFormData(placeToUpdate.inputs, placeToUpdate.isValid);

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState);
    }

    return (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
            <Input
                id='title'
                element='input'
                type='text'
                label='Title'
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialIsValid={formState.inputs.title.isValid}
                errorText='Please enter a valid title!' />
            <Input
                id='description'
                element='textarea'
                type='text'
                label='Description'
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialIsValid={formState.inputs.description.isValid}
                errorText='Please enter a valid description! (min 5 characters)' />
            <Button type='submit' disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    );
}

export default UpdatePlace;
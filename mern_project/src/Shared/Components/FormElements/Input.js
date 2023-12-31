import React, { useReducer, useEffect } from 'react';
import { validate } from '../Util/validators';

import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators)
            };

        case 'TOUCHED':
            return {
                ...state,
                isTouched: true
            }

        default:
            return state;
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initialIsValid || false,
        isTouched: false
    })

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput])

    const eventHandler = event => {
        dispatch({
            type: 'CHANGE',
            value: event.target.value,
            validators: props.validators
        });
    }

    // onBlur
    const touchHandler = () => {
        dispatch({
            type: 'TOUCHED'
        });
    }

    const element = props.element === 'textarea' ?
        <textarea
            id={props.id}
            rows={props.rows || 3}
            type={props.type}
            onChange={eventHandler}
            onBlur={touchHandler}
            value={inputState.value}
        /> :
        <input
            id={props.id}
            placeholder={props.placeholder}
            type={props.type}
            onChange={eventHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />


    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
}

export default Input;
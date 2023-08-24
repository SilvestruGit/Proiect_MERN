import React, { useReducer } from 'react';
import { validate } from '../Util/validators';

import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };

        default:
            return state;
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, { val: '', isValid: false })

    const eventHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    }

    const element = props.element === 'input' ?
        <input
            id={props.id}
            placeholder={props.placeholder}
            type={props.type}
            onChange={eventHandler}
            // onBlur={} to do!
            value={inputState.value}
        /> :
        <textarea
            id={props.id}
            rows={props.rows || 3}
            onChange={eventHandler}
            value={inputState.value}
        />

    return (
        <div className={`form-control ${!inputState.isValid && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && <p>{props.errorText}</p>}
        </div>
    );
}

export default Input;
import React, { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const input in state.inputs) {
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
                    [action.inputId]: { val: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };

        case 'DESCRIPTION_CHANGE':
            return {};

        default:
            return state;
    }
}

const useForm = (initialInputs, initialIsValid) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialIsValid
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            inputId: id,
            isValid: isValid
        });
    }, []);

    return [formState, inputHandler];
}

export default useForm;
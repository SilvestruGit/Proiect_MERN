import { useCallback, useReducer } from 'react';

const checkValidity = (state, action) => {
    let formIsValid = true;
    for (const input in state.inputs) {
        if (input === action.inputId) {
            formIsValid = formIsValid && action.isValid;
        } else {
            formIsValid = formIsValid && state.inputs[input].isValid;
        }
    }
    return formIsValid;
}

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = checkValidity(state, action);
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { val: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };

        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.isValid
            };

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

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            isValid: formValidity
        });
    }, [])

    return [formState, inputHandler, setFormData];
}

export default useForm;
import React from 'react';
import {useParams} from 'react-router-dom';

const UpdatePlace = () => {
    const {placeId} = useParams();
    return (
        <h2>Update! {placeId}</h2>
    );
}

export default UpdatePlace;
import React from 'react';
import Card from '../../Shared/Components/UIElements/Card';
import PlaceItem from './PlaceItem';

import './PlacesList.css';

const PlaceList = props => {
    if (props.items.length === 0) {
        return (
            <div className='place-list center'>
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <button>Share Place</button>
                </Card>
            </div>
        );
    }

    return (
        <ul className='place-list'>
            {props.items.map(item =>
                <PlaceItem
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    address={item.address}
                    creatorId={item.creatorId}
                    coordinates={item.coordinates}
                />
                )
            }
        </ul>

    );
}

export default PlaceList;
import React from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../Components/PlacesList';

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

const UserPlaces = () => {
  const userId = useParams().userId;
  return <PlaceList items={DUMMY_PLACES.filter(place => place.creatorId === Number(userId))} />;
};

export default UserPlaces;
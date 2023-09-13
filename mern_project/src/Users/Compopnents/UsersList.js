import React from 'react';
import './UserList.css';
import UserItem from './UserItem';
import Card from '../../Shared/Components/UIElements/Card';

const UserList = (props) => {
    if (props.items.length === 0) {
        return (
            <Card>
                <div className='center'>
                    <h2>No users found!</h2>
                </div>
            </Card>
        );
    }
    return (
        <ul className='users-list'>
            {
                props.items.map(user => {
                    return (<UserItem
                        key={user._id}
                        id={user._id}
                        image={user.image}
                        username={user.username}
                        placeCount={user.places.length}
                    />);
                })
            }
        </ul>
    );
};

export default UserList;
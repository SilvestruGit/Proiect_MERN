import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../Components/PlacesList";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import useHttpClient from "../../Shared/Components/Hooks/http-hook";

const UserPlaces = () => {
  const [data, setData] = useState(null);
  const id = useParams().userId;

  const { sendRequest, isLoading, errorState, errorHandler } = useHttpClient();

  useEffect(() => {
    const getUserPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${id}`
        );
        setData(responseData);
      } catch (error) {
        // console.log(error);
      }
    };
    getUserPlaces();
  }, [id, sendRequest]);

  const refreshPlaces = (deletedPlaceId) => {
    setData((prevData) =>
      prevData.filter((place) => place._id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      {errorState && <ErrorModal error={errorState} onClear={errorHandler} />}
      {isLoading && <LoadingSpinner asOverlay={true} />}
      {!isLoading && data !== undefined && (
        <PlaceList items={data} onDelete={refreshPlaces} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;

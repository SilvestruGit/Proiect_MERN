import React, { useEffect, useState } from "react";
import UserList from "../Compopnents/UsersList";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import useHttpClient from "../../Shared/Components/Hooks/http-hook";

const Users = () => {
  const [data, setData] = useState();
  const { isLoading, errorState, sendRequest, errorHandler } = useHttpClient();

  useEffect(() => {
    try {
      const getUsers = async () => {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/"
        );
        setData(responseData.allUsers);
      };
      getUsers();
    } catch (error) {}
  }, [sendRequest]);

  return (
    <React.Fragment>
      {errorState && <ErrorModal error={errorState} onClear={errorHandler} />}
      {isLoading && <LoadingSpinner asOverlay={true} />}
      {!isLoading && data && <UserList items={data} />}
    </React.Fragment>
  );
};

export default Users;

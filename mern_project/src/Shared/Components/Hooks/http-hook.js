import React, { useState } from "react";

const useHttpClient = (link, payload) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setError] = useState();

  const sendRequest = async (url, method = "GET", body = null, headers = {}) => {
    setIsLoading(true);
    try {
        const response = await fetch(url, {method, body, headers});
        const responseData = await response.json();

        if (!response.ok){
            setIsLoading(false);
            throw new Error(responseData.message);
        }

        return responseData;

    } catch (error) {
        setError(error.message);
        isLoading(false);
    }
  };
};

export default useHttpClient;

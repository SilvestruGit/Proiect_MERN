import { useState, useCallback } from "react";

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setError] = useState();

  const errorHandler = () => {
    setError(false);
  };

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      try {
        const response = await fetch(url, { method, body, headers });
        // console.log(response, '\n');
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        // console.log(responseData, response.ok);
        setIsLoading(false);
        return responseData;
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );
  return { isLoading, sendRequest, errorState, errorHandler };
};

export default useHttpClient;

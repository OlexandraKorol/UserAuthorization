import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';

export const useUserProfileImageFetch = (param: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>();
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await axios.get(`https://reqres.in/api/users/${param}`);
      setResponse(result.data);
      setIsError(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [param]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {response, isLoading, isError};
};

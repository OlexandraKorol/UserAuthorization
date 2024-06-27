import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';

export const useDataImageItemFetch = (param: string, page: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any[]>([]);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await axios.get(
        `https://picsum.photos/v2/${param}?page=${page}`,
      );
      setResponse(prevResponse => [...prevResponse, ...result.data]);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [param, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  const refetch = () => {
    setResponse([]);
    return fetchData();
  };

  return {response, isLoading, isError, refetch};
};

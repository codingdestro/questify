import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useApi = <T = any,>(
  url: string,
  options?: AxiosRequestConfig
): UseApiReturn<T> => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = async () => {
    try {
      setState(() => ({ data: null, loading: true, error: null }));
      const response: AxiosResponse<T> = await axios(url, options);
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  return {
    ...state,
    refetch: fetchData,
  };
};

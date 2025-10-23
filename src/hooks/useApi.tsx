import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { LoaderState } from "@/types";

interface UseApiState<T> {
  data: T | null;
  loading: LoaderState;
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
    loading: "idle",
    error: null,
  });

  const fetchData = async () => {
    try {
      setState(() => ({ data: null, loading: "loading", error: null }));
      const response: AxiosResponse<T> = await axios(url, options);
      setState({
        data: response.data,
        loading: "success",
        error: null,
      });

      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          loading: "idle",
        }));
      }, 1000);
    } catch (error) {
      setState({
        data: null,
        loading: "error",
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  return {
    ...state,
    refetch: fetchData,
  };
};

import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { LoaderState } from "@/types";

interface UseApiState<T> {
  data: T | null;
  loading: LoaderState;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  dispatch: (
    callback?: (state: T) => void,
    options?: AxiosRequestConfig
  ) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useApiCallback = <T = any>(url: string): UseApiReturn<T> => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: "idle",
    error: null,
  });

  const dispatch = async (
    callback?: (state: T) => void,
    options?: AxiosRequestConfig
  ) => {
    try {
      setState(() => ({ data: null, loading: "loading", error: null }));
      const { data }: AxiosResponse<T> = await axios(url, options);
      setState({
        data,
        loading: "success",
        error: null,
      });
      if (callback) callback(data);

      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          loading: "idle",
        }));
      }, 1500);
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
    dispatch,
  };
};

import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../assets/API/API_URL";

export const usePostAPI = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async (url, inputs) => {
    setLoading(true);

    try {
      const res = await axios.post(API_URL + url, inputs);
      setData(res.data);
      setError(null);
    } catch (err) {
      setTimeout(() => {
        setError(err.response.data);
      }, 3000);
    }

    setLoading(false);
  };

  return { data, error, loading, postData, setError };
};

export const useFetchAPI = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    setLoading(true);

    try {
      const response = await axios.get(API_URL + url);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return { data, loading, error, fetchData };
};

export const usePutAPI = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateData = async (url, inputs) => {
    setLoading(true);

    try {
      const res = await axios.put(API_URL + url, inputs);
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
    }

    setLoading(false);
  };

  return { data, error, loading, updateData, setError };
};

export const useDeleteAPI = () => {
  const [Data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteData = async (url) => {
    setLoading(true);
    try {
      const res = await axios.delete(API_URL + url);
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
    }

    setLoading(false);
  };

  return { Data, error, loading, deleteData, setError };
};

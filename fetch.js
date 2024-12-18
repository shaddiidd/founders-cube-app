import axios from "axios";

const baseURL = "https://us-central1-founders-cube-87aa6.cloudfunctions.net/api/";

const axiosInstance = axios.create({
  baseURL,
  headers: {},
});

export const setAuthorizationToken = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const get = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data.data;
  } catch (error) {
    if (!error.response.data) {
      alert("There seems to be a problem. Pease try again later");
    } else {
      throw error;
    }
  }
};

export const post = async (url, data = {}) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    if (!error.response.data) {
      alert("There seems to be a problem. Pease try again later");
    } else {
      throw error;
    }
  }
};

export const put = async (url, data = {}) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    if (!error.response.data) {
      alert("There seems to be a problem. Pease try again later");
    } else {
      throw error;
    }
  }
};

export const remove = async (url) => {  
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    if (!error.response.data) {
      alert("There seems to be a problem. Pease try again later");
    } else {
      throw error;
    }
  }
};

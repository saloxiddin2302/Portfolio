import { request, requestImage } from "./request";

export const sendData = (url, data) => {
  return request.post(url, data);
};

export const getData = (url) => {
  return request.get(url);
};

export const putData = (url, data) => {
  return request.put(url, data);
};

export const deleteData = (url) => {
  return request.delete(url);
};

export const sendImageData = (url, data) => {
  return requestImage.post(url, data);
};

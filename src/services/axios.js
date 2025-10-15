import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8088/api",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // const accestoken = store?.getState()?.login.token;
    // config.headers["Authorization"] = "Bearer " + accestoken;

    // NProgress.start();
    // Do something before request is ssent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // NProgress.done();

    if (error.response.data && error.response.data.EC === -999) {
      //   window.location.href = "/login";
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);
export default instance;

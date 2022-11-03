import axios from "axios";

const loadData = async (url, method, data, headers, params) => {
  var reqconfig = {
    url: url,
    method: method,
    data: data,
    headers: headers != null ? headers : {},
    params: params == null ? {} : params,
  };

  //send the request to the server
  return axios(reqconfig);
};

export default loadData;

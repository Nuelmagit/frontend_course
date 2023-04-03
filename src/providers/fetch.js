import axios from "axios";

const baseUrl = process.env.VUE_APP_API_URL;

const formatResponse = response => response.data.data

const handleError = async (userUservice, error) => {
  if (error === "Unauthorized" || error?.response?.status === 401) {
    await userUservice.signOut();
    return Promise.reject({ error: "Unauthorized", detail: "Unauthorized" });
  } else {
    return Promise.reject({ error: "Unexpected Error", detail: error?.response?.data?.error || "Unexpected Error" });
  }
}

export const authenticate = (username, password) =>
  axios.post(`${baseUrl}/operations/user/login`, { username, password }).catch(error => Promise.reject(error.response.data.error))


/**
 * TO DO. Improve duplicated code. or use interceptors to add token.
 */
export const fetchOperationRecords = userUservice => (page, searchValue, sortField, sortCriteria) => {
  return userUservice.getToken().then(token =>
    token
      ? axios.get(`${baseUrl}/operations/records`,
        {
          params: {
            page,
            sortField,
            sortCriteria,
            ...(searchValue ? { search: searchValue } : {})
          },
          headers: { Authorization: `Bearer ${token}` }
        })
      : Promise.reject("Unauthorized")
  )
    .then(formatResponse)
    .catch(error => handleError(userUservice, error))
}

export const deleteOperationRecord = userUservice => id => {
  return userUservice.getToken().then(token =>
    token
      ? axios.delete(`${baseUrl}/operations/records/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        })
      : Promise.reject("Unauthorized")
  )
    .then(formatResponse)
    .catch(error => handleError(userUservice, error))
}

export const runOperation = userUservice => (data) => {
  return userUservice.getToken().then(token =>
    token
      ? axios.post(
        `${baseUrl}/operations/operate`,
        data,
        { headers: { Authorization: `Bearer ${token}` } })
      : Promise.reject("Unauthorized")
  )
    .then(formatResponse)
    .catch(error => handleError(userUservice, error))
}

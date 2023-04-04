import axios from "axios";

const baseOperationsUrl = process.env.VUE_APP_OPERATIONS_API_URL;

const formatResponse = response => response.data.data

const handleError = async (userUservice, error) => {
  if (error === "Unauthorized" || error?.response?.status === 401) {
    await userUservice.signOut();
    return Promise.reject({ error: "Unauthorized", detail: "Unauthorized" });
  } else {
    return Promise.reject({
      error: error?.response?.data?.error?.title || "Unexpected Error",
      detail: error?.response?.data?.error?.detail || "Unexpected Error"
    });
  }
}

export const authenticate = (username, password) =>
  axios.post(`${baseOperationsUrl}/user/login`, { username, password }).catch(error => Promise.reject(error.response.data.error))


/**
 * TO DO. Improve duplicated code. or use interceptors to add token.
 */
export const fetchOperationRecords = userUservice => (page, searchValue, sortField, sortCriteria, limit) => {
  return userUservice.getToken().then(token =>
    token
      ? axios.get(`${baseOperationsUrl}/records`,
        {
          params: {
            page,
            sortField,
            sortCriteria,
            limit,
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
      ? axios.delete(`${baseOperationsUrl}/records/${id}`,
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
        `${baseOperationsUrl}/operate`,
        data,
        { headers: { Authorization: `Bearer ${token}` } })
      : Promise.reject("Unauthorized")
  )
    .then(formatResponse)
    .catch(error => handleError(userUservice, error))
}

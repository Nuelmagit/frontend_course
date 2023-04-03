import axios from "axios";

const baseUrl = process.env.VUE_APP_API_URL;

export const authenticate = (username, password) =>
  axios.post(`${baseUrl}/operations/user/login`, { username, password })

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
    .then(response => response.data.data)
    .catch(error => {
      if (error === "Unauthorized" || error?.response?.status === 401) {
        return userUservice.signOut("error", "Unauthorized")
      }
    })
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
    .then(response => response.data.data)
    .catch(error => {
      if (error === "Unauthorized" || error?.response?.status === 401) {
        return userUservice.signOut("error", "Unauthorized")
      }
    })
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
    .then(response => response.data.data)
    .catch(error => {
      if (error === "Unauthorized" || error?.response?.status === 401) {
        return userUservice.signOut("error", "Unauthorized")
      }
    })
}

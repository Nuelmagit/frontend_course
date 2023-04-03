
const setUserInLocalStorage = (user, token) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

const getUserFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return token && user ? { user: JSON.parse(user), token } : undefined;
}

export const userService = (authenticate, redirect) => {

  const signIn = (username, password) => authenticate(username, password)
    .then((response) => {
      const { user, jwt } = response.data.data;
      setUserInLocalStorage(user, jwt);
      redirect({ name: "operation-home" });
      return true;
    })
    .catch((error) => Promise.reject(error?.detail || "Couldn't sign in"))

  const signOut = async () => {
    removeUserFromLocalStorage();
    redirect({ name: "outside-login" });
    return true;
  }

  const getToken = async () => getUserFromLocalStorage()?.token

  const getUser = async () => getUserFromLocalStorage()?.user

  return {
    getUser,
    getToken,
    signIn,
    signOut
  }

}
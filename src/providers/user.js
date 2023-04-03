
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

export const userService = (authenticate, notify, redirect) => {

  const signIn = (username, password) => authenticate(username, password)
    .then((response) => {
      const { user, jwt } = response.data.data;
      setUserInLocalStorage(user, jwt);
      notify("success", "Signed in successfully");
      redirect({ name: "operation-home" });
      return true;
    })
    .catch((err) => {
      const errorMessage =
        err?.response?.data?.error?.detail || "Couldn't sign in";
      notify("error", errorMessage);
      return false;
    })

  const signOut = async (type = "success", message = "See you later") => {
    removeUserFromLocalStorage();
    notify(type, message);
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
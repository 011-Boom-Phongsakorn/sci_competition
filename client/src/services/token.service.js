const getUser = () => {
  // convert to json
  return JSON.parse(localStorage.getItem("user"));
};

const setUser = (user) => {
  // convert to string
  localStorage.setItem("user", JSON.stringify(user));
};

const getLocalAccessToken = () => {
  const user = getUser();
  // ? if user undefined ไม่มีจะไม่ทำ
  return user?.accessToken;
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const ToKenService = {
  getLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default ToKenService;

import axios from "axios";

export const createUser = async (authtoken) => {
  console.log("create User called");
  return await axios
    .post(
      `${process.env.REACT_APP_API}/auth/createuser`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    )
    .then((resp) => {
      console.log(resp);
      return resp;
    });
};

export const currentUser = async (authtoken) => {
  console.log("Current User called");
  return await axios
    .post(
      `${process.env.REACT_APP_API}/auth/currentuser`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    )
    .then((resp) => {
      return resp;
    });
};

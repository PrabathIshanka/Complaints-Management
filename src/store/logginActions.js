import { ActionSheet } from "devextreme-react";
import * as actionTypes from "./actions";
import axios from "axios";
import notify from "devextreme/ui/notify";
export const IsLogginReuqest = () => {
  return {
    type: actionTypes.USER_REQUEST_TO_LOGGIN,
    payLoad: [],
    message: "Error Loggin",
  };
};
export const getData = () => {
  return {
    type: actionTypes.GET_USER_LOGGIN_DATA,
    payLoad: [],
    message: "Error Loggin Attempt",
  };
};

const IsLoggedSuccess = (
  userData,
  //  schools,
  authorization,
  approvalDocument
) => {
  return {
    type: actionTypes.SET_USER,
    payLoad: userData,
    message: "Loggin Success",
    // School: schools,
    Authorization: authorization,
    ApprovalDocument: approvalDocument,
  };
};

export const IsRoundData = (userData, schools, authorization) => {
  return {
    type: actionTypes.SET_USER,
    payLoad: userData,
    message: "Loggin Success",
    //   School: schools,
    Authorization: authorization,
  };
};

const IsLogginError = (error) => {
  return {
    type: actionTypes.ERRROR_LOGGIN,
    payLoad: error,
    message: "Error Loggin",
  };
};

export const loggout = () => {
  localStorage.setItem("user", null);
  //localStorage.setItem("School", null);
  localStorage.setItem("Authorization", null);
  localStorage.setItem("ApprovalDocument", null);
  return (dispatch) => {
    dispatch(IsLogginError(""));
  };
};

const OnNotification = (message, type) => {
  notify({
    message: message,
    type: type,
    displayTime: 3000,
    position: { at: "top right", offset: "50" },
  });
};

export const fetchLoginData = (UserID, CurrentPassword) => {
  return (dispatch) => {
    console.log({ username: UserID, password: CurrentPassword });
    if (UserID != undefined && CurrentPassword != undefined) {
      dispatch(IsLogginReuqest);
      axios
        .post("http://20.201.121.161:4478/api/Auth", {
          username: UserID,
          password: CurrentPassword,
        }) //authontication-login?email=${email}&passowrd=${password}
        .then((respones) => {
          console.log(respones.data.token);
          localStorage.setItem("token", respones.data.token);
          localStorage.setItem("role", respones.data.role.id);
          const user = JSON.parse(respones.data.userId);
          const role = JSON.parse(respones.data.role.id);
          //  const UserWiseSchool = "";
          const UserWiseAuthorization = {}; // JSON.parse(respones.data);
          const ApprovalDocument = {}; /*JSON.parse(
            {}
            // respones.data[0].ApprovalDocument
          );*/
          console.log(user);

          if (
            user != 0 /*Object.keys(user).length !== 0 && user.Status == 1*/
          ) {
            console.log("HIIIII");
            dispatch(
              IsLoggedSuccess(
                user,
                //    UserWiseSchool,
                UserWiseAuthorization,
                ApprovalDocument
              )
            );
            console.log(
              "UserWiseAuthorization",
              JSON.stringify(UserWiseAuthorization)
            );
            localStorage.setItem("user", JSON.stringify(user));
            // localStorage.setItem("School", JSON.stringify(UserWiseSchool));
            localStorage.setItem(
              "Authorization",
              JSON.stringify(UserWiseAuthorization)
            );
            localStorage.setItem(
              "ApprovalDocument",
              JSON.stringify(ApprovalDocument)
            );
          } else {
            OnNotification("Invalid User Name or Passrwod", "error");
            dispatch(IsLogginError("Error Loggin Attempt"));
          }
        })
        .catch((error) => {
          OnNotification("Invalid UserName Or Passwrod", "error");
          const errorMsg = error.message;
          dispatch(IsLogginError(errorMsg));
        });
    } else {
      OnNotification("Invalid UserName Or Passwrod", "error");
      const errorMsg = "Invalid UserName Or Passwrod";
      dispatch(IsLogginError(errorMsg));
    }
  };
};

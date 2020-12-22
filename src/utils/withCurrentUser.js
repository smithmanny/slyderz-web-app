import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addUserSession,
  clearUserSession,
} from "../libs/redux/reducers/userReducer";

const withCurrentUser = (Component) => {
  return function ComponentWithCurrentUser(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.session);

    useEffect(async () => {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          dispatch(addUserSession(await res.json()));
        } else {
          dispatch(clearUserSession());
        }
      } catch (err) {
        console.log(err);
      }
    }, []);
    return <Component {...props} currentUser={user} />;
  };
};

export default withCurrentUser;

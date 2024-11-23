import axios from "axios";
import { useQuery } from "react-query";
import { useAppDispatch } from "../redux/store";
import { setToken, setUser } from "../redux/features/auth.slice";
import { useEffect } from "react";

const getProfile = async () => {
  const { data } = await axios.get("/users/profile");
  return data;
};

const Auth = ({ role, children }) => {
  //   const checkRole = (userRole) => {
  //     return role.length ? ["superAdmin", ...role].includes(userRole) : true;
  //   };
  const dispatch = useAppDispatch();
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    onSuccess: (data) => {
      const { success, data: user } = data;
      if (success) {
        dispatch(setUser({ user }));
      } else {
        dispatch(setUser({}));
      }
    },
    onError: (err) => {
      if (err) {
        //navigate login page
        dispatch(setUser({}));
        dispatch(setToken({}));
      }
    },
  });

  useEffect(() => {}, []);
  return <div></div>;
};

export default Auth;

import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useAppDispatch } from "../redux/store";
import {  setToken } from "../redux/features/auth.slice";

const loginData = async (body) => {
  const { data } = await axios.post("/users/login", body);
  return data as { success: boolean; token: string };
};
const Login = () => {
  const dispatch = useAppDispatch();
  const { mutate } = useMutation((body) => loginData(body), {
    onSuccess: (data) => {
      const { success, token } = data;
      if (success) {
        dispatch(setToken({ token }));
      }
    },
  });

  const [formData, setFormData] = useState({ email: "azaz@gmail.com", password: "111111" });
  console.log(formData);
  const changeHandler = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div style={{ width: 400,  margin:"100px" }}>
      <form onSubmit={submitHandler}>
        <div>
          <label style={{ display: "block" }} htmlFor="email">
            Email:
          </label>{" "}
          <input onChange={changeHandler} value={formData.email} type="email" name="email" id="email" />
        </div>

        <div>
          <label style={{ display: "block" }} htmlFor="password">
            password:
          </label>{" "}
          <input type="password" onChange={changeHandler} value={formData.password} name="password" id="password" />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;

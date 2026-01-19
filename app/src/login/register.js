import { useEffect, useState } from "react";
import { BASE_URL } from "../config/config";
import Login from './login';

function Register() {
  return (
    <div>
      <h2>Register</h2>
      <p>Already have an account? Click here to login</p>
        <Login />
    </div>
  );
}

export default Register;


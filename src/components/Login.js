import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
const axios = require('axios');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const Login = ()=>{
var username='';
var password ='';

const navigate=useNavigate();
const onChange = (e) => ({ [e.target.name]: e.target.value });

const login = () => {
    const pwd = bcrypt.hashSync(password, salt);
    password = document.getElementById("pass").value;
    username = document.getElementById("user").value;
    axios.post('http://localhost:5000/api/cars/loginUser', {
      username: username,
      password: password,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('coins', res.data.coins);
      localStorage.setItem("upCar",res.data.upCar)

      navigate('/CarGame');

    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    });
  }

    return (
      <div style={{ marginTop: '200px' }}>
        <div>
          <h3>Wellcome To Our Car Game</h3>
          <h2>Login</h2>
        </div>

        <div>
          <input
            id="user"
            type="text"
            name="username"
            onChange={onChange}
            placeholder="User Name"
            required
          />
          <br /><br />
          <input
            id="pass"
            type="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
            required
          />
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            onClick={login}
          >
            Login
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/register">
            Register
          </Link>
        </div>
      </div>
    );
  }

export default Login;
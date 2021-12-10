import React,{Component} from "react";
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
const axios = require('axios');


const Register = () => {
 var username= '';
 var password= '';
 const navigate=useNavigate();

 const onRigistName = (e) =>({
  [e.target.name]: e.target.value ,
 });

 const onRigistPass = (e) =>({
   [e.target.name]: e.target.value ,
  });

 const register = () => {
password = document.getElementById("pass").value;
username = document.getElementById("user").value;
    axios.post('https://final-project-backen.herokuapp.com/api/cars/registerUser', {
      username: username,
      password: password,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      navigate('/');
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

    return (
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Register</h2>
        </div>

        <div>
        <input
        id="user"
        type="text"
        placeholder="enter a username"
        onChange={onRigistName}
      />
        
          <br /><br />
          <input
          id="pass"
          type="password"
          placeholder="enter a password"
          onChange={onRigistPass}
        />
        
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="#3d7707"
            size="small"
            onClick={register}
          >
            Register
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/">
            Login
          </Link>
        </div>
      </div>
    );
  }

export default Register;

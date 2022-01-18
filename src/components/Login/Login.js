import React, { useState, useEffect,useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { cleanup } from "@testing-library/react";

const emailReducer=(state,action)=>{
  if(action.type==="EMAIL_INPUT"){

     return({value:action.val,isValid:action.val.includes("@")});
  }
  if(action.type==="EMAIL_BLUR"){
    return ({value:state.value,isValid:state.value.includes("@")});
  }
 
  return {value:"",isValid:false};

};
const passReducer=(state,action)=>{
  if(action.type==="PASS_INPUT"){
    return({value:action.val,isValid:action.val.length>6});
  }
  if(action.type==="PASS_BLUR"){
    return({value:state.value,isValid:state.value.length>6});
  }

  return({value:"",isValid:false});
}

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState("");
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState("");
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  
  const [emailState,dispatchEmail]=useReducer(emailReducer,{value:"",isValid:null});
  const [passwordState,dispatchPassword]=useReducer(passReducer,{value:"",isValid:null});

  const {isValid: emailIsValid}=emailState;
  const {isValid: passIsValid}=passwordState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Validating");
      setFormIsValid(
        emailIsValid&& passIsValid
      );
    }, 500);

    return ()=>{
      console.log(" Cleanup");
      clearTimeout(identifier);
    };
  }, [emailIsValid,passIsValid]);

  const emailChangeHandler = (event) => {
     dispatchEmail ({type:"EMAIL_INPUT",val:event.target.value});
    
    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    
    dispatchPassword({type:"PASS_INPUT",val:event.target.value});
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
   
     dispatchEmail({type:"EMAIL_BLUR"});

  };

  const validatePasswordHandler = () => {
    
      dispatchPassword({type:"PASS_BLUR"});
    
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

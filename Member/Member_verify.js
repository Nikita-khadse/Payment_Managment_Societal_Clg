import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./member.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";



const Member_verify = ({ }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);


    const [ID, setID] = useState('');
    const [password, setpassword] = useState('');

    const inputevent1 = (event) => {
        setpassword(event.target.value);
    }

    const inputevent2 = (event) => {
        setID(event.target.value);
    }

    const loginUser = (e) => {
        e.preventDefault();  // prevent page refreshing
        try {
            fetch("/member_signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ID, password
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast.error(data.error);
                    }
                    else {
                        console.log("login success")
                        localStorage.setItem("jwt", data.token);  // jwt is a variable holding the item value data.token
                        localStorage.setItem("user", JSON.stringify(data.user));    // data.user -> object , we first needs to convert it into string to save in localstorage
                        navigate("/member")
                    }
                })
        }
        catch (error) {
            alert("error occured");
            console.log(error);
            navigate("/start");
        }
    }



    return (
        <>
            <div className="login-main">
                <div className="login-left">
                    <img src={Image} alt="" />
                </div>
                <div className="login-right">
                    <div className="login-right-container">
                        <div className="login-logo">
                            <img src={Logo} alt="" />
                        </div>
                        <div className="login-center">
                            <h2>Welcome back!</h2>
                            <p>Please enter your details</p>
                            <form>
                                <div className="pass-input-div">
                                    <input onChange={inputevent2} type="text" placeholder="Employee ID" value={ID} />
                                    <input onChange={inputevent1} type={showPassword ? "text" : "password"} placeholder="Password" value={password} />
                                    {showPassword ? <FaEyeSlash onClick={() => { setShowPassword(!showPassword) }} /> : <FaEye onClick={() => { setShowPassword(!showPassword) }} />}
                                </div>

                                <div className="login-center-options">
                                    <div className="remember-div">
                                        {/* <input type="checkbox" id="remember-checkbox" /> */}
                                        {/* <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label> */}
                                    </div>
                                    {/* <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a> */}
                                </div>
                                <div className="login-center-buttons">
                                    <button type="button" onClick={loginUser}>Log In</button>
                                    {/* <button type="button">
                  <img src={GoogleSvg} alt="" />
                  Log In with Google
                </button> */}
                                </div>
                            </form>
                        </div>

                        <p className="login-bottom-p">
                            {/* Don't have an account? <a href="#">Sign Up</a> */}
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </>
    )
}

export default Member_verify;


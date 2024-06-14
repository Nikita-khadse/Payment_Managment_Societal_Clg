import React, { useEffect, useState } from "react"
import "./admin.css";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Admin_verify from "./Admin_verify";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
// import Logo from "../assets/logo.png";





function Profile_admin() {
    const { email } = useParams();
    const navigate = useNavigate();

    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');


    const inputevent1 = (event) => {
        setpassword(event.target.value);
    }

    const inputevent2 = (event) => {
        setcpassword(event.target.value);
    }

    const [admin_data, setMessage] = useState(
        {
            name: "",
            email: "",
            phone: "",
            address: "",
        }
    );

    useEffect(() => {
        // console.log(localStorage.getItem("user"));
        setMessage(JSON.parse(localStorage.getItem("user")))
    }, [])


    var passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;


    const submit_password = (e) => {
        e.preventDefault();  // prevent page refreshing

        if (password != cpassword) {
            alert("Password and confirm password is not matching")
            return
        }

        if (!passRegex.test(password)) {
            alert("Your password must be at least 8 characters.Your password must contain at least one letter.Your password must contain at least one digit.")
            return
        }

        if (!passRegex.test(cpassword)) {
            alert("Your password must be at least 8 characters.Your password must contain at least one letter.Your password must contain at least one digit.")
            return
        }
        try {
            fetch("/change_password_admin",
                {
                    method: "POST",
                    headers: { "Authorization": "Bearer " + localStorage.getItem("jwt"), "Content-Type": "application/json" },
                    body: JSON.stringify({
                       name:admin_data.name, password, cpassword
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error);
                    }
                    else {
                        alert(data.message)
                    }
                })
        }
        catch (error) {
            alert("Error occured");
            console.log(error);
        }
    }


    if (localStorage.getItem("user")) {
        return (
            <>
                    <div className="login-main">
                        <div className="login-right">
                            <div className="login-right-container">
                                <div className="login-logo">
                                    {/* <img src={Logo} alt="" /> */}
                                </div>
                                <div className="login-center">
                                    <h2>Welcome back!</h2>
                                    <p>Please enter below fields to change password</p>
                                    <form>
                                        <div className="pass-input-div">
                                            <input type="password" onChange={inputevent1} value={password} placeholder="Pasword"/>
                                            <input type="password" onChange={inputevent2} value={cpassword} placeholder="Confirm Pasword"/>


                                        </div>

                                        <div className="login-center-options">
                                            <div className="remember-div">
                                            
                                            </div>
                                        </div>
                                        <div className="login-center-buttons">
                                            <button type="button" onClick={submit_password}>Change Password</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
            </>

        );
    }
    else {
        return (
            <Admin_verify />
        )
    }
}


export default Profile_admin;
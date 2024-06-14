/// client
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./admin.css"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Admin_verify from "./Admin_verify";




const Add_doc = () => {

    const navigate = useNavigate();
    const [user, setuser] = useState(
        {
            name: "",
            ID: "",
            email: "",
            phone: "",
            designation: "",
            date: "",
            check_loan: false,
            subscription: "",
            salary: "",
            password: "",
            cpassword: ""
        }
    );


    let name, value;
    const handleInput = (e) => {
        console.log(e.target.value);

        name = e.target.name;
        value = e.target.value;

        setuser({ ...user, [name]: value });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // '/ /' => regex format
    var passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var mobileregex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    const PostData = async (e) => {
        e.preventDefault();  // prevent refreshing the page

        if (!emailRegex.test(user.email)) {
            toast.error("Invalid email")
            return
        }
        else if (!passRegex.test(user.password)) {
            toast.error("Your password must be at least 8 characters.Your password must contain at least one letter.Your password must contain at least one digit.")
            return
        }
        if (!mobileregex.test(user.phone)) {
            toast.error("Invalid Phone number")
            return
        }

        try {
            await fetch("/doctor_add", {
                method: "POST",
                headers: { "Authorization": "Bearer " + localStorage.getItem("jwt"), "Content-Type": "application/json" },
                // web can only understand string data
                body: JSON.stringify({ user })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast.error(data.error)
                    }
                    else {
                        toast.success("Data Registered successfully");
                        console.log(data.message);
                    }
                })
        } catch (error) {
            // handle any rejected fetch Promises and other errors
            console.log("Error occured ");
            alert(error);
        }



    }


    if (localStorage.getItem("user")) {
        return (
            <>
                {/* <div className="add_doc p-2 d-flex justify-content-center shadow"> */}
                <div className="add_doc">
                    <div className="box">

                        <form method="POST" >
                            {/* donnot put any action here */}

                            <div className="row">
                                <div className="col-3 form-group" >
                                    {/* take this icons from 'Material design iconic font' */}
                                    {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                                    <input type="text" placeholder="Your Name" className="form-control" name="name" id="name" autoComplete="off"
                                        value={user.name}
                                        onChange={handleInput} style={{ "width": "20vw" }} />
                                </div>

                                <div className="col-3 form-group">
                                    {/* take this icons from 'Material design iconic font' */}
                                    {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                                    <input type="text" placeholder="Your ID" className="form-control" name="ID" id="ID" autoComplete="off"
                                        value={user.ID}
                                        onChange={handleInput} style={{ "width": "20vw" }} />
                                </div>
                                <div className="col-4 form-group">
                                    {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                                    <input type="text" placeholder="Your Email" className="form-control" name="email" id="email" autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput} style={{ "width": "20vw" }} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3 form-group">
                                    {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                                    <input type="text" placeholder="Mobile number" className="form-control" name="phone" id="phone" autoComplete="off"
                                        value={user.phone}
                                        onChange={handleInput} />
                                </div>

                                <div className="col-3 form-group">
                                    {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                                    <input type="text" placeholder="designation" className="form-control" name="designation" id="designation" autoComplete="off"
                                        value={user.designation}
                                        onChange={handleInput} />
                                </div>
                                <div className="col-3 form-group">
                                    {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                                    <input type="text" placeholder="salary" className="form-control" name="salary" id="salary" autoComplete="off"
                                        value={user.salary}
                                        onChange={handleInput} />
                                </div>



                            </div>

                            <div className="row">

                                <div className="col-3 form-group">
                                    {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                                    <input type="text" placeholder="Subscription" className="form-control" name="subscription" id="subscription" autoComplete="off"
                                        value={user.subscription}
                                        onChange={handleInput} />
                                </div>
                                <div className="col-3 form-group">
                                    {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                                    <input type="text" placeholder="Password" className="form-control" name="password" id="address" autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput} />
                                </div>

                                <div className="col-3 form-group">
                                    {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                                    <input type="text" placeholder="Confirm Password" className="form-control" name="cpassword" id="address" autoComplete="off"
                                        value={user.cpassword}
                                        onChange={handleInput} />
                                </div>



                            </div>

                            <div className="col-3 form-group">
                                {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                                <input type="Date" placeholder="Date of joining" className="form-control" name="date" id="date" autoComplete="off"
                                    value={user.date}
                                    onChange={handleInput} />
                            </div>


                            <button type="button" class="btn btn-primary" onClick={PostData} >
                                Submit
                            </button>

                        </form>

                    </div>
                </div>

                <ToastContainer />
            </>
        )
    }
    else {
        return (
            <>
                <Admin_verify />
            </>
        )
    }
}

export default Add_doc;



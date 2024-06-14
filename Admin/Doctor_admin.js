import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./admin.css";
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Admin_verify from "./Admin_verify";


// useEffect -> runs only once when the component is render

const Mymodel = ({ closeModel, name, email, ID, designation, salary, phone, subscription }) => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        closeModel()
        navigate("/", { replace: true })
    }

    useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "scroll" // once this model working stops , this return will execute
        }
    }, []);

    return (
        <>
            <div className="model-wrapper1" onClick={closeModel}></div>
            <div className="modal-container1">
                <div className="row logo">
                    <h2>
                        <span>F</span>inance
                        <span> I</span>nterest
                    </h2>
                </div>
                <div className="row">
                    <div className="col-4">
                        <h3>ID</h3>
                    </div>
                    <div className="col-4">
                        <h3>Email</h3>
                    </div>
                    <div className="col-4">
                        <h3>Name</h3>
                    </div>
                </div>
                <div className="row " style={{ "margin-bottom": "3vh" }}>
                    <div className="col-4">
                        {ID}
                    </div>
                    <div className="col-4">
                        {email}
                    </div>
                    <div className="col-4">
                        {name}
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <h3>Salary</h3>
                    </div>
                    <div className="col-4">
                        <h3>Designation</h3>
                    </div>
                    <div className="col-4">
                        <h3>Subscription</h3>
                    </div>
                </div>
                <div className="row" style={{ "margin-bottom": "3vh" }}>
                    <div className="col-4">
                        {salary}
                    </div>
                    <div className="col-4">
                        {designation}
                    </div>
                    <div className="col-4">
                        {subscription}
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <h3>Phone</h3>
                    </div>
                </div>
                <div className="row" style={{ "margin-bottom": "3vh" }}>
                    <div className="col-4">
                        {phone}
                    </div>
                </div>
            </div>
        </>
    )
}

const Mymodel1 = ({ closeModel1, ID }) => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        closeModel1()
        navigate("/", { replace: true })
    }

    useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "scroll" // once this model working stops , this return will execute
        }
    }, []);

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
    var mobileregex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;


    const PostData = async (e) => {
        e.preventDefault();  // prevent refreshing the page

        if(user.ID != ID)
            {
                toast.error("Please enter correct ID ")
                return
            }
        if (!emailRegex.test(user.email)) {
            toast.error("Invalid email")
            return
        }
        if (!mobileregex.test(user.phone)) {
            toast.error("Invalid Phone number")
            return
        }

        try {
            await fetch("/doctor_update", {
                method: "POST",
                headers: { "Authorization": "Bearer " + localStorage.getItem("jwt"), "Content-Type": "application/json" },
                // web can only understand string data
                body: JSON.stringify({ user })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast.error(data.error);
                    }
                    else {
                        toast.success(data.message)
                    }
                })

        } catch (error) {
            // handle any rejected fetch Promises and other errors
            console.log("Error occured ");
            alert(error);
        }
    }


    return (
        <>
            <div className="model-wrapper1" onClick={closeModel1}></div>
            <div className="modal-container1">
                <div className="add_doc">
                    <div className="box">

                        <form method="POST" >
                            {/* donnot put any action here */}

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
                                                onChange={handleInput} />
                                        </div>

                                        <div className="col-3 form-group">
                                            {/* take this icons from 'Material design iconic font' */}
                                            {/* <label htmlFor="">
                    <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                </label> */}
                                            <input type="text" placeholder="Your ID" className="form-control" name="ID" id="ID" autoComplete="off"
                                                value={user.ID}
                                                onChange={handleInput} />
                                        </div>
                                        <div className="col-3 form-group">
                                            {/* <label htmlFor="">
                    <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                </label> */}
                                            <input type="text" placeholder="Your Email" className="form-control" name="email" id="email" autoComplete="off"
                                                value={user.email}
                                                onChange={handleInput} />
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

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}



function Doctor_admin() {
    const navigate = useNavigate();
    const [user, setuser] = useState([]);

    const [showmodel, setshowmodel] = useState(false);
    const closeModel = () => setshowmodel(false);

    useEffect(() => {
        fetch("/doctor_details", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setuser(data)
            })
            .catch(err => console.log(err))
    }, [])

    const [name, setname] = useState("")
    const [ID, setID] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [designation, setdesignation] = useState("")
    const [subscription, setsubscription] = useState("")
    const [salary, setsalary] = useState("")
    const inputevent2 = async (event, key) => {
        console.log(event)
        console.log(key)
        setname(user[key].name)
        setemail(user[key].email)
        setID(user[key].ID)
        setphone(user[key].phone)
        setdesignation(user[key].designation)
        setsubscription(user[key].subscription)
        setsalary(user[key].salary)

        setshowmodel(true)
    }

    const inputevent1 = async (event, key) => {
        console.log(event)
        console.log(key)
        setID(user[key].ID)
        setshowmodel1(true)
    }

    const HandleClick1 = async (event, key) => {
        console.log(event)
        console.log(key)
        const doctor_id = user[key]._id;
        console.log(user[key]._id)
        try {
            await fetch("/doctor_delete", {
                method: "POST",
                headers: { "Authorization": "Bearer " + localStorage.getItem("jwt"), "Content-Type": "application/json" },
                // web can only understand string data
                body: JSON.stringify({ doctor_id })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast.error(data.error)
                    }
                    else {
                        toast.success(data.message)
                    }
                })
        } catch (error) {
            // handle any rejected fetch Promises and other errors
            console.log("Error occured ");
            alert(error);
        }

    }

    const [showmodel1, setshowmodel1] = useState(false);
    const closeModel1 = () => setshowmodel1(false);

    if (localStorage.getItem("user")) {
        return (
            <>
                <div className="doctor_admin">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-9">

                            {showmodel && <Mymodel closeModel={closeModel} name={name} email={email} ID={ID} designation={designation}
                                salary={salary} phone={phone} subscription={subscription} />}

                            {showmodel1 && <Mymodel1 closeModel1={closeModel1} ID={ID} />}

                            <button className="add_btn btn btn-primary" onClick={() => { navigate("add_doctor") }}>Create New Member</button>

                            {/* <Link to="add_doctor">add doctor</Link> */}

                            {/* <button onClick={event =>  navigate("add_doctor")} >Add doctor</button> */}

                            <table class="table table-striped table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Contact no</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Date of joining</th>
                                        <th scope="col">Salary</th>
                                        <th scope="col">Update</th>
                                        <th scope="col">Delete</th>
                                        <th scope="col">Details</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {

                                        user.map((item, key) => (

                                            <tr>
                                                <th scope="row"></th>
                                                <td>{item.ID}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.designation}</td>
                                                <td>{item.date.substring(0, 10)}</td>
                                                <td>{item.salary}</td>
                                                {/* <td><button type="button" class="btn btn-dark" onClick={event =>
                                                    navigate("update_doctor/" + user[key].email)}
                                                    value={key} >
                                                    Update</button>
                                                </td> */}
                                                <td><button type="button" class="btn btn-info" onClick={event => { inputevent1(event, key) }} value={key}>Update</button>
                                                </td>
                                                <td><button type="button" class="btn btn-danger" onClick={event => { HandleClick1(event, key) }} value={key} >Delete</button></td>
                                                <td><button type="button" class="btn btn-info" onClick={event => { inputevent2(event, key) }} value={key} >Show</button></td>
                                            </tr>

                                        ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <ToastContainer />
            </>

        );
    }
    else {
        return (
            <Admin_verify />
        )
    }

}

export default Doctor_admin;
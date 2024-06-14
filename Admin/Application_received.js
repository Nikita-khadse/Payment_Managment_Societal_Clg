import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./admin.css";
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Admin_verify from "./Admin_verify";
import emailjs from "@emailjs/browser";

// useEffect -> runs only once when the component is render

const sendEmail = () => {
    emailjs.send(
        'service_8dkewfz', // Replace with your EmailJS service ID
        'template_ih2x3lc', // Replace with your EmailJS template ID
        {
            to_email: 'khadsenikita92@gmail.com', // Replace with the user's email
            // Add any other template variables here if needed
        },
        'NoeAQqUZ_Ospcrys5' // Replace with your EmailJS user ID
    )
        .then((response) => {
            console.log('Email sent successfully:', response);
            alert('Email sent successfully');
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            alert('Error sending email');
        });
}





const Mymodel = ({ closeModel,datapostedhandle,reqID }) => {
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

    const [user, setuser] = useState(
        {
            ID: "",
            rate: "",
            duration: "",
            loan_acceptance_date: ""
        }
    );


    let name, value;
    const handleInput = (e) => {
        console.log(e.target.value);

        name = e.target.name;
        value = e.target.value;

        setuser({ ...user, [name]: value });
    }

    const PostData = async (e) => {


        if(user.ID != reqID)
            {
                toast.error("Plz enter correct ID ");
                return ;
            }
        e.preventDefault();  // prevent refreshing the page
        try {
            await fetch("/loan_approval_data", {
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
                        toast.success("Loan approved");
                        sendEmail()
                        console.log(data.message);
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
            <div className="model-wrapper1" onClick={closeModel}></div>
            <div className="modal-container1">
                <form method="POST" >
                    {/* donnot put any action here */}

                    <h6>Add Below Fields regarding loan acceptance</h6>

                    <div className="form-group">
                        {/* take this icons from 'Material design iconic font' */}
                        {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                        <input type="text" placeholder="Employee ID" className="form-control" name="ID" id="ID" autoComplete="off"
                            value={user.ID}
                            onChange={handleInput} />
                    </div>

                    <div className="form-group">
                        {/* take this icons from 'Material design iconic font' */}
                        {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                        <input type="text" placeholder="Rate of Intrest" className="form-control" name="rate" id="rate" autoComplete="off"
                            value={user.rate}
                            onChange={handleInput} />
                    </div>
                    <div className="form-group">
                        {/* take this icons from 'Material design iconic font' */}
                        {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                        <input type="text" placeholder="Total Duration in months" className="form-control" name="duration" id="duration" autoComplete="off"
                            value={user.duration}
                            onChange={handleInput} />
                    </div>

                    <div className="form-group">
                        {/* take this icons from 'Material design iconic font' */}
                        {/* <label htmlFor="">
                                            <i class="zmdi zmdi-accountmaterial-icons-name"></i>
                                        </label> */}
                        <input type="date" placeholder="Date of Loan Acceptance" className="form-control" name="loan_acceptance_date" id="loan_acceptance_date" autoComplete="off"
                            value={user.loan_acceptance_date}
                            onChange={handleInput} />
                    </div>
                    <div className="form-group form-button">
                        <input type="submit" name="register" id="register" className="form-submit btn btn-primary" onClick={PostData} />
                    </div>
                </form>
            </div>
        </>
    )
}

const Mymodel1 = ({ closeModel1 }) => {
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


    return (
        <>
            <div className="model-wrapper1" onClick={closeModel1}></div>
            <div className="modal-container1">
                <h6>hi</h6>
            </div>
        </>
    )
}




function Application_received() {
    const navigate = useNavigate();
    const [user, setuser] = useState([]);
    const [reqID, setreqID] = useState("");


    const [showmodel, setshowmodel] = useState(false);
    const closeModel = () => setshowmodel(false);

    const [showmodel1, setshowmodel1] = useState(false);
    const closeModel1 = () => setshowmodel1(false);

    // const [dataposted, setdataposted] = useState(false);
    // const datapostedhandle = () => {
    //     if(dataposted){setdataposted(false)}
    //     else{setdataposted(true)}
    // }




    useEffect(() => {
        fetch("/application_received_details", {
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

    const Handleclick1 = async (event, key) => {
        console.log(event)
        console.log(key)
        const doctor_id = user[key]._id;
        console.log(user[key]._id)
        try {
            await fetch("/application_delete", {
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
                        sendEmail()
                        toast.success(data.message)
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
                <div className="doctor_admin">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-9">

                            {/* <button onClick={() => setshowmodel(true)}>demo</button> */}
                            {showmodel && <Mymodel closeModel={closeModel} reqID={reqID} />}
                            {showmodel1 && <Mymodel1 closeModel1={closeModel1} />}

                            {/* <button className="add_btn btn btn-primary" onClick={() => { navigate("add_doctor") }}>Add Doctor</button> */}

                            {/* <Link to="add_doctor">add doctor</Link> */}

                            {/* <button onClick={event =>  navigate("add_doctor")} >Add doctor</button> */}

                            <table class="table table-striped table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Email</th>
                                        {/* <th scope="col">Phone</th> */}
                                        <th scope="col">Contact no</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">type</th>
                                        <th scope="col">Accept</th>
                                        <th scope="col">Reject</th>
                                        {/* <th scope="col">Details</th> */}
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
                                                <td>{item.amount}</td>
                                                <td>{item.date.substring(0, 10)}</td>
                                                <td>{item.loan_type}</td>
                                                <td><button type="button" class="btn btn-success" onClick={event => {
                                                   setreqID(item.ID); setshowmodel(true);
                                                    // if (dataposted) {
                                                    //     HandleClick2(event, key)
                                                    // }
                                                }} value={key} >Accept</button></td>
                                                {/* <td><button className="green-btn" onClick={event => { setshowmodel(true);sendEmail(); HandleClick2(event, key) }} value={key} >Accept</button></td> */}
                                                < td > <button type="button" class="btn btn-danger" onClick={event => { Handleclick1(event, key) }} value={key} >Reject</button></td>
                                                {/* <td><button type="button" class="btn btn-info" onClick={event => {setshowmodel1(true)}} value={key} >Show</button></td> */}
                                            </tr>

                                        ))}
                                </tbody>
                            </table>

                        </div>
                    </div >
                </div >
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

export default Application_received;
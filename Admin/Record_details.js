import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./admin.css";
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Admin_verify from "./Admin_verify";
import { experimentalStyled } from "@mui/material";


// useEffect -> runs only once when the component is render
const Mymodel = ({ closeModel, name, email, ID, designation, salary, phone, rate, loan_acceptance_date, duration, amount }) => {
    const navigate = useNavigate();
    const [months_passed, setmonths_passed] = useState("")
    const [amount_paid, setamount_paid] = useState("")
    const [intrest_amount_paid, setintrest_amount_paid] = useState("")


    const logout = () => {
        localStorage.clear();
        closeModel()
        navigate("/", { replace: true })
    }

    useEffect(() => {
        const amount_month = Math.floor(amount / duration);
        var rate_of_intrest_amount = amount * rate / 100;
        const today_date = new Date()
        const loan_acceptance_date1 = new Date(loan_acceptance_date)
        const diff = (today_date - loan_acceptance_date1);
        var total_moths_passed = Math.floor(diff / (1000 * 3600 * 24 * 30));
        var total_intrest_amount_paid = total_moths_passed * rate_of_intrest_amount;
        setintrest_amount_paid(total_intrest_amount_paid)
        setmonths_passed(total_moths_passed)

        if (total_moths_passed >= duration) {
            setamount_paid(amount)
        }
        else {
            const total_amount_paid = (amount_month * total_moths_passed) + rate_of_intrest_amount;
            setamount_paid(total_amount_paid)
        }


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
                        ID:{ID}
                    </div>
                    <div className="col-4">
                        Loan Amount : {amount}
                    </div>
                    <div className="col-4">
                        Rate of Intrest:{rate}%
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        Loan Approval:{loan_acceptance_date.substring(0,10)}
                    </div>
                    <div className="col-4">
                        Duration(in months):{duration}
                    </div>

                </div>
                <div class="row table-row">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col"></th>
                                <th scope="col">(Rs)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Amount Paid</td>
                                <td>{amount_paid}</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Intrest Paid</td>
                                <td>{intrest_amount_paid}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div class="row">
                    <div class="col-9 margintop">
                        <p class="lead marginbottom">THANK YOU!</p>

                        <button class="btn btn-success" id="invoice-print"><i class="fa fa-print"></i> Print</button>
                    </div>
                    <div class="col-3 text-right pull-right invoice-total">
                        <p>Total Amount Paid : {amount_paid+intrest_amount_paid}</p>
                    </div>
                </div>
            </div>
        </>
    )
}



function Record_details() {
    const navigate = useNavigate();
    const [user, setuser] = useState([]);

    const [showmodel, setshowmodel] = useState(false);
    const closeModel = () => setshowmodel(false);

    const [name, setname] = useState("")
    const [ID, setID] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [designation, setdesignation] = useState("")
    const [subscription, setsubscription] = useState("")
    const [salary, setsalary] = useState("")
    const [amount, setamount] = useState("")
    const [rate, setrate] = useState("")
    const [loan_acceptance_date, setloan_acceptance_date] = useState("")
    const [duration, setduration] = useState("")


    const inputevent2 = async (event, key) => {
        console.log(event)
        console.log(key)
        setname(user[key].name)
        setemail(user[key].email)
        setID(user[key].ID)
        setphone(user[key].phone)
        setdesignation(user[key].designation)
        setsubscription(user[key].subscription)
        setamount(user[key].amount)
        setsalary(user[key].salary)
        setrate(user[key].rate)
        setloan_acceptance_date(user[key].loan_acceptance_date)
        setduration(user[key].duration)

        setshowmodel(true)
    }

    useEffect(() => {
        fetch("/record_details", {
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


    const [search_ID, setsearch_ID] = useState('');

    const search_ID1 = () => {
        console.log(search_ID)
        try {
            fetch("/search_by_ID", {
                method: "POST",
                headers: { "Authorization": "Bearer " + localStorage.getItem("jwt"), "Content-Type": "application/json" },
                // web can only understand string data
                body: JSON.stringify({ search_ID })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast.error(data.error)
                    }
                    else {
                        // toast.success("Data Registered successfully");
                        console.log(data);
                        // setuser(data)
                    }
                })
        } catch (error) {
            // handle any rejected fetch Promises and other errors
            console.log("Error occured ");
            alert(error);
        }

    }
    const inputevent1 = (event) => {
        setsearch_ID(event.target.value);
    }



    if (localStorage.getItem("user")) {
        return (
            <>
                <div className="doctor_admin">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-9">

                            {showmodel && <Mymodel closeModel={closeModel} name={name} email={email} ID={ID} designation={designation}
                                salary={salary} phone={phone} rate={rate} loan_acceptance_date={loan_acceptance_date} duration={duration}
                                amount={amount} />}

                            <input

                                onChange={inputevent1}
                                type="text"
                                placeholder="Enter ID "
                                className="form-control"
                                name="search_ID"
                                id="search_ID"
                                autoComplete="off"
                                value={search_ID} />

                            <button className="add_btn btn btn-primary" onClick={() => { search_ID1() }}>Search</button>
                            {/* <Link to="add_doctor">add doctor</Link> */}

                            {/* <button onClick={event =>  navigate("add_doctor")} >Add doctor</button> */}
                            {/* <input type="text" placeholder="Enter ID" className="form-control" name="ID" id="ID" autoComplete="off" value={ID} onChange={inputevent1} /> */}
                            {/* <button className="add_btn btn btn-primary" onClick={search_by_ID(ID, user, setuser)} > Search by ID </button> */}

                            <table class="table table-striped table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Date of Loan Acceptance</th>
                                        <th scope="col">Details</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {

                                        user.map((item, key) => (

                                            <tr>
                                                <th scope="row"></th>
                                                {/* <td >{item.ID}</td> */}
                                                <td>{item.ID}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.loan_acceptance_date.substring(0, 10)}</td>
                                                <td><button type="button" class="btn btn-primary" onClick={event => { inputevent2(event, key); }} value={key} >Show</button></td>
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

export default Record_details;
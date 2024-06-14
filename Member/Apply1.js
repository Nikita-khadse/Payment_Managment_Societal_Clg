/// client
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./Member/member.css"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
// import Member_verify from "./Member/Member_verify";
import Select from "react-dropdown-select"




const Apply1 = () => {

    const navigate = useNavigate();

    const [value1, setvalue1] = useState("");
    const options = [
        { id: "longer duration", name: 1 },
        { id: "shorter duration", name: 2 },
        { id: "Emergency", name: 3 }
    ]
    const [user, setuser] = useState(
        {
            name: "",
            email: "",
            phone: "",
            amount: "",
            date: "",
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

        if (!emailRegex.test(user.email)) {
            toast.error("Invalid email")
            return
        }
        if (!mobileregex.test(user.phone)) {
            toast.error("Invalid Phone number")
            return
        }
        console.log(value1[0].id)
        console.log(user.date.value)

        try {
            await fetch("/add_application", {
                method: "POST",
                headers: { "Authorization": "Bearer " + localStorage.getItem("jwt"), "Content-Type": "application/json" },
                // web can only understand string data
                body: JSON.stringify({ user, value1 })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast.error(data.error)
                    }
                    else {
                        toast.success("Applied Successfully");
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

                <div className="apply justify-content-center shadow">
                    <h1>Loan Application Form</h1>
                    <div className="box">
                        <div className="ele">
                            <h5>ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5> <input type="text"  className="form-control" name="name" id="name" autoComplete="off" value={user.name} onChange={handleInput} />
                        </div>
                        <div className="ele">
                            <h5>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5>  <input type="text"  className="form-control" name="email" id="email" autoComplete="off"
                                value={user.email}
                                onChange={handleInput} />

                        </div>
                        <div className="ele">
                            <h5>Contact No  &nbsp;</h5>  <input type="text"  className="form-control" name="phone" id="phone" autoComplete="off"
                                value={user.phone}
                                onChange={handleInput} />

                        </div>
                        <div className="ele">
                            <h5>Amount &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5> <input type="text"  className="form-control" name="amount" id="amount" autoComplete="off"
                                value={user.amount}
                                onChange={handleInput} />

                        </div>
                        <div className="ele">
                            <h5>Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5>   <input type="date"  className="form-control" name="date" id="date" autoComplete="off"
                                value={user.date}
                                onChange={handleInput} />

                        </div>

                        <div className="ele">
                            <h5>Loan Type</h5>   <Select
                                name='select'
                                options={options}
                                labelField='id'
                                valueField="name"
                                onChange={value => setvalue1(value)}
                                searchable="true"> </Select>



                        </div>

                    </div>

                    <button onClick={PostData} type="button" class="btn btn-info">Apply</button>
                </div>

                <ToastContainer />
            </>
        )
    }
    else {
        return (
            <>
                {/* <Member_verify /> */}
            </>
        )
    }
}

export default Apply1;



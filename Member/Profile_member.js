import React, { useEffect, useState, useRef } from "react"
import "./member.css";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Member_verify from "./Member_verify";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useReactToPrint } from "react-to-print"

const Mymodel = ({ closeModel }) => {
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
            <div className="model-wrapper" onClick={closeModel}></div>
            <div className="modal-container">
                <p>Do you really want to logout?</p>
                <button onClick={() => logout()}>Yes</button>
                <button onClick={() => closeModel()}>Cancel</button>
            </div>
        </>
    )
}

// const Mymodel1 = ({ closeModel1, histroy_data }) => {
//     // console.log(histroy_data)
//     const navigate = useNavigate();
//     const [months_passed, setmonths_passed] = useState("")
//     const [amount_paid, setamount_paid] = useState("")
//     const [intrest_amount_paid, setintrest_amount_paid] = useState("")
//     const [principle, setprinciple] = useState("")
//     const [rate1, setrate1] = useState("")
//     var principle1;

//     // to print pdf
//     const componentRef = useRef()

//     const handlePrint = useReactToPrint({
//         content: () => componentRef.current,
//         documentTitle: "Receipt",
//         //   onAfterPrint:()=>alert("Dzta saved in PDF")
//     })

//     // 

//     const logout = () => {
//         localStorage.clear();
//         closeModel1()
//         navigate("/", { replace: true })
//     }

//     useEffect(() => {
//         console.log(histroy_data)
//         setrate1(histroy_data.rate)
//         const amount_month = Math.floor(histroy_data.amount / histroy_data.duration);
//         var rate_of_intrest_amount = histroy_data.amount * histroy_data.rate / 100;
//         const today_date = new Date()
//         const loan_acceptance_date1 = new Date(histroy_data.loan_acceptance_date)
//         const diff = (today_date - loan_acceptance_date1);
//         var total_moths_passed = Math.floor(diff / (1000 * 3600 * 24 * 30));
//         var total_intrest_amount_paid = total_moths_passed * rate_of_intrest_amount;
//         setintrest_amount_paid(total_intrest_amount_paid)
//         setmonths_passed(total_moths_passed)
//         setprinciple(amount)

//         if (total_moths_passed >= histroy_data.duration) {
//             setamount_paid(histroy_data.amount)
//         }
//         else {
//             const total_amount_paid = (amount_month * total_moths_passed) + rate_of_intrest_amount;
//             setamount_paid(total_amount_paid)
//         }


//         document.body.style.overflowY = "hidden"
//         return () => {
//             document.body.style.overflowY = "scroll" // once this model working stops , this return will execute
//         }
//     }, []);

//     const func = (p) => {
//         var a = (p * rate1) / 100;
//         setprinciple(a)
//         return a;
//     }


//     return (
//         <>
//             <div className="model-wrapper1" onClick={closeModel1}></div>
//             <div className="modal-container1">
//                 <div className="main" ref={componentRef}>
//                     <div className="row logo" >
//                         <h2>
//                             <span>F</span>inance
//                             <span> I</span>nterest
//                         </h2>
//                     </div>
//                     <div className="row">
//                         <div className="col-4">
//                             ID:{histroy_data.ID}
//                         </div>
//                         <div className="col-4">
//                             Loan Amount : {histroy_data.amount}
//                         </div>
//                         <div className="col-4">
//                             Rate of Intrest:{histroy_data.rate}%
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-4">
//                             Loan Approval:{histroy_data.loan_acceptance_date.substring(0, 10)}
//                         </div>
//                         <div className="col-4">
//                             Duration(in months):{histroy_data.duration}
//                         </div>

//                     </div>
//                     <div class="row table-row">
//                         <table class="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th scope="col">#</th>
//                                     <th scope="col"></th>
//                                     <th scope="col">(Rs)</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <th scope="row">1</th>
//                                     <td>Amount Paid</td>
//                                     <td>{func(principle)}</td>
//                                 </tr>
//                                 <tr>
//                                     <th scope="row">2</th>
//                                     <td>Intrest Paid</td>
//                                     <td>{intrest_amount_paid}</td>
//                                 </tr>
//                                 <tr>
//                                     <th scope="row">2</th>
//                                     <td>Subscription</td>
//                                     <td>1500</td>
//                                 </tr>
//                             </tbody>
//                         </table>

//                     </div>
//                     <div class="row">
//                         <div class="col-9 margintop">
//                             <p class="lead marginbottom">THANK YOU!</p>
//                         </div>
//                         <div class="col-3 text-right pull-right invoice-total">
//                             <p>Total Amount Paid : {amount_paid + intrest_amount_paid}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <button class="btn btn-success" onClick={handlePrint}> Print</button>
//             </div>
//         </>
//     )
// }
const Mymodel1 = ({ closeModel1, histroy_data }) => {
    // console.log(histroy_data)
    const navigate = useNavigate();
    const [months_passed, setmonths_passed] = useState("")
    const [amount_paid, setamount_paid] = useState("")
    const [intrest_amount_paid, setintrest_amount_paid] = useState("")

    // to print pdf
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Receipt",
        //   onAfterPrint:()=>alert("Dzta saved in PDF")
    })

    // 

    const logout = () => {
        localStorage.clear();
        closeModel1()
        navigate("/", { replace: true })
    }

    useEffect(() => {
        console.log(histroy_data)
        const amount_month = Math.floor(histroy_data.amount / histroy_data.duration);
        var rate_of_intrest_amount = histroy_data.amount * histroy_data.rate / 100;
        const today_date = new Date()
        const loan_acceptance_date1 = new Date(histroy_data.loan_acceptance_date)
        const diff = (today_date - loan_acceptance_date1);
        var total_moths_passed = Math.floor(diff / (1000 * 3600 * 24 * 30));
        var total_intrest_amount_paid = total_moths_passed * rate_of_intrest_amount;
        setintrest_amount_paid(total_intrest_amount_paid)
        setmonths_passed(total_moths_passed)

        if (total_moths_passed >= histroy_data.duration) {
            setamount_paid(histroy_data.amount)
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
            <div className="model-wrapper1" onClick={closeModel1}></div>
            <div className="modal-container1">
                <div className="main" ref={componentRef}>
                    <div className="row logo" >
                        <h2>
                            <span>F</span>inance
                            <span> I</span>nterest
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            ID:{histroy_data.ID}
                        </div>
                        <div className="col-4">
                            Loan Amount : {histroy_data.amount}
                        </div>
                        <div className="col-4">
                            Rate of Intrest:{histroy_data.rate}%
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            Loan Approval:{histroy_data.loan_acceptance_date.substring(0, 10)}
                        </div>
                        <div className="col-4">
                            Duration(in months):{histroy_data.duration}
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
                        </div>
                        <div class="col-3 text-right pull-right invoice-total">
                            <p>Total Amount Paid : {amount_paid + intrest_amount_paid}</p>
                        </div>
                    </div>
                </div>
                <button class="btn btn-success" onClick={handlePrint}> Print</button>
            </div>
        </>
    )
}


function Profile_member() {

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

    var passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6, 16}$/;


    const submit_password = (e) => {
        e.preventDefault();  // prevent page refreshing

        if (!passRegex.test(password)) {
            alert("Your password must be at least 8 characters.Your password must contain at least one letter.Your password must contain at least one digit.")
            return
        }

        if (!passRegex.test(cpassword)) {
            alert("Your password must be at least 8 characters.Your password must contain at least one letter.Your password must contain at least one digit.")
            return
        }

        if (password != cpassword) {
            alert("Password and confirm password is not matching")
            return
        }

        try {
            fetch("/change_password_member",
                {
                    method: "POST",
                    headers: { "Authorization": "Bearer " + localStorage.getItem("jwt"), "Content-Type": "application/json" },
                    body: JSON.stringify({
                        password, cpassword
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


    const [showmodel, setshowmodel] = useState(false);
    const closeModel = () => setshowmodel(false);

    const [showmodel1, setshowmodel1] = useState(false);
    const closeModel1 = () => setshowmodel1(false);

    const [showMediaIcons, setShowMediaIcons] = useState(false);


    const [histroy_data, sethistory] = useState(
        {
            ID: "",
            amount: "",
            rate: "",
            loan_acceptance_date: "",
            duration: ""
        }
    );

    const inputevent3 = () => {

        const ID = admin_data.ID;
        try {
            fetch("/find_history", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ID
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast.error(data.error);
                    }
                    else {
                        sethistory(data)
                        setshowmodel1(true)
                    }
                })
        }
        catch (error) {
            alert("error occured");
            console.log(error);
            navigate("/start");
        }
    }



    if (localStorage.getItem("user")) {
        // console.log(admin_data)
        // func()
        return (
            <>
                <nav className="main-nav">
                    {/* 1st logo part  */}
                    <div className="logo">
                        <h2>
                            <span>F</span>inance
                            <span> I</span>nterest
                        </h2>
                    </div>

                    {/* 2nd menu part  */}
                    <div
                        className={
                            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
                        }>
                        <ul>
                            <li>
                                <a onClick={() => { navigate("/Apply") }}>Apply</a>
                            </li>
                            <li>
                                <a onClick={event => { inputevent3() }}>History</a>
                                {showmodel1 && <Mymodel1 closeModel1={closeModel1} histroy_data={histroy_data.result} />}
                            </li>
                            <li>
                                <a onClick={() => setshowmodel(true)}>Logout</a>
                                {showmodel && <Mymodel closeModel={closeModel} />}
                            </li>

                        </ul>

                    </div>
                </nav>
                {/* hero section  */}
                <section className="hero-section1">
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
                            {admin_data.ID}
                        </div>
                        <div className="col-4">
                            {admin_data.email}
                        </div>
                        <div className="col-4">
                            {admin_data.name}
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
                            {admin_data.salary}
                        </div>
                        <div className="col-4">
                            {admin_data.designation}
                        </div>
                        <div className="col-4">
                            {admin_data.subscription}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <h3>Phone</h3>
                        </div>
                    </div>
                    <div className="row" style={{ "margin-bottom": "3vh" }}>
                        <div className="col-4">
                            {admin_data.phone}
                        </div>
                    </div>
                </section>
            </>

        );
    }
    else {
        return (
            <Member_verify />
        )
    }
}


export default Profile_member;
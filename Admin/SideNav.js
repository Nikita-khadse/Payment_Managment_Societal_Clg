import React, { useEffect, useState } from 'react';
//import "./design.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';


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


const SideNav = () => {
   const [showmodel, setshowmodel] = useState(false);
   const closeModel = () => setshowmodel(false);


   if (localStorage.getItem("user")) {
      return (
         <>
            <div class="container-fluid">
               <div class="row flex-nowrap">
                  <div class="col-md-3 col-xl-2 col-auto bg-dark">
                     <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                           <span class="fs-5 d-none d-sm-inline"><h2>Admin Dashboard</h2></span>
                        </a>
                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                           <li class="nav-item">
                              <Link to='' class="nav-link px-0 align-middle">
                                 <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Home</span> </Link>
                           </li>
                           <li>
                              <Link to='doctor_admin' class="nav-link px-0 align-middle">
                                 <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Members</span> </Link>
                           </li>
                           <li>
                              <Link to='record_details' class="nav-link px-0 align-middle">
                                 <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Previous Records</span>
                              </Link>
                           </li>
                           <li>
                              <Link to='application_received' class="nav-link px-0 align-middle">
                                 <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Applications received</span>
                              </Link>
                           </li>
                           <li>
                              <Link onClick={() => setshowmodel(true)} class="nav-link px-0 align-middle">
                                 <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Logout</span>
                              </Link>
                              {/* <button onClick={() => setshowmodel(true)}>Logout</button> */}
                              {showmodel && <Mymodel closeModel={closeModel} />}
                           </li>
                        </ul>

                     </div>
                  </div>
                  <div class="col p-0 m-0">
                     <div className="p-2 d-flex justify-content-center shadow">
                        <h4>MANEGMENT SYSTEM</h4>
                     </div>

                     <Outlet />

                  </div>
               </div>
            </div>

         </>
      );
   }
   else {
      return (
         <>
            <div class="container-fluid admin-dash">
               <div class="row flex-nowrap">
                  <div class="col-md-3 col-xl-2 col-auto bg-dark">
                     <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                           <span class="fs-5 d-none d-sm-inline">Admin Dashboard</span>
                        </a>
                        You have not Signed in yet !
                     </div>
                  </div>
                  <div class="col p-0 m-0">
                     <div className="p-2 d-flex justify-content-center shadow">
                        <h4>MANEGMENT SYSTEM</h4>
                     </div>
                     <Outlet />
                  </div>
               </div>
            </div>
         </>
      );
   }

};
export default SideNav;

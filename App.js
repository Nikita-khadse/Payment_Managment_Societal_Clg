import React from 'react';
import { Router, Routes, Route } from "react-router-dom";
import S1 from "./S1.js";
import Contact_us from "./Contact_us.js"


// admin components
import Admin_verify from "./Admin/Admin_verify";
import Profile_admin from "./Admin/Profile_admin";
import Doctor_admin from "./Admin/Doctor_admin";
import Update_doctor from "./Admin/Update_doctor";
import Add_doc from "./Admin/Add_doc"
import Dashboard from "./Admin/SideNav"
import Record from "./Admin/Record_details";
import Application_received from "./Admin/Application_received";

// member components
import Member_verify from "./Member/Member_verify";
import Profile_member from "./Member/Profile_member";
import Apply from "./Member/Apply1"





function App() {
  return (
    <>
      <Routes>
        {/* basic route */}
        <Route exact path='/' element={<S1 />}></Route>

        {/* verifying */}
        <Route path='/member_verify' element={<Member_verify />}></Route>
        <Route path='/admin_verify' element={<Admin_verify />}></Route>
        <Route path='/contact_us' element={<Contact_us />}></Route>


        {/* admin routes */}
        <Route path='/admin' element={<Dashboard />}>
          <Route path='' element={<Profile_admin />}></Route>
          <Route path="/admin/doctor_admin" element={<Doctor_admin />}></Route>
          <Route path='/admin/record_details' element={<Record />}></Route>
          <Route path='/admin/application_received' element={<Application_received />}></Route>
          {/* <Route path="/admin/doctor_admin/update_doctor/:id" element={<Update_doctor />}></Route> */}
          <Route path="/admin/doctor_admin/add_doctor" element={<Add_doc />}></Route>
        </Route>

        {/* member details */}
        <Route path='/member' element={<Profile_member />}></Route>
        <Route path="/Apply" element={<Apply />}></Route>

      </Routes>

    </>
  )
}

export default App;


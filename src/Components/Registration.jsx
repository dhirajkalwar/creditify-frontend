import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
    const history = useNavigate();
    const [selectedRole, setSelectedRole] = useState('Student');
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };
    const [studentData, setStudentData] = useState({
        role: 'Student',
        firstName: '',
        lastName: '',
        userId: '',
        email: '',
        department: '',
        year: '',
        password:'',
      });
      const [facultyData, setFacultyData] = useState({
        role: 'Faculty',
        firstName: '',
        lastName: '',
        userId:'',
        email: '',
        department: '',
        facultyType: '',
        password:'',
      });
      const [hodData, setHodData] = useState({
        role: 'HOD',
        firstName: '',
        lastName: '',
        userId:'',
        email: '',
        department: '',
        password:'',
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
            // Update the respective state object based on the selected role
            if (selectedRole === 'Student') {
                setStudentData({...studentData,[name]: value});
            }
            else if (selectedRole === 'Faculty') {
                setFacultyData({...facultyData,[name]: value});
            }
            else if (selectedRole === 'HOD') {
                setHodData({...hodData,[name]: value});
            }
        };
        const handleSubmit = async (e) => {
            let dataToSend;
            e.preventDefault();
            if (selectedRole == "Student") {
                 dataToSend = studentData;
            }else if(selectedRole == "Faculty"){
                dataToSend = facultyData;
            }else {
                dataToSend = hodData;
            }
            try {
                const res = await axios.post("/Register",dataToSend) ;
                if(res.status==201) {
                    toast.success('Registered Successfully',{
                        position: toast.POSITION.TOP_CENTER
                    });
                    setTimeout(() => {
                        history("/Login");
                    }, 2000);
                }
                else if(res.status==203) {
                    toast.error('Email Already Exists',{
                        position: toast.POSITION.TOP_CENTER
                    });
                }else if(res.status == 204) {
                    toast.error('Incorrect UserId',{
                        position: toast.POSITION.TOP_CENTER
                    });
                }else if(res.status == 205) {
                    toast.error('UserId Already Exists',{
                        position: toast.POSITION.TOP_CENTER
                    });
                }
                else {
                    toast.error('Registration Failed',{
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            } catch (error) {
                console.log(error);
            }
      };
    return(
        <>
            <section className="h-auto flex flex-col items-center justify-center bg-[#E4E9F7]">
                <div className="register p-10 m-10 rounded-lg bg-white w-[800px] flex flex-col items-center justify-center shadow-cyan-500/50 mt-[80px]">
                <h1 className="text-[#6236FF] font-serif font-medium text-3xl p-2">Register</h1> <br/>
                <form method="POST" id="registrationForm" onSubmit={handleSubmit}>
                    <div className="flex flex-row flex-wrap">
                        <select id="role" name="role" value={selectedRole} onChange={handleRoleChange} className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" autoComplete="off">
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                            <option value="HOD">HOD</option>
                        </select><br/><br/>
                        <input type="text" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="firstName" placeholder="First Name" name="firstName" autoComplete="off"
                        value={
                            selectedRole === 'Student'
                              ? studentData.firstName || ''
                              : selectedRole === 'Faculty'
                              ? facultyData.firstName || ''
                              : hodData.firstName || ''
                          }
                          onChange={handleInputChange} required/><br/><br/>

                        <input type="text" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="lastName" placeholder="Last Name" name="lastName" autoComplete="off" 
                        value={
                            selectedRole === 'Student'
                              ? studentData.lastName || ''
                              : selectedRole === 'Faculty'
                              ? facultyData.lastName || ''
                              : hodData.lastName || ''
                          }
                          onChange={handleInputChange} required/><br/><br/>
                        <input type="text" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="userid" placeholder="User ID" name="userId" autoComplete="off"
                        value={
                            selectedRole === 'Student'
                              ? studentData.userId || ''
                              : selectedRole === 'Faculty'
                              ? facultyData.userId || ''
                              : hodData.userId || ''
                          }
                          onChange={handleInputChange} required/><br/><br/>

                        <input type="email" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="email" placeholder="Email ID" name="email" autoComplete="off"
                        value={
                            selectedRole === 'Student'
                              ? studentData.email || ''
                              : selectedRole === 'Faculty'
                              ? facultyData.email || ''
                              : hodData.email || ''
                          }
                          onChange={handleInputChange} required/><br/><br/>
                        <input type="text" list="dept" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="deptname" placeholder="Select Department" name="department" autoComplete="off"
                        value={
                            selectedRole === 'Student'
                              ? studentData.department || ''
                              : selectedRole === 'Faculty'
                              ? facultyData.department || ''
                              : hodData.department || ''
                          }
                          onChange={handleInputChange} required/><br/>
                        <datalist id="dept">
                            <option value="Computer Science"/>
                            <option value="Information Technology"/>
                            <option value="Electronics & Telecommunication"/>
                            <option value="Mechanical Engineering"/>
                        </datalist>

                        <div className={`${selectedRole === 'Student' ? 'block' : 'hidden'}`}>
                            <input type="text" list="year" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="studyyear" placeholder="Select Year" name="year" value={studentData.year} onChange={handleInputChange || ''}/><br/>
                            <datalist id="year">
                                <option value="First Year"/>
                                <option value="Second Year"/>
                                <option value="Third Year"/>
                                <option value="Final Year"/>
                            </datalist>
                        </div><br/>
                        <div className={`${selectedRole === 'Faculty' ? 'block' : 'hidden'}`}>
                            <input type="text" list="stafftype" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="facultytype" placeholder="Faculty Role Type" name="facultyType" value={facultyData.facultyType || ''} onChange={handleInputChange} autoComplete="off" /><br/>
                            <datalist id="stafftype">
                                <option value="Technical"/>
                                <option value="Non_Technical"/>
                                <option value="Sports"/>
                            </datalist>
                        </div>
                        <input type="password" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="password" placeholder="Password" name="password" pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$" autoComplete="off"
                        value={
                            selectedRole === 'Student'
                              ? studentData.password || ''
                              : selectedRole === 'Faculty'
                              ? facultyData.password || ''
                              : hodData.password || ''
                          }
                          onChange={handleInputChange} required/><br/><br/>
                        </div><br/>
                        <div className="flex flex-col items-center">
                        <input className="p-3 m-2 text-center items-center bg-blue-500 text-white w-[340px] font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent" type="submit" value="Register"/>

                        <p className="p-2 font-bold text-center">Already have an account ?<a href="/Login"><span className = "text-blue-500"> Log In</span></a></p>
                        </div>
                        <ToastContainer autoClose={1000} />
                </form>
                </div>
            </section>
                
        </>
    )
}

export default Registration;
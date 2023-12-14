import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";

import React, { useState , useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ResetPassword = () => {
    axios.defaults.withCredentials = true;
    const history = useNavigate();
    const [selectedRole, setSelectedRole] = useState('Student');
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };
    const [studentData, setStudentData] = useState({
        role: 'Student',
        email: '',
        password:'',
        userId:''
    });
    const [facultyData, setFacultyData] = useState({
        role: 'Faculty',
        email: '',
        password:'',
        userId:""
      });
    const [hodData, setHodData] = useState({
        role: 'HOD',
        email: '',
        password:'',
        userId:""
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
        const handleLogin = async (e) => {
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
                const res = await axios.post("/resetPass",dataToSend);

                if(res.status==201) {
                    toast.success('Password Changed Successfully',{
                        position: toast.POSITION.TOP_CENTER
                    });
                    setTimeout(() => {
                        history("/Login");
                    }, 2000);
                }
                else if(res.status==200) {
                    toast.error('Email and UserId does not Matched ', {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            }
            catch (error) {
            }
      };
    return (
        <>
            <section className="h-[100vh] flex flex-col items-center justify-center bg-[#E4E9F7]">
                <div className="login p-3 my-[100px] bg-white w-[500px] flex flex-col justify-center items-center shadow-cyan-500/50">
                    <br/><br/><div className="text-[#6236FF] font-Amita font-medium text-3xl p-2">Change Password</div>
                    <form method="POST" onSubmit={handleLogin}>
                        <select id="roleid" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" value={selectedRole} onChange={handleRoleChange}>
                            {/* <option>Select Your Role</option> */}
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                            <option value="HOD">HOD</option>
                        </select><br/><br/>

                        <input type="text" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" name="email" placeholder="Email Address" autoComplete="off" value={
                            selectedRole === 'Student'
                              ? studentData.email || ''
                              : selectedRole === 'Faculty'
                              ? facultyData.email || ''
                              : hodData.email || ''
                          }
                          onChange={handleInputChange} required/><br/><br/>

                        <input type="text" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" name="userId" placeholder="UserId" autoComplete="off" value={
                            selectedRole === 'Student'
                              ? studentData.userId || ''
                              : selectedRole === 'Faculty'
                              ? facultyData.userId || ''
                              : hodData.userId || ''
                          }
                          onChange={handleInputChange} required/><br/><br/>

                        <input type="password" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="password" name="password" placeholder="New Password" autoComplete="off" value={
                            selectedRole === 'Student'
                              ? studentData.password || ''
                              : selectedRole === 'Faculty'
                              ? facultyData.password || ''
                              : hodData.password || ''
                          }
                          onChange={handleInputChange} required /><br/><br/>

                        <div className="flex flex-col p-2 justify-between">
                            <input className="p-3 m-2 bg-blue-500 text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent" type="submit" value="Reset Password" />
                        </div>
                        <ToastContainer autoClose={1000} />
                    </form>
                </div>
            </section>
        </>
    )
}
export default ResetPassword
import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";
import React, { useState , useContext } from 'react';
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
const Login = () => {
    const {state,dispatch} = useContext(UserContext);
    axios.defaults.withCredentials = true;
    const history = useNavigate();
    const [selectedRole, setSelectedRole] = useState('Student');
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };
    const [studentData, setStudentData] = useState({
        role: 'Student',
        email: '',
        password:''
    });
    const [facultyData, setFacultyData] = useState({
        role: 'Faculty',
        email: '',
        password:'',
      });
    const [hodData, setHodData] = useState({
        role: 'HOD',
        email: '',
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
                const res = await axios.post("/Login",dataToSend);

                if(res.status==201) {
                    console.log(res.headers);
                    Cookies.set('jwtoken',res.headers['jwtoken'],{ expires: 2, path: '/' });
                    dispatch({ type: "USER_LOGIN", payload: { user: true, userType: selectedRole } });
                    toast.success('Login Successfully',{
                        position: toast.POSITION.TOP_CENTER
                    });
                    setTimeout(() => {
                        history("/Dashboard");
                    }, 2000);
                }
                else if(res.status==200) {
                    toast.error('Email does not Exists', {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
                else {
                    toast.error('Incorrect Password',{
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
                    <br/><br/><div className="text-[#6236FF] font-Amita font-medium text-3xl p-2">Login</div>
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

                        <input type="password" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="password" name="password" placeholder="Password" autoComplete="off" value={
                            selectedRole === 'Student'
                              ? studentData.password || ''
                              : selectedRole === 'Faculty'
                              ? facultyData.password || ''
                              : hodData.password || ''
                          }
                          onChange={handleInputChange} required /><br/><br/>

                        <div className="flex flex-col p-2 justify-between">
                            <input className="p-3 m-2 bg-blue-500 text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent" type="submit" value="Login" />
                            <a href="/resetPass" className="p-2 text-center">Reset Password</a>
                            <p className="font-bold">Don't have an Account ?<a href="/Register"><span className = "text-blue-500"> Create an Account</span></a></p>
                        </div>
                        <ToastContainer autoClose={1000} />
                    </form>
                </div>
            </section>
        </>
    )
}
export default Login
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
const Login = () => {
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
                toast.success('Login Successfully',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
                });
                setTimeout(() => {
                    history("/Dashboard");
                }, 2000);
            }
            else if(res.status==200) {
                toast.error('Email does not Exists', {
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-red-500 dark:text-white dark:bg-slate-600 font-bold',
                });
            }
            else {
                toast.error('Incorrect Password',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-red-500 dark:text-white dark:bg-slate-600 font-bold',
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Navbar />
            <ToastContainer autoClose={1000} />
            <div className="p-5 bg-slate-100 dark:bg-slate-800">
                <div className="flex flex-col md:flex-row-reverse items-center justify-center rounded-lg">
                    <form onSubmit={handleLogin} className="p-5 h-[80vh] bg-violet-400 flex flex-col items-center justify-center gap-6 bg-transparent rounded-lg md:rounded-l-none md:rounded-r-lg ">
                        <h2 className="text-3xl font-bold text-white">LOGIN</h2>
                        <select id="roleid" className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black" value={selectedRole} onChange={handleRoleChange}>
                            {/* <option>Select Your Role</option> */}
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                            <option value="HOD">HOD</option>
                        </select>

                        <input type="text" className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black" name="email" placeholder="Email Address" autoComplete="off" value={
                        selectedRole === 'Student'
                            ? studentData.email || ''
                            : selectedRole === 'Faculty'
                            ? facultyData.email || ''
                            : hodData.email || ''
                        }
                        onChange={handleInputChange} required/>

                        <input type="password" className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black" id="password" name="password" placeholder="Password" autoComplete="off" value={
                            selectedRole === 'Student'
                            ? studentData.password || ''
                            : selectedRole === 'Faculty'
                            ? facultyData.password || ''
                            : hodData.password || ''
                        }
                        onChange={handleInputChange} required />

                        <div className="flex flex-col p-2 justify-between">
                            <input className="p-3 w-full rounded-lg bg-violet-700 text-white font-bold cursor-pointer hover:border-2 hover:border-violet-700 hover:text-violet-700 hover:bg-transparent" type="submit" value="Login" />

                            <a href="/resetPass" className="p-2 text-center">Forgot Password ?</a>
                            <p className="font-bold">Don &apos;t have an Account ?<a href="/Register"><span className = "text-white"> Create an Account</span></a></p>
                        </div>
                    </form>
                    <div className="hidden md:flex md:flex-col items-center justify-center bg-violet-800 h-[80vh] rounded-l-lg">
                        <img src="/illustrate6.svg" className="w-[500px]" alt="logoimg"/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Login
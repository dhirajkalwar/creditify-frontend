import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";
import Cookies from 'js-cookie';
import React, { useState , useContext } from 'react';
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminLogin = () => {
    const {state,dispatch} = useContext(UserContext);
    axios.defaults.withCredentials = true;
    const history = useNavigate();
    const [adminData, setAdminData] = useState({
        role: 'Admin',
        email: '',
        password:'',
    });
    const handleLogin = async (e) => {
        let dataToSend;
        e.preventDefault();
        dataToSend = adminData;
        try {
            const res = await axios.post("/AdminLogin",dataToSend);
            console.log(res);
            if(res.status==201) {
                Cookies.set('jwtoken',res.headers['jwtoken'],{ expires: 2, path: '/' });
                dispatch({ type: "USER_LOGIN", payload: { user: true, userType: adminData.role } });
                toast.success('Login Successfully',{
                    position: toast.POSITION.TOP_CENTER
                });
                setTimeout(() => {
                    history("/AdminDashboard");
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminData({...adminData,[name]: value});
    };

    return (
        <>
            <section className="h-[100vh] flex flex-col items-center justify-center bg-[#E4E9F7]">
                <div className="login p-3 my-[100px] bg-white w-[500px] flex flex-col justify-center items-center shadow-cyan-500/50">
                    <br/><br/><div className="text-[#6236FF] font-Amita font-medium text-3xl p-2">Admin Login</div>
                    <form method="POST" onSubmit={handleLogin}>

                        <input type="email" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" name="email" placeholder="Email Address" autoComplete="off" value={adminData.email} onChange={handleInputChange} required/><br/><br/>

                        <input type="password" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="password" name="password" placeholder="Password" autoComplete="off" value={adminData.password} onChange={handleInputChange} required /><br/><br/>

                        <div className="flex flex-col p-2 justify-between">
                            <input className="p-3 m-2 bg-blue-500 text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent" type="submit" value="Login" />
                        </div>
                        <ToastContainer autoClose={1000} />
                    </form>
                </div>
            </section>
        </>
    );
}
export default AdminLogin
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";
import Cookies from 'js-cookie';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminLogin = () => {
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
                toast.success('Login Successfully',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-green-500 dark:text-white dark:bg-slate-600 font-bold',
                });
                setTimeout(() => {
                    history("/AdminDashboard");
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminData({...adminData,[name]: value});
    };
    return (
        <>
            <Navbar />
            <ToastContainer autoClose={1000} />
            <div className="p-5 bg-slate-100 dark:bg-slate-800">
                <div className="w-full flex flex-col md:flex-row-reverse items-center justify-center rounded-lg">
                    <form onSubmit={handleLogin} className="p-5 h-[80vh] w-[60vh] bg-violet-400 flex flex-col items-center justify-center gap-6 bg-transparent rounded-md md:rounded-l-none md:rounded-r-lg ">
                        <h2 className="text-3xl font-bold text-white">ADMIN LOGIN</h2>

                        <input type="text" className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black" name="email" placeholder="Email Address" autoComplete="off" value={adminData.email} onChange={handleInputChange} required/>

                        <input type="password" className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black" id="password" name="password" placeholder="Password" autoComplete="off" value={adminData.password} onChange={handleInputChange} required />

                        <div className="flex flex-col p-2 w-full justify-between">
                            <input className="p-3 w-full rounded-lg bg-violet-700 text-white font-bold cursor-pointer hover:border-2 hover:border-violet-700 hover:text-violet-700 hover:bg-transparent" type="submit" value="Login" />
                        </div>
                    </form>
                    <div className="hidden md:flex md:flex-col items-center justify-center w-[70vh] bg-violet-800 h-[80vh] rounded-l-lg">
                        <img src="/illustrate7.svg" className="w-[500px]" alt="logoimg"/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default AdminLogin
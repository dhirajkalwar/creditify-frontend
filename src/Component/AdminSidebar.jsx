import { useState } from "react";
import useDarkMode from "./useDarkMode";
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminSidebar = () => {
    axios.defaults.withCredentials = true;
    const history = useNavigate();
    const [colorTheme, setTheme] = useDarkMode();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const callLogoutPage = async () => {
        try {
            const res = await axios.get("/logout");
            document.cookie = `jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            if (res.status == 200) {
                toast.success('Logout Successfully',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-green-500 dark:text-white dark:bg-slate-600 font-bold',
                });
                setTimeout(() => {
                    history('/AdminLogin', {replace:true});
                }, 2000);
            }
            else {
                throw new Error(`Request failed with status ${res.status}`);
            }
        }
        catch(err) {
            console.log(err);
            history('/Login');
        }
    }
    return (
        <>
            <div className={`sidebar px-2 py-5 bg-white dark:bg-slate-700 shadow-lg  shadow-gray-500 dark:shadow-none ${menuOpen ? 'w-[37vh] absolute md:relative' : 'w-[10vh]'}`}>
                <ToastContainer autoClose={1000} />
                <div className="p-2 flex flex-row items-center">
                    <img 
                        src="menu.svg"
                        alt="menu"
                        width={32}
                        height={32}
                        onClick={toggleMenu}
                        className="cursor-pointer dark:invert"
                    />
                </div>
                <div className="p-2 w-full overflow-hidden">
                    <a href="/AdminDashboard" className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className="text-violet-600 dark:text-slate-500 cursor-pointer">
                            <path fill="currentColor" d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"/>
                        </svg>
                        <span className={`px-4 text-md font-bold text-black hover:text-violet-600 dark:text-white dark:hover:text-violet-600 ${menuOpen ? 'block' : 'hidden'}`}>Dashboard</span>
                    </a>
                </div>
                <div className="p-2 w-full overflow-hidden">
                    <a href="/CreateEvent" className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className="text-violet-600 dark:text-slate-500 cursor-pointer">
                            <path fill="currentColor" d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"/>
                            <path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                        </svg>
                        <span className={`px-4 text-md font-bold text-black hover:text-violet-600 dark:text-white dark:hover:text-violet-600 ${menuOpen ? 'block' : 'hidden'}`}>Create Event</span>
                    </a>
                </div>
                <div className="p-2 w-full flex flex-row items-center overflow-hidden">
                    {colorTheme === "light" ? (
                        <svg
                        onClick={() => setTheme("light")}
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-violet-600 dark:text-slate-500 block cursor-pointer"
                        fill="none"
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                        </svg>
                        ) : (
                        <svg
                            onClick={() => setTheme("dark")}
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-violet-600 dark:text-slate-500 block cursor-pointer"
                            fill="none"
                            width="35"
                            height="35"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                    )}
                        <span className={`px-4 text-md font-bold text-black hover:text-violet-600 dark:text-white dark:hover:text-violet-600 ${menuOpen ? 'block' : 'hidden'}`}>Theme</span>
                </div>
                <div className="p-2 w-full overflow-hidden">
                    <button onClick={callLogoutPage} className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className="text-violet-600 dark:text-slate-500 cursor-pointer">
                            <path fill="currentColor" d="M18 2H6a1 1 0 0 0-1 1v9l5-4v3h6v2h-6v3l-5-4v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
                        </svg>
                        <span className={`px-4 text-md font-bold text-black hover:text-violet-600 dark:text-white dark:hover:text-violet-600 ${menuOpen ? 'block' : 'hidden'}`}>Log Out</span>
                    </button>
                </div>
            </div>
        </>
    )
}
export default AdminSidebar;
import { useState } from "react";
import useDarkMode from "./useDarkMode";
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Sidebar = () => {
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
                    history('/Login', {replace:true});
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
            <div className={`h-full px-2 py-5 bg-white dark:bg-slate-700 shadow-lg  shadow-gray-500 dark:shadow-none rounded-md ${menuOpen ? 'w-[37vh] absolute md:relative h-full' : 'w-[10vh] h-full'}`}>
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
                    <a href="/Dashboard" className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className="text-violet-600 dark:text-slate-500 cursor-pointer">
                            <path fill="currentColor" d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"/>
                        </svg>
                        <span className={`px-4 text-md font-bold text-black hover:text-violet-600 dark:text-white dark:hover:text-violet-600 ${menuOpen ? 'block' : 'hidden'}`}>Dashboard</span>
                    </a>
                </div>
                <div className="p-2 w-full overflow-hidden">
                    <a href="/FacultyCertApproval" className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className="text-violet-600 dark:text-slate-500 cursor-pointer">
                            <path fill="currentColor" d="M2.06 14.68a1 1 0 0 0 .46.6l1.91 1.11v2.2a1 1 0 0 0 1 1h2.2l1.11 1.91a1 1 0 0 0 .86.5 1 1 0 0 0 .51-.14l1.9-1.1 1.91 1.1a1 1 0 0 0 1.37-.36l1.1-1.91h2.2a1 1 0 0 0 1-1v-2.2l1.91-1.11a1 1 0 0 0 .37-1.36L20.76 12l1.11-1.91a1 1 0 0 0-.37-1.36l-1.91-1.1v-2.2a1 1 0 0 0-1-1h-2.2l-1.1-1.91a1 1 0 0 0-.61-.46 1 1 0 0 0-.76.1L12 3.26l-1.9-1.1a1 1 0 0 0-1.36.36L7.63 4.43h-2.2a1 1 0 0 0-1 1v2.2l-1.9 1.1a1 1 0 0 0-.37 1.37l1.1 1.9-1.1 1.91a1 1 0 0 0-.1.77zm3.22-3.17L4.39 10l1.55-.9a1 1 0 0 0 .49-.86V6.43h1.78a1 1 0 0 0 .87-.5L10 4.39l1.54.89a1 1 0 0 0 1 0l1.55-.89.91 1.54a1 1 0 0 0 .87.5h1.77v1.78a1 1 0 0 0 .5.86l1.54.9-.89 1.54a1 1 0 0 0 0 1l.89 1.54-1.54.9a1 1 0 0 0-.5.86v1.78h-1.83a1 1 0 0 0-.86.5l-.89 1.54-1.55-.89a1 1 0 0 0-1 0l-1.51.89-.89-1.54a1 1 0 0 0-.87-.5H6.43v-1.78a1 1 0 0 0-.49-.81l-1.55-.9.89-1.54a1 1 0 0 0 0-1.05z"/>
                        </svg>
                        <span className={`px-4 text-md font-bold text-black hover:text-violet-600 dark:text-white dark:hover:text-violet-600 ${menuOpen ? 'block' : 'hidden'}`}>Manage Approval</span>
                    </a>
                </div>
                <div className="p-2 w-full flex flex-row items-center overflow-hidden">
                    {colorTheme === "light" ? (
                        <svg
                        onClick={() => setTheme("light")}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-violet-600 dark:text-slate-500 block cursor-pointer"
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
                            className="h-10 w-10 text-violet-600 dark:text-slate-500 block cursor-pointer"
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
                    <a href="/Profile" className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className="text-violet-600 dark:text-slate-500 cursor-pointer">
                            <path fill="currentColor" d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"/>
                        </svg>
                        <span className={`px-4 text-md font-bold text-black hover:text-violet-600 dark:text-white dark:hover:text-violet-600 ${menuOpen ? 'block' : 'hidden'}`}>Profile</span>
                    </a>
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
export default Sidebar;
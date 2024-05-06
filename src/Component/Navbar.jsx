import { useState } from "react";
import useDarkMode from "./useDarkMode"
import { NAV_LINKS } from "../Constants/index"
const Navbar = () => {
    const [colorTheme, setTheme] = useDarkMode();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <>
            <nav className="relative flex flex-row items-center justify-between bg-slate-100 dark:bg-slate-800 px-5 py-5">
                <a href="/" className="flex flex-row items-center">
                    <img src="darklogo.png" width={200} className='hidden dark:block'/>
                    <img src="lightlogo.png" width={200} className='block dark:hidden'/>
                </a>

                <ul className={`absolute md:relative top-36 md:top-0 bg-slate-100 dark:bg-slate-800 md:dark:bg-transparent w-[90%] md:w-auto h-fit md:h-full gap-12 md:flex p-5 rounded-md md:rounded-none md:p-0 ${menuOpen ? 'block md:flex' : 'hidden md:flex bg-transparent'}`}>
                    {NAV_LINKS.map((link) => (
                        <a href={link.href} key={link.key} className="text-md text-slate-800 dark:text-slate-100 hover:text-violet-600 dark:hover:text-violet-400 font-bold flex items-center justify-center cursor-pointer p-5 md:p-2 transition-all">
                            {link.label}
                        </a>
                    ))}
                </ul>
                <div className="flex items-center justify-center">
                    <a href="/Login">
                        <button className="mx-3 px-10 py-3 bg-transparent hover:bg-violet-600 dark:hover:bg-white font-bold text-md text-violet-600 dark:text-white hover:text-white dark:hover:text-violet-600 border-2 border-violet-600 dark:border-white rounded-md">
                            Login
                        </button>
                    </a>
                    {colorTheme === "light" ? (
                        <svg
                        onClick={() => setTheme("light")}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-violet-600 dark:text-white block cursor-pointer"
                        fill="none"
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
                            className="h-10 w-10 text-violet-600 dark:text-white block cursor-pointer"
                            fill="none"
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
                    <img 
                        src="menu.svg"
                        alt="menu"
                        width={32}
                        height={32}
                        onClick={toggleMenu}
                        className="inline-block cursor-pointer md:hidden dark:invert"
                    />
                </div>
            </nav>
        </>
    )
}
export default Navbar
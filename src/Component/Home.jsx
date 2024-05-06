import Navbar from "./Navbar"
import Footer from "./Footer"
import useDarkMode from "./useDarkMode"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "../axiosConfig";

const Home = () => {
    const [colorTheme] = useDarkMode();
    const history = useNavigate();
    const TechEvent = () => {
        history("/TechEvent")
    }
    const NonTechEvent = () => {
        history("/NonTechEvent")
    }
    const SportsEvent = () => {
        history("/SportsEvent")
    }
    const JoinUs = () => {
        history("/Register")
    }
    const [contactData, setContactData] = useState({
        fname:"",
        lname:"",
        email:"",
        mobileno:"",
        message:"",

    })

    const handelChange = (e) => {
        const {name, value} = e.target;
        setContactData({...contactData,[name]: value});
    }

    const handelSubmit = async(e) => {
        e.preventDefault();
        const  res = await axios.post('/contactus',contactData);
        if(res) {
            setContactData({
                fname:"",
                lname:"",
                email:"",
                mobileno:"",
                message:"",
            })
        }
    }
    return (
        <>
            <Navbar/>
            <div className="bg-slate-100 dark:bg-slate-800">
                <div className="head-banner flex flex-col md:flex-row gap-4 p-5 w-full h-[100vh] md:h-[70vh] bg-violet-800 items-center justify-center">
                    <div className="w-full md:w-[50%] flex flex-col items-start justify-center">
                        <h1 className="px-3 text-3xl font-bold text-white">Creditify - Co-curricular Bank of Credits</h1>
                        <p className="px-3 py-5 text-lg text-justify font-bold text-white">
                            Unlock your achievements, showcase your talents, and earn the recognition you deserve. Lets celebrate your journey of excellence together.
                        </p>

                        <button onClick={JoinUs} className="mx-3 px-10 py-3 bg-white font-bold text-md text-violet-600 rounded-md shadow-lg hover:shadow-gray-400">Join Us</button>
                    </div>
                    <div className="w-full md:w-[50%] flex flex-col items-center">
                        <img src="illustrate1.png" className="w-[700px]"/>
                    </div>
                </div>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" className="shapedivider" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path fill="currentColor" d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill bg-slate-800"></path>
                        <path fill="currentColor" d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill bg-violet-800"></path>
                        <path fill="currentColor" d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill bg-violet-800"></path>
                </svg>
                <div className="about px-5 py-8 flex flex-col items-center justify-center w-full" id="about">
                    <h2 className="py-3 text-4xl font-bold text-slate-800 dark:text-white text-center">Empowering Academic Achievers : <br/>Creditify Innovative Approach to Student Recognition</h2>
                    <div className="head-footer-container p-2 flex flex-col md:flex-row gap-4 items-center justify-center w-full">
                        <div className="card p-5 h-auto w-full md:w-[40%] rounded-xl">
                            <p className="text-2xl py-5 font-serif text-justify text-black dark:text-white">Welcome to the Co-curricular Bank of Credits, your trusted platform for recognizing and rewarding the diverse talents and achievements of our students. We are committed to fostering a culture of holistic development and celebrating excellence in co-curricular activities.</p>
                        </div>
                        <div className="card p-5 h-auto w-full md:w-[40%] rounded-xl">
                            <img src="illustrate2.svg" className="w-[500px]"/>
                        </div>
                    </div>
                </div>
                <div className="steps p-5 flex flex-col items-center justify-center w-full" id="howitworks">
                    <h2 className="py-2 text-4xl font-bold text-slate-800 dark:text-white text-center">How it Works ?</h2>
                    <div className="head-footer-container p-5 flex flex-col gap-4 items-center justify-center w-full">
                        <div className="p-3">
                            {colorTheme === "light" ? (
                                <img src="darkimg.png" width={800}/>
                            ) : (
                                <img src="lightimg.png" width={800}/>
                            )}
                        </div>
                        <div className="px-10">
                            <p className="p-5 text-xl text-center text-black dark:text-white">Students upload their co-curricular certificates on Creditify. Staff members review and can accept or reject them. Accepted certificates move to the Head of Department (HOD) for further review. Upon HOD approval, Creditify algorithm calculates a credit score based on achievement level. Verified certificates and credit scores are then allocated to the students account, rewarding their participation transparently and systematically.</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    
                </div>
                <div className="other h-auto p-5 flex flex-col md:flex-row gap-6 items-center justify-center w-full bg-violet-800" id="other">
                    <div className="p-2 flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"   className="text-violet-800 p-2 bg-white rounded-full" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19.903 8.586a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.952.952 0 0 0-.051-.259c-.01-.032-.019-.063-.033-.093zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"/>
                            <path fill="currentColor" d="M8 12h8v2H8zm0 4h8v2H8zm0-8h2v2H8z"/>
                        </svg>
                        <div className="p-2 head-txt flex flex-col items-center gap-4 justify-center">
                            <h2 className="text-3xl font-bold text-white">Brief</h2>
                            <span className="text-lg text-white">Online centralized system</span>
                            <span className="text-lg text-white">Credit accumulation and redemption</span>
                            <span className="text-lg text-white">Credit audit trail management</span>
                            <span className="text-lg text-white">Credit accounting</span>
                        </div>
                    </div>
                    <div className="p-2 flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"   className="text-violet-800 p-2 bg-white rounded-full" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9 20h6v2H9zm7.906-6.288C17.936 12.506 19 11.259 19 9c0-3.859-3.141-7-7-7S5 5.141 5 9c0 2.285 1.067 3.528 2.101 4.73.358.418.729.851 1.084 1.349.144.206.38.996.591 1.921H8v2h8v-2h-.774c.213-.927.45-1.719.593-1.925.352-.503.726-.94 1.087-1.363zm-2.724.213c-.434.617-.796 2.075-1.006 3.075h-2.351c-.209-1.002-.572-2.463-1.011-3.08a20.502 20.502 0 0 0-1.196-1.492C7.644 11.294 7 10.544 7 9c0-2.757 2.243-5 5-5s5 2.243 5 5c0 1.521-.643 2.274-1.615 3.413-.373.438-.796.933-1.203 1.512z"/>
                        </svg>
                        <div className="p-2 head-txt flex flex-col gap-4 items-center justify-center">
                            <h2 className="text-3xl font-bold text-white">Benefits</h2>
                            <span className="text-lg text-white">Enable student mobility</span>
                            <span className="text-lg text-white">Academic flexibility</span>
                            <span className="text-lg text-white">Allows student to choose own learning path</span>
                            <span className="text-lg text-white">Recognized learning achievements</span>
                        </div>
                    </div>
                    <div className="p-2 flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"   className="text-violet-800 p-2 bg-white rounded-full" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z"/>
                        </svg>
                        <div className="p-2 head-txt flex flex-col gap-4 items-center justify-center">
                            <h2 className="text-3xl font-bold text-white">Key Feature</h2>
                            <span className="text-lg text-white">Multiple entry multiple exit</span>
                            <span className="text-lg text-white">Anytime anywhere learning</span>
                            <span className="text-lg text-white">Allows student to study at their own pace</span>
                            <span className="text-lg text-white">Transparency</span>
                        </div>
                    </div>
                </div>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" className="shapedivider border-none" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                </svg>
                <div className="otherabout px-5 py-8 flex flex-col items-center justify-center w-full">
                    <h2 className="py-3 text-4xl font-bold text-slate-800 dark:text-white text-center">What is Co-curricular Bank of Credits ?</h2>
                    <div className="head-footer-container p-2 flex flex-col md:flex-row gap-4 items-center justify-center w-full">
                        <div className="card p-5 h-auto w-full md:w-[40%] rounded-xl">
                            <p className="text-xl py-5 font-serif text-justify text-black dark:text-white">
                            The Co-curricular Bank of Credits is a platform aimed at systematically tracking students involvement in extracurricular activities alongside their academic pursuits, offering them recognition through the allocation of &quot;credits.&quot; These credits signify the value attributed to their participation in non-academic activities, serving as a means of acknowledging their personal development and incentivizing further engagement in education. This platform not only acknowledges students efforts but also encourages holistic growth by providing opportunities for involvement beyond the traditional academic curriculum. It operates with transparency, maintaining comprehensive records of students extracurricular participation to ensure fairness and accountability in the evaluation process. By offering incentives and recognition for participation in extracurricular activities, the Co-curricular Bank of Credits fosters increased engagement and provides students with additional avenues for success in their educational journey. Overall, it serves as a tool to enrich students educational experiences and promote their overall development.
                            </p>
                        </div>
                        <div className="card p-5 h-auto w-full md:w-[40%] rounded-xl">
                            <img src="illustrate2.svg" className="w-[500px]"/>
                        </div>
                    </div>
                </div>
                <h2 className="text-center text-3xl font-bold text-black dark:text-white">Categories</h2>
                <div className="category px-5 py-8 flex flex-col md:flex-row gap-4 items-center justify-center w-full" id="categories">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <img src="/TECH.png" width={400} className="rounded-lg"/>
                        <h2 className="text-xl text-center text-black dark:text-white">Technical Events</h2>
                        <button onClick={TechEvent} className="p-3 m-2 bg-violet-700 text-white font-bold cursor-pointer hover:border-2 hover:border-violet-700 dark:hover:border-white hover:text-violet-700 dark:hover:text-white hover:bg-transparent w-full md:w-[30%] rounded-md">Read More</button>
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <img src="/NON-TECH.png" width={470} className="rounded-lg"/>
                        <h2 className="text-xl text-center text-black dark:text-white">Non-Technical Events</h2>
                        <button onClick={NonTechEvent} className="p-3 m-2 bg-violet-700 text-white font-bold cursor-pointer hover:border-2 hover:border-violet-700 dark:hover:border-white hover:text-violet-700 dark:hover:text-white hover:bg-transparent w-full md:w-[30%] rounded-md">Read More</button>
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <img src="/SPORTS.png" width={400} className="rounded-lg"/>
                        <h2 className="text-xl text-center text-black dark:text-white">Sports Events</h2>
                        <button onClick={SportsEvent} className="p-3 m-2 bg-violet-700 text-white font-bold cursor-pointer hover:border-2 hover:border-violet-700 dark:hover:border-white hover:text-violet-700 dark:hover:text-white hover:bg-transparent w-full md:w-[30%] rounded-md">Read More</button>
                    </div>
                </div>
                <div className="contact px-5 py-8 flex flex-col md:flex-row gap-4 items-center justify-center w-full" id="contact">
                    <div className="w-[50%] flex flex-col">
                        <h2 className="text-center text-3xl font-bold text-black dark:text-white">Contact Us</h2>
                        <form onSubmit={handelSubmit} className="p-5 w-full flex flex-col gap-4">
                            <div className="flex flex-row gap-4 w-full">
                                <input type="text" name="fname" value={contactData.fname} placeholder="First Name" onChange={handelChange} className="px-4 py-2 bg-transparent border-b-2 border-violet-700 dark:border-white outline-none w-full text-violet-700 dark:text-white font-bold text-lg placeholder-violet-700 dark:placeholder-white"/>
                                <input type="text" name="lname" value={contactData.lname} placeholder="Last Name" onChange={handelChange} className="px-4 py-2 bg-transparent border-b-2 border-violet-700 dark:border-white outline-none w-full text-violet-700 dark:text-white font-bold text-lg placeholder-violet-700 dark:placeholder-white"/>
                            </div>
                            <div className="flex flex-row gap-4 w-full">
                                <input type="email" name="email" value={contactData.email} placeholder="Email" onChange={handelChange} className="px-4 py-2 bg-transparent border-b-2 border-violet-700 dark:border-white outline-none w-full text-violet-700 dark:text-white font-bold text-lg placeholder-violet-700 dark:placeholder-white"/>
                                <input type="text" name="mobileno" value={contactData.mobileno} placeholder="Mobile Number" onChange={handelChange} className="px-4 py-2 bg-transparent border-b-2 border-violet-700 dark:border-white outline-none w-full text-violet-700 dark:text-white font-bold text-lg placeholder-violet-700 dark:placeholder-white"/>
                            </div>
                            <div className="flex flex-row gap-4 w-full">
                                <textarea rows="4" name="message" value={contactData.message} placeholder="Message" onChange={handelChange} className="px-4 py-2 bg-transparent border-b-2 border-violet-700 dark:border-white outline-none w-full text-violet-700 dark:text-white font-bold text-lg placeholder-violet-700 dark:placeholder-white"/>
                            </div>
                            <div className="flex flex-row items-center justify-center gap-2 w-full">
                                <button type="submit"  name="b1" className="p-3 text-xl font-bold text-white bg-violet-700 hover:bg-transparent w-[30%] rounded-md cursor-pointer border-0 hover:border-violet-700 hover:dark:border-white hover:border-2 hover:text-violet-700 dark:hover:text-white">Send Message</button>
                            </div>
                        </form>
                    </div>
                    <div className="w-[50%]">
                        <img src="illustrate4.svg" alt="contactimg"/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default Home
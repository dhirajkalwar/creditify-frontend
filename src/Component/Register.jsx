import Navbar from "./Navbar"
import Footer from "./Footer"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
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
                console.log(dataToSend);
                const res = await axios.post("/Register",dataToSend) ;
                if(res.status==201) {
                    toast.success('Registered Successfully',{
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false,
                        hideProgressBar: false,
                        className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
                    });
                    setTimeout(() => {
                        history("/Login");
                    }, 2000);
                }
                else if(res.status==203) {
                    toast.error('Email Already Exists',{
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false,
                        hideProgressBar: false,
                        className: 'bg-white text-red-500 dark:text-white dark:bg-slate-600 font-bold',
                    });
                }else if(res.status == 204) {
                    toast.error('Incorrect UserId',{
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false,
                        hideProgressBar: false,
                        className: 'bg-white text-red-500 dark:text-white dark:bg-slate-600 font-bold',
                    });
                }else if(res.status == 205) {
                    toast.error('UserId Already Exists',{
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false,
                        hideProgressBar: false,
                        className: 'bg-white text-red-500 dark:text-white dark:bg-slate-600 font-bold',
                    });
                }
                else {
                    toast.error('Registration Failed',{
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false,
                        hideProgressBar: false,
                        className: 'bg-white text-red-500 dark:text-white dark:bg-slate-600 font-bold',
                    });
                }
            } catch (error) {
                console.log(error);
            }
      };
    return (
        <>
            <Navbar />
            <ToastContainer autoClose={1000} />
            <div className="p-5 bg-slate-100 dark:bg-slate-800">
                <div className="flex flex-col md:flex-row-reverse items-center justify-center rounded-lg">
                    <form onSubmit={handleSubmit} className="p-3 w-full md:w-auto h-auto md:h-[100vh] bg-violet-400 flex flex-col items-center justify-center gap-4 bg-transparent rounded-md md:rounded-l-none md:rounded-r-lg">
                        <h2 className="text-3xl font-bold text-white">REGISTER</h2>
                        <select id="role" name="role" value={selectedRole} onChange={handleRoleChange} className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg" autoComplete="off">
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                            <option value="HOD">HOD</option>
                        </select>

                        <div className="flex flex-col md:flex-row w-full gap-4">
                            <input type="text" className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black" id="firstName" placeholder="First Name" name="firstName" autoComplete="off"
                            value={
                            selectedRole === 'Student'
                            ? studentData.firstName || ''
                            : selectedRole === 'Faculty'
                            ? facultyData.firstName || ''
                            : hodData.firstName || ''
                            }
                            onChange={handleInputChange} required/>

                            <input type="text" className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black" id="lastName" placeholder="Last Name" name="lastName" autoComplete="off" 
                            value={
                            selectedRole === 'Student'
                            ? studentData.lastName || ''
                            : selectedRole === 'Faculty'
                            ? facultyData.lastName || ''
                            : hodData.lastName || ''
                            }
                            onChange={handleInputChange} required/>
                        </div>
                        <div className="flex flex-col md:flex-row flex-wrap w-full gap-4">
                            <input type="text" className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black" id="userid" placeholder="User ID" name="userId" autoComplete="off"
                            value={
                            selectedRole === 'Student'
                            ? studentData.userId || ''
                            : selectedRole === 'Faculty'
                            ? facultyData.userId || ''
                            : hodData.userId || ''
                            }
                            onChange={handleInputChange} required/>
                            <input type="email" className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black" id="email" placeholder="Email ID" name="email" autoComplete="off"
                            value={
                            selectedRole === 'Student'
                            ? studentData.email || ''
                            : selectedRole === 'Faculty'
                            ? facultyData.email || ''
                            : hodData.email || ''
                            }
                            onChange={handleInputChange} required/>
                        </div>
                        <input type="text" list="dept" className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black" id="deptname" placeholder="Select Department" name="department" autoComplete="off"
                        value={
                        selectedRole === 'Student'
                        ? studentData.department || ''
                        : selectedRole === 'Faculty'
                        ? facultyData.department || ''
                        : hodData.department || ''
                        }
                        onChange={handleInputChange} required/>
                        <datalist id="dept">
                            <option value="Computer Science"/>
                            <option value="Information Technology"/>
                            <option value="Electronics & Telecommunication"/>
                            <option value="Mechanical Engineering"/>
                        </datalist>
                        <div className={`w-full ${selectedRole === 'Student' ? 'block' : 'hidden'}`}>
                            <input type="text" list="year" className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black" id="studyyear" placeholder="Select Year" name="year" value={studentData.year} onChange={handleInputChange || ''}/><br/>
                            <datalist id="year">
                                <option value="First Year"/>
                                <option value="Second Year"/>
                                <option value="Third Year"/>
                                <option value="Final Year"/>
                            </datalist>
                        </div>
                        
                        <div className={`w-full ${selectedRole === 'Faculty' ? 'block' : 'hidden'}`}>
                            <input type="text" list="stafftype" className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black" id="facultytype" placeholder="Faculty Role Type" name="facultyType" value={facultyData.facultyType || ''} onChange={handleInputChange} autoComplete="off" />
                            <datalist id="stafftype">
                                <option value="Technical"/>
                                <option value="Non_Technical"/>
                                <option value="Sports"/>
                            </datalist>
                        </div>
                        <input type="password" className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black" id="password" placeholder="Password" name="password" pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$" autoComplete="off"
                        value={
                        selectedRole === 'Student'
                        ? studentData.password || ''
                        : selectedRole === 'Faculty'
                        ? facultyData.password || ''
                        : hodData.password || ''
                        }
                        onChange={handleInputChange} required/>
                        <input className="p-3 w-full rounded-lg bg-violet-900 text-white font-bold cursor-pointer hover:border-2 hover:border-violet-900 hover:text-violet-900 hover:bg-transparent" type="submit" value="Register" />

                        <p className="p-2 font-bold text-center">Already have an account ?<a href="/Login"><span className = "text-white"> Log In</span></a></p>
                    </form>
                    <div className="hidden md:flex md:flex-col items-center justify-center bg-violet-800 h-[100vh] rounded-l-lg">
                        <img src="/illustrate5.svg" className="w-[500px]" alt="logoimg"/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Register
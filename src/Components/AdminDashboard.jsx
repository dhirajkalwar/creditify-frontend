import React,{ useEffect , useState , useContext } from 'react';
import axios from "../axiosConfig";

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
    const {state,dispatch} = useContext(UserContext);
    const history = useNavigate();
    axios.defaults.withCredentials = true;
    const [uploadDetail, setUploadDetail] = useState({
        Total:0,
        Approved:0,
        Rejected:0,
        hodLength:0,
        studentLength : 0,
        facultyLength : 0,
    });
    const [userData,setUserData] = useState({
        role: '',
        name: '',
        email: '',
    });
    const [studentData,setStudentData] = useState([]);
    const [FacultyData,setFacultyData] = useState([]);
    const [hodData,setHodData] = useState([]);
    const callDashboardPage = async () => {
        try {
            console.log(document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1'));
            const res = await axios.get("/admindashboard",{
                headers:{
                    'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
                }
            });
            const data = res.data;
            setUserData(data);
            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            else {
                dispatch({ type: "USER_LOGIN", payload: { user: true, userType: data.role } });
                toast.info(`Welcome ${data.name}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
        catch(err) {
            history('/AdminLogin');
        }

        try {
            const res = await axios.get("/admindashboard/detail",{
                headers:{
                    'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
                }
            });
            const data = res.data;
            console.log(data);
            setUploadDetail(data);
        } catch (error) {
            console.log(error);
        }

        try {
            const res = await axios.get("/GetStudentData",{
                headers:{
                    'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
                }
            });
            const studdata = res.data;
            console.log(studdata);
            setStudentData(studdata);
        }
        catch(error) {
            console.log("Error fetching student details:", error);
        }
        try {
            const res = await axios.get("/GetStaffData",{
                headers:{
                    'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
                }
            });
            const staffdata = res.data;
            console.log(staffdata);
            setFacultyData(staffdata);
        }
        catch(error) {
            console.log("Error fetching student details:", error);
        }
        try {
            const res = await axios.get("/GetHODData",{
                headers:{
                    'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
                }
            });
            const hoddata = res.data;
            console.log(hoddata);
            setHodData(hoddata);
        }
        catch(error) {
            console.log("Error fetching student details:", error);
        }
    }
    const [showStudent, setShowStudent] = useState(true);
    const [showFaculty, setShowFaculty] = useState(false);
    const [showHOD, setShowHOD] = useState(false);
    const showStudentDetails = () => {
        setShowStudent(true);
        setShowFaculty(false);
        setShowHOD(false);
    };
    const showFacultyDetails = () => {
        setShowStudent(false);
        setShowFaculty(true);
        setShowHOD(false);
    };
    const showHODDetails = () => {
        setShowStudent(false);
        setShowFaculty(false);
        setShowHOD(true);
      };
    useEffect(() => {
        callDashboardPage();
    },[]);
    return (
        <>
            <section className="dashboard h-auto flex flex-col bg-[#E4E9F7]">
            <h1 className="text-[#6236FF] mt-20 p-5 font-Amita font-bold text-4xl">Dashboard</h1>
            <ToastContainer autoClose={2000} />
            <h3 className="text-[#0e3ae8] px-5 font-Amita font-bold text-3xl">Hey {userData.name}</h3>
            <div className="dashboard-status w-[100%] p-5 flex flex-col md:flex-row flex-wrap">
                <div className="p-10 m-2 w-[45%] bg-orange-400 rounded-md">
                    <h1 className="text-white font-bold text-3xl p-2">Total Student</h1>
                    <span className="p-2 text-white font-bold text-4xl">{uploadDetail.studentLength}</span>
                </div>
                <div className="p-10 m-2 w-[45%] bg-[#5c07ab] rounded-md">
                    <h1 className="text-white font-bold text-3xl p-2">Total Faculty</h1>
                    <span className="p-2 text-white font-bold text-4xl">{uploadDetail.facultyLength}</span>
                </div>
                <div className="p-10 m-2 w-[45%] bg-[#fae84b] rounded-md">
                    <h1 className="text-white font-bold text-3xl p-2">Total HOD</h1>
                    <span className="p-2 text-white font-bold text-4xl">{uploadDetail.hodLength}</span>
                </div>
                <div className="p-10 m-2 w-[45%] bg-[#038f28] rounded-md">
                    <h1 className="text-white font-bold text-3xl p-2">Total Upload</h1>
                    <span className="p-2 text-white font-bold text-4xl">{uploadDetail.Total}</span>
                </div>
                <div className="p-10 m-2 w-[45%] bg-[#41f14a] rounded-md">
                    <h1 className="text-white font-bold text-3xl p-2">Total Approved</h1>
                    <span className="p-2 text-white font-bold text-4xl">{uploadDetail.Approved}</span>
                </div>
                <div className="p-10 m-2 w-[45%] bg-[#d12f06] rounded-md">
                    <h1 className="text-white font-bold text-3xl p-2">Total Rejected</h1>
                    <span className="p-2 text-white font-bold text-4xl">{uploadDetail.Rejected}</span>
                </div>
            </div>
            <div className="otherdetails">
                <h3 className="text-[#0e3ae8] px-5 font-Amita font-bold text-3xl">Other Information</h3>

                <div className="p-5 flex flex-row items-center justify-center rounded-full">
                    <div className="flex flex-row w-[60%] rounded-full">
                        <button type="button" className="rounded-l-full p-3 bg-blue-500 w-[40%] text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent" onClick={showStudentDetails}>Student Detail</button>
                        <button type="button" className="p-3 bg-[#98ee36] w-[40%] text-white font-bold cursor-pointer hover:border-2 hover:border-[#98ee36] hover:text-[#98ee36] hover:bg-transparent" onClick={showFacultyDetails}>Faculty Detail</button>
                        <button type="button" className="rounded-r-full p-3 bg-[#ac34e4] w-[40%] text-white font-bold cursor-pointer hover:border-2 hover:border-[#ac34e4] hover:text-[#ac34e4] hover:bg-transparent" onClick={showHODDetails}>HOD Detail</button>
                    </div>
                </div>
            </div>
            <div className="w-[98%] m-[1%]">
                {showStudent && (
                    <table className="rounded-lg flex flex-col  overflow-hidden border-collapse ">
                        <thead >
                            <tr className="bg-[#ff702a] flex text-white w-[100%]">
                                <td className='bg-transparent w-[20%]'>Name</td>
                                <td className='bg-transparent w-[20.5%]'>Email ID</td>
                                <td className='bg-transparent w-[20%]'>Student ID</td>
                                <td className='bg-transparent w-[20%]'>Department</td>
                                <td className='bg-transparent w-[19%]'>Year</td>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.map((student) => (
                            <tr key={student._id} className='flex flex-wrap p-2 bg-[#dddddd] text-blue-500 w-[100%] '>
                                <td className="w-[20%]">{student.firstName} {student.lastName}</td>
                                <td className="w-[20.5%]">{student.email}</td>
                                <td className="w-[20%]">{student.userId}</td>
                                <td className="w-[20%]">{student.department}</td>
                                <td className="w-[19%]">{student.year}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
                {showFaculty && (
                    <table className="rounded-lg flex flex-col  overflow-hidden border-collapse ">
                        <thead>
                            <tr className="bg-[#ff702a] flex text-white w-[100%]">
                                <td className='bg-transparent w-[25%]'>Name</td>
                                <td className='bg-transparent w-[25%]'>Email ID</td>
                                <td className='bg-transparent w-[25%]'>Faculty ID</td>
                                <td className='bg-transparent w-[25%]'>Department</td>
                            </tr>
                        </thead>
                        <tbody>
                        {FacultyData.map((faculty) => (
                            <tr key={faculty._id} className='p-2 flex flex-wrap bg-[#dddddd] text-blue-500 w-[100%] '>
                                <td className="w-[25%]">{faculty.firstName} {faculty.lastName}</td>
                                <td className="w-[25%]">{faculty.email}</td>
                                <td className="w-[25%]">{faculty.userId}</td>
                                <td className="w-[25%]">{faculty.department}</td>
                            </tr>
                        ))}
                        </tbody>
                        
                    </table>
                )}
                {showHOD && (
                    <table className="rounded-lg flex flex-col  overflow-hidden border-collapse ">  
                            <thead>
                                <tr className="bg-[#ff702a] flex text-white  w-[100%] ">
                                    <td className='bg-transparent w-[25%]'>Name</td>
                                    <td className='bg-transparent w-[25%]'>Email ID</td>
                                    <td className='bg-transparent w-[25%]'>HOD ID</td>
                                    <td className='bg-transparent w-[25%]'>Department</td>
                                </tr>
                            </thead>
                            <tbody>
                            {hodData.map((hod) => (
                            <tr key={hod._id} className=' p-2 flex flex-wrap bg-[#dddddd] text-blue-500 w-[100%] '>
                                <td className="w-[25%]">{hod.firstName} {hod.lastName}</td>
                                <td className="w-[25%]">{hod.email}</td>
                                <td className="w-[25%]">{hod.userId}</td>
                                <td className="w-[25%]">{hod.department}</td>
                            </tr>
                        ))}
                            </tbody>
                    </table>
                )}
            </div>
            </section>
        </>
    )
}
export default AdminDashboard
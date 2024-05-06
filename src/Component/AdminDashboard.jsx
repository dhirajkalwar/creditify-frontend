import { useEffect , useState,useCallback } from 'react';
import axios from "../axiosConfig";
import AdminSidebar from './AdminSidebar';
import AdminSideTopNav from './AdminSideTopNav';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminDashboard = () => {
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
    const [studentData,setStudentData] = useState([]);
    const [FacultyData,setFacultyData] = useState([]);
    const [hodData,setHodData] = useState([]);

    const callDashboardPage = useCallback(async () => {
        try {
            const res = await axios.get("/admindashboard",{
                headers:{
                    'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
                }
            });
            const data = res.data;
            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            else {
                toast.info(`Welcome ${data.name}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-blue-500 dark:text-white dark:bg-slate-600 font-bold',
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
    },[history]);
    useEffect(() => {
        callDashboardPage();
    },[callDashboardPage]);
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
    return (
        <>
            <div className='min-h-screen bg-slate-100 dark:bg-slate-800 flex flex-row'>
                <ToastContainer autoClose={1000} />
                <div className='w-auto h-auto'>
                    <AdminSidebar/>
                </div>
                <div className='w-full h-full flex flex-col'>
                    <div className='p-0'>
                        <AdminSideTopNav/>
                    </div>
                    <div className='p-5 w-full'>
                        <div className="px-3 py-5 dashboard-cards-container flex flex-row flex-wrap gap-4 items-center justify-start">
                            <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                <h1 className='text-2xl font-bold text-violet-700 dark:text-white'>Total Student</h1>
                                <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.studentLength}</span>
                            </div>
                            <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                <h1 className='text-2xl font-bold text-violet-700 dark:text-white'>Total Faculty</h1>
                                <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.facultyLength}</span>
                            </div>
                            <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                <h1 className='text-2xl font-bold text-violet-700 dark:text-white'>Total HOD</h1>
                                <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.hodLength}</span>
                            </div>
                            <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                <h1 className='text-2xl font-bold text-violet-700 dark:text-white'>Total Upload</h1>
                                <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.Total}</span>
                            </div>
                            <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                <h1 className='text-2xl font-bold text-violet-700 dark:text-white'>Total Verified</h1>
                                <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.Approved}</span>
                            </div>
                            <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                <h1 className='text-2xl font-bold text-violet-700 dark:text-white'>Total Rejected</h1>
                                <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.Rejected}</span>
                            </div> 
                        </div>

                        <div className="otherdetails">
                            <h3 className="text-violet-700 dark:text-white px-5 font-Amita font-bold text-3xl">Other Information</h3>

                            <div className="p-5 flex flex-row items-center justify-center rounded-full">
                                <div className="flex flex-row w-[60%] rounded-full">
                                    <button type="button" className="rounded-l-lg p-3 bg-violet-700 dark:bg-white w-[40%] text-white dark:text-violet-700 font-bold cursor-pointer hover:border-2 hover:border-violet-700 hover:text-violet-700 hover:bg-transparent" onClick={showStudentDetails}>Student Detail</button>
                                    <button type="button" className="p-3 bg-violet-700 dark:bg-white w-[40%] text-white dark:text-violet-700 font-bold cursor-pointer hover:border-2 hover:border-violet-700 hover:text-violet-700 hover:bg-transparent" onClick={showFacultyDetails}>Faculty Detail</button>
                                    <button type="button" className="rounded-r-lg p-3 bg-violet-700 dark:bg-white w-[40%] text-white dark:text-violet-700 font-bold cursor-pointer hover:border-2 hover:border-violet-700 hover:text-violet-700 hover:bg-transparent" onClick={showHODDetails}>HOD Detail</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-[98%] m-[1%]">
                        {showStudent && (
                            <table className="rounded-lg flex flex-col  overflow-hidden border-collapse ">
                                <thead>
                                    <tr className="p-2 font-bold bg-violet-700 flex text-white w-[100%]">
                                        <td className='bg-transparent w-[20%] text-center'>Name</td>
                                        <td className='bg-transparent w-[20.5%] text-center'>Email ID</td>
                                        <td className='bg-transparent w-[20%] text-center'>Student ID</td>
                                        <td className='bg-transparent w-[20%] text-center'>Department</td>
                                        <td className='bg-transparent w-[19%] text-center'>Year</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData.map((student) => (
                                        <tr key={student._id} className='flex flex-wrap p-2 bg-[#dddddd] text-violet-700 font-bold w-[100%] '>
                                            <td className="w-[20%] text-center">{student.firstName} {student.lastName}</td>
                                            <td className="w-[20.5%] text-center">{student.email}</td>
                                            <td className="w-[20%] text-center">{student.userId}</td>
                                            <td className="w-[20%] text-center">{student.department}</td>
                                            <td className="w-[19%] text-center">{student.year}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {showFaculty && (
                            <table className="rounded-lg flex flex-col  overflow-hidden border-collapse ">
                                <thead>
                                    <tr className="p-2 font-bold bg-violet-700 flex text-white w-[100%]">
                                        <td className='bg-transparent w-[25%] text-center'>Name</td>
                                        <td className='bg-transparent w-[25%] text-center'>Email ID</td>
                                        <td className='bg-transparent w-[25%] text-center'>Faculty ID</td>
                                        <td className='bg-transparent w-[25%] text-center'>Department</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {FacultyData.map((faculty) => (
                                        <tr key={faculty._id} className='p-2 flex flex-wrap bg-[#dddddd] text-violet-700 font-bold w-[100%] '>
                                            <td className="w-[25%] text-center">{faculty.firstName} {faculty.lastName}</td>
                                            <td className="w-[25%] text-center">{faculty.email}</td>
                                            <td className="w-[25%] text-center">{faculty.userId}</td>
                                            <td className="w-[25%] text-center">{faculty.department}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {showHOD && (
                            <table className="rounded-lg flex flex-col  overflow-hidden border-collapse ">  
                                <thead>
                                    <tr className="p-2 font-bold bg-violet-700 flex text-white w-[100%]">
                                        <td className='bg-transparent w-[25%] text-center'>Name</td>
                                        <td className='bg-transparent w-[25%] text-center'>Email ID</td>
                                        <td className='bg-transparent w-[25%] text-center'>HOD ID</td>
                                        <td className='bg-transparent w-[25%] text-center'>Department</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hodData.map((hod) => (
                                        <tr key={hod._id} className=' p-2 flex flex-wrap bg-[#dddddd] text-violet-500 font-bold w-[100%] '>
                                            <td className="w-[25%] text-center">{hod.firstName} {hod.lastName}</td>
                                            <td className="w-[25%] text-center">{hod.email}</td>
                                            <td className="w-[25%] text-center">{hod.userId}</td>
                                            <td className="w-[25%] text-center">{hod.department}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminDashboard
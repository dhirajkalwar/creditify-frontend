import { useEffect , useState,useCallback } from 'react';
import axios from "../axiosConfig";
import StudentSidebar from './StudentSidebar';
import StaffSidebar from './StaffSidebar';
import HODSidebar from './HODSidebar';
import SideTopNav from './SideTopNav';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactApexChart from 'react-apexcharts';
const Dashboard = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const [graphdata, setGraphdata] = useState([]);
    const [piedata, setPiedata] = useState([]);
    const [labeldata, setLabeldata] = useState([])
    const PieChart = () => {
        const series = piedata;
        const options = {
            chart: {
                width: 300,
                type: 'pie',
            },
            labels: labeldata,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };
    
        return (
            <div>
                <div id="chart">
                    <ReactApexChart options={options} series={series} type="pie" width={500} />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    };
    const ApexChart = () => {
        const series = [{
            name: "Credits",
            data: graphdata
        }];
    
        const options = {
            chart: {
                height: 150,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight',
                colors: ['#8A2BE2'],
            },
            title: {
                text: 'Semester Wise Credit Report',
                align: 'left',
            },
            grid: {
                row: {
                    colors: ['transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Semester 1','Semester 2','Semester 3','Semester 4','Semester 5','Semester 6','Semester 7','Semester 8'],
            }
        };
    
        return (
            <div className='w-full max-w-2xl mx-auto'>
                <ReactApexChart options={options} series={series} type="line" height={350} />
            </div>
        );
    };
    const [data, setData] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [uploadDetail, setUploadDetail] = useState({
        Approved:0,
        Rejected:0,
        hodLength:0,
        studentLength : 0,
        upload: 0,
        facultyLength : 0,
        credit : 0,
    });
    const history = useNavigate();
    axios.defaults.withCredentials = true;
    const [studentData,setStudentData] = useState([]);
    const [FacultyData,setFacultyData] = useState([]);
    const [userData,setUserData] = useState({
        role: '',
        firstName: '',
        lastName: '',
        userId: '',
        email: '',
        department: '',
        year: '',
        facultyType:'',
    });

    const callDashboardPage = useCallback(async () => {
        try {
            const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

            const res = await axios.get("/dashboard",{
                headers:{
                    'jwtoken':cookieValue
                }
            });
            
            const data = res.data;
            setUserData(data);
            // get category labels 
            const res3 = await axios.get('/dashboard/labels', {
                headers:{
                    'jwtoken':cookieValue
                }
            });
            let labels = [];
            const data3 = res3.data;
            for (const label in data3) {
                labels.push(data3[label]);
            }
            setLabeldata(labels)



            //-----------end------------------



            const res1 = await axios.get('/dashboard/graph',{
                headers:{
                    'jwtoken':cookieValue
                }
            });
            let semesterValuesArray = [];
            const data1 = res1.data;
            for (const sem in data1) {
                semesterValuesArray.push(data1[sem]);
            }
            setGraphdata(semesterValuesArray)

            const res2 = await axios.get('/dashboard/pie',{
                headers:{
                    'jwtoken':cookieValue
                }
            });
            const data2 = res2.data;
            console.log(data2);
            setPiedata(data2)

            if(res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            else {
                toast.info(`Welcome ${data.firstName} ${data.lastName}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-blue-500 dark:text-white dark:bg-slate-600 font-bold',
                });
            }
        }
        catch(err) {
            history('/Login');
        }

        try {
            const res = await axios.get("/studentUpload",{
                headers:{
                    'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
                }
            });
            const data = res.data;
            if(data.length !== 0){
                setData(data);
            }else setData(null);

            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
        }
        catch(error) {
            console.log(error);
        }

        try {
            const res = await axios.get("/dashboard/detail",{
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
            const res = await axios.get("/GetStudentDataByDepartment",{
                headers:{
                    'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
                }
            });
            const studdata = res.data;
            setStudentData(studdata);
        }
        catch(error) {
            console.log("Error fetching student details:", error);
        }
        try {
            const res = await axios.get("/GetStaffDataByDepartment",{
                headers:{
                    'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
                }
            });
            const staffdata = res.data;
            setFacultyData(staffdata);
        }
        catch(error) {
            console.log("Error fetching student details:", error);
        }
    },[history]);
    useEffect(() => {
        callDashboardPage();
    },[callDashboardPage]);

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };
    const [showStudent, setShowStudent] = useState(false);
    const showStudentDetails = () => {
        setShowStudent(true);
    };
    const hideStudentDetails = () => {
        setShowStudent(false);
    };
    const [displayStudent, setDisplayStudent] = useState(true);
    const [displayFaculty, setDisplayFaculty] = useState(false);
    const displayStudentDetails = () => {
        setDisplayStudent(true);
        setDisplayFaculty(false);
    };
    const displayFacultyDetails = () => {
        setDisplayStudent(false);
        setDisplayFaculty(true);
    };
    const getPdf = async (ID) => {
        const res = await axios.post('/getPdf',{ID:ID},{ responseType : 'arraybuffer'})
        const blob = new Blob([res.data],{ type: 'application/pdf'});
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        openModal();
    }
    const [cstate, SetCstate] = useState(false);
    const [count, SetCount] = useState(null)
    const [changesem,setChangeSem] = useState("Credits")
    const handelCredit = (index) =>{
        if(index <= 8) {
            SetCstate(true);
            SetCount(index)
            setChangeSem(`Semester ${index}`)
            toggleMenu()
        }else {
            SetCstate(false)
            setChangeSem(`Credits`)
        }
        
    }
    return (
        <>
            <div className='min-h-screen min-w-screen bg-slate-100 dark:bg-slate-800 flex flex-row'>
                <ToastContainer autoClose={1000} />
                <div className={`${userData.role === 'Student' ? 'block' : 'hidden'} w-auto h-auto`}>
                    <StudentSidebar/>
                </div>
                <div className={`${userData.role === 'Faculty' ? 'block' : 'hidden'} w-auto h-auto`}>
                    <StaffSidebar/>
                </div>
                <div className={`${userData.role === 'HOD' ? 'block' : 'hidden'} w-auto h-auto`}>
                    <HODSidebar/>
                </div>
                <div className='w-full h-full flex flex-col'>
                    <div className='p-0'>
                        <SideTopNav/>
                    </div>
                    <div className='p-3 w-full'>
                        <div className={`${userData.role === 'Student' ? 'block' : 'hidden'}`}>
                            <div className="px-3 py-5 dashboard-cards-container flex flex-row flex-wrap gap-4 items-center justify-center">
                                <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                    <div className="flex flex-row items-center justify-between">
                                        <h1 className='text-2xl font-bold text-black dark:text-white'>{changesem}</h1>
                                        <svg className="text-black dark:text-white cursor-pointer" width="20px" height="20px" viewBox="0 0 32 32"  id="Glyph" version="1.1" onClick={toggleMenu}><path fill="currentColor" d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" id="XMLID_294_"/><path fill="currentColor" d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" id="XMLID_295_"/><path fill="currentColor" d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" id="XMLID_297_"/></svg>
                                    </div>
                                    <ul className={`mt-10 ml-10 p-2 bg-slate-200 dark:bg-slate-500 text-violet-700 dark:text-white font-bold rounded-md absolute w-[15%] ${menuOpen ? 'flex flex-col flex-wrap z-50' : 'hidden'}`}>
                                        {Array.from({ length: 9 }, (_, i) => i + 1).map((semester) => (
                                            <li className="p-2 text-center cursor-pointer" key={semester} onClick={()=> handelCredit(semester)}>
                                                Semester {semester <= 8 ? semester : "Current"}
                                            </li>
                                        ))}
                                    </ul>
                                    <span className='py-2 text-4xl font-bold text-black dark:text-white'>{cstate ? graphdata[count -1] : uploadDetail.credit}</span>
                                </div>
                                <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                    <h1 className='text-2xl font-bold text-black dark:text-white'>Total Upload</h1>
                                    <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.Total}</span>
                                </div>
                                <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                    <h1 className='text-2xl font-bold text-black dark:text-white'>Total Verified</h1>
                                    <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.Approved}</span>
                                </div>
                                <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                    <h1 className='text-2xl font-bold text-black dark:text-white'>Total Rejected</h1>
                                    <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.Rejected}</span>
                                </div> 
                            </div>
                        </div>
                        <div className={`${userData.role === 'Faculty' ? 'block' : 'hidden'}`}>
                            <div className="px-3 py-5 dashboard-cards-container flex flex-row flex-wrap gap-4 items-center justify-center">
                                <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                    <h1 className='text-2xl font-bold text-black dark:text-white'>Total Student</h1>
                                    <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.studentLength}</span>
                                </div>
                                <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                    <h1 className='text-2xl font-bold text-black dark:text-white'>Upload Received</h1>
                                    <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.upload}</span>
                                </div>
                                <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                    <h1 className='text-2xl font-bold text-black dark:text-white'>Total Approved</h1>
                                    <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.Approved}</span>
                                </div>
                                <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                    <h1 className='text-2xl font-bold text-black dark:text-white'>Total Rejected</h1>
                                    <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.Rejected}</span>
                                </div> 
                            </div>
                        </div>
                        <div className={`${userData.role === 'HOD' ? 'block' : 'hidden'}`}>
                            <div className="px-3 py-5 dashboard-cards-container flex flex-row flex-wrap gap-4 items-center justify-center">
                                <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                    <h1 className='text-2xl font-bold text-black dark:text-white'>Total Student</h1>
                                    <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.studentLength}</span>
                                </div>
                                <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                    <h1 className='text-2xl font-bold text-black dark:text-white'>Total Faculty</h1>
                                    <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.facultyLength}</span>
                                </div>
                                <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                    <h1 className='text-2xl font-bold text-black dark:text-white'>Total Verified</h1>
                                    <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.Approved}</span>
                                </div>
                                <div className='card flex flex-col p-5 bg-white dark:bg-slate-700 w-full md:w-[23%] rounded-md shadow-lg shadow-gray-500 dark:shadow-black'>
                                    <h1 className='text-2xl font-bold text-black dark:text-white'>Total Rejected</h1>
                                    <span className='py-2 text-4xl font-bold text-black dark:text-white'>{uploadDetail.Rejected}</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row w-full gap-4 items-center justify-center'>
                            <div className={`${userData.role === 'Student' ? 'w-[60%] block px-3 py-5 bg-white rounded-md shadow-lg shadow-slate-400 dark:shadow-none' : 'hidden'}`}>
                                <ApexChart />
                            </div>
                            <div className={`${userData.role === 'Student' ? 'w-[60%] h-[62vh] block px-3 py-3 bg-white rounded-md shadow-lg shadow-slate-400 dark:shadow-none' : 'hidden'}`}>
                                <PieChart />
                            </div>
                        </div>
                        <div className={`${userData.role === 'Faculty' ? 'hidden md:flex md:flex-col gap-4' : 'hidden'}`}>
                            <div className="otherdetails">
                                <h3 className="text-violet-700 dark:text-white px-5 font-Amita font-bold text-3xl">Student General Information</h3>
                            </div>

                            <table className="mx-5 rounded-lg flex flex-col  overflow-hidden border-collapse ">
                                <thead>
                                    <tr className="p-2 font-bold bg-violet-700 dark:bg-white flex text-white dark:text-violet-700 w-[100%]">
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
                        </div>
                        <div className={`${userData.role === 'Faculty' ? 'flex flex-col md:hidden gap-4' : 'hidden'}`}>
                            <div className="otherdetails">
                                <h3 className="text-violet-700 dark:text-white px-5 font-Amita font-bold text-3xl">Student General Information</h3>
                            </div>

                            <table className="mx-5 rounded-lg flex flex-col  overflow-hidden border-collapse ">
                                <thead>
                                    <tr className="p-2 w-full font-bold bg-violet-700 dark:bg-white flex text-white dark:text-violet-700">
                                        <td className='bg-transparent w-full flex flex-row items-center justify-center text-center'>Student Detail</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData.map((student) => (
                                        <tr key={student._id} className='flex flex-wrap p-2 bg-[#dddddd] text-violet-700 font-bold w-[100%] '>
                                            <td>
                                                Name : {student.firstName} {student.lastName}<br/>
                                                Email : {student.email}<br/>
                                                Student ID : {student.userId}<br/>
                                                Department : {student.department}<br/>
                                                Year of Study : {student.year}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={`${userData.role === 'HOD' ? 'flex flex-col gap-4' : 'hidden'}`}>
                            <div className="otherdetails">
                                <h3 className="text-violet-700 dark:text-white px-5 font-Amita font-bold text-3xl">Other Information</h3>

                                <div className="p-5 flex flex-row items-center justify-center rounded-full">
                                    <div className="flex flex-row items-center justify-center w-full md:w-[60%] rounded-full">
                                        <button type="button" className="rounded-l-lg p-3 bg-violet-700 dark:bg-white w-full md:w-[40%] text-white dark:text-violet-700 font-bold cursor-pointer hover:border-2 hover:border-violet-700 hover:text-violet-700 hover:bg-transparent" onClick={displayStudentDetails}>Student Detail</button>
                                        <button type="button" className="rounded-r-lg p-3 bg-violet-700 dark:bg-white w-full md:w-[40%] text-white dark:text-violet-700 font-bold cursor-pointer hover:border-2 hover:border-violet-700 hover:text-violet-700 hover:bg-transparent" onClick={displayFacultyDetails}>Faculty Detail</button>
                                    </div>
                                </div>
                            </div>
                            {displayStudent && (
                                <table className="rounded-lg hidden md:flex md:flex-col  overflow-hidden border-collapse ">
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
                            {displayStudent && (
                                <table className="rounded-lg flex flex-col md:hidden  overflow-hidden border-collapse ">
                                    <thead>
                                        <tr className="p-2 font-bold bg-violet-700 flex text-white w-full">
                                            <td className='bg-transparent w-full flex flex-col items-center justify-center text-center'>Student Details</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentData.map((student) => (
                                            <tr key={student._id} className='flex flex-wrap p-2 bg-[#dddddd] text-violet-700 font-bold w-[100%] '>
                                                <td>
                                                    Name : {student.firstName} {student.lastName}<br/>
                                                    Email ID : {student.email}<br/>
                                                    Student ID : {student.userId}<br/>
                                                    Department : {student.department}<br/>
                                                    Year of Study : {student.year}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {displayFaculty && (
                                <table className="rounded-lg hidden md:flex md:flex-col overflow-hidden border-collapse ">
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
                            {displayFaculty && (
                                <table className="rounded-lg flex flex-col md:hidden overflow-hidden border-collapse ">
                                    <thead>
                                        <tr className="p-2 font-bold bg-violet-700 flex text-white w-full">
                                            <td className='bg-transparent w-full text-center'>Faculty Details</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {FacultyData.map((faculty) => (
                                            <tr key={faculty._id} className='p-2 flex flex-wrap bg-[#dddddd] text-violet-700 font-bold w-[100%] '>
                                                <td>
                                                    Faculty Name : {faculty.firstName} {faculty.lastName}<br/>
                                                    Faculty Email : {faculty.email}<br/>
                                                    Faculty ID : {faculty.userId}<br/>
                                                    Department : {faculty.department}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        {userData.role == "Student" ?
                        <>
                            <div className='p-5 flex flex-row items-center justify-between w-full'>
                                <h1 className="w-full text-violet-700 dark:text-white p-5 font-Amita font-bold text-4xl">My Document</h1>
                                <div className='flex flex-col md:flex-row gap-2 w-full md:w-[30%]'>
                                    <button type="button" className="rounded-full p-3 ml-2 font-bold cursor-pointer bg-violet-700 dark:bg-white hover:bg-transparent dark:hover:bg-transparent border-0 hover:border-2 hover:border-violet-700 dark:hover:border-white text-white dark:text-violet-700 hover:text-violet-700 dark:hover:text-white" onClick={showStudentDetails}>View Data</button>
                                    <button type="button" className="rounded-full p-3 ml-2 font-bold cursor-pointer bg-violet-700 dark:bg-white hover:bg-transparent dark:hover:bg-transparent border-0 hover:border-2 hover:border-violet-700 dark:hover:border-white text-white dark:text-violet-700 hover:text-violet-700 dark:hover:text-white" onClick={hideStudentDetails}>Hide Data</button>
                                </div>
                            </div>
                            <div className="w-[98%] m-[1%]">
                            {showStudent && (
                                <table className="rounded-lg hidden md:flex md:flex-col overflow-hidden border-collapse ">
                                    <tr className="thead p-2 font-bold bg-violet-700 dark:bg-white text-white dark:text-violet-700  w-[100%]"> 
                                        <td className=' w-[10%]'>Certification</td>
                                        <td className=' w-[10%]'>Activity Type</td>
                                        <td className=' w-[10%]'>Competition Level</td>
                                        <td className=' w-[5%]'>Position Level</td>
                                        <td className=' w-[10%]'>Category</td>
                                        <td className=' w-[10%]'>Sub-Category</td>
                                        <td className=' w-[5%]'>Document</td>
                                        <td className=' w-[15%]'>STATUS</td>
                                    </tr>
                                    {data && data.length > 0 ? (
                                        data.map((value, index) => {
                                            return (
                                                <tr key={index} className=' p-2 bg-[#dddddd] text-violet-700 font-bold w-[100%]'>
                                                    <td className=' w-[10%]'>{value.cerType}</td>
                                                    <td className=' w-[10%]'>{value.activityType}</td>
                                                    <td className=' w-[10%]'>{value.competitionLevel}</td>
                                                    <td className=' w-[5%]'>{value.position}</td>
                                                    <td className=' w-[10%]'>{value.category}</td>
                                                    <td className=' w-[10%]'>{value.categorySpecific}</td>
                                                    <td className=' w-[5%]'>
                                                        <button className="p-3 m-2 bg-violet-700 rounded-md text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent" onClick={()=> { getPdf(value.ID)}}>View</button>
                                                    </td>
                                                    <td className=' w-[15%]'>
                                                        <button className= {`p-3 m-2 ${value.request == "Rejected" ? 'bg-red-500' : 'bg-green-500'}   rounded-md text-white font-bold  cursor-default `} >{value.request}</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        ) : (
                                            <tr className=' w-[100%] flex flex-row items-center justify-center'>
                                                <td className='p-5 w-[100%] text-center text-black dark:text-white'>No Record Found</td>
                                            </tr>
                                        )}
                                </table>
                            )}
                            {showStudent && (
                                <table className="rounded-lg flex flex-col md:hidden overflow-hidden border-collapse ">
                                    <tr className="thead p-2 font-bold bg-violet-700 dark:bg-white text-violet-700 w-[100%]"> 
                                        <td className=' w-[90%]'>Certification Details</td>
                                        <td className=' w-[10%]'>Document</td>
                                    </tr>
                                    {data && data.length > 0 ? (
                                        data.map((value, index) => {
                                            return (
                                                <tr key={index} className=' p-2 bg-[#dddddd] text-violet-700 w-[100%]'>
                                                    <td className=' w-[90%]'>
                                                        Certification : {value.cerType}<br/>
                                                        Activity Type : {value.activityType}<br/>
                                                        Competition Level : {value.competitionLevel}<br/>
                                                        Position : {value.position}<br/>
                                                        Category : {value.category}<br/>
                                                        Sub-Category : {value.categorySpecific}<br/>
                                                        Status : <button className= {`p-3 m-2 ${value.request == "Rejected" ? 'bg-red-500' : 'bg-green-500'}   rounded-md text-white font-bold  cursor-default `} >{value.request}</button>
                                                    </td>
                                                    <td className=' w-[10%]'>
                                                        <button className="p-3 m-2 bg-violet-700 rounded-md text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent" onClick={()=> { getPdf(value.ID)}}>View</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        ) : (
                                            <tr className=' w-[100%] flex flex-row items-center justify-center'>
                                                <td className='p-5 w-[100%] text-center text-black dark:text-white'>No Record Found</td>
                                            </tr>
                                        )}
                                </table>
                            )}
                            </div>
                            <div id="myModal" className={`modal fixed inset-0 z-10 p-16 top-0 left-0 w-full h-full overflow-auto bg-opacity-40 ${modalVisible ? 'block' : 'hidden'}`} onClick={handleOutsideClick}>
                                <div className="modal-content rounded-lg mt-10 relative bg-white mx-auto border border-gray-300 w-[100%] lg:w-[800px] shadow-md p-0 animate-fade-in-u">
                                    <div className="modal-header flex flex-row items-center justify-start h-20 p-2 px-16 bg-violet-700 text-white">
                                        <h2 className="text-2xl">View Certificate</h2>
                                    </div>
                                    <div className="modal-body p-2">
                                        {pdfUrl ? 
                                            <iframe src={pdfUrl} className="h-[500px] w-[100%]"/>
                                        : ""
                                    }
                                    </div>
                                    <div className="modal-footer flex flex-row items-center justify-end p-5 h-20 bg-violet-700 text-white">
                                        <span className="close p-3 m-2 rounded-md bg-white text-violet-700 font-bold cursor-pointer hover:border-2 hover:border-white hover:text-white hover:bg-transparent" onClick={closeModal}>&times; Close</span>
                                    </div>
                                </div>
                            </div> 
                        </> : "" }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard
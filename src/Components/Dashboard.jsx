import React,{ useEffect , useState , useContext } from 'react';
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = () => {
    const [data, setData] = useState(null)
    const [pdfUrl, setPdfUrl] = useState(null);

    const [uploadDetail, setUploadDetail] = useState({
        Approved:0,
        Rejected:0,
        hodLength:0,
        studentLength : 0,
        upload: 0,
        facultyLength : 0,
    });
    const {state,dispatch} = useContext(UserContext);
    const history = useNavigate();
    axios.defaults.withCredentials = true;
    const [userData,setUserData] = useState({
        role: '',
        firstName: '',
        lastName: '',
        userId: '',
        email: '',
        department: '',
        year: '',
        facultyType:'',
        password:''
    });
    const callDashboardPage = async () => {
        try {
            const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

            const res = await axios.get("/dashboard",{
                headers:{
                    'jwtoken':cookieValue
                }
            });
            const data = res.data;
            setUserData(data);
            console.log(cookieValue);

            
            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            else {
                dispatch({ type: "USER_LOGIN", payload: { user: true, userType: data.role } });
                toast.info(`Welcome ${data.firstName} ${data.lastName}`, {
                    position: toast.POSITION.TOP_RIGHT
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
        } catch (error) {
            console.log(error);
        }
        try {
            const res = await axios.get("/dashboard/detail",{
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
    }

    useEffect(() => {
        callDashboardPage();
    },[]);

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
    const getPdf = async (ID) => {
        const res = await axios.post('/getPdf',{ID:ID},{ responseType : 'arraybuffer'})
    
        const blob = new Blob([res.data],{ type: 'application/pdf'});
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        openModal();
       
    
       }

    return (
        <>
            <section className="dashboard h-auto flex flex-col bg-[#E4E9F7]">
                <h1 className="text-[#6236FF] mt-20 p-5 font-Amita font-bold text-4xl">Dashboard</h1>
                <ToastContainer autoClose={2000} />
                <h3 className="text-[#0e3ae8] px-5 font-Amita font-bold text-3xl">Hey {userData.firstName} {userData.lastName}</h3>
                <div className={`${userData.role === 'Student' ? 'block' : 'hidden'}`}>
                    <div className="dashboard-status w-[100%] p-5 flex flex-col md:flex-row flex-wrap">
                        <div className="p-10 m-2 bg-orange-400 rounded-md">
                            <h1 className="text-white font-bold text-3xl p-2">Total Credit</h1>
                            <span className="p-2 text-white font-bold text-4xl">0</span>
                        </div>
                        <div className="p-10 m-2 bg-[#5c07ab] rounded-md">
                            <h1 className="text-white font-bold text-3xl p-2">Total Upload</h1>
                            <span className="p-2 text-white font-bold text-4xl">{uploadDetail.Total}</span>
                        </div>
                        <div className="p-10 m-2 bg-[#038f28] rounded-md">
                            <h1 className="text-white font-bold text-3xl p-2">Total Verified</h1>
                            <span className="p-2 text-white font-bold text-4xl">{uploadDetail.Approved}</span>
                        </div>
                        <div className="p-10 m-2 bg-[#d12f06] rounded-md">
                            <h1 className="text-white font-bold text-3xl p-2">Total Rejected</h1>
                            <span className="p-2 text-white font-bold text-4xl">{uploadDetail.Rejected}</span>
                        </div>
                    </div>
                </div>
                <div className={`${userData.role === 'Faculty' ? 'block' : 'hidden'}`}>
                    <div className="dashboard-status w-[100%] p-5 flex flex-col md:flex-row flex-wrap">
                        <div className="p-6 m-2 bg-orange-400 rounded-md">
                            <h1 className="text-white font-bold text-3xl p-2">Total Student</h1>
                            <span className="p-2 text-white font-bold text-4xl">{uploadDetail.studentLength}</span>
                        </div>
                        <div className="p-6 m-2 bg-[#5c07ab] rounded-md">
                            <h1 className="text-white font-bold text-3xl p-2">Upload Received</h1>
                            <span className="p-2 text-white font-bold text-4xl">{uploadDetail.upload}</span>
                        </div>
                        <div className="p-6 m-2 bg-[#038f28] rounded-md">
                            <h1 className="text-white font-bold text-3xl p-2">Total Approved</h1>
                            <span className="p-2 text-white font-bold text-4xl">{uploadDetail.Approved}</span>
                        </div>
                        <div className="p-6 m-2 bg-[#d12f06] rounded-md">
                            <h1 className="text-white font-bold text-3xl p-2">Total Rejected</h1>
                            <span className="p-2 text-white font-bold text-4xl">{uploadDetail.Rejected}</span>
                        </div>
                    </div>
                </div>
                <div className={`${userData.role === 'HOD' ? 'block' : 'hidden'}`}>
                    <div className="dashboard-status w-[100%] p-5 flex flex-col md:flex-row flex-wrap">
                        <div className="p-10 m-2 bg-orange-400 rounded-md">
                            <h1 className="text-white font-bold text-3xl p-2">Total Student</h1>
                            <span className="p-2 text-white font-bold text-4xl">{uploadDetail.studentLength}</span>
                        </div>
                        <div className="p-10 m-2 bg-[#5c07ab] rounded-md">
                            <h1 className="text-white font-bold text-3xl p-2">Total Faculty</h1>
                            <span className="p-2 text-white font-bold text-4xl">{uploadDetail.facultyLength}</span>
                        </div>
                        <div className="p-10 m-2 bg-[#038f28] rounded-md">
                            <h1 className="text-white font-bold text-3xl p-2">Total Approved</h1>
                            <span className="p-2 text-white font-bold text-4xl">{uploadDetail.Approved}</span>
                        </div>
                        <div className="p-10 m-2 bg-[#d12f06] rounded-md">
                            <h1 className="text-white font-bold text-3xl p-2">Total Rejected</h1>
                            <span className="p-2 text-white font-bold text-4xl">{uploadDetail.Rejected}</span>
                        </div>
                    </div>
                </div>
                {userData.role == "Student" ? 
                <>
                <div className='p-5 flex flex-row items-center justify-between w-[100%]'>
                    <h1 className="text-[#6236FF] p-5 font-Amita font-bold text-4xl">My Document</h1>
                    <div className=''>
                        <button type="button" className="rounded-full p-3 ml-2 bg-blue-500 text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent" onClick={showStudentDetails}>View Data</button>
                        <button type="button" className="rounded-full p-3 ml-2 bg-blue-500 text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent" onClick={hideStudentDetails}>Hide Data</button>
                    </div>
                </div>
            <div className="w-[98%] m-[1%]">
            {showStudent && (
                <table className="rounded-lg flex flex-col  overflow-hidden border-collapse ">
                    <tr className="thead p-2 bg-[#ff702a]  text-white  w-[100%] ">
                        <td className=' w-[10%]'>Certification</td>
                        <td className=' w-[10%]'>Activity Type</td>
                        <td className=' w-[10%]'>Competition Level</td>
                        <td className=' w-[5%]'>Position Level</td>
                        <td className=' w-[10%]'>Category</td>
                        <td className=' w-[10%]'>Sub-Category</td>
                        <td className=' w-[5%]'>Document</td>
                        <td className=' w-[15%]'>STATUS</td>
                    </tr>
                    {data ?
                    data.map((value, index) => {
                        return (
                            <tr className=' p-2 bg-[#dddddd] text-blue-500 w-[100%] '>
                        <td className=' w-[10%]'>{value.cerType}</td>
                        <td className=' w-[10%]'>{value.activityType}</td>
                        <td className=' w-[10%]'>{value.competitionLevel}</td>
                        <td className=' w-[5%]'>{value.position}</td>
                        <td className=' w-[10%]'>{value.category}</td>
                        <td className=' w-[10%]'>{value.categorySpecific}</td>
                        <td className=' w-[5%]'>
                            <button className="p-3 m-2 bg-blue-500 rounded-md text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent" onClick={()=> { getPdf(value.ID)}}>View</button>
                        </td>
                        <td className=' w-[15%]'>
                            <button className= {`p-3 m-2 ${value.request == "Rejected" ? 'bg-red-500' : 'bg-green-500'}   rounded-md text-white font-bold  cursor-default `} >{value.request}</button>

                        </td>
                    </tr>
                        )
                    }) : 
                    <tr className=' w-[100%] flex'>
                            <td className=' w-[100%]'>No Record Found</td>
                        </tr>
                    }
                    
                </table>
            )}
            </div>
            <div id="myModal" className={`modal fixed inset-0 z-10 p-16 top-0 left-0 w-full h-full overflow-auto bg-opacity-40 ${modalVisible ? 'block' : 'hidden'}`} onClick={handleOutsideClick}>
                <div className="modal-content rounded-lg mt-10 relative bg-white mx-auto border border-gray-300 w-[800px] shadow-md p-0 animate-fade-in-u">
                    <div className="modal-header flex flex-row items-center justify-start h-20 p-2 px-16 bg-blue-500 text-white">
                        <h2 className="text-2xl">View Certificate</h2>
                    </div>
                    <div className="modal-body p-2">
                        {pdfUrl ? 
                        <iframe src={pdfUrl} className="h-[500px] w-[100%]"/>

                         : ""
                    }
                        
                    </div>
                    <div className="modal-footer flex flex-row items-center justify-end p-5 h-20 bg-blue-500 text-white">
                        <span className="close p-3 m-2 rounded-md bg-white text-blue-500 font-bold cursor-pointer hover:border-2 hover:border-white hover:text-white hover:bg-transparent" onClick={closeModal}>&times; Close</span>
                    </div>
                </div>
            </div> 
            </>
            : "" }
            </section>
        </>
    )
}
export default Dashboard;
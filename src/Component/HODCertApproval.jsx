import { useEffect , useState,useCallback } from 'react';
import axios from "../axiosConfig";
import StudentSidebar from './StudentSidebar';
import StaffSidebar from './StaffSidebar';
import HODSidebar from './HODSidebar';
import SideTopNav from './SideTopNav';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const HODCertApproval = () => {
    const [data, setData] = useState(null)
    const [pdfUrl, setPdfUrl] = useState(null);
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
    });
    const callApprovalPage = useCallback(async () => {
        try {
            const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

            const res = await axios.get("/dashboard",{
                headers:{
                    'jwtoken':cookieValue
                }
            });
            const data = res.data;
            setUserData(data);
            if(res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
        }
        catch(err) {
            history('/Login');
        }
        try {
            const res = await axios.get("/hodapproval");
            const data = res.data;
            if(data.length !== 0){
                setData(data);
            }else setData(null);

            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
        }
        catch(err) {
            console.log(err);
        }
    },[history]);

    useEffect(() => {
        callApprovalPage();
    },[callApprovalPage]);
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
    const getPdf = async (ID) => {
        const res = await axios.post('/getPdf',{ID:ID},{ responseType : 'arraybuffer'})
    
        const blob = new Blob([res.data],{ type: 'application/pdf'});
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        openModal();
    }
    const approve = async (ID) => {
        const res = await axios.post('/approve',{ID:ID})
    
        if(res.status == 200) {
            toast.success('Certificate Approved',{
                position: toast.POSITION.TOP_CENTER,
                closeButton: false,
                hideProgressBar: false,
                className: 'bg-white text-green-500 dark:text-white dark:bg-slate-600 font-bold',
            });
        }
    }
    const reject = async (ID) => {
        const res = await axios.post('/reject',{ID:ID})
        if(res.status == 200) {
            toast.error('Certificate Rejected',{
                position: toast.POSITION.TOP_CENTER,
                closeButton: false,
                hideProgressBar: false,
                className: 'bg-white text-red-500 dark:text-white dark:bg-slate-600 font-bold',
            });
        }
    }
    return (
        <>
            <div className='min-h-screen bg-slate-100 dark:bg-slate-800 flex flex-row'>
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
                    <div className='p-5 w-full'>
                        <h1 className="text-violet-700 dark:text-white p-5 font-Amita font-bold text-4xl">Manage Document Approval</h1>

                        <div className="w-[98%] m-[1%]">
                            <table className="rounded-lg hidden md:flex md:flex-col overflow-hidden border-collapse ">
                                <tr className="thead p-2 font-bold bg-violet-700 dark:bg-white text-white dark:text-violet-700  w-[100%] ">
                                    <td className=' w-[10%] text-center'>Student ID</td>
                                    <td className=' w-[10%] text-center'>Student Name</td>
                                    <td className=' w-[10%] text-center'>Certification</td>
                                    <td className=' w-[10%] text-center'>Activity Type</td>
                                    <td className=' w-[10%] text-center'>Competition Level</td>
                                    <td className=' w-[5%] text-center'>Position Level</td>
                                    <td className=' w-[10%] text-center'>Category</td>
                                    <td className=' w-[10%] text-center'>Sub-Category</td>
                                    <td className=' w-[5%] text-center'>Document</td>
                                    <td className=' w-[15%] text-center'>STATUS</td>
                                </tr>
                                {data ?
                                    data.map((value,index) => {
                                        return (
                                            <tr key={index} className=' p-2 bg-[#dddddd] font-bold text-violet-700 w-[100%] '>
                                                <td className=' w-[10%] text-center'>{value.userId}</td>
                                                <td className=' w-[10%] text-center'>{value.fullName}</td>
                                                <td className=' w-[10%] text-center'>{value.cerType}</td>
                                                <td className=' w-[10%] text-center'>{value.activityType}</td>
                                                <td className=' w-[10%] text-center'>{value.competitionLevel}</td>
                                                <td className=' w-[5%] text-center'>{value.position}</td>
                                                <td className=' w-[10%] text-center'>{value.category}</td>
                                                <td className=' w-[10%] text-center'>{value.categorySpecific}</td>
                                                <td className=' w-[5%] text-center'>
                                                    <button className="p-3 m-2 bg-violet-800 rounded-md text-white font-bold cursor-pointer hover:border-2 hover:border-violet-800 hover:text-violet-800 hover:bg-transparent" onClick={()=> { getPdf(value.ID)}}>View</button>
                                                </td>
                                                <td className=' w-[15%] text-center'>
                                                    <button className="p-3 m-2 bg-green-500 rounded-md text-white font-bold cursor-pointer hover:border-2 hover:border-green-500 hover:text-green-500 hover:bg-transparent" onClick={() => { approve(value.ID)}}>Approve</button>
                                                    <button className="p-3 m-2 bg-red-500 rounded-md text-white font-bold cursor-pointer hover:border-2 hover:border-red-500 hover:text-red-500 hover:bg-transparent" onClick={() => { reject(value.ID)}}>Reject</button>
                                                </td>
                                            </tr>
                                        )
                                    }) :
                                    <tr className=' w-[100%] flex flex-row items-center justify-center'>
                                        <td className='p-5 w-[100%] text-center text-black dark:text-white font-bold'>No Record Found</td>
                                    </tr>
                                }
                            </table>
                            <table className="rounded-lg flex flex-col md:hidden overflow-hidden border-collapse ">
                                <tr className="thead p-2 font-bold bg-violet-700 dark:bg-white text-white dark:text-violet-700 w-full">
                                    <td className='w-full text-center flex flex-row items-center justify-center'>Certification Detail</td>
                                </tr>
                                {data ?
                                    data.map((value,index) => {
                                        return (
                                            <tr key={index} className='p-2 bg-[#dddddd] font-bold text-violet-700 w-[100%] '>
                                                <td className=' w-full flex flex-col gap-2 flex-wrap'>
                                                    Student ID : {value.userId}<br/>
                                                    Student Name : {value.fullName}<br/>
                                                    Certification : {value.cerType}<br/>
                                                    Activity Type : {value.activityType}<br/>
                                                    Competition Level : {value.competitionLevel}<br/>
                                                    Position Level : {value.position}<br/>
                                                    Category : {value.category}<br/>
                                                    Sub-Category : {value.categorySpecific}<br/><br/>

                                                    ACTION :
                                                    <button className="p-3 bg-violet-800 rounded-md text-white font-bold cursor-pointer hover:border-2 hover:border-violet-800 hover:text-violet-800 hover:bg-transparent" onClick={()=> { getPdf(value.ID)}}>View</button>
                                                    <button className="p-3 bg-green-500 rounded-md text-white font-bold cursor-pointer hover:border-2 hover:border-green-500 hover:text-green-500 hover:bg-transparent" onClick={() => { approve(value.ID)}}>Approve</button>
                                                    <button className="p-3 bg-red-500 rounded-md text-white font-bold cursor-pointer hover:border-2 hover:border-red-500 hover:text-red-500 hover:bg-transparent" onClick={() => { reject(value.ID)}}>Reject</button>
                                                </td>
                                            </tr>
                                        )
                                    }) :
                                    <tr className=' w-[100%] flex flex-row items-center justify-center'>
                                        <td className='p-5 w-[100%] text-center text-black dark:text-white font-bold'>No Record Found</td>
                                    </tr>
                                }
                            </table>
                        </div>
                        <div id="myModal" className={`modal fixed inset-0 z-10 p-16 top-0 left-0 w-full h-full overflow-auto bg-opacity-40 ${modalVisible ? 'block' : 'hidden'}`} onClick={handleOutsideClick}>
                            <div className="modal-content rounded-lg mt-10 relative bg-white mx-auto border border-gray-300 w-[100%] md:w-[800px] shadow-md p-0 animate-fade-in-u">
                                <div className="modal-header flex flex-row items-center justify-start h-20 p-2 px-16 bg-violet-800 text-white">
                                    <h2 className="text-2xl">View Certificate</h2>
                                </div>
                                <div className="modal-body p-2">
                                    {pdfUrl ? 
                                        <iframe src={pdfUrl} className="h-[500px] w-[100%]"/>
                                    : ""
                                } 
                                </div>
                                <div className="modal-footer flex flex-row items-center justify-end p-5 h-20 bg-violet-800 text-white">
                                    <span className="close p-3 m-2 rounded-md bg-white text-violet-800 font-bold cursor-pointer hover:border-2 hover:border-white hover:text-white hover:bg-transparent" onClick={closeModal}>&times; Close</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HODCertApproval
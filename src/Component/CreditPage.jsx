import { useEffect , useState,useCallback } from 'react';
import axios from "../axiosConfig";
import StudentSidebar from './StudentSidebar';
import StaffSidebar from './StaffSidebar';
import HODSidebar from './HODSidebar';
import SideTopNav from './SideTopNav';
import { useNavigate } from 'react-router-dom';
const CreditPage = () => {
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
    const callCreditPage = useCallback(async () => {
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
            const res = await axios.get("/dashboard/detail",{
                headers:{
                    'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
                }
            });
            const data = res.data;
            setUploadDetail(data);
        }
        catch (error) {
            console.log(error);
        }
    },[history]);
    useEffect(() => {
        callCreditPage();
    },[callCreditPage]);
    return (
        <>
            <div className='min-h-screen md:h-[100vh] bg-slate-200 dark:bg-slate-800 flex flex-row'>
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
                    <div className='p-5 w-full flex flex-col md:flex-row gap-2 items-center justify-center'>
                        <div className='p-2 flex flex-col gap-2 w-[50%]'>
                            <h2 className='text-4xl font-bold text-violet-700 dark:text-white'>Credit Report</h2>
                            <div className='my-2 credit-card p-3 rounded-md bg-slate-100 dark:bg-slate-600 shadow-md shadow-gray-500 dark:shadow-black h-[30vh]'>
                                <span className='font-bold text-violet-700 dark:text-white'>Credits Achieved</span>
                            </div>
                            <h3 className='p-2 font-bold text-black dark:text-white flex flex-row items-center'>Credit Factor <i className='bx bx-hive text-2xl'></i></h3>
                            <div className='my-2 w-full credit-card p-3 rounded-md bg-slate-100 dark:bg-slate-600 shadow-md shadow-gray-500 dark:shadow-black h-auto flex flex-row'>
                                <div className='flex flex-col gap-2 w-full'>
                                    <div className='flex flex-row gap-2 p-3'>
                                        <i className='bx bxs-file-jpg text-4xl text-orange-500'></i>
                                        <i className='bx bxs-file-png text-4xl text-blue-500'></i>
                                        <i className='bx bxs-file-pdf text-4xl text-red-500'></i>
                                    </div>
                                    <h2 className='p-3 font-bold text-2xl text-black dark:text-white'>Certificate Download</h2>
                                </div>
                                <div className='p-3'>
                                    <i className='bx bx-cloud-download cursor-pointer p-2 rounded-full bg-gray-300 text-black text-[45px] dark:bg-slate-800 dark:text-white'></i>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col w-[50%]'>
                            <div className='my-2 w-full credit-card p-3 rounded-md bg-slate-100 dark:bg-slate-600 shadow-md shadow-gray-500 dark:shadow-black h-auto flex flex-row'>
                                <div className='flex flex-col gap-4 w-full'>
                                    <h2 className='text-violet-700 dark:text-violet-400 font-bold'>Approved By HOD</h2>
                                    <span className='text-black dark:text-white font-bold'>Status of Approval</span>
                                </div>
                                <div className='flex flex-col'>
                                    <i className='bx bx-check p-2 rounded-full bg-green-400 text-[45px]' ></i>
                                </div>
                            </div>
                            <div className='my-2 w-full credit-card p-3 rounded-md bg-slate-100 dark:bg-slate-600 shadow-md shadow-gray-500 dark:shadow-black h-auto flex flex-col'>
                                <h2 className='text-violet-700 dark:text-violet-400 font-bold flex flex-row items-center gap-2'>Credit Information  <i className='bx bx-info-circle text-2xl'></i></h2>

                                <div className='flex flex-col gap-2 w-full'>
                                    <div className='tabulardata w-full flex flex-col rounded-md'>
                                        <div className='flex flex-row w-full font-bold'>
                                            <span className='p-2 text-black dark:text-white'>Name :</span>
                                            <span className='p-2 text-black dark:text-white'>{userData.firstName} {userData.lastName}</span>
                                        </div>
                                        <div className='flex flex-row w-full font-bold'>
                                            <span className='p-2 text-black dark:text-white'>User ID :</span>
                                            <span className='p-2 text-black dark:text-white'>{userData.userId}</span>
                                        </div>
                                        <div className='flex flex-row w-full font-bold'>
                                            <span className='p-2 text-black dark:text-white'>Email ID :</span>
                                            <span className='p-2 text-black dark:text-white'>{userData.email}</span>
                                        </div>
                                        <div className='flex flex-row w-full font-bold'>
                                            <span className='p-2 text-black dark:text-white'>Department :</span>
                                            <span className='p-2 text-black dark:text-white'>{userData.department}</span>
                                        </div>
                                        <div className='flex flex-row w-full font-bold'>
                                            <span className='p-2 text-black dark:text-white'>Study Year :</span>
                                            <span className='p-2 text-black dark:text-white'>{userData.year}</span>
                                        </div>
                                        <div className='flex flex-row w-full font-bold'>
                                            <span className='p-2 text-black dark:text-white'>Credit :</span>
                                            <span className='p-2 text-black dark:text-white'>{uploadDetail.credit}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreditPage
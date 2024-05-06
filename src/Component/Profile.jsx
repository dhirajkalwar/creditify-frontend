import { useEffect , useState,useCallback } from 'react';
import axios from "../axiosConfig";
import StudentSidebar from './StudentSidebar';
import StaffSidebar from './StaffSidebar';
import HODSidebar from './HODSidebar';
import SideTopNav from './SideTopNav';
import { useNavigate } from 'react-router-dom';
import Profileimg from '../assets/userprofile.png';
const Profile = () => {
    axios.defaults.withCredentials = true;
    const history = useNavigate();
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
    const [selectedImage, setSelectedImage] = useState(Profileimg);
    const callProfilePage = useCallback(async () => {
        try {
            const res = await axios.get("/profile");
            const data = res.data;
            setUserData(data);
            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
        }
        catch(err) {
            console.error(err);
            history('/Login');
        }
        try {
            const res = await axios.get("/profileimg", {responseType: 'arraybuffer' });
            const blob = new Blob([res.data], {type:'image/jpeg'});
            const imgUrl = URL.createObjectURL(blob);
            setSelectedImage(imgUrl);
        }
        catch (error) {
            console.log(error);
        }
    },[history]);
    useEffect(() => {
        callProfilePage();
    },[callProfilePage]);
    return (
        <>
            <div className='min-h-screen bg-slate-100 dark:bg-slate-800 flex flex-row'>
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
                    <div className='p-10 w-full flex flex-col'>
                        <h2 className='text-4xl font-bold text-violet-700 dark:text-white'>Profile</h2>
                        <div className='profile-container flex flex-col lg:flex-row flex-wrap gap-2 items-center justify-center w-[100%]'>
                            <div className="profileimage p-5  flex flex-col items-center w-full lg:w-[40%]">
                                <div className='w-[300px]'>
                                    <img src={selectedImage} className="h-[300px] w-[300px] border-8 border-violet-600  rounded-full"/><br/><br/>
                                </div>
                            </div>
                            <div className='profiledetail flex flex-col items-start gap-4 w-full lg:w-[40%]'>
                                <span className='text-lg font-bold text-black dark:text-white'>{userData.role === 'Student' ? 'Student ID' : userData.role === 'Faculty' ? 'Faculty ID' : 'HOD ID'} : {userData.userId}</span>

                                <span className='text-lg font-bold text-black dark:text-white'>Name : {userData.firstName} {userData.lastName}</span>

                                <span className='text-lg font-bold text-black dark:text-white'>Role : {userData.role}</span>

                                <span className='text-lg font-bold text-black dark:text-white'>Department : {userData.department}</span>

                                <span className={`${userData.role === 'Student' ? 'block text-lg font-bold text-black dark:text-white' : 'hidden'}`}>Study Year : {userData.year}</span>
                                
                                <span className={`${userData.role === 'Faculty' ? 'block text-lg font-bold text-black dark:text-white' : 'hidden'}`}>Faculty Type : {userData.facultyType}</span>
                                <span className='text-lg font-bold text-black dark:text-white'>Email : {userData.email}</span>
                                <a href="/EditProfile">
                                    <button type="button" className='my-5 px-4 py-2 font-bold text-lg bg-violet-700 hover:bg-transparent dark:bg-white dark:hover:bg-transparent border-2 border-violet-600 dark:border-white text-white hover:text-violet-700 dark:text-black dark:hover:text-white rounded-lg'>Edit Profile</button>
                                </a>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile
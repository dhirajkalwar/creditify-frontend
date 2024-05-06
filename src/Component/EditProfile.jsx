import { useEffect , useState,useCallback } from 'react';
import axios from "../axiosConfig";
import StudentSidebar from './StudentSidebar';
import StaffSidebar from './StaffSidebar';
import HODSidebar from './HODSidebar';
import SideTopNav from './SideTopNav';
import { useNavigate } from 'react-router-dom';
import Profileimg from '../assets/userprofile.png';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EditProfile = () => {
    axios.defaults.withCredentials = true;
    const history = useNavigate();
    const [img, setImg] = useState();
    const [selectedImage, setSelectedImage] = useState(Profileimg);
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({...userData,[name]: value});
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImg(file);
    };
    const callProfilePage = useCallback(async () => {
        try {
            const res = await axios.get("/dashboard");
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

    const updateData = async (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', userData.firstName);
        formData.append('lastName', userData.lastName);
        formData.append('userId', userData.userId);
        formData.append('email', userData.email);
        formData.append('year', userData.year);
        formData.append('role', userData.role);
        formData.append('image', img);
        formData.append('facultyType', userData.facultyType);

        try {
            const res = await axios.post('/updatedata', formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            })

            if(res.status == 201) {
                toast.success('Profile Updated Successfully',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-green-500 dark:text-white dark:bg-slate-600 font-bold',
                });
            }else if (res.status !== 201) {
                toast.error('Unable to Update',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-red-500 dark:text-white dark:bg-slate-600 font-bold',
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='min-h-screen bg-slate-100 dark:bg-slate-800 flex flex-row'>
                <ToastContainer autoClose={1000}/>
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
                        <h2 className='text-4xl font-bold text-violet-700 dark:text-white'>Edit Profile</h2>
                        <form className='profile-container flex flex-col lg:flex-row gap-4 items-center justify-center w-[100%]' onSubmit={updateData}>
                            <div className="profileimage p-5  flex flex-col items-center w-full lg:w-[40%]">
                                {selectedImage && (
                                <div className='w-[300px]'>
                                    <img src={selectedImage} className="h-[300px] w-[300px] border-8 border-violet-600  rounded-full"/><br/><br/>
                                </div>
                                )}
                                <label className="px-4 py-2 font-bold text-lg bg-violet-700 hover:bg-transparent dark:bg-white dark:hover:bg-transparent border-2 border-violet-600 dark:border-white text-white hover:text-violet-700 dark:text-black dark:hover:text-white rounded-lg">
                                    <input type="file" className="hidden" accept="image/png , image/gif ,  image/jpeg" onChange={handleImageChange}/> Change Photo
                                </label>
                            </div>
                            <div className='profiledetail flex flex-col items-start gap-4 w-full lg:w-[40%]'>
                                <span className='text-lg font-bold text-black dark:text-white'>
                                    {userData.role === 'Student' ? 'Student ID' : userData.role === 'Faculty' ? 'Faculty ID' : 'HOD ID'} : {userData.userId}
                                </span>
                                <span className='text-lg font-bold text-black dark:text-white w-full'>
                                    <input type="text" name="firstName" placeholder="First Name" className='px-4 py-2 outline-none w-full bg-transparent border-2 border-violet-600 dark:border-slate-100' value={userData.firstName}
                                    onChange={handleInputChange}/>
                                </span>
                                <span className='text-lg font-bold text-black dark:text-white w-full'>
                                    <input type="text" name="lastName" placeholder="Last Name" className='px-4 py-2 outline-none w-full bg-transparent border-2 border-violet-600 dark:border-slate-100' value={userData.lastName}
                                    onChange={handleInputChange}/>
                                </span>
                                {userData.role === 'Student' && (
                                <span className='text-lg font-bold text-black dark:text-white w-full'>
                                    <input type="text" list="studyYear" name="year" placeholder="Study Year" className='px-4 py-2 outline-none w-full bg-transparent border-2 border-violet-600 dark:border-slate-100' value={userData.year} onChange={handleInputChange}/>
                                    <datalist id="studyYear">
                                        <option value="First Year"/>
                                        <option value="Second Year"/>
                                        <option value="Third Year"/>
                                        <option value="Final Year"/>
                                    </datalist>
                                </span>
                                )}
                                {userData.role === 'Faculty' && (
                                <span className='text-lg font-bold text-black dark:text-white w-full'>
                                    <input type="text" list="type" name="facultyType" placeholder="Faculty Type" className='px-4 py-2 outline-none w-full bg-transparent border-2 border-violet-600 dark:border-slate-100' value={userData.facultyType} onChange={handleInputChange}/>
                                    <datalist id="type">
                                        <option value="Technical"/>
                                        <option value="Non_Technical"/>
                                        <option value="Sports"/>
                                    </datalist>
                                </span>
                                )}
                                <span className='text-lg font-bold text-black dark:text-white w-full'>
                                    <input type="text" name="email" placeholder="States" className='px-4 py-2 outline-none w-full bg-transparent border-2 border-violet-600 dark:border-slate-100' value={userData.email} onChange={handleInputChange} disabled/><br/>
                                    Note: Cannot Change Email
                                </span>
                                <button type="submit" className='px-4 py-2 font-bold text-lg bg-violet-700 hover:bg-transparent dark:bg-white dark:hover:bg-transparent border-2 border-violet-600 dark:border-white text-white hover:text-violet-700 dark:text-black dark:hover:text-white rounded-lg'>Update Profile</button>
                            </div>
                            </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditProfile
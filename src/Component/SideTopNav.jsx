import { useState } from 'react';
import axios from "../axiosConfig";
import Profileimg from '../assets/user.png'
const SideTopNav = () => {
    axios.defaults.withCredentials = true;
    const [selectedImage, setSelectedImage] = useState(Profileimg)
    const [userData,setUserData] = useState({
        firstName: '',
        lastName: '',
    });
    const callProfilePic = async () => {
        try {
            let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
            const res = await axios.get("/profileimg", {
                responseType: 'arraybuffer',
                headers:{
                    'jwtoken':cookieValue
                }
            });
            const blob = new Blob([res.data], {type:'image/jpeg'});
            const imgUrl = URL.createObjectURL(blob);
            setSelectedImage(imgUrl);
        }
        catch (error) {
            console.log(error);
        }

        try {
            const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
            const res = await axios.get("/dashboard",{
                headers:{
                    'jwtoken':cookieValue
                }
            });
            const data = res.data;
            setUserData(data);
            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
        }
        catch(err) {
            console.error(err);
        }
    };
    callProfilePic()
    return (
        <>
            <div className="h-30vh w-auto p-2 bg-white dark:bg-slate-700 flex flex-row items-center justify-end md:justify-between shadow-md shadow-gray-500 dark:shadow-none">
                <div className="p-2 hidden md:flex md:flex-row items-center overflow-hidden">
                    <img src="darklogo.png" width={130} className='hidden dark:block'/>
                    <img src="lightlogo.png" width={130} className='block dark:hidden'/>
                </div>
                <div className="other px-2 flex flex-row gap-4 items-center justify-between">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" className="text-black dark:text-slate-400 cursor-pointer">
                        <path fill="currentColor" d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"/>
                    </svg>

                    <div className='w-full flex flex-row gap-4 items-center justify-center'>
                        <h1 className='text-lg font-bold text-violet-700 dark:text-white'>{userData.firstName} {userData.lastName}</h1>
                        <a href="/Profile">
                            <img src={selectedImage} alt="ProfileImage" className="h-[60px] w-[60px] border-2 border-violet-600 rounded-full"/>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SideTopNav
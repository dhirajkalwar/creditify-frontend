import React,{ useEffect , useState , useContext } from 'react';
import axios from "../axiosConfig";

import { useNavigate } from 'react-router-dom';
import Profileimg from '../assets/user.png'
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = () => {
    const [img, setImg] = useState();
    const {state,dispatch} = useContext(UserContext);
    const [selectedImage, setSelectedImage] = useState(Profileimg);
        const handleImageChange = (event) => {
            const file = event.target.files[0];
            setImg(file);
        };
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
    const callProfilePage = async () => {
        try {
            const res = await axios.get("/profile");
            const data = res.data;
            setUserData(data);

            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            else {
                dispatch({ type: "USER_LOGIN", payload: { user: true, userType: data.role } });
            }
        }
        catch(err) {
            console.log(err);
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
    }

    useEffect(() => {
        callProfilePage();
    },[]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
            // Update the respective state object based on the selected role
            if (userData.role === 'Student') {
                setUserData({...userData,[name]: value});
            }
            else if (userData.role === 'Faculty') {
                setUserData({...userData,[name]: value});
            }
            else if (userData.role === 'HOD') {
                setUserData({...userData,[name]: value});
            }
        };
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
                        position: toast.POSITION.TOP_CENTER
                    });
                    setTimeout(() =>{
                        closeModal();
                    },3000)
                }else if (res.status !== 201) {
                    toast.error('Unable to Update',{
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    return (
        <>
                <section className="h-auto flex flex-col items-center justify-center bg-[#E4E9F7]">
                    <ToastContainer autoClose={2000} />
                    <div className="profilesection p-20 m-10 w-[80%] bg-white justify-center items-center shadow-cyan-500/50">
                        <h1 className="text-[#6236FF] font-Amita font-medium text-3xl p-10">Profile</h1><br/><br/>
                        <div className="flex flex-col md:flex-row">
                            <div className="profileimage p-5  flex flex-col items-center w-[100%] ">
                                    <div className='w-[400px]' >
                                        <img src={selectedImage} className="h-[400px] w-[400px] border-4 border-blue-500  rounded-full"/><br/><br/>
                                    </div>
                            </div>

                            <div className="p-5 formentry w-[100%]">
                                <label className="text-3xl font-bold text-[#6236FF]">{userData.firstName} {userData.lastName}</label><br/><br/>

                                <label className="text-xl font-bold"><span className="text-[#6236FF]">Role :</span> {userData.role}</label><br/><br/>

                                <label className="text-xl font-bold"><span className="text-[#6236FF]">Department :</span> {userData.department}</label><br/><br/>

                                <div className={`${userData.role === 'Student' ? 'block' : 'hidden'}`}>
                                    <label className="text-xl font-bold"><span className="text-[#6236FF]">Study Year :</span> {userData.year}</label><br/><br/>
                                </div>

                                <label className="text-xl font-bold"><span className="text-[#6236FF]">{userData.role === 'Student' ? 'Student ID' : userData.role === 'Faculty' ? 'Faculty ID' : 'HOD ID'} :</span> {userData.userId}
                                </label><br/><br/>

                                <div className={`${userData.role === 'Faculty' ? 'block' : 'hidden'}`}>
                                    <label className="text-xl font-bold"><span className="text-[#6236FF]">Faculty Type :</span> {userData.facultyType}</label><br/><br/>
                                </div>
                                <label className="text-xl font-bold"><span className="text-[#6236FF]">Email :</span> {userData.email}</label><br/><br/>

                                <button onClick={openModal} className="p-3 m-2 bg-blue-500 text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent">Edit Profile</button>
                        </div>
                        </div>
                        
                    </div>
                    <div id="myModal" className={`modal fixed inset-0 z-10 p-16 top-0 left-0 w-full h-full overflow-auto bg-opacity-40 ${modalVisible ? 'block' : 'hidden'}`} onClick={handleOutsideClick}>
                        {/* Modal content */}
                        <div className="modal-content rounded-lg mt-10 relative bg-white mx-auto border border-gray-300 w-[800px] shadow-md p-0 animate-fade-in-u">
                            <div className="modal-header flex flex-row items-center justify-start h-20 p-2 px-16 bg-blue-500 text-white">
                                <h2 className="text-2xl">Edit Profile | {userData.firstName} {userData.lastName}</h2>
                            </div>
                            <div className="modal-body p-2">
                                <form onSubmit={updateData}>
                                <div className="profilesection p-20 m-10 w-[80%] bg-white justify-center items-center shadow-cyan-500/50">
                                    <div className="flex flex-col">
                                        <div className="profileimage flex flex-col items-center w-[100%]">      
                                            {selectedImage && (
                                                <div>
                                                    <img src={selectedImage} className="h-96 border-4 border-blue-500 rounded-full"/><br/><br/>
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <label className="p-3 m-2 bg-blue-500 text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent">
                                                    <input type="file" className="hidden" accept="image/png , image/gif , image/jpeg" onChange={handleImageChange}/> Change Photo
                                                </label>
                                            </div>
                                        </div><br/>
                                        <div className="formentry w-[100%]">
                                            <input type="text" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="firstName" placeholder="First Name" name="firstName" autoComplete="off" value={userData.firstName}onChange={handleInputChange} required/><br/><br/>

                                            <input type="text" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="lastName" placeholder="Last Name" name="lastName" autoComplete="off" value={userData.lastName}onChange={handleInputChange} required/><br/><br/>
                                            {userData.role === 'Student' && (
                                            <div>
                                                <input type="text" list="studyYear" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="studyyear" placeholder="Select Year" name="year" autoComplete="off" value={userData.year}onChange={handleInputChange} required/><br/><br/>
                                                <datalist id="studyYear">
                                                    <option value="First Year"/>
                                                    <option value="Second Year"/>
                                                    <option value="Third Year"/>
                                                    <option value="Final Year"/>
                                                </datalist>
                                            </div>
                                            )}

                                            {userData.role === 'Faculty' && (
                                            <div>
                                                <input type="text" list="type" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="factype" placeholder="Select Faculty Type" name="facultyType" autoComplete="off" value={userData.facultyType}onChange={handleInputChange} required/><br/><br/>
                                                <datalist id="type">
                                                    <option value="Technical"/>
                                                    <option value="Non-Technical"/>
                                                    <option value="Sports"/>
                                                </datalist>
                                            </div>
                                            )}
                                            <input type="text" className="p-3 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" id="emailid" placeholder="Email ID" name="email" autoComplete="off" value={userData.email}onChange={handleInputChange} required/><br/><br/>

                                            <input type="submit" className="p-3 m-2 bg-blue-500 text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent" value="Update"/>
                                        </div>
                                    </div>
                                </div>
                                </form>
                            </div>
                            <div className="modal-footer flex flex-row items-center justify-end p-5 h-20 bg-blue-500 text-white">
                            <span className="close p-3 m-2 rounded-md bg-white text-blue-500 font-bold cursor-pointer hover:border-2 hover:border-white hover:text-white hover:bg-transparent" onClick={closeModal}>&times; Close</span>
                            </div>
                        </div>
                    </div>
                </section>
        </>
    );
}

export default Profile;
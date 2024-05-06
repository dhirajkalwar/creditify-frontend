import { useEffect , useState,useCallback} from 'react';
import axios from "../axiosConfig";
import StudentSidebar from './StudentSidebar';
import StaffSidebar from './StaffSidebar';
import HODSidebar from './HODSidebar';
import SideTopNav from './SideTopNav';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UploadCertificate = () => {
    const [category1, setCategory1] = useState(null);
    const [category2, setCategory2] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState(null);
    const history = useNavigate();
    axios.defaults.withCredentials = true;
    const [userData,setUserData] = useState({
        role: '',
        fullName:'',
        userId: '',
        email: '',
        department: '',
        year: '',
        facultyType:'',
        password:''
    });
    const callUploadCertificatePage = useCallback(async () => {
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
            const res = await axios.get("/uploadcertificate");
            const data = res.data;
            setUserData(data);
            setCertificateData({...certificateData, fullName: data.firstName + " " + data.lastName, userId: data.userId,department:data.department})
            console.log(userData.department)
            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            else {
                history('/Uploadcertificate')
            }
        }
        catch(err) {
            console.log(err);
            history('/Login');
        }
        try {
            const res = await axios.get("/api/getCat");
            const data = res.data;
            const initial = {};
            const initial1 = [];
            if(data) {
                data.map((value) => {
                    initial[value.catName] = value.subCat;
                    initial1.push(value.catName);
                })
                setCategory2(initial1);
                setCategory1(initial);
            }
        }
        catch (error) {
            console.log(error);
        }
    },[history]);
    useEffect(() => {
        callUploadCertificatePage();
    },[callUploadCertificatePage]);
    const [certificateData, setCertificateData] = useState({
        cerType:"Competition",
        activityType:'',
        competitionLevel:"Intra-college",
        position:"",
        category:'Technical',
        categorySpecific:"",
        department: "",
        fullName:'',
        userId:'',
        pdf:null,
    });
    const handleFileChange = (e) => {
        const data = e.target.files[0];
        setCertificateData({...certificateData, pdf: data});
        setSelectedFileName(data.name);
    };
    const uploadDetail = {
        CerType: ["Competition", "Seminar", "Webinar", "Workshop"],
        CompLevel: ["Intra-college", "Intercollege", "District", "State", "National" ,"International"],
        Position: ["-- Select --","1st Prize", "2nd Prize", "3rd Prize","Participation","Consolation"],
        Catagory: ["Technical", "Non_Technical", "Sports"],
        ActType: ["-- Select --","Participation", "Conduction","Organization"],
    }
    const [selectedCategory, setSelectedCategory] = useState('Technical');
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCertificateData({...certificateData, category: e.target.value})
    };
    const [selectedCompetition, setSelectedCompetition] = useState('Competition');
    const handleCompetitionChange = (e) => {
        setSelectedCompetition(e.target.value);
        setCertificateData({ ...certificateData, cerType: e.target.value})
    };
    const handleChange = (e) => {
        const { name, value} = e.target;
        setCertificateData({ ...certificateData, [name]: value});
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('/uploadCer', certificateData, {
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            })
            if(res.status == 200) {
                toast.success('Certificate Uploaded Successfully',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-green-500 dark:text-white dark:bg-slate-600 font-bold',
                });
                setTimeout(() => {
                    history('/Dashboard', {replace:true});
                }, 2000);
            }
            else {
                toast.error('File not Found',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-red-500 dark:text-white dark:bg-slate-600 font-bold',
                });
            }
        }
        catch(error) {
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
                        <h2 className='text-4xl font-bold text-violet-700 dark:text-white'>Submit Certificate</h2>
                        <form className='profile-container p-5 w-full md:w-[50%] flex flex-col gap-4 full' onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                <label className='p-2 w-full text-black dark:text-white'>Select Certificate Type :</label>
                                <select id="certitype" name="cerType" value={certificateData.cerType} onChange={handleCompetitionChange} className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black shadow-sm shadow-black">
                                {uploadDetail.CerType.map((value, index) => {
                                    return <option key={index} value={value}>{value}</option>
                                })};                       
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <div className={`${selectedCompetition === 'Competition' ? 'hidden' : 'block'}`}>
                                    <label className='p-2 text-black dark:text-white'>Activity Type :</label><br/>
                                    <select id="certitype" name="activityType" value={certificateData.activityType} className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black shadow-sm shadow-black" onChange={handleChange} >
                                    {uploadDetail.ActType.map((value, index) => {
                                        return  <option key={index} value={value}>{value}</option>
                                    })};                       
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className='p-2 text-black dark:text-white'>Competition Level :</label><br/>
                                <select id="certitype" name="competitionLevel"  value={certificateData.competitionLevel} className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black shadow-sm shadow-black" onChange={handleChange}>
                                {uploadDetail.CompLevel.map((value, index) => {
                                    return  <option key={index} value={value}>{value}</option>
                                })};                       
                                </select>
                            </div>
                            <div>
                                <div className={`${selectedCompetition === 'Competition' ? 'block' : 'hidden'}`}>
                                    <label className='p-2 text-black dark:text-white'>Position :</label><br/>
                                    <select id="certitype" name="position" value={certificateData.position} className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black shadow-sm shadow-black" onChange={handleChange}>
                                    {uploadDetail.Position.map((value, index) => {
                                        return  <option key={index} value={value}>{value}</option>
                                    })};                       
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className='p-2 text-black dark:text-white'>Category :</label><br/>
                                <select id="certitype" name="category" value={certificateData.category} onChange={handleCategoryChange} className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black shadow-sm shadow-black">
                                { category2 ? category2.map((value, index) => {
                                    return  <option key={index} value={value}>{value}</option>
                                }) : ""};                  
                                </select>
                            </div>
                            <div>
                                <label className='p-2 text-black dark:text-white'>Category Specific :</label><br/>
                                <select id="certitype" name="categorySpecific" value={certificateData.categorySpecific} className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black shadow-sm shadow-black" onChange={handleChange}>
                                <option >-- Select --</option>
                                    {category1 ?  category1[selectedCategory].map((value, index) => {
                                        return  <option key={index} value={value}>{value}</option>
                                    }) : ""};                     
                                </select>
                            </div>
                            <div>
                                <label className='p-2 text-black dark:text-white'>Upload Certificate :</label><br/><br/>
                                <label className="p-3 mx-2 mt-3 w-[100%] bg-violet-700 text-white font-bold cursor-pointer hover:border-2 hover:border-violet-700 dark:hover:border-white hover:text-violet-700 dark:hover:text-white hover:bg-transparent rounded-md">
                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/png , image/jpeg, application/pdf"/> Upload File
                                </label> <span className='text-black dark:text-white'>{selectedFileName ? selectedFileName : 'Choose Your File'}</span>
                            </div>
                            <button type="submit" className='my-2 px-4 py-2 w-full md:w-[40%] font-bold text-lg  rounded-lg bg-violet-700 dark:bg-white hover:bg-transparent dark:hover:bg-transparent border-0 hover:border-2 hover:border-violet-700 dark:border-white text-white dark:text-black hover:text-violet-700 dark:hover:text-white'>Submit Certificate</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UploadCertificate
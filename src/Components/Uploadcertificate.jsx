import React,{ useEffect , useState , useContext } from 'react';
import axios from "../axiosConfig";

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UploadCertificate = () => {
    const {state,dispatch} = useContext(UserContext);
    const [category1, setCategory1] = useState(null);
    const [category2, setCategory2] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState(null);
    const history = useNavigate();
    axios.defaults.withCredentials = true;
    const handleFileChange = (e) => {
        const data = e.target.files[0];
        setCertificateData({...certificateData, pdf: data});
        setSelectedFileName(data.name);
    };
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
    const callUploadCertificatePage = async () => {
        try {
            const res = await axios.get("/uploadcertificate");
            const data = res.data;
            setUserData(data);
            setCertificateData({...certificateData, fullName: data.firstName + " " + data.lastName, userId: data.userId})
            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            else {
                dispatch({ type: "USER_LOGIN", payload: { user: true, userType: data.role } });
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
            console.log(data);
            const initial = {};
            const initial1 = [];
            if(data) {
            data.map((value,index) => {
                initial[value.catName] = value.subCat;
                initial1.push(value.catName);
            })
            setCategory2(initial1);
            setCategory1(initial);
        }
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        callUploadCertificatePage();
    },[]);
    const uploadDetail = {
        CerType: ["Competition", "Seminar", "Webinar", "Workshop"],
        CompLevel: ["Intra-college","International", "Intercollege", "District", "State", "National"],
        Position: ["-- Select --","1st Prize", "2nd Prize", "3rd Prize","Participation","Consolation"],
        Catagory: ["Technical", "Non_Technical", "Sports"],
        ActType: ["-- Select --","Participation", "Conduction"],
    }
    const category = {
        Technical : ["Select SubCategory",
        "Tecknack - ACM",
        "Robo-making",
        "Go-cart",
        "GDSC (Google Developer Students Club)",
        "ACM (Association for Computing Machinery)",
        "CSI (Computer Society of India)",
        "IETE (Institution of Electronics and Telecommunication Engineers)",
        "IEEE (Institute of Electrical and Electronics Engineers)",
        "ISHARE",
        "Madgears Motorsports",
        "Hackathons"],

        Non_Technical : ["Select SubCategory",
            "Literary",
            "Performing Arts",
            "Fine Arts",
            "Gaming"
        ],

        Sports : ["Select SubCategory",
            "Track Games",
            "Field Events",
            "Indoor Games"
        ]
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
    const handelChange = (e) => {
        const { name, value} = e.target;
        setCertificateData({ ...certificateData, [name]: value});
    };
    const [certificateData, setCertificateData] = useState({
        cerType:"Competition",
        activityType:'',
        competitionLevel:"Intra-college",
        position:"",
        category:'Technical',
        categorySpecific:"",
        fullName:'',
        userId:'',
        pdf:null,
    })
    

    const handelSubmit = async (e) => {
        e.preventDefault();
        try{
        const res = await axios.post('/uploadCer', certificateData, {
            headers:{
                'Content-Type':'multipart/form-data',
            },
        })

        if(res.status == 200) {
            toast.success('Certificate Uploaded Successfully',{
                position: toast.POSITION.TOP_CENTER
            });
            setTimeout(() => {
                history('/Dashboard', {replace:true});
            }, 2000);
        }else {
            toast.error('File not Found',{
                position: toast.POSITION.TOP_CENTER
            });
        }
    }catch(error) {
        console.log(error);
    }
    }
    return (
        <>
            <section className="h-auto flex flex-col items-center justify-center bg-[#E4E9F7]">
                
                < ToastContainer autoClose={2000} />
                <div className="uploadsection my-20 flex flex-col w-[63%] p-5 bg-white shadow-cyan-500/50">
                    <h1 className="text-[#6236FF] font-Amita font-medium text-3xl p-5">Upload Certificate</h1><br/><br/>
                    <form onSubmit={handelSubmit}>
                    <div className='flex flex-row flex-wrap'>
                        <div className='flex flex-col'>
                            <label>Select Certificate Type :</label>
                            <select id="certitype" name="cerType" value={certificateData.cerType} onChange={handleCompetitionChange} className="p-4 m-2  w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500">
                            {uploadDetail.CerType.map((value, index) => {
                            return  <option key={index} value={value}>{value}</option>
                            })};                       
                            </select><br/>
                        </div>
                        <div className='flex flex-col'>
                            <div className={`${selectedCompetition === 'Competition' ? 'hidden' : 'block'}`}>
                                <label>Activity Type :</label><br/>
                                <select id="certitype" name="activityType" value={certificateData.activityType} className="p-4 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" onChange={handelChange} >
                                {uploadDetail.ActType.map((value, index) => {
                                return  <option key={index} value={value}>{value}</option>
                                })};                       
                                </select><br/>
                            </div>
                        </div>
                        <div>
                            <label>Competition Level :</label><br/>
                            <select id="certitype" name="competitionLevel"  value={certificateData.competitionLevel} className="p-4 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" onChange={handelChange}>
                            {uploadDetail.CompLevel.map((value, index) => {
                                return  <option key={index} value={value}>{value}</option>
                            })};                       
                            </select><br/>
                        </div>
                        <div>
                            <div className={`${selectedCompetition === 'Competition' ? 'block' : 'hidden'}`}>
                                <label>Position :</label><br/>
                                <select id="certitype" name="position" value={certificateData.position} className="p-4 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" onChange={handelChange}>
                                {uploadDetail.Position.map((value, index) => {
                                    return  <option key={index} value={value}>{value}</option>
                                })};                       
                                </select><br/>
                            </div>
                        </div>
                        <div>
                            <label>Category :</label><br/>
                            <select id="certitype" name="category" value={certificateData.category} onChange={handleCategoryChange} className="p-4 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500">
                            { category2 ? category2.map((value, index) => {
                            return  <option key={index} value={value}>{value}</option>
                            }) : ""};                  
                            </select><br/>
                        </div>
                        <div>
                            <label>Category Specific :</label><br/>
                            <select id="certitype" name="categorySpecific" value={certificateData.categorySpecific} className="p-4 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500" onChange={handelChange}>
                            <option >-- Select --</option>
                            {category1 ?  category1[selectedCategory].map((value, index) => {
                                return  <option key={index} value={value}>{value}</option>
                            }) : ""};                     
                            </select><br/>
                        </div>
                        <div>
                            <label>Upload Certificate :</label><br/><br/>
                            <label className="p-3 mx-2 mt-3 w-[100%] bg-blue-500 text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent">
                            <input type="file" className="hidden" onChange={handleFileChange} accept="image/png , image/jpeg, application/pdf"/> Upload File
                            </label> {selectedFileName ? selectedFileName : 'Choose Your File'}        <br/><br/>
                        </div>
                        <div className='flex flex-col'>
                            <input className="p-3 my-4 ml-[270px] bg-blue-500 text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent" type="submit" value="Submit Certificate"  />
                        </div>
                    </div>
                    </form>
                </div>
            </section>
        </>
    )
}
export default UploadCertificate;
import React,{ useEffect , useState , useContext } from 'react';
import axios from "../axiosConfig";

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FacultyCertApproval = () => {
    const [data, setData] = useState(null)
    const [pdfUrl, setPdfUrl] = useState(null);
    const {state,dispatch} = useContext(UserContext);
    const history = useNavigate();
    axios.defaults.withCredentials = true;
  
    const callApprovalPage = async () => {
        try {
            const res = await axios.get("/profile");
            const data = res.data;

            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            else {
                dispatch({ type: "USER_LOGIN", payload: { user: true, userType: data.role } });
            }
        }
        catch(err) {
            console.log(err);
        }
        try {
            const res = await axios.get("/facultyapproval");
            const data = res.data;
            if(data.length !== 0){
                setData(data);
            }else setData(null);

            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
           
        }
        catch(err) {
            history('/Login');
        }
    }

    useEffect(() => {
        callApprovalPage();
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
            position: toast.POSITION.TOP_CENTER
        });
    }

   }
   const reject = async (ID) => {
    const res = await axios.post('/reject',{ID:ID})
    if(res.status == 200) {
        toast.error('Certificate Rejected',{
            position: toast.POSITION.TOP_CENTER
        });
    }

   }
    return (
        <>
            <section className="document-approval h-[100vh] flex flex-col bg-[#E4E9F7]">
                <ToastContainer autoClose={2000} />
                <h1 className="text-[#6236FF] mt-20 p-5 font-Amita font-bold text-4xl">Manage Document Approval</h1>

                <div className="w-[98%] m-[1%]">
                <table className="rounded-lg flex flex-col  overflow-hidden border-collapse ">
                    <tr className="thead p-2 bg-[#ff702a]  text-white  w-[100%] ">
                        <td className=' w-[10%]'>Student ID</td>
                        <td className=' w-[10%]'>Student Name</td>
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
                                <td className=' w-[10%]'>{value.userId}</td>
                                <td className=' w-[10%]'>{value.fullName}</td>
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
                                    <button className="p-3 m-2 bg-green-500 rounded-md text-white font-bold cursor-pointer hover:border-2 hover:border-green-500 hover:text-green-500 hover:bg-transparent" onClick={() => { approve(value.ID)}}>Approve</button>
        
                                    <button className="p-3 m-2 bg-red-500 rounded-md text-white font-bold cursor-pointer hover:border-2 hover:border-red-500 hover:text-red-500 hover:bg-transparent" onClick={() => { reject(value.ID)}}>Reject</button>
                                </td>
                            </tr>
                            )
                        }) :
                        <tr className=' w-[100%] flex'>
                            <td className=' w-[100%]'>No Record Found</td>
                        </tr>
                        }
                        
                    </table>
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
                
            </section>
        </>
    );
}
export default FacultyCertApproval
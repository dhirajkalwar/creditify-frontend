import React,{ useEffect , useState , useContext } from 'react';
import axios from "../axiosConfig";

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
const CreditPage = () => {
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
    const callCreditPage = async () => {
        try {
            const res = await axios.get("/creditpage");
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
            history('/Login');
        }
    }

    useEffect(() => {
        callCreditPage();
    },[]);
    return (
        <>
            <section className="creditscore h-auto p-5 flex flex-col bg-[#E4E9F7]">
                <h1 className="text-[#6236FF] w-[100%] mt-20 p-5 font-Amita font-bold text-4xl">Credit Report</h1>

                <div className="creditsection w-[100%] flex flex-row">
                    <div className="creditfactors w-[50%] p-5 flex flex-col justify-between">
                        <div className="creditachievement w-[100%] h-64 p-5 rounded-md bg-white shadow-md shadow-indigo-800/40">
                                <h1 className="text-indigo-800 text-xl font-bold">Credits Achieved</h1>
                        </div>

                        <div className="creditfactor mt-10 w-[100%] flex flex-col">
                            <h1 className="text-2xl p-5 font-bold text-black">Credit Factor  <i className='bx bx-hive text-2xl'></i></h1>

                            <div className="cert-upload flex flex-row rounded-md items-center justify-between p-5 w-[100%] h-40 bg-white shadow-md shadow-indigo-800/40">
                                 <div className="flex flex-col">
                                    <div className="flex flex-row p-3">
                                        <i className='bx bxs-file-jpg text-4xl text-orange-500'></i>
                                        <i className='bx bxs-file-png text-4xl text-blue-500'></i>
                                        <i className='bx bxs-file-pdf text-4xl text-red-500'></i>
                                    </div>
                                    <div className="">
                                        <h1 className="p-3 text-2xl font-bold">Certificate Upload</h1>
                                    </div>
                                 </div>
                                 <div className="">
                                    <i className='bx bx-cloud-upload p-2 rounded-full bg-gray-300 text-[45px]' ></i>
                                 </div>
                            </div>

                            <div className="approval mt-5 flex flex-row rounded-md items-center justify-between p-5 w-[100%] h-40 bg-white shadow-md shadow-indigo-800/40">
                                 <div className="flex flex-col">
                                    <div className="p-3">
                                        <h1 className='text-xl font-bold text-indigo-800'>Approved By HOD</h1>
                                    </div>
                                    <div className="">
                                        <h1 className="p-3 text-xl font-bold">Status Of Approval</h1>
                                    </div>
                                 </div>
                                 <div className="">
                                    <i className='bx bx-check p-2 rounded-full bg-green-400 text-[45px]' ></i>
                                 </div>
                            </div>
                        </div>
                    </div>
                    <div className='info w-[50%] rounded-md flex flex-col items-center  justify-center p-5 bg-indigo-300'>
                        <h1 className="text-2xl font-bold p-5">Name Surname</h1>

                        <h2 className="text-xl font-bold">Total : </h2>
                    </div>
                </div>
            </section>
        </>
    );
}
export default CreditPage
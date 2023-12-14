import React,{ useEffect , useState , useContext } from 'react';
import axios from "../axiosConfig";

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateEvent = () => {
    const [category, setCategory] = useState(null);

    const {state,dispatch} = useContext(UserContext);
    const history = useNavigate();
    axios.defaults.withCredentials = true;
    const [userData,setUserData] = useState({
        role: '',
        name: '',
        email: '',
    });
    const callCreateEventPage = async () => {
        try {
            const res = await axios.get("/admindashboard");
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
            history('/AdminLogin');
        }
        try {
            const res = await axios.get('/api/getCat');
            const data = res.data;
            if(data) {
                const initial = [];
                data.map((value,index) => {
                    initial.push(value.catName);
                })
                setCategory(initial)

            }
        } catch (error) {
            console.log(error);
        }
    }
    const categoryDetail = {
        Category: ["Technical", "Non_Technical", "Sports"]
    }
    const [addCatName, setAddCatName] = useState({
        catName:"Technical",
    })
    const [addsubCat, setAddsubCat] = useState({
        catName:"Technical",
        subCat:"",
    })

    const [selectedCategory, setSelectedCategory] = useState('Technical');
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setAddsubCat({...addsubCat, catName:e.target.value});

    };
    const click = async () => {
        const res = await axios.post('/api/addCat',addCatName);
        if(res.status == 200) {
         console.log("Successfull");
        }
        
     }
     const submit = async () => {
         console.log("hii");
         
             const res = await axios.post('/api/addsubCat',addsubCat)
             if(res.status == 200) {
                 console.log("Successful");
             }
     }

    useEffect(() => {
        callCreateEventPage();
    },[]);
    return (
        <>
           
             <section className="h-auto flex flex-col items-center justify-center bg-[#E4E9F7]">
                <form>
                    <div className="m-20 flex flex-col p-5 bg-white shadow-cyan-500/50">
                        <h1 className="text-[#6236FF] font-Amita font-bold text-3xl p-5">Create Event</h1><br/><br/>

                        <label htmlFor="certitype">Select Category </label>
                        <div className="flex flex-col md:flex-row">
                            <select id="certitype" name="catName" onChange={handleCategoryChange} className="p-4 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500">
                            { category ? category.map((value, index) => {
                                return  <option key={index} value={value}>{value}</option>
                            }): ""};                     
                            </select>
                            <input type="text" name='catName' placeholder="Enter Event Type" onChange={(e) => {setAddCatName({catName:e.target.value})}} className="p-4 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500"/>
                        </div><br/>
                        <div className='flex flex-col w-[100%] items-center justify-center'>
                            <input onClick={click} className="p-3 m-2 bg-blue-500 text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent"  value="Save"  />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="certitype">Select Sub-Category </label>
                            <input type="text" name='subCat' placeholder="Enter Event Name" onChange={(e) =>{setAddsubCat({...addsubCat,subCat:e.target.value})}} className="p-4 m-2 w-[340px] outline-none border border-t-0 border-l-0 border-r-0 bg-transparent border-b-2 border-b-blue-500"/>
                        </div>
                        <div className='flex flex-col w-[100%] items-center justify-center'>
                            <input onClick={submit} className="p-3 m-2 bg-blue-500 text-white font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent"  value="Create Event"  />
                        </div>
                        
                    </div>
                </form>
            </section>
        </>
    )
}
export default CreateEvent
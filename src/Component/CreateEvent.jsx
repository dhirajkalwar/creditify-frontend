import { useEffect , useState,useCallback } from 'react';
import axios from "../axiosConfig";
import AdminSidebar from './AdminSidebar';
import AdminSideTopNav from './AdminSideTopNav';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateEvent = () => {
    const history = useNavigate();
    axios.defaults.withCredentials = true;
    const [category, setCategory] = useState(null);
    const [userData,setUserData] = useState({
        role: '',
        name: '',
        email: '',
    });
    const callCreateEventPage = useCallback(async () => {
        try {
            const res = await axios.get("/admindashboard",{
                headers:{
                    'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
                }
            });
            const data = res.data;
            setUserData(data);
            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
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
                data.map((value) => {
                    initial.push(value.catName);
                })
                setCategory(initial)
            }
        } catch (error) {
            console.log(error);
        }
    },[history,userData]);
    useEffect(() => {
        callCreateEventPage();
    },[]);
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
            toast.success('Category Added Successfully',{
                position: toast.POSITION.TOP_CENTER,
                closeButton: false,
                hideProgressBar: false,
                className: 'bg-white text-green-500 dark:text-white dark:bg-slate-600 font-bold',
            });
            callCreateEventPage();
        }
        
    }
    const submit = async () => {
        const res = await axios.post('/api/addsubCat',addsubCat)
        if(res.status == 200) {
            console.log("Successful");
            toast.success('Event Created Successfully',{
                position: toast.POSITION.TOP_CENTER,
                closeButton: false,
                hideProgressBar: false,
                className: 'bg-white text-green-500 dark:text-white dark:bg-slate-600 font-bold',
            });
        }
    }

    const changeSem = async () => {
        const res = await axios.get('/admin/changesem')
        if(res.status == 202) {
            toast.success('Semester of All Students Changed Successfully',{
                position: toast.POSITION.TOP_CENTER,
                closeButton: false,
                hideProgressBar: false,
                className: 'bg-white text-green-500 dark:text-white dark:bg-slate-600 font-bold',
            });
        }
    }

    return (
        <>
            <div className='min-h-screen bg-slate-100 dark:bg-slate-800 flex flex-row'>
                <ToastContainer autoClose={1000} />
                <div className='w-auto h-auto'>
                    <AdminSidebar/>
                </div>
                <div className='w-full h-full flex flex-col'>
                    <div className='p-0'>
                        <AdminSideTopNav/>
                    </div>
                    <div className='p-5 w-full'>
                        <div className='p-5 flex flex-col w-full'>
                            <h1 className='text-4xl font-bold text-violet-700 dark:text-white'>Create Event</h1>
                        </div>
                        <form className='flex flex-col w-full items-start justify-center'>
                            <div className='py-3 flex flex-col md:flex-row gap-4 w-full md:w-[50%] items-center justify-center'>
                                <select id="certitype" name="catName" onChange={handleCategoryChange} className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black shadow-sm shadow-black" value={selectedCategory}>
                                { category ? category.map((value, index) => {
                                    return  <option key={index} value={value}>{value}</option>
                                }): ""};           
                                </select>

                                <input type="text" name='catName' placeholder="Enter Event Type" onChange={(e) => {setAddCatName({catName:e.target.value})}} className="p-3 w-full bg-white outline-none border bg-transparent rounded-lg placeholder-black shadow-sm shadow-black"/>
                            </div>
                            <div className='py-2 w-full flex flex-row items-start justify-start'>
                                <input onClick={click} className="my-2 px-4 py-2 w-full md:w-[20%] font-bold text-lg  rounded-lg bg-violet-700 dark:bg-white hover:bg-transparent dark:hover:bg-transparent border-0 hover:border-2 hover:border-violet-700 dark:border-white text-white dark:text-black hover:text-violet-700 dark:hover:text-white text-center cursor-pointer" value="Save" readOnly/>
                            </div>
                            

                            <input type="text" name='subCat' placeholder="Enter Event Name" onChange={(e) =>{setAddsubCat({...addsubCat,subCat:e.target.value})}} className="p-3 w-[50%] bg-white outline-none border bg-transparent rounded-lg placeholder-black shadow-sm shadow-black"/>

                            <input onClick={submit} className="my-3 px-4 py-2 w-full md:w-[20%] font-bold text-lg  rounded-lg bg-violet-700 dark:bg-white hover:bg-transparent dark:hover:bg-transparent border-0 hover:border-2 hover:border-violet-700 dark:border-white text-white dark:text-black hover:text-violet-700 dark:hover:text-white text-center cursor-pointer"  value="Create Event" readOnly/>
                        </form>
                        <button className="my-3 px-4 py-2 w-full md:w-[20%] font-bold text-lg  rounded-lg bg-violet-700 dark:bg-white hover:bg-transparent dark:hover:bg-transparent border-0 hover:border-2 hover:border-violet-700 dark:border-white text-white dark:text-black hover:text-violet-700 dark:hover:text-white text-center cursor-pointer" onClick={changeSem} >Change Sem</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateEvent
import React,{ useEffect , useContext } from 'react';
import axios from "../axiosConfig";

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
axios.defaults.withCredentials = true;

const Logout = () => {
    const {state,dispatch} = useContext(UserContext);
    const history = useNavigate();
    const callLogoutPage = async () => {
        try {
            const res = await axios.get("/logout");
            document.cookie = `jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            if (res.status == 200) {
                dispatch({ type: "USER_LOGOUT" });
                setTimeout(() => {
                    history('/Login', {replace:true});
                }, 1000);
            }
            else {
                throw new Error(`Request failed with status ${res.status}`);
            }
        }
        catch(err) {
            console.log(err);
            history('/Login');
        }
    }

    useEffect(() => {
        callLogoutPage();
    },[]);
    return (
        <>
            <section className="flex flex-col items-center">
                <div className="mt-20 p-10 bg-[#038f28] flex flex-row items-center justify-center text-white w-[80%] rounded-lg">
                    <h1 className="text-3xl">User Logout Successfully <br/><br/> Thankyou !! Visit Again</h1>
                </div>
            </section>
        </>
    );
}
export default Logout;
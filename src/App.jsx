import React , { createContext, useReducer } from 'react';
import Home from './Components/Home';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Sidebar from './Components/Sidebar';
import UploadCertificate from './Components/Uploadcertificate'
import Profile from './Components/Profile';
import ErrorPage from './Components/Errorpage';
import Dashboard from './Components/Dashboard';
import Logout from './Components/Logout';
import { initialState, reducer } from './reducer/UseReducer';
// import reducer from './reducer/UseReducer';
import CreditPage from './Components/CreditPage';
import FacultyCertApproval from './Components/FacultyCertApproval';
import ResetPassword from './Components/ResetPassword';
import HODCertApproval from './Components/HODCertApproval';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import CreateEvent from './Components/CreateEvent';
import AboutPage from './Components/AboutPage';
import CategoryPage from './Components/CategoryPage';
import AdminLogout from './Components/AdminLogout';
export const UserContext = createContext();
const Routing = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Registration />} />
        <Route path="/UploadCertificate" element={<UploadCertificate/>}/>
        <Route path="/Profile" element={<Profile />}/>
        <Route path="/*" element={<ErrorPage />}/>
        <Route path="/Dashboard" element={<Dashboard />}/>
        <Route path="/Logout" element={<Logout />}/>
        <Route path="/CreditPage" element={<CreditPage />}/>
        <Route path="/FacultyCertApproval" element={<FacultyCertApproval/>}/>
        <Route path="/HODCertApproval" element={<HODCertApproval/>}/>
        <Route path='/resetPass' element={<ResetPassword />} />
        <Route path='/AdminLogin' element={<AdminLogin/>}/>
        <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
        <Route path='/CreateEvent' element={<CreateEvent/>}/>
        <Route path="/AboutPage" element={<AboutPage/>}/>
        <Route path="/CategoryPage" element={<CategoryPage/>}/>
        <Route path="/AdminLogout" element={<AdminLogout/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer,initialState);
  const userType = state.userType;
  const contextValue = { state, dispatch, userType };
  return (
    <>
      <UserContext.Provider value={contextValue}>
        <Sidebar/>
        <Routing />
      </UserContext.Provider>
    </>
  )
}

export default App

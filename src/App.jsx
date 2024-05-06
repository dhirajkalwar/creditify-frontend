import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Component/Home';
import TechEventList from './Component/TechEventList';
import NonTechEventList from './Component/NonTechEventList';
import SportsEventList from './Component/SportsEventList';
import Register from './Component/Register';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import AdminLogin from './Component/AdminLogin';
import ErrorPage from './Component/ErrorPage';
import Profile from './Component/Profile';
import EditProfile from './Component/EditProfile';
import UploadCertificate from './Component/UploadCertificate';
import CreditPage from './Component/CreditPage';
import FacultyCertApproval from './Component/FacultyCertApproval';
import HODCertApproval from './Component/HODCertApproval';
import AdminDashboard from './Component/AdminDashboard';
import CreateEvent from './Component/CreateEvent';
import ConnectionStatus from './Component/ConnectionStatus';
function App() {
  return (
    <>
      <ConnectionStatus />
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/TechEvent' element={<TechEventList/>}/>
          <Route path='/NonTechEvent' element={<NonTechEventList/>}/>
          <Route path='/SportsEvent' element={<SportsEventList/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/EditProfile' element={<EditProfile/>}/>
          <Route path='/UploadCertificate' element={<UploadCertificate/>}/>
          <Route path='/CreditPage' element={<CreditPage/>}/>
          <Route path="/AdminLogin" element={<AdminLogin/>}/>
          <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
          <Route path="/FacultyCertApproval" element={<FacultyCertApproval/>}/>
          <Route path="/HODCertApproval" element={<HODCertApproval/>}/>
          <Route path="/CreateEvent" element={<CreateEvent/>}/>
          <Route path="/*" element={<ErrorPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

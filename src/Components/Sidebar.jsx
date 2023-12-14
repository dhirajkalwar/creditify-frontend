import React, { useState, useEffect,useContext } from "react";
import Profileimg from "../assets/user.png";
import { UserContext } from "../App";
import axios from "../axiosConfig";


const Sidebar = () => {
  const [Condition,setCondition] = useState(true)
  const [selectedImage, setSelectedImage] = useState(Profileimg);
  const { state } = useContext(UserContext);
  const userType = state.userType;
  const getImage = async () => {
     
    try {
      let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      const res = await axios.get("/profileimg", {
        responseType: 'arraybuffer',
        headers:{
          'jwtoken':cookieValue
        }
      });
      const blob = new Blob([res.data], {type:'image/jpeg'});
      const imgUrl = URL.createObjectURL(blob);
      setSelectedImage(imgUrl);
    }
    catch (error) {
        console.log(error);
    }
  }
  const RenderMenu = () => {
    
    if (state.user) {
      // // User is logged in
      if(state.userType==='Student' || state.userType==='Student' || state.userType==='Faculty' || state.userType==='HOD') {
        if(Condition) {
          getImage();
          setCondition(false)
        }
      }
      return (
          <>
            {(state.user && state.userType === 'Student' || state.userType==='Faculty' || state.userType==='HOD') && (
            <a href="/Dashboard" className="nav_link font-bold">
              <i className="bx bxs-dashboard text-2xl"></i>
              <span className="nav_name">Dashboard</span>
            </a>
            )}
            {(state.user && state.userType === 'Student') && (
            <a href="/CreditPage" className="nav_link font-bold">
              <i className="bx bx-heart text-xl"></i>
              <span className="nav_name">Credit</span>
            </a>
            )}
            {(state.user && state.userType === 'Student') && (
              <a href="/UploadCertificate" className="nav_link font-bold">
                <i className="bx bx-folder nav_icon"></i>
                <span className="nav_name">Upload Certificate</span>
              </a>
            )}
            {(state.user && state.userType === 'Student') && (
            <a href="#" className="nav_link font-bold">
              <i className="bx bx-bar-chart-alt-2 nav_icon"></i>
              <span className="nav_name">Analytics</span>
            </a>
            )}
            {(state.user && state.userType === 'Faculty') && (
            <a href="/FacultyCertApproval" className="nav_link font-bold">
              <i className="bx bx-folder nav_icon"></i>
              <span className="nav_name">Document Approval</span>
            </a>
            )}
            {(state.user && state.userType === 'HOD') && (
            <a href="/HODCertApproval" className="nav_link font-bold">
              <i className="bx bx-folder nav_icon"></i>
              <span className="nav_name">Document Approval</span>
            </a>
            )}
            {(state.user && state.userType === 'Student' || state.userType==='Faculty' || state.userType==='HOD') && (
            <a href="/Profile" className="nav_link font-bold">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">Profile</span>
            </a>
            )}
            {(state.user && state.userType === 'Admin') && (
            <a href="/AdminDashboard" className="nav_link font-bold">
              <i className="bx bxs-dashboard text-2xl"></i>
              <span className="nav_name">Dashboard</span>
            </a>
            )}
            {(state.user && state.userType === 'Student' || state.userType==='Faculty' || state.userType==='HOD') && (
            <a href="/Logout" className="nav_link font-bold">
              <i className="bx bx-log-out nav_icon text-2xl"></i>
              <span className="nav_name">Sign Out</span>
            </a>
            )}
            {(state.user && state.userType === 'Admin') && (
              <a href="/CreateEvent" className="nav_link font-bold">
                <i className="bx bx-plus-circle nav_icon text-2xl"></i>
                <span className="nav_name">Create Event</span>
              </a>
            )}
            {(state.user && state.userType === 'Admin') && (
              <a href="/AdminLogout" className="nav_link font-bold">
                <i className="bx bx-log-out nav_icon text-2xl"></i>
                <span className="nav_name">Log Out</span>
              </a>
            )}
          </>
        );
    } 
    else {
      // User is not logged in
      return (
        <>
          <a href="/" className="nav_link font-bold">
            <i className="bx bx-home-alt text-2xl"></i>
            <span className="nav_name">Home</span>
          </a>
          <a href="/Login" className="nav_link font-bold">
            <i className="bx bx-user-circle text-2xl"></i>
            <span className="nav_name">Login</span>
          </a>
          <a href="/Register" className="nav_link font-bold">
            <i className="bx bx-user-plus text-2xl"></i>
            <span className="nav_name">Register</span>
          </a>
          <a href="/AboutPage" className="nav_link font-bold">
            <i className="bx bxs-info-circle text-2xl"></i>
            <span className="nav_name">About Us</span>
          </a>
          <a href="/CategoryPage" className="nav_link font-bold">
            <i className="bx bx-category-alt text-2xl"></i>
            <span className="nav_name">Category</span>
          </a>
        </>
      );
    }
  };
  
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  useEffect(() => {
    const linkColor = document.querySelectorAll(".nav_link");
    
    linkColor.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    return () => {
      linkColor.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, []);

  return (
    <>
      <header className="header" id="header">
        <div className="header_toggle" onClick={toggleNavbar}>
          <i className="bx bx-menu" id="header-toggle"></i>
        </div>
        <div className={`${userType === 'Admin' ? 'hidden' : 'block'}`}>
        <div className="header_img">
            <a href="/Profile">
              <img src={selectedImage} className="cursor-pointer" alt="" />
            </a>
          </div>
        </div>
      </header>
      <div className={isNavOpen ? "l-navbar show" : "l-navbar"} id="nav-bar">
        <nav className="nav">
          <div>
            <a href="#" className="nav_logo flex flex-row justify-between">
              <i className='bx bxl-c-plus-plus text-3xl text-white'></i> <span className="nav_logo-name">Creditify</span><span><i className="bx bx-menu-alt-right text-3xl text-white" onClick={toggleNavbar}></i></span>
            </a>
            
            <div className="nav_list">
                <RenderMenu />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
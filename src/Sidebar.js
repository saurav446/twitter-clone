import React from 'react';
import './Sidebar.css'
import TwitterIcon from '@material-ui/icons/Twitter';
import SidebarOption from './SidebarOption';
import HomeIcon from '@material-ui/icons/Home'; 
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ExploreIcon from '@material-ui/icons/Explore'; 
import {Button,Avatar } from '@material-ui/core';
import Auth from './useAuth'; 
import { useState } from 'react';
import {Modal} from 'react-bootstrap'
import CheckIcon from '@material-ui/icons/Check';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
 
const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


     const auth = Auth();
     const handleOpen = () => {
      document.querySelector('.sidebar').classList.toggle('open');
    }; 
    
    return (
      <div className="sidbar__stiky"> 
       <MenuIcon onClick={handleOpen} className="menu" />
        <div className="sidebar">
        <Link to="/">
        <TwitterIcon className="twitter__icon"></TwitterIcon>
          </Link> 
              

           <Link to="/">
           <SidebarOption className="twitter__home"  Icon={HomeIcon} text="Home"   active/>
             </Link>      
            <SidebarOption Icon={NotificationsNoneIcon} text="Explore" />
            <SidebarOption Icon={MailOutlineIcon} text="Notification" />
            <SidebarOption Icon={BookmarkBorderIcon} text="Messages" />
            <SidebarOption Icon={ListAltIcon} text="Bookmarks" />
            <SidebarOption Icon={PersonOutlineIcon} text="Lists" />
            <SidebarOption Icon={ExploreIcon } text="Profile" />
            <SidebarOption Icon={MoreHorizIcon} text="More" />
              
             <Button variant="outline" className="sidebar__twitter"   >  Tweet </Button>

          <div className="sidebar__profileInfo" onClick={handleShow}>
          <Avatar src={auth.user?.photoURL} alt={auth.user?.displayName} />
          <div>
            <h5 className="sidebar__profileInfo__displayName">
              {auth.user?.displayName}
            </h5>
            <p className="sidebar__profileInfo__username">
              {'@' + auth.user?.displayName}
            </p>
          </div> 
             <p className="logout">...</p> 
        </div>
       
 

      <Modal show={show} onHide={handleClose}> 
        <Modal.Body>
          
        <div className="sidebar__profileInfos">
          <Avatar src={auth.user?.photoURL} alt={auth.user?.displayName} />
          <div>
            <h5 className="sidebar__profileInfo__displayName">
              {auth.user?.displayName}
            </h5>
            <p className="sidebar__profileInfo__username">
              {'@' + auth.user?.displayName}
            </p>
          </div>
          <div> 
             <p className="logout"><CheckIcon className="logins" /></p>
          </div> 
        </div> 
            <Button className="logOut_btn" onClick={auth.logout}> 
              <p className="sidebar__profileInfo__usernames">
             Log Out   <stong style={{ color: "#757d83 " }}>{'@' + auth.user?.displayName}</stong>  
            </p>
            </Button>
        
        </Modal.Body> 
      </Modal>



         </div>
        </div>
    );
};

export default Sidebar;
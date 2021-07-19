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
import {Button} from '@material-ui/core';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <TwitterIcon className="twitter__icon"></TwitterIcon>

            <SidebarOption  Icon={HomeIcon} text="Home"   active/>
            <SidebarOption Icon={NotificationsNoneIcon} text="Explore" />
            <SidebarOption Icon={MailOutlineIcon} text="Notification" />
            <SidebarOption Icon={BookmarkBorderIcon} text="Messages" />
            <SidebarOption Icon={ListAltIcon} text="Bookmarks" />
            <SidebarOption Icon={PersonOutlineIcon} text="Lists" />
            <SidebarOption Icon={ExploreIcon } text="Profile" />
            <SidebarOption Icon={MoreHorizIcon} text="More" />
              
             <Button variant="outline" className="sidebar__twitter"   >
                 Tweet
                 </Button>
        </div>
    );
};

export default Sidebar;
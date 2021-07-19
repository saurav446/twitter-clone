import React from 'react';
import './SidebarOption.css'

const SidebarOption = ({Icon,text,active}) => {
    return (
        <div className={`sidebar-option ${active && 'sidebar-active'}`}>
          <Icon />
          <h2>{text}</h2> 
        </div>
    );
};

export default SidebarOption;
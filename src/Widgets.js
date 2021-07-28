import React, { useState } from 'react'; 
import {
    TwitterTimelineEmbed,
    TwitterShareButton,
    TwitterTweetEmbed,
  } from "react-twitter-embed";
  import SearchIcon  from '@material-ui/icons/Search';
  
import './Widgets.css';

 

const Widgets = () => {
   

    return (
        <div className="widgets">
   
            <div className="widgets__input">
                <SearchIcon />
                <input type="text" placeholder="Search Twitter" />
            </div>
            <div className="widgets__widgetsContainer">
               <h2>What's happening</h2>
               <TwitterTweetEmbed tweetId={"1356862712945410048"} />

                <TwitterTimelineEmbed
                sourceType="profile"
                screenName="Saurav Barua"
                options={{ height: 400 }}
                />
         
            </div>
 


        </div>
    );
};

export default Widgets;
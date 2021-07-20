import React from 'react'; 
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
                    <SearchIcon className="widgets__searchIcon" />
                    <input className="input__all" placeholder="Search Tweet" type="text" /> 
            </div>
            <div className="widgets__widgetsContainer">
               <h2>What's happening</h2>
               <TwitterTweetEmbed tweetId={"1356862712945410048"} />

                <TwitterTimelineEmbed
                sourceType="profile"
                screenName="Saurav Barua"
                options={{ height: 400 }}
                />

                {/* <TwitterShareButton
                 
                url={"https://facebook.com/interpid.pronay"}
                options={{ text: "#reactjs is awesome", via: "Saurav Barua" }}/> */}
            </div>
        </div>
    );
};

export default Widgets;
import React from 'react';
import './Post.css'
import {Avatar, Button} from '@material-ui/core'; 
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import Auth from './useAuth';  
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useState } from 'react';
import db from './firebase';
import { useEffect } from 'react'; 
import Moment from 'react-moment';


const Post = ({displayName,username,verified,text,image,postId,timestamp}) => {
     
       
    const auth = Auth();
  const [love, setLove] = useState(false);
  const [loves, setLoves] = useState(); 
  useEffect(() => { 
    if (postId) { 
      db.collection('post')
        .doc(postId)
        .collection('loves')
        .onSnapshot((snapshot) => {
          setLoves(
            snapshot.docs.map((doc) => ({ id: doc.id, love: doc.data() }))
          );
        });
    }
  }, [postId]);

  useEffect(() => {
    const isLove = loves?.find(({ id, love }) => love.uid === auth.user?.uid);

    if (isLove !== undefined) {
      setLove(true);
    }
  }, [  loves]);

  const inLoves = () => {
    db.collection('post').doc(postId).collection('loves').add({
      uid: auth.user?.uid,
    });
  };
  const outLoves = (id) => {
    db.collection('post').doc(postId).collection('loves').doc(id).delete();
  };




  const outLove = () => {
    setLove(false);

    const isLove = loves?.find(({ id, love }) => love.uid === auth.user?.uid);

    if (isLove !== undefined) {
      outLoves(isLove.id);
    }
  };


  const inLove = () => {
    setLove(true);
    inLoves();
  };

 
    return (
        <div className="post"> 
          <div  className="post__avatar">
             <Avatar src={auth.user?.photoURL}  alt={auth.user?.displayName} ></Avatar>
          </div>  
          <div className="post__body">
              <div className="post__header">
                   <div className="post__headerText">
                        <h3>
                           {displayName} 
                            <span className="post__headerSpecial"> 
                              {verified &&  <VerifiedUserIcon className="post__badge" /> }
                               {username}  . 
                               <Moment format="D MMM YYYY" withTitle>
                        {timestamp !== null
                          ? new Date(timestamp.seconds * 1000).toLocaleDateString('en-US')
                          : null}
                      </Moment>   
                            </span> 
                        </h3> 
                  </div>
                  <div className="post__headerDescription">
                    <p  className="text__p">
                    {text}  
                    </p>
                  </div>
              </div>

             <div className="post__img"> 
               <img  src={image} alt={displayName} />
            </div>

          <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />

 

            {love ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FavoriteIcon
                onClick={outLove}
                style={{ color: 'red' }}
                fontSize="small"
              />

              <span
                style={{
                  marginLeft: '5px',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {loves?.length}
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FavoriteBorderIcon
                onClick={inLove}
                style={{ color: 'red' }}
                fontSize="small"
              />
              <span
                style={{
                  marginLeft: '5px',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {loves?.length}
              </span>
            </div>
          )}


            <PublishIcon fontSize="small" />
          </div>
          </div>
       </div>
    );
};

export default Post;
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
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '70vw !important',
    height: '90vh',
    overflow: 'scroll',
    paddingLeft: '10px !important',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid var(--twitter-color)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Post = ({displayName,username,verified,text,image,postId,timestamp,avater}) => {
     
       
  const auth = Auth();
  const [love, setLove] = useState(false);
  const [loves, setLoves] = useState();  
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [totalComments, setTotalComments] = useState(null);
  const classes = useStyles();
  const [replayTweet, setReplayTweet] = useState('');

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
    if (postId) {
      db.collection('post')
        .doc(postId)
        .collection('comments')
        .onSnapshot((snapshot) => {
          setTotalComments(
            snapshot.docs.map((doc) => ({ id: doc.id, comment: doc.data() }))
          );
        });
    }
  }, [postId]);


  const addComments = () => {
    db.collection('post').doc(postId).collection('comments').add({
      replayTweet: replayTweet,
      avater: auth.user?.photoURL,
      displayName: auth.user?.displayName,
    });
    setReplayTweet(''); 
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const body = (
    <div style={modalStyle} className={classes.paper}>

      <div className="post">
        <Avatar src={avater} alt={displayName} />
        <div className="post__main__body">
       
          <div className="post__header">
            <h4 style={{marginLeft:'5px'}}>{displayName}</h4>
            
          </div>
          <div className="post__body">
            <p>{text}</p>
            <p>
              Replay Tweet {' '}
              <span style={{ color: 'var(--twitter-color)' }}>{username}</span>
            </p>
            
          </div>
        </div>
      </div>
      <div> 
        {totalComments?.map(({ id, comment }) => (
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Avatar src={comment.avater} alt={comment.displayName} />
            <div style={{ marginLeft: '10px' }}>
              <span style={{ color: 'var(--twitter-color' }}>
                {comment.displayName}
              </span>
              <p style={{ fontWeight: 'bold' }}>{comment.replayTweet}</p>
            </div>
          </div>
        ))}
      </div>
      <div
        className="tweetBox__input"
        style={{
          display: 'flex !important',
          alighItems: 'flex-start !important',
          padding: '6px !important'
        }}
      >
        <Avatar src={auth.user?.photoURL} alt={auth.user?.displayName} /> 
        <textarea
          placeholder="Add  your comment"
          value={replayTweet}
          onChange={(e) => setReplayTweet(e.target.value)}
          cols="30"
          rows="4"
        ></textarea>
      </div>
      <div className="tweetBox__upload">
        <Button
          onClick={addComments}
          disabled={!replayTweet}
          className="tweetBox__button"
        >
          Tweet
        </Button>
      </div>
      <span
            style={{
              fontSize: '21px',
              fontWeight: 'bold',
              width: '100%',
              textAlign: 'right',
              float: 'right',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(false)}
          >
          Close
          </span>
    </div>
  );

 
    return (
        <div className="post"> 
          <div  className="post__avatar">
             <Avatar src={avater}  alt={displayName} ></Avatar>
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
                    <h5> {text}  </h5>
                  </div>
              </div>

             <div className="post__img"> 
               <img  src={image} alt="" />
            </div>

          <div className="post__footer">
            
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ChatBubbleOutlineIcon onClick={handleOpen} fontSize="small" />
            <span
              style={{ marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}
            >
              {totalComments?.length}
            </span>
          </div>
           
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
 
            <PublishIcon fontSize="small"  />
             
             
          </div>
          </div>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
       </div>
    );
};

export default Post;
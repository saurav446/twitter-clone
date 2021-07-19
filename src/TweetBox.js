import React,{ useState }  from 'react';
import './TweetBox.css' 
import {Avatar, Button} from '@material-ui/core'; 
import db, { storage } from './firebase';
import ImageIcon from '@material-ui/icons/Image';
import Auth from './useAuth';
import firebase from 'firebase';

const TweetBox = () => {
    const [tweetMessege,setTweetMessege] = useState('')
    const [image,setImage] = useState(null) 
    const [progress,setProgress] = useState(0)
  
    const hendleChange = (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        } 
    }
    
    const sendTweet = (e) =>{
         
        e.preventDefault();
        const upload  = storage.ref(`images/${image.name}`).put(image);
        upload.on(
            'state_changed',
            (snapshot) => {
                const progresses  = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
               setProgress(progresses)
            },
            (error) => {
              alert(error.msessage)  
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL()
                .then((url) => {
                    db.collection('post').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        avater: auth.user.photoURL,
                        displayName: auth.user.displayName,
                        username: '@' + auth.user.displayName,
                        verified: true,
                        text: tweetMessege,
                        image: url
                    })
                })
            }
        )
    }
    const auth = Auth(); 
    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox__input" >  
                 <Avatar className="avter"    src={auth.user?.photoURL}  alt={auth.user?.displayName} />  
                    <textarea
                    value={tweetMessege}
                    onChange={(e) => setTweetMessege(e.target.value)}  
                     row="2"
                     cols="30"
                     placeholder="what happend" />  
                </div>
                <div className="upload_btn">
                    <div className="file_up">
                    <input  
                        className="tweetBox__img__input"  
                        type="file"
                        id="imgs"  
                        onChange={hendleChange}
                        /> 
                        <label className="images_icon" htmlFor="imgs">
                        <ImageIcon className="img_icon"  />
                         </label> 
                    </div>
                
                <Button 
                onClick={sendTweet}
                disabled={!tweetMessege}
                type="submit"
                className="tweetBox__button">Tweet</Button>  
                </div>
                 
            </form>
            
          <progress style={{ height:'5px',width:'102%',border:'none'}} value={progress}   max="100" />
        </div>
    );
};

export default TweetBox;
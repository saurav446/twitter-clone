import React,{ useEffect ,useState} from 'react'; 
import './feed.css'
import db from './firebase';
import Post from './Post';
import TweetBox from './TweetBox'; 
 
import Auth from './useAuth';

const Feed = () => {
    const [posts,setPosts] = useState([]);
 
    useEffect(() => {
        db.collection('post')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => (
            setPosts( snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
        ))
    },[])
    
 
  
    
   
    return (
        <div className="feed"> 
            <div className="feed__header">
            <h2>Home</h2>
            </div> 
            <TweetBox />  
            {posts.map(({id,post}) => 
                    <Post  
                    postId={id}
                    key={id}
                    displayName={post.displayName} 
                    username={post.username}
                    verified={post.verified}
                    text={post.text}
                    image={post.image}
                    avater={post.avater} 
                    timestamp={post.timestamp}
                    />        
                ) 
            }
          
      
             
        </div>
    );
};

export default Feed;
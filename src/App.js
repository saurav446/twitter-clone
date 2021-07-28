import './App.css';
import Sidebar from './Sidebar';
import Feed from './Feed'
import Widgets from './Widgets'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import    Auth, {AuthContextProvider, PrivateRoute,AuthenticatedRoute} from './useAuth';
import NOtFound from './NOtFound'; 
import { useState } from 'react';
 
 


function App() {
   const [loading,setLoading] = useState(false)

   const auth = Auth();
  
  return (
    <div className="app"> 
      <AuthContextProvider> 
      <Router>
         <Switch>
         
         <PrivateRoute exact path="/"> 
           <Sidebar></Sidebar>
           <Feed></Feed>
          <Widgets></Widgets>  
           </PrivateRoute> 

          <AuthenticatedRoute path="/login" > 
          <Login></Login>
           </AuthenticatedRoute>


           <AuthenticatedRoute path="/signup" > 
           <SignUp></SignUp>
           </AuthenticatedRoute>
            
            

           <Route   path="*">
             <NOtFound></NOtFound>
           </Route>
        </Switch>
      </Router>
      </AuthContextProvider>
      
    </div>
  );
}
// 10.0.19041.488
export default App;

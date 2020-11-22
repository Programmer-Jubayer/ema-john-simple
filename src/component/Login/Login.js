import { TextField } from '@material-ui/core';
import React from 'react';
import Button from '@material-ui/core/Button';
import "./Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleCreateUserWithEmailAndPassword, handleGoogleSignIn, handleGoogleSignOut, handleSignInWithEmailAndPassword, initializeLoginFrameWork } from './LoginManager';

initializeLoginFrameWork();

// Main Component
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        signedIn: false,
        email: '',
        photoUrl: '',
        displayName: '',
        success: '',
        error: ''
    });
    
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    
    // SignIn for Google
    const googleSignIn = () => {
        handleGoogleSignIn()
        .then((res) => {
            setUser(res);
            setLoggedInUser(res);
            history.replace(from);
        })
    }
    // Sign Out for Google
    const googleSignOut = () => {
        handleGoogleSignOut()
        .then((res) => {
            setUser(res);
        })
    }
    // Function for Gmail Create Account

    // For Email Account
    const [newUser, setNewUser] = useState(false);
    const [emailUser, setEmailUser] = useState({
        isSignedUp: false,
        email: "",
        password: "",
        displayName: "",
        error: "",
        success: false, 
        signInSuccess: false,
        signInError: "",
    })

    const handleFocusedChange = (e) => {
        let validForm;
        if(e.target.name === "displayName") {
            validForm = e.target.value;
        }
        if(e.target.name === "email") {
            validForm = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === "password") {
            const isValidPassword = e.target.value.length >= 6;
            const isContainsNumber =/\d{1}/.test(e.target.value);
            validForm = isValidPassword && isContainsNumber;
        }
        if(validForm) {
            const newItem = {...emailUser};
            newItem[e.target.name] = e.target.value;
            setEmailUser(newItem);
        }
    }


    // Event Handler for Email Submit
    const handleEmailSubmit = (e) => {
        if(newUser) {
            handleCreateUserWithEmailAndPassword(emailUser.email, emailUser.password)
            .then((res) => {
                setEmailUser(res)
                setLoggedInUser(res);
                history.replace(from);
            })
            
        } else {
            handleSignInWithEmailAndPassword(emailUser.email, emailUser.password)
            .then((res) => {
                setEmailUser(res)
                setLoggedInUser(res);
                history.replace(from);
            })
        }
        e.preventDefault();
        
        // console.log(user)
    }

    return (
        <div className="center">
            <h1>Login With Google: </h1><br/>
            {user.signedIn ? <Button onClick={googleSignOut} className="text-field" variant="contained" color="secondary">Sign Out</Button> : <span className="google" onClick={googleSignIn}><FontAwesomeIcon icon={faGooglePlusG} /></span>}
            {user.signedIn ? <p className="google_message success">{user.success}</p> : <p className="google_message logout">{user.logout}</p>}
            
            {/* For Email only */}
            <h2 className="email">Login With Email: </h2><br/>
            <form noValidate autoComplete="off">
                <Button onClick={() => setNewUser(!newUser)} variant="contained">{newUser ? "sign in" : "sign up"}</Button> <br/><br/>
                {newUser && <TextField onBlur={handleFocusedChange} className="text-field" name="displayName" id="outlined-basic" label="Your Name" variant="outlined" />} <br/><br/>
                <TextField onBlur={handleFocusedChange} className="text-field" name="email" id="outlined-basic" label="Your Email Address" variant="outlined" /> <br/><br/>
                <TextField onBlur={handleFocusedChange} className="text-field" name="password" id="outlined-basic" label="Your Password" variant="outlined" /> <br/><br/>
                <Button onClick={handleEmailSubmit} className="text-field" variant="contained" color="primary">Submit</Button>
            </form>
            {emailUser.success 
                ? <p style={{color: 'green'}}>Account Created Successfully</p> 
                : <p style={{color: 'red'}}>{emailUser.error}</p>
            }
            {emailUser.signInSuccess 
                ? <p style={{color: 'green'}}>Signed in Successfully</p> 
                : <p style={{color: 'red'}}>{emailUser.signInError}</p>
            }
        </div>

    );
};

export default Login;
import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {auth} from '../utils/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [isSignInForm,setIsSignInForm]=useState(true);
    const[errorMessage,setErrorMessage]=useState(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const email=useRef(null);
    const password=useRef(null);
    const name=useRef(null);

    const toggleSignInForm=()=>{
        setIsSignInForm(!isSignInForm)
    }

  const handleButtonClick=()=>{
    const message=checkValidData(email.current.value,password.current.value);
    setErrorMessage(message)
    if(message)return;
    if(!isSignInForm){
       createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
         .then((userCredential) => {
           // Signed up
           const user = userCredential.user;
           updateProfile(user, {
             displayName: name.current.value,
             photoURL: "https://avatars.githubusercontent.com/u/66351236?v=4",
           })
             .then(() => {
               // Profile updated!
               // ...
                 const { uid, email, displayName, photoURL } = auth.currentUser;
                 console.log('test user sign up',auth.currentUser)
                dispatch(addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }));
               navigate("/browse");
             })
             .catch((error) => {
               // An error occurred
               setErrorMessage(error.message);
               // ...
             });
           
           // ...
         })
         .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
           setErrorMessage(errorCode+'-'+errorMessage);
           // ..
         });
    }
    else{
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
       )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
           navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
           setErrorMessage(errorCode + "-" + errorMessage);
        });
    }

   
  }
    
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black w-3/12  my-36 mx-auto left-0 right-0 text-white bg-opacity-80 min-w-60"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-gray-700 rounded-lg"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          ref={email}
          className="p-2 my-4 w-full bg-gray-700 rounded-lg"
        />
        <input
          type="password"
          ref={password}
          placeholder="password"
          className="p-2 my-4 w-full bg-gray-700 rounded-lg"
        />
        <p className="text-red-500">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now."
            : "Already registred? Sign In Now. "}
        </p>
      </form>
    </div>
  );
};

export default Login;

import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {auth} from '../utils/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
    const [isSignInForm,setIsSignInForm]=useState(true);
    const[errorMessage,setErrorMessage]=useState(null);
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
             photoURL:  USER_AVATAR,
           })
             .then(() => {
               // Profile updated!
               // ...
                 const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }));
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
        <img src={BG_URL} className="h-screen object-cover" alt="logo" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
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

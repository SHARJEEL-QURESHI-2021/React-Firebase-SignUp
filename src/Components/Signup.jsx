import React from 'react';
import './CSS/Style.css';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword, auth, collection, addDoc, db, } from "../firebase";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  function run() {
    let nam = document.getElementById("nam").value;
    let fName = document.getElementById("fName").value;
    let country = document.getElementById("country").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (!nam || !fName || !country || !email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Filled Input First!',
      });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Sign Up User -->", user);
        try {
          const docRef = await addDoc(collection(db, "Users"), {
            Name: nam,
            Father_Name :fName,
            Country: country,
            Email: email,
          })
          navigate('/login');
          console.log("Users Collection--> ", docRef);
        } catch (e) {
          console.error("Users Collection Error -->", e);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Sign Up Error Code " , errorCode);
        console.log("Sign Up Error Message " ,errorMessage);
      });
    }
  }
  return (
    <center>
      <div id='main'>
      <input type="text" id="nam" placeholder='Enter Name...' className='inp'/>
      <input type="text" id="fName" placeholder='Enter Father Name...' className='inp'/>
      <input type="text" id="country" placeholder='Enter Country...' className='inp'/>
      <input type="text" id="email" placeholder='Enter Email...' className='inp'/>
      <input type="password" id="password" placeholder='Enter Password...' className='inp'/>
      <button onClick={run}>SignUp</button>
    </div>
    </center>
  )
}
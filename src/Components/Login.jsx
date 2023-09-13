import React from 'react';
import './CSS/Style.css';
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword, auth } from "../firebase";
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
    const navigate = useNavigate();
    function admin() {
        Swal.fire({
            title: 'Enter Key To Access Admin Pannel',
            input: 'password',
            showCancelButton: true,
            confirmButtonText: 'Login!',
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value == "Online.JS" || result.value == "ONLINE.JS" || result.value == "online.js" || result.value == "Online.js") {
                    Swal.fire({
                        icon: "success",
                        title: `Successfully Log In To Admin Pannel`,
                        text: "Admin Approved",
                        ConfirmButton: "Ok"
                    }).then(() => {
                        navigate('/admin');
                    })
                }
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: `Wrong Key Entered`,
                    text: "Admin Dis-Approved"
                })
            }
        })
    }

    function run() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Filled Input First!',
            });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("Log In User -->", user);
                    navigate('/home');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Log In User Error Code ", errorCode);
                    console.log("Log In User Error Message ", errorMessage);
                });
        }
    }
    return (
        <center>
            <div id='main'>
                <input type="text" id="email" placeholder='Enter Email...' className='inp' />
                <input type="password" id="password" placeholder='Enter Password...' className='inp' />
                <button onClick={run}>Log In</button>
                <button onClick={admin}>Admin</button>
            </div>
        </center>
    )
}
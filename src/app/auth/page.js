"use client";
import React, { useState, useEffect } from "react";
import { FaChevronRight as Arrow, FaEye, FaEyeSlash } from "react-icons/fa";
import { BsChat as Chat, BsChevronRight } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl, getItem, addItem, updateItem } from "../../utils/utils.js";
import Loader from "@/components/Loader.jsx";
// import { registerUser, loginUser } from '../features/authSlice';
import axios from "axios";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import firebaseApp from "../../firebase.js";
import {
  fetchUser,
  registerUser,
  updateUser,
} from "../../libs/features/authSlice2.js";
import { useRouter } from "next/navigation.js";
import Image from "next/image.js";
import { useAppDispatch } from "@/libs/hook.js";

const SignOutButton = () => (
  <button
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    onClick={() => {
      const auth = getAuth();

      signOut(auth)
        .then(() => {
          window.location.reload();
          // Optional: Additional logic after successful sign-out
          console.log("User signed out successfully");
        })
        .catch((error) => {
          // Handle errors during sign-out
          console.error("Error signing out:", error.message);
        });
    }}
  >
    Sign Out
  </button>
);

const AuthScreen = () => {
  // State variables for email, password, error message, and login/register toggle
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const [isUser, setIsUser] = useState({});
  const authData = useSelector((state) => state.auth);
  const isEnrolled = getItem("qitt-enrolled");
  const auth = getAuth();

  // get User
  // check if enrolled
  // if so send to home
  // else to enroll screen

  const handleSignInWithGoogle = async () => {
    console.log('Enroled Status:',isEnrolled)
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      setIsLoading(true);
      console.log("Mi Auth:", auth);

      // If user is authenticated (if not then run)
      if (!auth.currentUser?.uid) {
        const result = await signInWithPopup(auth, provider);
        const { uid, email, displayName, photoURL } = result.user;
        // Send Info To The Backend To Create An UnEnrolled User
        const { payload: user } = await dispatch(
          registerUser({ email, displayName, imgURL: photoURL, uid })
        );

        toast(user.message);

        if (!user.enrolled) {
          navigate.push(
            `/auth/enroll?name=${user?.name.split(" ")[0]}&uid=${uid}`
          );
        } else {
          dispatch(updateUser(user));
          updateItem("qitt-user", user);
          updateItem("qitt-enrolled", true);
          // Navigate to home or dashboard
          navigate.push("/");
        }
      } else {
        // Fetch user data if already signed in
        const { payload: user } = await dispatch(
          fetchUser(auth.currentUser.uid)
        );
        console.log("Current UID :", auth.currentUser.uid);
        console.log("User ⚡", user);

        if (user.enrolled) {
          console.log("(user.enrolled) Error")
          dispatch(updateUser(user));
          updateItem("qitt-user", user);
          updateItem("qitt-enrolled", true);
          navigate.push("/");
        } else {
          navigate.push(
            `/auth/enroll?name=${user?.name.split(" ")[0]}&uid=${auth.currentUser.uid}`
          );
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle changes in the email input
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    const isValidEmail = emailRegex.test(newEmail);

    // Update error state based on validation
    if (!isValidEmail) {
      setError("Invalid email address");
    } else {
      setError(null);
    }
  };

  // Function to handle changes in the password input
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Password validation
    const isValidPassword = newPassword.length >= 6;

    // Update error state based on validation
    if (!isValidPassword) {
      setError("Password must be at least 6 characters");
    } else {
      setError(null);
    }
  };

  // Function to perform basic form validation
  const validateForm = async () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const isValidEmail = emailRegex.test(email);
    const isValidPassword = password.length >= 5;

    return isValidEmail && isValidPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    return toast(
      "Sorry, this feature is not completed yet, but you can use the Google Sign-In method",
      { icon: "😞" }
    );

    // Validation check before submitting
    if (!validateForm()) {
      setError("Invalid email or password. Please check your input.");
      return;
    }

    const auth = getAuth();

    try {
      setIsLoading(true);

      const userCredential = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);

      const { user } = userCredential;
      const msg = isLogin
        ? "Login Successful 🎉"
        : "Registration Successful 🎉";

      if (!isLogin) {
        // Register Condition
        const registrationResult = await dispatch(
          registerUser({
            email,
            displayName: user.displayName,
            imgURL: user.photoURL,
            uid: user.uid,
          })
        );
        toast(registrationResult.payload.message);
        return setIsLoading(false);
      } else {
        // Login Condition
        // getUser
      }

      // Common actions after signing in or registering
      setIsLoading(false);
      toast(msg);
      console.log("User signed in:", user);
      // Additional actions after signing in or registering
      // ...
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(`Error (Code: ${errorCode}): ${errorMessage}`);

      // Display user-friendly error messages using a toast
      if (isLogin) {
        // Handle login errors
        toast(
          errorCode === "auth/user-not-found"
            ? "User not found. Please register or check the email address."
            : errorCode === "auth/wrong-password"
            ? "Incorrect password. Please double-check your password."
            : "Unexpected error. Try again later.",
          { icon: "ℹ️" }
        );
      } else {
        // Handle registration errors
        toast(
          errorCode === "auth/email-already-in-use"
            ? "Email already in use. Try another or reset password."
            : errorCode === "auth/weak-password"
            ? "Weak password. Choose a stronger one."
            : "Unexpected error. Try again later.",
          { icon: "ℹ️" }
        );
      }
      setIsLoading(false);
    }
  };

  // Function to toggle between login and register modes
  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  // useEffect to add event listeners for input focus and blur
  useEffect(() => {
    const handleFocus = (e) => {
      const label = e.target.nextElementSibling;
      label.classList.add("focus");
    };

    const handleBlur = (e) => {
      const label = e.target.nextElementSibling;
      if (e.target.value === "") {
        label.classList.remove("focus");
      }
    };

    const handleClick = (e) => {
      const label = e.target.nextElementSibling;
      label.classList.add("focus");
    };

    const inputFields = document.querySelectorAll(".floating-label input");

    inputFields.forEach((inputField) => {
      inputField.addEventListener("focus", handleFocus);
      inputField.addEventListener("blur", handleBlur);
      inputField.addEventListener("click", handleClick);

      // Cleanup event listeners on component unmount
      return () => {
        inputField.removeEventListener("focus", handleFocus);
        inputField.removeEventListener("blur", handleBlur);
        inputField.removeEventListener("click", handleClick);
      };
    });
  }, []);

  return (
    <div className="flex justify-center font-aeonik items-center min-h-screen">
      <Loader open={authData?.status === "loading" || isLoading} />

      <main className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <style>
          {`
            .floating-label {
              position: relative;
            }

            .floating-label label {
              position: absolute;
              pointer-events: none;
              left: 10px;
              top: 50%;
              transform: translateY(-50%);
              transition: 0.3s ease all;
              background-color: #fff;
              padding: 0 5px;
              color: rgb(123, 120, 120);
              border-radius: 0.25rem;
            }

            .input-field {
              transition: border-color 0.2s ease-in-out;
              border-color: rgb(20, 19, 19) !important;
            }

            .input-field:focus + label,
            .input-field:not(:placeholder-shown) + label {
              top: 0;
              font-size: 0.9rem;
              color: rgb(123, 120, 120);
            }
          `}
        </style>

        {/* Logo and header */}
        <header className="text-center mb-8">
          <Image
            width={12}
            height={12}
            unoptimized
            className="w-20 mx-auto"
            src={"/assets/images/qitt-img.jpg"}
            alt="Qitt Logo"
          />
          <h1 className="text-2xl font-semibold mt-4">
            {isLogin ? "Welcome Back Geng!" : "Create your account"}
          </h1>
        </header>

        {/* <SignOutButton/> */}
        {/* Google login button */}
        <button
          type="button"
          className="w-full bg-white border border-gray-300 rounded-md p-3 flex items-center justify-start mb-4"
          onClick={handleSignInWithGoogle}
        >
          <Image
            width={10}
            height={10}
            src={"/assets/images/google-img.png"}
            className="w-8 h-8"
            alt="Google Logo"
          />
          <span className="button-text ml-2">Continue with Google</span>
        </button>

        {/* Divider for OR */}
        <div className="flex items-center mb-4">
          <div className="border-t border-gray-300 flex-1"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="border-t border-gray-300 flex-1"></div>
        </div>

        {/* Form for email and password */}
        <form
          onSubmit={handleSubmit}
          className="user-registration-form"
          data-form-primary="true"
        >
          {/* Email input */}
          <div className="form-group mb-5 floating-label">
            <input
              type="text"
              className="input-field border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md px-2 py-3 w-full"
              inputMode="email"
              name="email"
              id="email"
              value={email}
              required
              autoComplete="email"
              autoCapitalize="none"
              spellCheck="false"
              placeholder=" "
              onChange={handleEmailChange}
            />
            <label htmlFor="email">Email address</label>
          </div>

          {/* Password input */}
          <div className="form-group password-group mb-6 floating-label">
            <input
              type="password"
              className="input-field border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md px-2 py-3 w-full"
              name="password"
              id="password"
              value={password}
              required
              autoComplete="new-password"
              autoCapitalize="none"
              spellCheck="false"
              placeholder=" "
              onChange={handlePasswordChange}
            />
            <label htmlFor="password">Password</label>
          </div>

          {/* Password strength requirements */}
          <div className="password-requirements hide">
            {/* Password strength requirements */}
          </div>

          {/* Submit button */}
          <div className="form-group">
            <button
              type="submit"
              className={`submit-button bg-blue-500 text-white p-3 rounded-md w-full ${
                !validateForm() && "opacity-50 cursor-not-allowed"
              }`}
              data-action-button-primary="true"
              onClick={handleSubmit}
              disabled={!validateForm()}
            >
              {isLogin ? "Log in" : "Continue"}
            </button>
          </div>
        </form>

        {/* Display error message if there's an authentication error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Alternate action link for switching between login and register */}
        <div className="alternate-action text-center mt-4">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a href="#" onClick={toggleAuthMode} className="text-blue-500">
              {isLogin ? "Sign up" : "Log in"}
            </a>
          </p>
        </div>

        {/* Additional information */}
        {/* <p className="text-center mt-3 text-gray-600 underline-offset-2 underline hover:opacity-80">
          Fully available for <b>CSC Year 2</b>. Stay tuned for the rollout to everyone! ⌛
        </p> */}
      </main>
      <Toaster />
    </div>
  );
};

export default AuthScreen;

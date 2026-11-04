import { useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         sendPasswordResetEmail, 
         GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import GoogleOptionBtn from "./GoogleOptionBtn"; 
import userIcon from "../../public/images/user-solid-full.svg";
import SwitchBtn from "./SwitchBtn";
import MainBtn from "./MainBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import LargeButton from "./LargeButton";


export default function LoginModal({closeFunction, dashboardFunction, userSetterFunction}){

  const [signInState, setSignInState] = useState("LOG IN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function switchSignInState(value) {
    setEmail("");
    setPassword("");
    setErrorMessage("");
    setSignInState(value);
  }

  function handleSuccessfulLogin() {
    dashboardFunction(true);
    if(pathname == "/") router.push("/for-you");
  }

  function loginAsGuest() {
    setGuestLoading(true);
    userSetterFunction(null);
    handleSuccessfulLogin();
    setGuestLoading(false);
  }

  function logInUser() {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      userSetterFunction({
        email: email,
        subscription: "basic" 
      });
      handleSuccessfulLogin();
      // const user = userCredential.user;
      // console.log(userCredential);
      setErrorMessage("");
      setLoading(false);
    })
    .catch((error) => {
      setErrorMessage(error.message);
    })
  }

  function logInWithGoogle() {
    setGoogleLoading(true);
    signInWithPopup(auth, new GoogleAuthProvider())
    .then((result) => {
      //console.log(result);
      userSetterFunction({
        email: result.user.email,
        subscription: "basic" 
      });
      handleSuccessfulLogin();
      setGoogleLoading(false);
    }).catch((error) => {
      setErrorMessage(error.message);
    })
  }

  function registerUser(email, password) {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(userCredential);
      setErrorMessage("");
      setLoading(false);
    })
    .catch((error) => {
      setErrorMessage(error.message);
    })
  }

  function sendRestLink() {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Link has been sent!");
      setLoading(false);
    })
    .catch((error) => {
      setErrorMessage(error.message);
    })
  }



  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-10" 
          onClick={e => closeFunction(false)}>

      <div className="w-100 bg-white rounded-lg overflow-hidden" 
              onClick={e => e.stopPropagation()}>
          <div className="flex justify-end px-4">
              <button className="text-3xl font-semibold" 
                      onClick={e=>closeFunction(false)}>
                  ⨉
              </button>
          </div>

          
          <div className=" flex flex-col gap-2">
              <h1 className="text-center text-xl py-4 font-bold text-[#032b41]">
                  {signInState=="LOG IN"? 
                    "Log in to Summarist" :
                    signInState == "SIGN UP" ? 
                      "Sign up to Summarist" :
                        "Reset your password"}
              </h1>



              <div className="flex__col--ctr gap-2">
              {errorMessage && 
                <p className="text-red-400 w-84">{errorMessage}</p>
              }
                  {signInState!="RECOVER"&& 
                    <>
                      {signInState=="LOG IN" ?
                        <>
                          {/* <LargeButton text={"Login as a Guest"} 
                                       bgColor={"bg-[#3a579d]"} 
                                       textColor={"text-white"} 
                                       icon={userIcon}
                                       clickFunction={loginAsGuest} /> */}
                          <button className="relative modal__comp--size bg-[#3a579d] hover:bg-[#25396b] text-white
                                              active:translate-y-0.25 transition-colors duration-200"
                                  onClick={loginAsGuest}>
                            <FontAwesomeIcon icon={faUser} />
                            Login as a Guest
                          </button>

                          <p className="or-separator text-gray-500 before:bg-gray-400 after:bg-gray-400">or</p> 
                          <GoogleOptionBtn signInFunction={logInWithGoogle} text={"Login with Google"} loading={googleLoading} />
                          <p className="or-separator text-gray-500 before:bg-gray-400 after:bg-gray-400">or</p> 
                        </>
                        :
                        <>
                          <GoogleOptionBtn signInFunction={logInWithGoogle} text={"Sign up with Google"} loading={googleLoading} />
                          <p className="or-separator">or</p>
                        </>
                      }
                       
                    </> 
                  }
              </div>
          
              <div className="flex__col--ctr gap-4">
                <input className="modal__comp--size modal__field" 
                       placeholder="Email Address" 
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)} 
                />
                {signInState!="RECOVER" &&
                  <input className="modal__comp--size modal__field" 
                         placeholder="Password" 
                         type="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)} 
                  />
                }
                {signInState=="LOG IN"? 
                  <MainBtn mainFunction={(e) => logInUser(email, password)} text={"Login"} loading={loading} /> :
                  signInState == "SIGN UP" ? 
                    <MainBtn mainFunction={(e) => registerUser(email, password)} text={"Sign up"} loading={loading} /> :
                    <MainBtn mainFunction={(e) => sendRestLink(email)} text={"Send reset password link"} loading={loading}/>
                }
              </div>
          </div>


          <div className="flex__col--ctr mt-2">
              {signInState=="LOG IN" ?
                  <>
                    <button className="py-2 text-sm font-light text-[#116be9] hover:text-[#124a98]
                                      transition-colors duration-200"
                            onClick={() => switchSignInState("RECOVER")}>
                      Forgot your password?
                    </button>
                    <SwitchBtn switchFunction={switchSignInState} value={"SIGN UP"} text={"Don't have an account?"} />
                  </>
                :
                <>
                  <div className="py-2 text-sm"></div>
                  <SwitchBtn switchFunction={switchSignInState} 
                             value={"LOG IN"} 
                             text={signInState=="SIGN UP" ? "Already have an account?" : "Go to login"} />
                </>

              }

          </div>
      </div>  
    </div>
  )
}
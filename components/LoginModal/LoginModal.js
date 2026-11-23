import { useContext, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, loginWithEmail, signup, loginWithGoogle } from "../../firebase";
import GoogleOptionBtn from "./GoogleOptionBtn"; 
import SwitchBtn from "./SwitchBtn";
import MainBtn from "./MainBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { LayoutContext } from "@/app/layout";


export default function LoginModal(){

  const LOG_IN = "LOG IN";
  const SIGN_UP = "SIGN UP";
  const RECOVER = "RECOVER";
  
  const [signInState, setSignInState] = useState(LOG_IN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  
  const {showLoginModal, showDashboard} = useContext(LayoutContext);
  const router = useRouter();
  const pathname = usePathname();

  function switchSignInState(value) {
    setEmail("");
    setPassword("");
    setErrorMessage("");
    setSignInState(value);
  }

  function handleSuccessLayout() {
    if(pathname == "/") router.push("/for-you");
    showLoginModal(false);
    showDashboard(true);
  }

  function loginAsGuest() {
    setGuestLoading(true);
    handleSuccessLayout();
    setGuestLoading(false);
  }

  async function logInUser() {
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      handleSuccessLayout();
    } catch(error){
      setErrorMessage(error.message);
    }
    setLoading(false);
  }

  async function logInWithGoogle() {
    setGoogleLoading(true);
    const msg = await loginWithGoogle();
    handleSuccessLayout();
    setErrorMessage(msg);
    setGoogleLoading(false);
  }

  async function registerUser() {
    setLoading(true);
    try {
      await signup(email, password);
      switchSignInState(LOG_IN);
    } catch(error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
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
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-20" 
          onClick={() => showLoginModal(false)}>

      <div className="w-100 bg-white rounded-lg overflow-hidden" 
              onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-end px-4">
              <button className="text-3xl font-semibold" 
                      onClick={() => showLoginModal(false)}>
                  ⨉
              </button>
          </div>

          
          <div className=" flex flex-col gap-2">
              <h1 className="text-center text-xl py-4 font-bold text-deepblue">
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
                          <button className="relative flex justify-center items-center modal__comp--size bg-[#3a579d] hover:bg-[#25396b] text-white
                                             active:translate-y-px transition-colors duration-200"
                                  onClick={loginAsGuest}>
                            <FontAwesomeIcon className="absolute top-1 left-0 text-3xl" icon={faUser} />
                            {guestLoading?
                            <LoadingSpinner size={"size-6"} borderThickness={"border-3"} borderColor={"border-white"}/>
                            :
                            "Login as a Guest"}
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
              {signInState==LOG_IN ?
                  <>
                    <button className="py-2 text-sm font-light text-[#116be9] hover:text-[#124a98]
                                      transition-colors duration-200"
                            onClick={() => switchSignInState(RECOVER)}>
                      Forgot your password?
                    </button>
                    <SwitchBtn switchSignInState={switchSignInState} value={SIGN_UP} text={"Don't have an account?"} />
                  </>
                :
                <>
                  <div className="py-2 text-sm"></div>
                  <SwitchBtn switchSignInState={switchSignInState} 
                             value={LOG_IN} 
                             text={signInState==SIGN_UP ? "Already have an account?" : "Go to login"} />
                </>

              }

          </div>
      </div>  
    </div>
  )
}
"use client"
import { useContext } from "react";
import { LayoutContext } from "../layout";

function Page() {
    const {currentUser, showLoginModal} = useContext(LayoutContext);
    return (
        <div>
            {currentUser==null?
            
            <div>
                <figure>

                </figure>
                <h2>Log in to your account to see your Library.</h2>
                <button className="bg-[#2bd97c] py-1 px-12 rounded"
                        onClick={showLoginModal}>
                    Login
                </button>
            </div>

            :

            <div>
                <div>Library</div>
                <div>
                    <h2>Saved Books</h2>

                </div>
                <div>
                    <h2>Finished Books</h2>
                </div>
            </div>
            
            }

        </div>
    )
}

export default Page;
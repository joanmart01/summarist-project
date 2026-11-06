"use client"  
import { useState } from "react";
import { useRouter } from "next/navigation";
import { payments } from "../../firebase";
import { createCheckoutSession } from "@invertase/firestore-stripe-payments";
import { FaFileLines, FaHandshake, FaSeedling} from "react-icons/fa6";
import QuestionComponent from "../../components/Dashboard/QuestionComponent";

function Page() {
    const router = useRouter();

    const plus = {
        name: "premium-plus",
        period: "year",
        price: 99.99,
        //productId: "prod_VUjoh8IGW7oFkV",
        priceId: "price_1UTkTT1MytWSlkp1kzoZTMAP"
    }

    const premium = {
        name: "premium",
        period: "month",
        price: 9.99,
        //productId: "prod_VUjpsKqOnnzJjS",
        priceId: "price_1UTkLo1MytWSlkp1QBhJVs2k"
    }

    const[selectedPlan, setSelectedPlan] = useState(plus);
    const[currentQuestion, setCurrentQuestion] = useState();

    async function handleCheckout() {
        try {
            //const p = await getPrice(payments, selectedPlan.productId, selectedPlan.priceId);
            // Example: create a checkout session for a specific price ID
            const session = await createCheckoutSession(payments, {
                price: selectedPlan.priceId
                /*success_url: window.location.origin + '/success',
                cancel_url: window.location.origin + '/cancel',*/
            });

            // Redirect to Stripe Checkout
            window.location.href = session.url;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            alert('Failed to start checkout.');
        }
    };

    const SubscriptionPlan = ({plan, description})=> {
        const n = plan.name;
        const p = plan.period;
        return (
            <label className={`flex items-start p-6 w-170 bg-[#f1f6f4] gap-6 border-4 rounded cursor-pointer 
                              ${selectedPlan===plan? "border-coolgreen" : "border-[#bac8ce]"}`}>
                <div className="flex justify-center items-center w-6 h-6 border-2 border-black rounded-full">
                    <input type="radio" name="subscription-plan" value={n} 
                           className="w-1.5 h-1.5 accent-black"
                           checked={selectedPlan===plan}
                           onChange={(e) => setSelectedPlan(plan)} 
                    />
                </div>
                <div className="flex flex-col">
                    <h5 className="text-deepblue font-semibold">
                        {`${n.charAt(0).toUpperCase() + n.slice(1)} ${p.charAt(0).toUpperCase() + p.slice(1) + "ly"}`}
                    </h5>
                    <h3 className="text-deepblue">${`${plan.price}/${p}`}</h3>
                    <p className="text-[#6b757b]">{description}</p>
                </div>
            </label>   
        )
    }

    const FeatureComponent = ({Icon, boldText, plainText}) => {
        return (
            <div className="flex flex-col items-center text-center gap-3">
                <Icon className="w-15 h-15 text-deepblue" />
                <p className="text-[#394547]"><b>{boldText}</b> {plainText}</p>
            </div>
        )
    }

 /*   const QuestionComponent = ({question, answer, id}) => {
        function handleClick() {
            setCurrentQuestion((prev) => prev != id ? id : -1);
        }
        return (
            <div className="flex flex-col border-b border-[#ddd] cursor-pointer"
                 onClick={handleClick}>
                <div className="flex justify-between py-6 items-center">
                    <h3 className="text-deepblue font-medium">{question}</h3>
                    <button>
                        <FaChevronDown className={`size-6 stroke-1 ${currentQuestion===id && "rotate-180"} transition-transform duration-500`}/>
                    </button>
                </div>
                <div className={`overflow-hidden ${currentQuestion!==id && "h-px"} transition-[height] duration-1000`}>
                    <p className="pb-6 text-[#394547]">{answer}</p>
                </div>
            </div>
        )
    }*/


    return (
        <div>
            <div className="flex flex-col w-full items-center gap-14">
                <div className="flex">
                    <div className="w-100 bg-deepblue rounded-bl-full"></div>
                    <div className="flex flex-col w-full pt-16 px-6 items-center bg-deepblue">
                        <h1 className="text-white text-center mb-10">Get Unlimited access to many amazing books to read</h1>
                        <h4 className="text-white mb-8">Turn ordinary moments in to amazing learning opportunities</h4>
                        <figure className="overflow-hidden items-center w-85 rounded-t-full">
                            <img src="/images/pricing-top.png" />
                        </figure>
                    </div>
                    <div className="w-100 bg-deepblue rounded-br-full"></div>
                </div>


                <div className="grid grid-cols-3 gap-6 max-w-200">
                    <FeatureComponent Icon={FaFileLines} 
                                      boldText={"Key ideas in few min"} 
                                      plainText={" with many books to read"} />
                    <FeatureComponent Icon={FaSeedling} 
                                      boldText={"3 million"} 
                                      plainText={" people growing with Summarist everyday"} />
                    <FeatureComponent Icon={FaHandshake} 
                                      boldText={"Precise recommendations"} 
                                      plainText={" collections curated by experts"} />
                </div>


                <div className="relative flex flex-col items-center">
                    <div className="flex flex-col items-center gap-6">
                        <h2 className="text-deepblue">Choose the plan that fits you</h2>
                        <SubscriptionPlan plan={plus} description={"7-day free trial included"} />
                        <p className="or-separator text-[#6b757b] before:bg-[#6b757b] after:bg-[#6b757b]">or</p>
                        <SubscriptionPlan plan={premium} description={"No trial included"} />
                    </div>
                    <div className="sticky bottom-0 flex flex-col items-center w-full gap-3 py-6 bg-white">
                            <button className="login__btn min-w-45"
                                    onClick={handleCheckout}>
                                {selectedPlan==plus? "Start your free 7-day trial" : "Start your first month"}
                            </button>
                            <p className="text-xs text-[#6b757b]">
                                {selectedPlan==plus? 
                                "Cancel your trial at any time before it ends, and you won't be charged."
                                :
                                "30-day money back guarantee, no questions asked."}
                            </p>
                    </div>
                </div>


                <div className="flex flex-col gap-2 w-255 mb-8">
                    <QuestionComponent question={"How does the free 7-day trial work?"}
                                       answer={"Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial."}
                                       id={1}
                                       currentQuestion={currentQuestion}
                                       setCurrentQuestion={setCurrentQuestion} />
                    <QuestionComponent question={"Can I switch subscriptions from monthly to yearly, or yearly to monthly?"}
                                       answer={"While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option."}
                                       id={2}
                                       currentQuestion={currentQuestion}
                                       setCurrentQuestion={setCurrentQuestion} />
                    <QuestionComponent question={"What's included in the Premium plan?"}
                                       answer={"Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books, high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle."}
                                       id={3}
                                       currentQuestion={currentQuestion}
                                       setCurrentQuestion={setCurrentQuestion} />
                    <QuestionComponent question={"Can I cancel during my trial or subscription?"}
                                       answer={"You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day."}
                                       id={4}
                                       currentQuestion={currentQuestion}
                                       setCurrentQuestion={setCurrentQuestion} />
                </div>
            </div>
        </div>
    )
}

export default Page;
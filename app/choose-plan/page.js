"use client"  
import { useState } from "react";
import { useRouter } from "next/navigation";
import { payments } from "../../firebase";
import { createCheckoutSession } from "@invertase/firestore-stripe-payments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFileLines, FaHandshake, FaSeedling } from "react-icons/fa6";

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
            <label className="flex items-start p-6 w-170 bg-[#f1f6f4] gap-6 border-4 border-[#bac8ce] rounded cursor-pointer">
                <div className="flex justify-center items-center w-6 h-6 border-2 border-black rounded-full">
                    <input type="radio" name="subscription-plan" value={n} 
                           className="w-1.5 h-1.5 accent-black"
                           checked={selectedPlan===plan}
                           onChange={(e) => setSelectedPlan(plan)} 
                    />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-[#032b41] font-semibold">
                        {`${n.charAt(0).toUpperCase() + n.slice(1)} ${p.charAt(0).toUpperCase() + p.slice(1) + "ly"}`}
                    </h4>
                    <h3 className="text-[#032b41]">${`${plan.price}/${p}`}</h3>
                    <p className="text-[#6b757b]">{description}</p>
                </div>
            </label>   
        )
    }

    const FeatureComponent = ({Icon, boldText, plainText}) => {
        return (
            <div className="flex flex-col items-center text-center gap-3">
                <Icon className="w-15 h-15 text-[#032b41]" />
                <p className="text-[#394547]"><b>{boldText}</b> {plainText}</p>
            </div>
        )
    }


    return (
        <div>
            <div className="flex">
                <div className="w-100 bg-[#032b41] rounded-bl-full"></div>
                <div className="flex flex-col w-full pt-16 px-6 items-center bg-[#032b41]">
                    <h1 className="text-white text-center mb-10">Get Unlimited access to many amazing books to read</h1>
                    <h4 className="text-white mb-8">Turn ordinary moments in to amazing learning opportunities</h4>
                    <figure className="overflow-hidden items-center w-85 rounded-t-full">
                        <img src="/images/pricing-top.png" />
                    </figure>
                </div>
                <div className="w-100 bg-[#032b41] rounded-br-full"></div>
            </div>

            <div className="flex flex-col w-full items-center">
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

                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center gap-6">
                        <h2 className="text-[#032b41]">Choose the plan that fits you</h2>
                        <SubscriptionPlan plan={plus} description={"7-day free trial included"} />
                        <p className="or-separator text-[#6b757b] before:bg-[#6b757b] after:bg-[#6b757b]">or</p>
                        <SubscriptionPlan plan={premium} description={"No trial included"} />
                        <div className="flex flex-col items-center">
                            <button className="text-[#032b41] bg-coolgreen rounded px-2"
                                    onClick={handleCheckout}>
                                {selectedPlan==plus? "Start your free 7-day trial" : "Start your first month"}
                            </button>
                            <p>
                                {selectedPlan==plus? 
                                "Cancel your trial at any time before it ends, and you won't be charged."
                                :
                                "30-day money back guarantee, no questions asked."}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            

            <div>

            </div>

        </div>
    )
}

export default Page;
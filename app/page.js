"use client"
import { AiFillFileText, AiFillBulb, AiFillAudio } from "react-icons/ai";
import { BsStarFill, BsStarHalf } from "react-icons/bs"; 
import { BiCrown } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";
import { useEffect, useState } from "react"; 
import { useContext } from "react";
import { LayoutContext } from "./layout";
import Navbar from "../components/Navbar";

export default function Home() {
  const {showLoginModal} = useContext(LayoutContext);
  const [currentHighlight, setCurrentHighlight] = useState(1);

  useEffect(()=> {
    const id = setInterval(()=> {
      setCurrentHighlight((prev) => prev<6? prev + 1: 1);
    }, 2000)
    return () => clearInterval(id);    
  }, [])

  const StatisticHeading = ({id, text}) => {
    return (
      <div className={`statistics__heading ${currentHighlight==id? "text-[#2bd97c]" : "text-[#6b757b]"}`}>
        {text}
      </div>
    )
  }

  return (
    <div className="max-w-full overflow-x-hidden">
      <Navbar openLogin={showLoginModal} />
      <section id="landing">
        <div className="home__container">
          <div className="home__row">
            <div className="flex">
              <div className="flex flex-col items-center md:items-start text-center md:text-start 
                              max-w-135 mx-auto w-full">
                <div className="text-[#032b41] text-[1.5rem] md:text-[2.5rem] font-bold mb-6">
                  Gain more knowledge <br/> in less time
                </div>
                <div className="text-[#032b41] text-[1.25rem] font-light mb-6 leading-6">
                  Great summaries for busy people,
                  <br />
                  individuals who barely have time to read,
                  <br />
                  and even people who don’t like to read.
                </div>
                <button className="login__btn" onClick={() => showLoginModal(true)}>
                  Login
                </button>
              </div>
              <figure className="hidden md:flex w-full justify-end">
                <img className="w-full h-full max-w-100" src="/images/landing.png" alt="landing" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="home__container">
          <div className="home__row">
            <div className="section__title mb-8">
              Understand books in few minutes
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
              <div className="feature__wrapper">
                <div className="feature__icon--wrapper">
                  <AiFillFileText className="feature__icon" />
                </div>
                <div className="feature__title">Read or listen</div>
                <div className="feature__subtitle">
                  Save time by getting the core ideas from the best books.
                </div>
              </div>
              <div className="feature__wrapper">
                <div className="feature__icon--wrapper">
                  <AiFillBulb className="feature__icon" />
                </div>
                <div className="feature__title">Find your next read</div>
                <div className="feature__subtitle">
                  Explore book lists and personalized recommendations.
                </div>
              </div>
              <div className="feature__wrapper">
                <div className="feature__icon--wrapper">
                  <AiFillAudio className="feature__icon" />
                </div>
                <div className="feature__title">Briefcasts</div>
                <div className="feature__subtitle">
                  Gain valuable insights from briefcasts
                </div>
              </div>
            </div>

            <div className="statistics__row md:mb-24">
              <div className="statistics__content--wrapper">
                <StatisticHeading id={1} text="Enhance your knowledge" />
                <StatisticHeading id={2} text="Achieve greater success" />
                <StatisticHeading id={3} text="Improve your health" />
                <StatisticHeading id={4} text="Develop better parenting skills" />
                <StatisticHeading id={5} text="Increase happiness" />
                <StatisticHeading id={6} text="Be the best version of yourself!" />
              </div>
              <div className="statistics__data--wrapper">
                <div className="flex gap-4">
                  <div className="statistics__data--number">93%</div>
                  <div className="statistics__data--text">
                    of Summarist members <b>significantly increase</b> reading
                    frequency.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="statistics__data--number">96%</div>
                  <div className="statistics__data--text">
                    of Summarist members <b>establish better</b> habits.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="statistics__data--number">90%</div>
                  <div className="statistics__data--text">
                    have made <b>significant positive</b> change to their lives.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="statistics__row md:mb-0">
              <div className="statistics__data--wrapper order-1 md:order-0">
                <div className="flex gap-4">
                  <div className="statistics__data--number">91%</div>
                  <div className="statistics__data--text">
                    of Summarist members <b>report feeling more productive</b> 
                    after incorporating the service into their daily routine.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="statistics__data--number">94%</div>
                  <div className="statistics__data--text">
                    of Summarist members have <b>noticed an improvement</b> in
                    their overall comprehension and retention of information.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="statistics__data--number">88%</div>
                  <div className="statistics__data--text">
                    of Summarist members <b>feel more informed</b> about current
                    events and industry trends since using the platform.
                  </div>
                </div>
              </div>
              <div className="statistics__content--wrapper items-start md:items-end">
                <StatisticHeading id={1} text="Expand your learning" />
                <StatisticHeading id={2} text="Accomplish your goals" />
                <StatisticHeading id={3} text="Strengthen your vitality" />
                <StatisticHeading id={4} text="Become a better caregiver" />
                <StatisticHeading id={5} text="Improve your mood" />
                <StatisticHeading id={6} text="Maximize your abilities" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews">
        <div className="home__row">
          <div className="flex flex-col gap-8 w-full max-w-150 mx-auto py-10 px-auto">
            <div className="section__title">
              What our members say
            </div>
              <div className="review__wrapper">
                <div className="review__header">
                  <div>Hanna M.</div>
                  <div className="flex">
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                  </div>
                </div>
                <div className="review__body">
                  This app has been a <b>game-changer</b> for me! It's saved me so
                  much time and effort in reading and comprehending books. Highly
                  recommend it to all book lovers.
                </div>
              </div>
              <div className="review__wrapper">
                <div className="review__header">
                  <div>David B.</div>
                  <div className="flex">
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                  </div>
                </div>
                <div className="review__body">
                  I love this app! It provides
                  <b>concise and accurate summaries</b> of books in a way that is
                  easy to understand. It's also very user-friendly and intuitive.
                </div>
              </div>
              <div className="review__wrapper">
                <div className="review__header">
                  <div>Nathan S.</div>
                  <div className="flex">
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                  </div>
                </div>
                <div className="review__body">
                  This app is a great way to get the main takeaways from a book
                  without having to read the entire thing.
                  <b>The summaries are well-written and informative.</b>
                  Definitely worth downloading.
                </div>
              </div>
              <div className="review__wrapper">
                <div className="review__header">
                  <div>Ryan R.</div>
                  <div className="flex">
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                    <BsStarFill className="review__star" />
                  </div>
                </div>
                <div className="review__body">
                  If you're a busy person who
                  <b>loves reading but doesn't have the time</b> to read every
                  book in full, this app is for you! The summaries are thorough
                  and provide a great overview of the book's content.
                </div>
              </div>
            {/* </div> */}
            <div className="flex justify-center">
              <button className="login__btn" onClick={() => showLoginModal(true)}>Login</button>
            </div>
          </div>
        </div>
      </section>

      <section id="numbers">
        <div className="home__container">
          <div className="home__row">
            <div className="section__title mb-8">Start growing with Summarist now</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              <div className="number__wrapper">
                <div className="number__icon--wrapper">
                  <BiCrown className="text-[#0365f2] w-12 h-12" />
                </div>
                <div className="number__title">3 Million</div>
                <div className="number__subtitle">Downloads on all platforms</div>
              </div>
              <div className="number__wrapper">
                <div className="number__icon--wrapper gap-1">
                  <BsStarFill className="text-[#0365f2] w-5 h-5" />
                  <BsStarFill className="text-[#0365f2] w-5 h-5" />
                  <BsStarFill className="text-[#0365f2] w-5 h-5" />
                  <BsStarFill className="text-[#0365f2] w-5 h-5" />
                  <BsStarHalf className="text-[#0365f2] w-5 h-5" />
                </div>
                <div className="number__title">4.5 Stars</div>
                <div className="number__subtitle">
                  Average ratings on iOS and Google Play
                </div>
              </div>
              <div className="number__wrapper">
                <div className="number__icon--wrapper">
                  <RiLeafLine className="text-[#0365f2] w-12 h-12" />
                </div>
                <div className="number__title">97%</div>
                <div className="number__subtitle">
                  Of Summarist members create a better reading habit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

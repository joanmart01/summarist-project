import { Suspense } from "react";
import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";
import BookRow from "../../components/BookRow";
import SkeletonRow from "../../components/Loading/SkeletonRow";
import SkeletonBox from "../../components/Loading/SkeletonBox";
import { headers } from "next/headers";



async function ForYouPage() {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const headersData = await headers();
    const host = headersData.get("host");
    const protocol = headersData.get("x-forwarded-proto") ?? host.startWith("localhost") ? "http" : "https";
    const apiBase = `${protocol}://${host}`;

    const recommendedTitle = "Recommended For You";
    const recommendedSub = "Suggested Books";
    const suggestedTitle = "Suggested Books";
    const suggestedSub = "Browse those books";    

    async function SelectedBook() {
        console.log("api base:" + apiBase);
        const res = await fetch(`${apiBase}/api/books/selected`);
        //const res = await fetch(`http://localhost:3000/api/books/selected`);
        console.log(res);
        const {data} = await res.json();
        const book = data[0];
        return (
            <Link href={`/book/${book.id}`} 
                className="flex flex-col w-full bg-[#fbefd6] rounded p-6 gap-6
                           md:flex-row md:justify-between
                           xl:w-2/3">           
                <div className="md:w-2/5">
                    <p>{book.subTitle}</p>
                </div>
                <div className="hidden md:flex w-px bg-[#bac8ce]"></div>
                <div className="flex gap-4 w-3/5">
                    <figure className="w-35 h-35">
                        <img src={book.imageLink} className="w-full h-full" />
                    </figure>
                    <div className="flex flex-col">
                        <h6 className="font-semibold mb-2">{book.title}</h6>
                        <p className="mb-4 text-[#394547]">{book.author}</p>

                        <div className="flex items-center gap-2">
                            <BsFillPlayFill className="flex w-10 h-10 min-w-10 bg-black text-white rounded-full p-1" />
                            <p className="font-medium">{`${Math.floor(book.duration / 60)} mins 
                                                         ${Math.floor(book.duration % 60)} secs`}</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    async function RecommendedBooks(){
        console.log("api base:" + apiBase);
        const res = await fetch(`${apiBase}/api/books/recommended`);
        //const res = await fetch(`http://localhost:3000/api/books/recommended`);
        console.log(res);
        const {data} = await res.json();
        return (
            <BookRow title={recommendedTitle} 
                    subtitle={recommendedSub}
                    books={data}
                    >  
            </BookRow>
        )
    }

    async function SuggestedBooks() {
        console.log("api base:" + apiBase);
        const res = await fetch(`${apiBase}/api/books/suggested`);
        //const res = await fetch(`http://localhost:3000/api/books/suggested`);
        console.log(res);
        const {data} = await res.json();
        return (
            <BookRow title={suggestedTitle}
                    subtitle={suggestedSub}
                    books={data}>  
            </BookRow>
        )
    }

    return (
        <div className="row">
            <div className="py-10 text-deepblue overflow-hidden">
                <div className="flex flex-col gap-8 w-[calc(100vw-48px)] md:w-[calc(100vw-248px)]">
                    <div className="flex flex-col gap-4">
                        <h3>Selected just for you</h3>
                        <Suspense fallback={<SkeletonBox width={"w-167.5"} height={"h-50"}/>}>
                            <SelectedBook />
                        </Suspense>
                    </div>

                    <Suspense fallback={<SkeletonRow title={recommendedTitle} subtitle={recommendedSub} 
                                                     figureHeight={"h-42.75"} figureWidth={"w-42.75"} 
                                                     lineHeights={["h-4", "h-5", "h-3", "h-3"]} 
                                                     lineWidths={["w-42.75", "w-35", "w-40", "w-20"]}/>}>
                        <RecommendedBooks />
                    </Suspense>

                    <Suspense fallback={<SkeletonRow title={suggestedTitle} subtitle={suggestedSub}
                                                     figureHeight={"h-42.75"} figureWidth={"w-42.75"} 
                                                     lineHeights={["h-4", "h-5", "h-3", "h-3"]} 
                                                     lineWidths={["w-42.75", "w-35", "w-40", "w-20"]}/>}>
                        <SuggestedBooks />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default ForYouPage;
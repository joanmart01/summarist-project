
export default function Navbar({openLogin}) {
    return (
      <nav className="h-20">
        <div className="flex items-center justify-between max-w-267.5 w-full h-full mx-auto py-0 px-6">
          <figure className="max-w-50">
            <img className="w-full h-full" src="/images/logo.png" alt="logo" />
          </figure>
          <ul className="list-none flex gap-6">
            <li className="cursor-pointer text-deepblue transition-colors duration-100 hover:text-coolgreen"
                onClick={(e) => openLogin(true)}>Login</li>
            <li className="hidden sm:block cursor-not-allowed text-deepblue transition-colors duration">About</li>
            <li className="hidden sm:block cursor-not-allowed text-deepblue transition-colors duration">Contact</li>
            <li className="hidden sm:block cursor-not-allowed text-deepblue transition-colors duration">Help</li>
          </ul>
        </div>
      </nav>
    )
}
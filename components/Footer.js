export default function Footer() {
    return (
      <footer className="bg-[#F1F6F4]">
        <div className="py-10 px-auto w-full">
          <div className="flex flex-col gap-16 w-full max-w-[1070px] mx-auto pt-8 px-6">

            <div className="flex flex-col md:flex-row w-full gap-7 justify-between text-xs mx-auto">
              <div className="flex flex-col gap-3 z-1">
                <div className="font-semibold text-lg text-[#032b41]">Actions</div>
                <div className="flex flex-col gap-1">
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Summarist Magazine</a>
                  </div>
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Cancel Subscription</a>
                  </div>
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Help</a>
                  </div>
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Contact us</a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 z-1">
                <div className="font-semibold text-lg text-[#032b41]">Useful Links</div>
                <div className="flex flex-col gap-1">
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Pricing</a>
                  </div>
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Summarist Business</a>
                  </div>
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Gift Cards</a>
                  </div>
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Authors & Publishers</a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 z-1">
                <div className="font-semibold text-lg text-[#032b41]">Company</div>
                <div className="flex flex-col gap-1">
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">About</a>
                  </div>
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Careers</a>
                  </div>
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Partners</a>
                  </div>
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Code of Conduct</a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 z-1">
                <div className="font-semibold text-lg text-[#032b41]">Other</div>
                <div className="flex flex-col gap-1">
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Sitemap</a>
                  </div>
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Legal Notice</a>
                  </div>
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Terms of Service</a>
                  </div>
                  <div className="leading-[1]">
                    <a className="text-[#394547] text-sm cursor-not-allowed no-underline">Privacy Policies</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="text-[#032b41] font-medium">
                Copyright &copy; 2023 Summarist.
              </div>
            </div>

          </div>
        </div>
      </footer>
    )
}
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <div> 
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <div className="sticky-top flex items-center justify-center mt-4">
            <Navbar />
          </div>
        </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#89fcb7] to-[#89fcfc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
          </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-30">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding. <a href="#" className="font-semibold text-teal-700"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
            </div>
          </div>
          <div className="text-center">
          <FadeIn><h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Platform for volunteers</h1></FadeIn>
          <FadeIn><p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Bridging the gap between young enthusiasts and corporations.<br></br> By the youth for the youth!</p></FadeIn>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="#" className="rounded-md bg-teal-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">Get started</a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">Learn more <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
      {/* <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div> */}
    </div>
  </div>
      </div>

      {/* section 1 */}
      {/* <motion.div variants={{hidden: { opacity: 0, y: 75 }, visible: {opacity: 1, y: 0 } }} initial="hidden" animate="visible" transition={{duration: 0.5, delay: 0.5}}> */}
        <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-teal-600">Engage more</h2>
                <FadeIn><p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">A compact platform</p></FadeIn>
                <p className="mt-6 text-lg/8 text-gray-600">Our project appeals to both experienced and the beginners alike. Divided by age yet united by passion.</p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <svg className="absolute top-1 left-1 size-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z" clipRule="evenodd" />
                      </svg>
                      Easy to manage:
                    </dt>
                    <dd className="inline ml-1">Our dashboard and web application makes it super convenient to manage your entries.</dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <svg className="absolute top-1 left-1 size-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                      </svg>
                      Secure
                    </dt>
                    <dd className="inline ml-1">We use the latest SSL technology and use a secure backend cloud. Don't fret about your data.</dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <svg className="absolute top-1 left-1 size-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                        <path fillRule="evenodd" d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z" clipRule="evenodd" />
                      </svg>
                      Notifications
                    </dt>
                    <dd className="inline ml-1">We'll send you timely notifications to prevent a time mismatch with your employer</dd>
                  </div>
                </dl>
              </div>
            </div>
            {/* <img src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png" alt="Product screenshot" className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0" width="2432" height="1442" /> */}
            <FadeIn><Image
              src="/corporate.jpg"
              alt="A beautiful landscape"
              width={2432}
              height={1442}
            /></FadeIn>
          </div>
        </div>
        </div>
      {/* </motion.div> */}
      

      {/* section 2 */}
      <div className="bg-white py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <FadeIn><h1 className="text-5xl w-full text-center mb-16">Why trust <span className="text-teal-700">KHUJO.org</span>?</h1></FadeIn>
    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
      <div className="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt className="text-base/7 text-gray-600">Transactions every 24 hours</dt>
        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">44 million</dd>
      </div>
      <div className="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt className="text-base/7 text-gray-600">Assets under holding</dt>
        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$119 trillion</dd>
      </div>
      <div className="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt className="text-base/7 text-gray-600">New users annually</dt>
        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">46,000</dd>
      </div>
    </dl>
  </div>
</div>
      
      
      {/* footer */}
      <footer className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="lg:grid lg:grid-cols-2">
      <div
        className="border-b border-gray-100 py-8 lg:order-last lg:border-s lg:border-b-0 lg:py-16 lg:ps-16"
      >
        <div className="block text-teal-600 lg:hidden">
          KHUJO.org
        </div>

        <div className="mt-8 space-y-4 lg:mt-0">
          <span className="hidden h-1 w-10 rounded-sm bg-teal-500 lg:block"></span>

          <div>
            <FadeIn><h2 className="text-2xl font-medium text-gray-900">Get in touch!</h2></FadeIn>

            <p className="mt-4 max-w-lg text-gray-500">
              What are you waiting for? Give us a call and we'll hook you up with the best talent in town.
            </p>
          </div>

          <form className="mt-6 w-full">
            <label htmlFor="UserEmail" className="sr-only"> Email </label>

            <div
              className="rounded-md border border-gray-100 p-2 sm:flex sm:items-center sm:gap-4"
            >
              <Input placeholder="Enter email"/>

              <button
                className="mt-1 w-full rounded-sm bg-teal-500 px-6 py-3 text-sm font-bold tracking-wide text-white uppercase transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="py-8 lg:py-16 lg:pe-16">
        <div className="hidden text-teal-600 lg:block">
          KHUJO.org
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-medium text-gray-900">Services</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Company Coaching </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Youth Startup </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Volunteer Alumni </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> HR Consulting </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Data Management </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900">Company</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> About </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Meet the Team </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Accounts Review </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900">Helpful Links</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Contact </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> FAQs </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Live Chat </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8">
          <ul className="flex flex-wrap gap-4 text-xs">
            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75"> Terms & Conditions </a>
            </li>

            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75"> Privacy Policy </a>
            </li>

            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75"> Cookies </a>
            </li>
          </ul>

          <p className="mt-8 text-xs text-gray-500">&copy; 2025. khujo.org. All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
      </footer>
    </div>    
  );
}

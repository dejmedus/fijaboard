export default function Home (){
  return  (
    <>
      <header className="bg-white dark:bg-light-900">
        <div className="lg:flex">
          <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-black lg:text-4xl">
                Build Your New{" "}
                <span className="text-blue-600 dark:text-blue-400">Idea</span>
              </h2>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
                commodi cum cupiditate ducimus, fugit harum id necessitatibus odio
                quam quasi, quibusdam rem tempora voluptates.
              </p>
              <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                <a
                  href="#"
                  className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700"
                >
                  Get Started
                </a>
                <a
                  href="#"
                  className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          <div className="w-full h-64 lg:w-1/2 lg:h-auto">
            <div
              className="w-full h-full bg-cover"
              style={{
                backgroundImage:
                "url('/website-reverse.gif')"
              }}
            >
              <div className="w-full h-full bg-black opacity-5"></div>
            </div>
          </div>
        </div>
      </header>
      
      {/* stats */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center py-8 border rounded-lg shadow-sm">
            <div className="w-1/3 text-center px-6 border-r">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <p className="ml-2 font-semibold text-xl">150K+</p>
              </div>
              <p className="text-sm text-gray-500">Active Users</p>
            </div>
            
            <div className="w-1/3 text-center px-6 border-r">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p className="ml-2 font-semibold text-xl">60K+</p>
              </div>
              <p className="text-sm text-gray-500">Trustpilot Reviews</p>
            </div>
            
            <div className="w-1/3 text-center px-6">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="ml-2 font-semibold text-xl">200+</p>
              </div>
              <p className="text-sm text-gray-500">Partners</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 4 feats */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 lg:pr-12">
              <p className="text-sm font-medium text-pink-500">Trusted By Users Worldwide ★★★★★</p>
              <h2 className="text-3xl font-bold mt-2">Insert Witty Tagline Here.</h2>
              <p className="text-gray-500 mt-2">Expand on witty tagline here. Should be two lines.</p>
              
              <div className="mt-6">
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Feature #1</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Feature #2</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Feature #3</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Feature #4</span>
                </div>
              </div>
              
              <div className="mt-6">
                <a href="#" className="px-8 py-3 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Learn More</a>
              </div>
            </div>
            
            {/* feature cards */}
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-cyan-200"></div>
                  </div>
                  <h3 className="font-semibold text-lg text-center">Feature #1</h3>
                  <p className="text-gray-500 mt-2 text-sm text-center">Insert feature details here. Should be 2-3 lines.</p>
                </div>
                
                <div className="border rounded-lg p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-purple-200"></div>
                  </div>
                  <h3 className="font-semibold text-lg text-center">Feature #2</h3>
                  <p className="text-gray-500 mt-2 text-sm text-center">Insert feature details here. Should be 2-3 lines.</p>
                </div>
                
                <div className="border rounded-lg p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200"></div>
                  </div>
                  <h3 className="font-semibold text-lg text-center">Feature #3</h3>
                  <p className="text-gray-500 mt-2 text-sm text-center">Insert feature details here. Should be 2-3 lines.</p>
                </div>
                
                <div className="border rounded-lg p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-yellow-200"></div>
                  </div>
                  <h3 className="font-semibold text-lg text-center">Feature #4</h3>
                  <p className="text-gray-500 mt-2 text-sm text-center">Insert feature details here. Should be 2-3 lines.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          {/* screenshot placeholder (idk what we're gonna acc put here) */}
          <div className="bg-gray-200 rounded-lg p-16 mb-12 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-gray-800 text-center">
              FIJA Screenshot #2<br />
              Or Maybe A Video?
            </h2>
          </div>
          
          {/* trust badge */}
          <div className="flex justify-center mb-4">
            <span className="bg-orange-100 text-orange-800 text-sm font-medium px-4 py-1 rounded-full flex items-center">
              Trusted By <span className="font-bold mx-1">150K+</span> Users 👍
            </span>
          </div>
          
          {/* header for testimonials */}
          <h3 className="text-3xl font-bold text-center mb-2">Trusted By Many</h3>
          <p className="text-gray-500 text-center mb-10">Add sentence here to summarize overall reviews.</p>
          
          {/* test row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* test 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full overflow-hidden flex-shrink-0">
                  <img src="https://placehold.co/100" alt="Sam" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sam</h4>
                  <div className="flex text-red-500">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Review here. Should be 2 lines long.</p>
              <p className="text-gray-500 text-sm">Including input text here for filler.</p>
            </div>
            
            {/* test 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full overflow-hidden flex-shrink-0">
                  <img src="https://placehold.co/100" alt="Jessica" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Jessica</h4>
                  <div className="flex text-red-500">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Review here. Should be 2 lines long.</p>
              <p className="text-gray-500 text-sm">Including input text here for filler.</p>
            </div>
            
            {/* test 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full overflow-hidden flex-shrink-0">
                  <img src="https://placehold.co/100" alt="John" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">John</h4>
                  <div className="flex text-red-500">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Review here. Should be 2 lines long.</p>
              <p className="text-gray-500 text-sm">Including input text here for filler.</p>
            </div>
          </div>
          
          {/* test row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* test 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full overflow-hidden flex-shrink-0">
                  <img src="https://placehold.co/100" alt="Anna" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Anna</h4>
                  <div className="flex text-red-500">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Review here. Should be 2 lines long.</p>
              <p className="text-gray-500 text-sm">Including input text here for filler.</p>
            </div>
            
            {/* test 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full overflow-hidden flex-shrink-0">
                  <img src="https://placehold.co/100" alt="Sarah" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah</h4>
                  <div className="flex text-red-500">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Review here. Should be 2 lines long.</p>
              <p className="text-gray-500 text-sm">Including input text here for filler.</p>
            </div>
            
            {/* test 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full overflow-hidden flex-shrink-0">
                  <img src="https://placehold.co/100" alt="Another User" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Another User</h4>
                  <div className="flex text-red-500">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Review here. Should be 2 lines long.</p>
              <p className="text-gray-500 text-sm">Including input text here for filler.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-3">Choose Your Perfect Plan</h2>
          <p className="text-gray-500 text-center mb-8">Sentence here. Should be 1-2 lines.</p>
          
          {/* pricing toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center bg-gray-100 rounded-lg">
              <button className="px-8 py-3 text-sm font-medium bg-purple-100 text-purple-700 rounded-l-lg">Monthly</button>
              <button className="px-8 py-3 text-sm font-medium text-gray-700">Yearly</button>
            </div>
          </div>
          
          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* basic */}
            <div className="border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Basic Plan</h3>
              <p className="text-gray-500 mb-6">List who this plan is for</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-gray-500">/Per Month</span>
              </div>
              
              <hr className="mb-6" />
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #1
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #2
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #3
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #4
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #5
                </li>
              </ul>
              
              <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition-colors">
                Get Started
              </button>
            </div>
            
            {/* standard (highlighted) */}
            <div className="border-2 border-purple-200 rounded-lg p-8 shadow-lg relative">
              <h3 className="text-xl font-bold mb-4">Standard Plan</h3>
              <p className="text-gray-500 mb-6">List who this plan is for</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">$19</span>
                <span className="text-gray-500">/Per Month</span>
              </div>
              
              <hr className="mb-6" />
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #1
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #2
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #3
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #4
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #5
                </li>
              </ul>
              
              <button className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </div>
            
            {/* premium */}
            <div className="border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Premium Plan</h3>
              <p className="text-gray-500 mb-6">List who this plan is for</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">$39</span>
                <span className="text-gray-500">/Per Month</span>
              </div>
              
              <hr className="mb-6" />
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #1
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #2
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #3
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #4
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Feature #5
                </li>
              </ul>
              
              <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

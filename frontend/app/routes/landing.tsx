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
    </>
  )
}

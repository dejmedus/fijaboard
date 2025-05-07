import { NavLogo } from "./navbar";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl">
              Subscribe our newsletter to get updates.
            </h1>

            <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
              <input
                id="email"
                type="text"
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                placeholder="Email Address"
              />
              <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-8" />

        <div className="flex items-center justify-between">
          <NavLogo/>

          <div className="flex mr-5">
            {[
              {
                label: 'Reddit',
                href: '#',
                svgPath:
                  'M22 12.5c0-.68-.56-1.24-1.25-1.24-.35 0-.67.14-.89.37-1.04-.72-2.45-1.17-4.01-1.22l.84-3.95 2.77.59c.01.68.57 1.22 1.25 1.22.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25c-.5 0-.94.3-1.13.72l-3.12-.66a.998.998 0 0 0-1.18.76l-.94 4.42c-1.59.06-3.04.5-4.1 1.24a1.24 1.24 0 0 0-.91-.39c-.69 0-1.25.56-1.25 1.24 0 .51.3.94.73 1.13a2.91 2.91 0 0 0-.05.5c0 2.21 2.71 4 6 4s6-1.79 6-4c0-.16-.02-.33-.05-.49.4-.2.7-.62.7-1.14Zm-12.25.75c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25Zm6.75 3.19c-.96.96-2.88 1.04-3.5 1.04s-2.54-.08-3.5-1.04a.75.75 0 1 1 1.06-1.06c.49.49 1.6.68 2.44.68s1.95-.19 2.44-.68a.75.75 0 1 1 1.06 1.06Zm-.25-1.94c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25S18 13.56 18 14.25s-.56 1.25-1.25 1.25Z',
              },
              {
                label: 'Facebook',
                href: '#',
                svgPath:
                  'M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93h-2.4V12H10v-1.54c0-2.37 1.4-3.69 3.54-3.69 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46V12h2.58l-.41 2.87H13v6.93c4.56-.93 8-4.96 8-9.8Z',
              },
              {
                label: 'Github',
                href: '#',
                svgPath:
                  'M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.34-3.37-1.34-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.52 1.04 1.52 1.04.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.02a9.36 9.36 0 0 1 5 0c1.9-1.29 2.73-1.02 2.73-1.02.55 1.4.2 2.44.1 2.7.64.72 1.02 1.63 1.02 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z',
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="mx-2 text-gray-600 hover:text-blue-500"
                aria-label={item.label}
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={item.svgPath} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

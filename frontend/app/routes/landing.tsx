import { useState } from "react";
import { UsersIcon, MailIcon, StarIcon } from "../lib/icons";

export default function Home() {
  return (
    <>
      <Header />
      <StatsSection />
      <FeatureSection />
      <ScreenshotSection />
      <TestimonialsSection />
      <Pricing />
    </>
  );
}

function Header() {
  return (
    <header className="my-20 bg-white dark:bg-light-900">
      <div className="lg:flex">
        <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-black lg:text-4xl">
              For the Inspired{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Journey Ahead
              </span>
            </h2>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
              FIJA is a discovery platform for travelers seeking authentic local
              experiences. From tucked-away cafes to under-the-radar trails,
              explore curated lists crafted by locals and travel lovers — not
              algorithms. Forget the guidebooks. Find what others miss.
            </p>
            <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
              <a
                href="/catalog"
                className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700"
              >
                Discover Fijalists
              </a>
              <a
                href="#features"
                className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:h-auto">
          <img
            src="/demo.png"
            alt="Demo"
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
      </div>
    </header>
  );
}

function StatsSection() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap justify-center py-8 border border-neutral-200 rounded-lg shadow-sm">
          <StatItem
            icon={<UsersIcon />}
            value="150K+"
            label="Active Users"
            borderRight
          />
          <StatItem
            icon={<MailIcon />}
            value="12K+"
            label="Verified Reviews"
            borderRight
          />
          <StatItem icon={<StarIcon />} value="200+" label="Local Experts" />
        </div>
      </div>
    </section>
  );
}

function StatItem({
  icon,
  value,
  label,
  borderRight = false,
}: {
  icon: any;
  value: string;
  label: string;
  borderRight?: boolean;
}) {
  return (
    <div
      className={`w-1/3 text-center px-6 ${
        borderRight ? "border-r border-neutral-200" : ""
      }`}
    >
      <div className="flex items-center justify-center">
        {icon}
        <p className="ml-2 font-semibold text-xl">{value}</p>
      </div>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

function FeatureSection() {
  const checklist = [
    "Curated fijalists by locals & travelers",
    "Filter by vibe, location, and more",
    "Map-integrated itinerary planning",
    "Save and revisit favorite lists",
  ];

  return (
    <section id="features" className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 flex flex-col lg:flex-row">
        <div className="lg:w-1/2 lg:pr-12">
          <p className="text-sm font-medium text-pink-500">
            Trusted by Curious Travelers Worldwide ★★★★★
          </p>
          <h2 className="text-3xl font-bold mt-2">
            Beyond the Crowd. Onto the Fijalist.
          </h2>
          <p className="text-gray-500 mt-2">
            FIJA is your compass for finding places you won’t see in guidebooks
            — thoughtfully curated, visually inspiring, and always one list
            away.
          </p>
          <div className="mt-6">
            {checklist.map((feature) => (
              <div
                key={feature}
                className="flex items-center text-gray-600 mb-2"
              >
                <span className="text-purple-600 mr-2">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="/catalog"
              className="px-8 py-3 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="lg:w-1/2 mt-12 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FeatureCard
            title="Curated Fijalists"
            description="Browse themed collections of local gems, created by real travelers and locals"
            bgColor="bg-cyan-200"
          />
          <FeatureCard
            title="Filter & Find"
            description="Discover your next adventure with hundreds of curated tags and filters"
            bgColor="bg-purple-200"
          />
          <FeatureCard
            title="Explore the Map"
            description="Plan your world tour with the map integration"
            bgColor="bg-green-200"
          />
          <FeatureCard
            title="Collect"
            description="Save your favorite fijalists and revisit past journeys"
            bgColor="bg-yellow-200"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  bgColor,
}: {
  title: string;
  description: string;
  bgColor: string;
}) {
  return (
    <div className="border border-neutral-200 rounded-lg p-6">
      <div className="flex justify-center mb-4">
        <div className={`w-16 h-16 rounded-full ${bgColor}`}></div>
      </div>
      <h3 className="font-semibold text-lg text-center">{title}</h3>
      <p className="text-gray-500 mt-2 text-sm text-center">{description}</p>
    </div>
  );
}

function ScreenshotSection() {
  return (
    <section className="py-12 ">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gray-200 rounded-lg p-16 mb-12 flex items-center justify-center">
          <img
            src="/fijalists.png"
            alt="Screenshot of the app"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-12 ">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-center mb-4">
          <span className="bg-orange-100 text-orange-800 text-sm font-medium px-4 py-1 rounded-full">
            Trusted By 20,000+ Creators
          </span>
        </div>
        <h3 className="text-4xl font-bold text-center my-4">Trusted By Many</h3>
        <p className="text-gray-500 text-center mb-10">
          Travelers around the world are swapping tourist traps for authentic
          experiences with FIJA
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Testimonial
            name="Sam"
            image="https://placehold.co/100"
            review="FIJA helped me find hidden gems I’d never have discovered on my own. Way better than a guidebook!"
          />
          <Testimonial
            name="Jessica"
            image="https://placehold.co/100"
            review="Every playlist felt like a local friend showing me around. Totally changed how I travel."
          />
          <Testimonial
            name="John"
            image="https://placehold.co/100"
            review="I loved how easy it was to save and follow curated lists. Travel planning just got fun."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial
            name="Anna"
            image="https://placehold.co/100"
            review="The recommendations were spot on for my vibe — artsy, chill, and off the beaten path."
          />
          <Testimonial
            name="Sarah"
            image="https://placehold.co/100"
            review="The map view made it so simple to organize my days. Every stop was a win."
          />
          <Testimonial
            name="Leo"
            image="https://placehold.co/100"
            review="FIJA helped me skip the crowds and see the soul of the city. Can’t wait to use it again."
          />
        </div>
      </div>
    </section>
  );
}

function Testimonial({
  name,
  image,
  review,
}: {
  name: string;
  image: string;
  review: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        {/* <div className="w-16 h-16 bg-blue-100 rounded-full overflow-hidden flex-shrink-0 mr-4">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div> */}
        <div className="">
          <h4 className="font-semibold">{name}</h4>
          <div className="flex text-red-500">★★★★★</div>
        </div>
      </div>
      <p className="text-gray-600 text-sm">{review}</p>
    </div>
  );
}

function Pricing() {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-3">
          Choose Your Perfect Plan
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Whether you're just starting your adventure or ready to dive deeper,
          we have a plan for every explorer.
        </p>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center rounded-lg">
            <button
              onClick={() => setIsMonthly(true)}
              className={`px-8 py-3 text-sm font-medium rounded-l-lg ${
                isMonthly
                  ? "hover:bg-purple-200 bg-purple-100 text-purple-700"
                  : "focus:text-gray-800 bg-neutral-100 text-gray-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsMonthly(false)}
              className={`px-8 py-3 text-sm font-medium rounded-r-lg ${
                !isMonthly
                  ? "hover:bg-purple-200 bg-purple-100 text-purple-700"
                  : "focus:text-gray-800 bg-neutral-100 text-gray-700"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricePlan
            name="Join Today"
            description="Perfect for casual travelers curious to explore hidden gems with no commitment."
            prices={[0, 0]}
            isMonthly={isMonthly}
            features={[
              "Access to free curated fijalists",
              "Save up to 5 fijalists",
              "Explore local picks by theme",
              "Limited recommendations engine",
              "Basic user profile",
            ]}
          />

          <PricePlan
            name="Standard"
            description="Great for frequent travelers who want curated lists, deeper discovery, and personalization."
            prices={[5, 60]}
            isMonthly={isMonthly}
            features={[
              "Unlimited playlist access",
              "Save unlimited fijalists",
              "Personalized recommendations",
              "Location-based sorting & filters",
              "Full map integration",
            ]}
            isHighlighted={true}
          />

          <PricePlan
            name="Premium"
            description="Best for adventurers and content creators seeking the most tailored experience."
            prices={[9, 90]}
            isMonthly={isMonthly}
            features={[
              "Everything in Standard, plus",
              "Early access to new fijalists",
              "Priority support & feature voting",
              "Create & share your own fijalists",
              "Access to exclusive local collabs",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function PricePlan({
  name,
  description,
  prices,
  isMonthly,
  features,
  isHighlighted = false,
}: {
  name: string;
  description: string;
  prices: number[];
  isMonthly: boolean;
  features: string[];
  isHighlighted?: boolean;
}) {
  return (
    <div
      className={`border-2 border-neutral-200 ${
        isHighlighted && "border-purple-200 shadow-lg"
      } rounded-lg p-8 relative`}
    >
      <h3 className="text-xl font-bold mb-4">{name}</h3>
      <p className="text-gray-500 mb-6">{description}</p>

      <div className="mb-6">
        <span className="text-4xl font-bold">
          ${isMonthly ? prices[0] : prices[1]}
        </span>
        <span className="text-gray-500">
          /Per {isMonthly ? "Month" : "Year"}
        </span>
      </div>

      <hr className="mb-6" />

      <ul className="space-y-4 mb-8 lg:h-[280px]">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-600 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <a
        href="/signup"
        className="w-full py-3 border border-gray-300 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition-colors self-end flex justify-center items-center"
      >
        Get Started
      </a>
    </div>
  );
}

import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-100 to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Welcome to KnowledgeBase
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore and share knowledge with our comprehensive platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="./login"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </Link>
            <Link
              href="./about"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold border border-blue-600 hover:bg-blue-50 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
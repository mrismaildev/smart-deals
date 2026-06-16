import { Link } from 'react-router';

const HeroSection = () => {
  return (
    <div className="relative bg-linear-to-br from-pink-50 via-white to-blue-50 py-20 px-4">
      {/* Container for centering */}
      <div className="container mx-auto flex flex-col items-center text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Deal Your <span className="text-purple-600">Products</span> <br />
          In A <span className="text-purple-500">Smart</span> Way !
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-gray-600 max-w-lg text-lg">
          SmartDeals helps you sell, resell, and shop from trusted local sellers
          — all in one place!
        </p>

        {/* Search Bar */}
        <div className="mt-10 flex w-full max-w-lg shadow-lg rounded-lg overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Search For Products, Categories..."
            className="w-full py-4 px-6 outline-none text-gray-700"
          />
          <button className="bg-purple-600 text-white px-8 hover:bg-purple-700 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <Link
            to="/products"
            className="bg-purple-600 text-white py-3 px-6 rounded hover:bg-purple-700 transition"
          >
            Watch All Products
          </Link>
          <Link
            to="/create-product"
            className="border border-purple-600 text-purple-600 py-3 px-6 rounded hover:bg-purple-50 transition"
          >
            Post an Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

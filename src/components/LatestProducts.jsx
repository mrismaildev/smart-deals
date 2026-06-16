import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import HeroSection from './HeroSection';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/latest-products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <HeroSection></HeroSection>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Recent <span className="text-purple-500">Products</span>
          </h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto mt-2 rounded"></div>
        </div>

        {loading ? (
          // Loading State: Skeleton Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton h-80 w-full rounded-lg"></div>
            ))}
          </div>
        ) : (
          // Product Grid Layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div
                key={product._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
              >
                <div className="bg-gray-100 h-48 w-full rounded mb-4"></div>

                <h3 className="font-semibold text-gray-800 text-lg mb-2">
                  {product.title}
                </h3>
                <p className="text-purple-600 font-bold mb-4">
                  $ {product.price_min} - {product.price_max}
                </p>

                <Link
                  to={`/productDetails/${product._id}`}
                  className="block text-center border border-purple-500 text-purple-600 py-2 rounded hover:bg-purple-50 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LatestProducts;

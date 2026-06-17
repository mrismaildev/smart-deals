import { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import ProductBidsTable from './ProductBidsTable';

const ProductDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const product = useLoaderData();

  useEffect(() => {
    fetch(`http://localhost:3000/product/bid/${product._id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setBids(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching bids:', err);
        setLoading(false);
      });
  }, [product._id, user]);

  // useEffect(() => {
  //   fetch(`http://localhost:3000/product/bid/${product._id}`, {
  //     headers: {
  //       authorization: `Bearer ${user.accessToken}`,
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setBids(data);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error('Error fetching bids:', err);
  //       setLoading(false);
  //     });
  // }, [product._id, user]);

  const handleBidSubmit = e => {
    e.preventDefault();
    console.log('submit');
    const form = e.target;

    const bidInfo = {
      product: product._id,
      image: product.image,
      name: product.title,
      price: product.price_min,
      buyer_name: form.name.value,
      buyer_email: form.email.value,
      buyer_image: form.buyer_image.value,
      bid_price: parseFloat(form.bid_price.value),
      buyer_contact: form.contact.value,
      status: 'pending',
    };

    fetch('http://localhost:3000/bids', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(bidInfo),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          bidInfo._id = data.insertedId;
          const newBid = [...bids, bidInfo].sort(
            (a, b) => b.bid_price - a.bid_price,
          );
          setBids(newBid);
          toast.success('Bid Submitted Successfully!');
          setIsModalOpen(false);
          navigate('/my-bids');
          form.reset();
        }
      });
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Back Button */}
      <button className="mb-6 flex items-center text-gray-800 font-medium hover:text-purple-600 transition">
        ← Back To Products
      </button>

      {/* Main Grid Layout: Left (Image) & Right (Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Product Image & Description */}
        <div className="space-y-6">
          <div className="bg-gray-200 h-125 w-full rounded-lg shadow-sm"></div>

          <div className="border border-gray-100 p-8 rounded-xl shadow-sm bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Product Description
            </h2>
            <div className="flex gap-12 mb-6 border-b pb-4">
              <p>
                <span className="font-bold text-purple-600">Condition : </span>{' '}
                {product.condition}
              </p>
              <p>
                <span className="font-bold text-purple-600">Usage Time : </span>{' '}
                {product.usage}
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed text-justify">
              {product.description}
            </p>
          </div>
        </div>

        {/* Right Side: Info & Purchase */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
          <div className="flex gap-3">
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded text-sm font-medium">
              Art And Hobbies
            </span>
          </div>

          <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
            <p className="text-3xl font-bold text-green-600">
              ${product.price_min} - {product.price_max}
            </p>
            <p className="text-gray-500">Price starts from</p>
          </div>

          <div className="border border-gray-100 p-6 rounded-xl shadow-sm bg-white">
            <h3 className="font-bold text-lg mb-4 text-gray-900">
              Product Details
            </h3>
            <p className="text-gray-600 mb-1">
              Product ID:{' '}
              <span className="font-medium text-gray-800">{product._id}</span>
            </p>
            <p className="text-gray-600">
              Posted:{' '}
              <span className="font-medium text-gray-800">
                {new Date(product.created_at).toLocaleDateString()}
              </span>
            </p>
          </div>

          <div className="border border-gray-100 p-6 rounded-xl shadow-sm bg-white">
            <h3 className="font-bold text-lg mb-4 text-gray-900">
              Seller Information
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-bold text-gray-900">{product.seller_name}</p>
                <p className="text-sm text-gray-500">{product.email}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-1">
              Location: <span className="font-medium">{product.location}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Contact:{' '}
              <span className="font-medium">{product.seller_contact}</span>
            </p>
            <p className="font-bold text-gray-900">
              Status:{' '}
              <span className="bg-orange-400 text-white px-2 py-0.5 rounded text-xs ml-1">
                {product.status}
              </span>
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition shadow-lg"
          >
            I Want Buy This Product
          </button>
        </div>
      </div>
      <div className="">
        <ProductBidsTable
          productId={product._id}
          bids={bids}
          loading={loading}
        ></ProductBidsTable>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-2xl mb-6 text-center">
              Give Seller Your Offered Price
            </h3>
            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div className="flex gap-4">
                <input
                  name="name"
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered w-1/2"
                />
                <input
                  name="email"
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered w-1/2"
                />
              </div>
              <input
                name="photo"
                type="url"
                name="buyer_image"
                placeholder="Buyer Image URL"
                className="input input-bordered w-full"
                required
              />
              <input
                name="bid"
                type="number"
                name="bid_price"
                placeholder="Place your Price"
                className="input input-bordered w-full"
                required
              />
              <input
                name="contact"
                type="text"
                name="contact"
                placeholder="Contact Info"
                className="input input-bordered w-full"
                required
              />

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn bg-purple-600 text-white">
                  Submit Bid
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

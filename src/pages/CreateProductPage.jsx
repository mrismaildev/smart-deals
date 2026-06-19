import { FaArrowLeft } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const CreateProductPage = () => {
  // const axiosInstance = useAxios();
  const axiosInstance = useAxiosSecure();
  const { user } = useAuth();

  const handleCreateProduct = async e => {
    e.preventDefault();
    const form = e.target;

    const productData = {
      name: form.name.value, // Title
      category: form.category.value, // Category
      price_min: parseFloat(form.min.value), // Min Price (Number)
      price_max: parseFloat(form.mx.value), // Max Price (Number)
      condition: form.condition.value, // Condition (radio)
      usage: form.time.value, // Usage time
      image: form.photo.value, // Product Image URL
      seller_name: form.title.value, // Seller Name
      email: form.email.value, // Seller Email
      seller_contact: form.contact.value, // Seller Contact
      seller_image: form.img.value, // Seller Image URL
      location: form.location.value, // Location
      description: form.discription.value, // Description
      status: 'pending', // Default status
      created_at: new Date(), // Current timestamp
    };

    console.log(productData);

    axiosInstance.post('/products', productData).then(data => {
      console.log(data.data);
    });

    // axiosInstance.post('/products', productData).then(data => {
    //   console.log(data.data);
    // });

    // axios.post('https://smart-deals-server-projects.vercel.app'/products', productData).then(data => {
    //   console.log(data.data);
    //   if (data.data.insertedId) {
    //     Swal.fire({
    //       position: 'top-end',
    //       icon: 'success',
    //       title: 'Product has been created',
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   }
    // });
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="flex justify-center mb-6">
        <a
          href="#"
          className="flex items-center text-gray-600 hover:text-purple-600 font-medium"
        >
          <FaArrowLeft className="mr-2" /> Back To Products
        </a>
      </div>

      {/* Header */}
      <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-10">
        Create <span className="text-purple-600">A Product</span>
      </h2>

      {/* Form Card */}
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        <form
          onSubmit={handleCreateProduct}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              required
              name="name"
              type="text"
              placeholder="e.g. Yamaha Fz Guitar for Sale"
              className="w-full input input-bordered rounded-lg outline-none focus:outline-none focus:border-gray-300 focus:ring-0"
            />
          </div>

          {/* Category */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              className="w-full select select-bordered rounded-lg"
            >
              <option value="">Select a Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion & Apparel</option>
              <option value="home">Home & Furniture</option>
              <option value="sports">Sports & Outdoors</option>
              <option value="books">Books & Hobbies</option>
            </select>
          </div>

          {/* Prices */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Min Price You want to Sale ($)
            </label>
            <input
              name="min"
              type="number"
              placeholder="e.g. 18.5"
              className="w-full input input-bordered rounded-lg outline-none focus:outline-none focus:border-gray-300 focus:ring-0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Max Price You want to Sale ($)
            </label>
            <input
              name="mx"
              type="text"
              placeholder="Optional (default = Min Price)"
              className="w-full input input-bordered rounded-lg outline-none focus:outline-none focus:border-gray-300 focus:ring-0"
            />
          </div>

          {/* Condition & Usage */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Product Condition
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  className="radio radio-primary"
                />{' '}
                Brand New
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  className="radio radio-primary"
                />{' '}
                Used
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Usage time
            </label>
            <input
              name="time"
              type="text"
              placeholder="e.g. 1 year 3 month"
              className="w-full input input-bordered rounded-lg outline-none focus:outline-none focus:border-gray-300 focus:ring-0"
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Product Image URL
            </label>
            <input
              name="photo"
              type="url"
              placeholder="https://..."
              className="w-full input input-bordered rounded-lg outline-none focus:outline-none focus:border-gray-300 focus:ring-0"
            />
          </div>

          {/* Seller Info */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Seller Name
            </label>
            <input
              name="title"
              type="text"
              placeholder="e.g. Artisan Roasters"
              className="w-full input input-bordered rounded-lg outline-none focus:outline-none focus:border-gray-300 focus:ring-0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Seller Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="leli31955@nrlord.com"
              className="w-full input input-bordered rounded-lg outline-none focus:outline-none focus:border-gray-300 focus:ring-0"
            />
          </div>

          {/* Contact & Seller Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Seller Contact
            </label>
            <input
              name="contact"
              type="tel"
              placeholder="e.g. +1-555-1234"
              className="w-full input input-bordered rounded-lg outline-none focus:outline-none focus:border-gray-300 focus:ring-0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Seller Image URL
            </label>
            <input
              name="img"
              type="url"
              placeholder="https://..."
              className="w-full input input-bordered rounded-lg outline-none focus:outline-none focus:border-gray-300 focus:ring-0"
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <input
              name="location"
              type="text"
              placeholder="City, Country"
              className="w-full input input-bordered rounded-lg outline-none focus:outline-none focus:border-gray-300 focus:ring-0"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Simple Description about your Product
            </label>
            <textarea
              name="discription"
              className=" input input-bordered rounded-lg outline-none focus:outline-none focus:border-gray-300 focus:ring-0 w-full textarea textarea-bordered h-32"
              placeholder="e.g. I bought this product 3 month ago..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg transition-all">
              Create A Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;

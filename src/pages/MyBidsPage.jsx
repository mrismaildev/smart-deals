import { use, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyBidsPage = () => {
  const [mybids, setMyBids] = useState([]);
  console.log(mybids);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/bids?email=${user?.email}`)
        .then(data => {
          setMyBids(data.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching bids:', err);
          setLoading(false);
        });
    }
  }, [axiosSecure, user?.email]);

  // useEffect(() => {
  //   fetch(`'https://smart-deals-server-projects.vercel.app'/bids?email=${user?.email}`, {
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('access-token')}`,
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setMyBids(data);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error('Error fetching bids:', err);
  //       setLoading(false);
  //     });
  // }, [user?.email, user.accessToken]);

  const handleRemoveBid = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed)
        axiosSecure.delete(`/bids/${id}`).then(data => {
          console.log('data delete', data);
          if (data.data.deletedCount) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your bid has been deleted.',
              icon: 'success',
            });
            const remeingBid = mybids.filter(bid => bid._id !== id);
            setMyBids(remeingBid);
          }
        });
    });
  };

  if (loading) return <div className="skeleton h-40 w-full mt-10"></div>;

  return (
    <div className=" container mx-auto mt-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        My Bids
        <span className="text-purple-600">{mybids.length}</span>
      </h2>

      <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gray-50 border-b">
            <tr>
              <th>SL No</th>
              <th>Product</th>
              <th>Seller</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {mybids.length > 0 ? (
              mybids.map((bid, index) => (
                <tr key={bid._id} className="hover:bg-gray-50">
                  <td className="font-bold text-gray-600">{index + 1}</td>

                  {/* Product Column */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 bg-gray-200 rounded">
                        {bid.image ? <img src={bid.image} alt="" /> : 'I'}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">
                          {bid.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${bid.price}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Seller Column */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full bg-gray-200">
                          {bid.buyer_image ? (
                            <img
                              className="w-full h-full object-cover"
                              src={bid.buyer_image}
                              alt=""
                            />
                          ) : (
                            'User'
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">
                          {bid.buyer_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {bid.buyer_email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Bid Price */}
                  <td className="font-bold text-gray-800">${bid.bid_price}</td>

                  <td className="font-bold text-gray-800">${bid.status}</td>

                  {/* Actions Column */}
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleRemoveBid(bid._id)}
                      className="btn btn-outline btn-error btn-xs"
                    >
                      Remove bid
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No bids placed on this product yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBidsPage;

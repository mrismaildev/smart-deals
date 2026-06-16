

const ProductBidsTable = ({ bids, loading }) => {
  if (loading) return <div className="skeleton h-40 w-full mt-10"></div>;

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Bids For This Products:{' '}
        <span className="text-purple-600">{bids.length}</span>
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
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {bids.length > 0 ? (
              bids.map((bid, index) => (
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

                  {/* Actions Column */}
                  <td className="flex gap-2">
                    <button className="btn btn-outline btn-success btn-xs">
                      Accept Offer
                    </button>
                    <button className="btn btn-outline btn-error btn-xs">
                      Reject Offer
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

export default ProductBidsTable;

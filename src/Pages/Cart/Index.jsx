import React from "react";
import { useCart } from "../../context/CartContext";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button } from "@mui/material";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Index() {
  const { loading, cartData, removeFromCart } = useCart();

  const total = cartData?.reduce((acc, item) => {
    return acc + item?.courseDetails?.price;
  }, 0);

  return (
    <div>
      <div className="p-4">
        <h2 className="text-30">My Wishlist</h2>

        <p className="text-16 text-textGray mt-6">
          {cartData && cartData?.length} Courses in your wishlist
        </p>
      </div>
      <hr className="border border-borderGray" />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-9 p-4 mt-6">
            {cartData.length > 0 &&
              cartData?.map((course, i) => {
                return (
                  <div key={i} className="px-4 py-8 border border-borderGray">
                    <div className="flex justify-start gap-4">
                      <div className="w-[180px] h-[150px] flex-shrink-0">
                        <img
                          src={course?.courseDetails?.image}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-grow">
                        <p className="text-18">
                          {course?.courseDetails?.title}
                        </p>
                        <p className="text-textGray text-16">
                          {`${course?.courseDetails?.createdBy?.firstName} ${course?.courseDetails?.createdBy?.lastName}`}
                        </p>
                      </div>

                      <div className="flex-shrink-0">
                        <Button
                          variant="contained"
                          startIcon={<RiDeleteBin5Line />}
                          onClick={() => removeFromCart(course?.courseId)}
                          sx={{
                            background: "#161D29",
                            color: "#EF476F",

                            "&:hover": {
                              background: "#161D29",
                            },
                          }}
                        >
                          Remove
                        </Button>

                        <p className="text-24 text-yellow mt-2">
                          Rs. {course?.courseDetails?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

            {cartData?.length === 0 && <p>No Courses in the Cart</p>}
          </div>

          <div className="col-span-3 p-4 mt-6">
            <div className="p-4 bg-[#161D29] border border-borderGray">
              <p className="text-16 text-textGray">Total:</p>
              <p className="text-24 text-yellow mt-2 mb-2">Rs. {total || 0}</p>

              <Button
                variant="contained"
                className="w-full"
                disabled={cartData.length === 0}
                sx={{
                  "&.Mui-disabled": {
                    color: "gray",
                  },
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

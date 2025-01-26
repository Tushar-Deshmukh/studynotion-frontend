import React, { useEffect, useState } from "react";
import axios from "../axios";
import ApiConfig from "../config/ApiConfig";
import Marquee from "react-fast-marquee";
import { Box, Card, Rating } from "@mui/material";

export default function Ratings() {
  const [ratings, setRatings] = useState([]);

  async function getAllRatings() {
    try {
      const res = await axios.get(ApiConfig.ratings);
      if (res?.data?.success) {
        setRatings(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllRatings();
  }, []);

  return (
    <div>
      <h2 className="text-center text-30 font-semibold mb-4">Reviews From Other Learners</h2>
      <Marquee>
        {ratings &&
          ratings.length > 0 &&
          ratings.map((rating) => {
            return (
              <Card key={rating?._id} className="mr-4 p-4 w-full ">
                <Box className="flex items-center gap-2">
                  <img
                    src={rating?.user?.profileImage}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-18">{`${rating?.user?.firstName} ${rating?.user?.lastName}`}</p>
                    <p className="text-14 text-text-lightGray">
                      {rating?.user?.email}
                    </p>
                  </div>
                </Box>
                <Box mt={1}>
                  <p className="text-white h-12">
                    {rating?.review && rating?.review.length > 80
                      ? rating.review.slice(0, 80)
                      : rating?.review}
                  </p>
                </Box>

                <Box mt={1} className="flex items-center gap-2">
                  <p className="text-yellow">{rating?.rating}</p>
                  <Rating readOnly value={rating?.rating} />
                </Box>
              </Card>
            );
          })}
      </Marquee>
    </div>
  );
}

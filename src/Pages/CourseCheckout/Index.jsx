import { Box, Button, Container, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import ApiConfig from "../../config/ApiConfig";
import { useLocation } from "react-router-dom";
import { IoInformationCircleOutline } from "react-icons/io5";
import { TfiWorld } from "react-icons/tfi";
import moment from "moment";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const courseFeatures = [
  {
    id: 1,
    image: "/images/duration.png",
    text: "8 hours on-demand video",
  },

  {
    id: 2,
    image: "/images/cursor.png",
    text: "Full Lifetime access",
  },

  {
    id: 3,
    image: "/images/access.png",
    text: "Access on Mobile and TV",
  },

  {
    id: 1,
    image: "/images/file.png",
    text: "Certificate of completion",
  },
];

export default function Index() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("id");
  const [course, setCourse] = useState({});
  const [sectionsLength, setSectionsLength] = useState(0);
  const [subSectionsLength, setSubSectionsLength] = useState(0);
  const { addToCart, buyCourse, loading } = useCart();
  const auth = useContext(AuthContext);

  const handleAddToCartBtnClick = (courseId) => {
    if (!auth?.userLoggedIn) {
      toast.error("Please Login First");
      return;
    }

    addToCart(courseId);
  };

  const handleBuyNowBtnClick = (courseId, amount) => {
    if (!auth?.userLoggedIn) {
      toast.error("Please Login First");
      return;
    }

    buyCourse(courseId, amount);
  };

  async function getCourseByCourseId() {
    try {
      const res = await axios.get(`${ApiConfig.course}/${courseId}`);
      if (res?.data?.success) {
        const coursedata = res?.data?.data;
        setCourse(coursedata);

        setSectionsLength(coursedata?.courseContent?.topics.length);

        const subtopics = coursedata?.courseContent?.topics?.reduce(
          (count, topic) => {
            return count + topic?.subTopics?.length;
          },
          0
        );

        setSubSectionsLength(subtopics);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    if (courseId) {
      getCourseByCourseId();
    }
  }, [courseId]);

  //utility function to display the duration
  function formatDuration(duration) {
    // Split the duration into hours, minutes, and seconds
    const [hours, minutes, seconds] = duration.split(":").map(Number);

    // Build the formatted string
    let formattedDuration = "";
    if (hours > 0) {
      formattedDuration += `${hours} hr${hours > 1 ? "s" : ""} `;
    }
    if (minutes > 0) {
      formattedDuration += `${minutes} min${minutes > 1 ? "s" : ""}`;
    }

    return formattedDuration.trim();
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8">
        <div className="p-4 bg-coolgray">
          <div className="px-6 border-r border-r-borderGray">
            <Typography variant="h4">{course?.title}</Typography>

            <p className="text-text-extraGray mt-2">{course?.description}</p>

            <p className="mt-4 text-lightWhite">
              Created By:-{" "}
              {`${course?.createdBy?.firstName} ${course?.createdBy?.lastName}`}
            </p>

            <div className="mt-4 flex items-center justify-start gap-4">
              <div className="flex items-center gap-2">
                <IoInformationCircleOutline size={25} />
                <p>Created At {moment(course?.createdAt).format("MM/YYYY")}</p>
              </div>
              <div className="flex items-center gap-2">
                <TfiWorld size={20} />
                <p>English</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 mt-6">
          <div className="py-4 border  border-borderGray">
            <Container maxWidth="lg">
              <p className="text-3xl">What you will learn</p>
              {course?.requirements?.map((benefit, i) => {
                return (
                  <ul key={i} className="mt-2">
                    <li className="text-text-thinGray text-sm">{benefit}</li>
                  </ul>
                );
              })}
            </Container>
          </div>
        </div>

        <div className="mt-6 p-6">
          <p className="text-3xl">Course content</p>

          <div className="text-text-thinGray flex items-center gap-2 mt-1">
            <p>{sectionsLength || 0} Sections</p>
            <ul className="flex items-center gap-8 list-disc pl-8">
              <li>{subSectionsLength || 0} Subsections</li>
              <li>{course?.totalDuration && formatDuration(course?.totalDuration) || "00:00:00"} Total Length</li>
            </ul>
          </div>
        </div>

        <div className="mt-2 px-6">
          {course?.courseContent?.topics?.map((topic) => (
            <Accordion key={topic._id}>
              <AccordionSummary
                expandIcon={<MdExpandMore />}
                aria-controls={`${topic._id}-content`}
                id={`${topic._id}-header`}
                sx={{
                  flexDirection: "row-reverse",
                  gap: "10px",

                  "& .MuiAccordionSummary-expandIconWrapper": {
                    color: "white",
                    fontSize: "25px",
                  },
                }}
              >
                <Box className="w-full flex items-center justify-between">
                  <Typography variant="h6">{topic?.name}</Typography>
                  <Box className="flex items-center gap-4">
                    <Typography variant="body2" className="text-text-extraGray">
                      {topic?.topicDuration &&
                        formatDuration(topic?.topicDuration)}
                    </Typography>

                    <Typography variant="body2" className="text-yellow">
                      {topic?.subTopics?.length} lecture(s)
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List
                  sx={{
                    "& .MuiListItem-root": {
                      alignItems: "flex-start",
                      gap: "10px",
                    },

                    "& .MuiListItemText-root ": {
                      margin: "0",
                    },
                  }}
                >
                  {topic?.subTopics.map((subtopic) => (
                    <ListItem key={subtopic?._id}>
                      <img src="/images/tv.png" />
                      <ListItemText
                        primary={subtopic?.title}
                        secondary={subtopic?.description}
                      />
                      <p>{subtopic?.videoPlaybackTime}</p>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>

        <div className="mt-2 p-6">
          <p className="text-24">Author</p>
          <div className="mt-2 flex items-center gap-4">
            <img
              src={course?.createdBy?.profileImage}
              className="w-20 h-20 object-contain rounded-full"
            />
            <p>{`${course?.createdBy?.firstName} ${course?.createdBy?.lastName}`}</p>
          </div>
          <p>{course?.createdBy?.about}</p>
        </div>
      </div>

      <div className="col-span-4">
        <div className="p-4 bg-coolgray">
          <div>
            <img src={course?.image} />
          </div>
          <div className="p-2">
            <p className="text-3xl">Rs. {course?.price}</p>
            <div className="mt-4 flex flex-col gap-2">
              <Button
                variant="contained"
                onClick={() => handleAddToCartBtnClick(course?._id)}
              >
                {loading ? "Adding to the cart..." : "Add To Cart"}
              </Button>
              <Button
                variant="contained"
                onClick={() => handleBuyNowBtnClick(course?._id, course?.price)}
                sx={{
                  background: "#47546A",
                  color: "white",

                  "&:hover": {
                    background: "#47546A",
                  },
                }}
              >
                Buy Now
              </Button>
            </div>
            <p className="text-lightWhite text-center text-14 mt-2">
              30-Day Money-Back Guarantee
            </p>
            <div className="mt-2">
              <p className="text-semibold text-16">This course includes:</p>
              <ul className="flex flex-col gap-1 mt-2">
                {courseFeatures?.map((feature) => {
                  return (
                    <li
                      key={feature.id}
                      className="flex items-center gap-2 text-14 text-success"
                    >
                      <img src={feature.image} />
                      {feature.text}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex justify-center mt-2">
              <Button variant="text">Share</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const { addToCart, loading } = useCart();
  const auth = useContext(AuthContext)

  const handleAddToCartBtnClick = (courseId) => {
    
    if(!auth?.userLoggedIn){
        toast.error('Please Login First')
        return
    }

    addToCart(courseId);
  };

  async function getCourseByCourseId() {
    try {
      const res = await axios.get(`${ApiConfig.course}/${courseId}`);
      if (res?.data?.success) {
        setCourse(res?.data?.data);

        setSectionsLength(res?.data?.data?.topics.length);

        const subtopics = res?.data?.data?.topics?.reduce((count, topic) => {
          return count + topic?.subtopics?.length;
        }, 0);

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
            <p>{sectionsLength} Sections</p>
            <ul className="flex items-center gap-8 list-disc pl-8">
              <li>{subSectionsLength} Subsections</li>
              <li>{course?.totalDuration} total length</li>
            </ul>
          </div>
        </div>

        <div className="mt-2 px-6 pb-6">
          {course?.topics?.map((topic) => (
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
                  <Typography variant="body2" className="text-yellow">
                    {topic?.subtopics?.length} lecture(s)
                  </Typography>
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
                  {topic.subtopics.map((subtopic) => (
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
      </div>

      <div className="col-span-4 ">
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
               {loading ? 'Adding to the cart...' : "Add To Cart"} 
              </Button>
              <Button
                variant="contained"
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

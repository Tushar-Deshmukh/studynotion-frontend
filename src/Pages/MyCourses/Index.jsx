import React, { useEffect, useMemo, useState } from "react";
import axios from "../../axios";
import ApiConfig from "../../config/ApiConfig";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { GoPlusCircle } from "react-icons/go";
import Table from "../../components/Table";
import moment from "moment";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoIosTime } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

export default function Index() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getMyCourses() {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.myCourses,
      });

      if (res.status === 200) {
        setLoading(false);
        setCourses(res?.data?.data);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log(error.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    getMyCourses();
  }, []);

  const columns = useMemo(
    () => [
      {
        label: "COURSES",
        accessor: null,
        render: (value, row) => {
          return (
            <div className="flex justify-start gap-4">
              <div className="w-[25%] h-auto">
                <img
                  src="images/course_img.png"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-[75%]">
                <h4 className="font-semibold text-white font-sans text-2xl">
                  {row?.title || ""}
                </h4>
                <p className="font-sans text-text-lightGray mt-4">
                  {row?.description || ""}
                </p>

                <p className="text-white mt-4 font-sans">
                  Created:{" "}
                  {moment(row?.createdAt).format("MMMM DD, YYYY | hh:mm A")}
                </p>

                <div className="mt-4">
                  {row?.coursetype === "Public" ? (
                    <Button
                      variant="contained"
                      sx={{
                        padding: "5px 25px",
                        borderRadius: "20px",
                        background: "#2C333F",
                        color:'#E7C009',
                        "&:hover": {
                          background: "#2C333F",
                        },
                      }}
                      startIcon={<FaCheckCircle />}
                    >
                      Published
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        background: "#2C333F",
                        color: "#F37290",
                        padding: "5px 25px",
                        borderRadius: "20px",
                        "&:hover": {
                          background: "#2C333F",
                        },
                      }}
                      startIcon={<IoIosTime />}
                    >
                      Drafted
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        },
      },

      {
        label: "DURATION",
        accessor: "totalDuration",
      },
      {
        label: "PRICE",
        accessor: "price",
        render: (value, row) => {
          return <p>₹{value}</p>;
        },
      },

      {
        label: "ACTIONS",
        accessor: "_id",
        render: (value, row) => {
          return (
            <div className="flex items-center gap-2">
              <IconButton
                sx={{
                  color: "#AFB2BF",
                }}
              >
                <MdModeEditOutline />
              </IconButton>
              <IconButton
                sx={{
                  color: "#AFB2BF",
                }}
              >
                <RiDeleteBin5Fill />
              </IconButton>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div>
      <Box className="w-full flex justify-between items-center">
        <Typography variant="h4">Courses</Typography>
        <Button
          variant="contained"
          startIcon={<GoPlusCircle />}
          onClick={() => navigate("/create-course")}
        >
          New
        </Button>
      </Box>

      <Box mt={2}>
        <Table data={courses || []} columns={columns || []} loading={loading} />
      </Box>
    </div>
  );
}

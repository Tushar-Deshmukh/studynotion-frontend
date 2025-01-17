import React, { useEffect, useMemo, useState } from "react";
import axios from "../../axios";
import ApiConfig from "../../config/ApiConfig";
import {
  Button,
  ButtonGroup,
  Box,
  LinearProgress,
  IconButton,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "../../components/Table";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrCompliance } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";

const EnrolledCoursesContainer = styled("div")({
  "& .btngroup": {
    background: "#161D29",
    gap: "5px",
    padding: "5px",
    borderRadius: "50px",
    boxShadow: "inset 0px -1px 0px 0px #FFFFFF",

    "& button": {
      borderRadius: "25px",
      height: "36px",
      fontSize: "16px",
    },
  },
});

export default function Index() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  async function getMyEnrolledCourses() {
    try {
      setLoading(true);
      const params = {
        status: selectedStatus,
      };
      const res = await axios.get(ApiConfig.myEnrolledCourses, { params });
      if (res?.data?.success) {
        setLoading(false);
        setEnrolledCourses(res?.data?.data);
      }
    } catch (error) {
      setLoading(false);
      setEnrolledCourses([]);
      if (error) {
        console.error(error?.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    getMyEnrolledCourses();
  }, [selectedStatus]);

  const columns = useMemo(() => [
    {
      label: "Course Name",
      accessor: null,
      render: (value, row) => {
        return (
          <div className="flex justify-start items-center gap-2">
            <div className="w-20 h-20 flex-shrink-0">
              <img
                src={row?.courseId?.image}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div>
              <p className="text-16">{row?.courseId?.title}</p>
              <p className="text-14 text-tableGray mt-2">
                {row?.courseId?.description}
              </p>
            </div>
          </div>
        );
      },
    },

    {
      label: "Durations",
      accessor: null,
      render: (value, row) => <p>{row?.courseId?.totalDuration}</p>,
    },

    {
      label: "Progress",
      accessor: "progressPercentage",
      render: (value) => {
        return (
          <div className="flex items-center justify-start gap-6">
            <div>
              <span>{`Progress ${value}%`}</span>
              <Box
                mt={1}
                sx={{
                  "& .MuiLinearProgress-root": {
                    height: "12px",
                    width: "100%",
                    minWidth: "200px",
                    borderRadius: "20px",
                    backgroundColor: "#2C333F",
                  },
                }}
              >
                <LinearProgress variant="determinate" value={value} />
              </Box>
            </div>

            <div>
              <IconButton
                aria-describedby={id}
                onClick={handleClick}
                sx={{
                  color: "#2C333F",
                }}
              >
                <BsThreeDotsVertical />
              </IconButton>

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <List
                  sx={{
                    "& .MuiListItemIcon-root": {
                      minWidth: "40px",
                    },
                  }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ color: "white" }}>
                        <GrCompliance size={25} />
                      </ListItemIcon>
                      <ListItemText primary="Mark As Completed" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ color: "white" }}>
                        <RiDeleteBin5Line size={25} />
                      </ListItemIcon>
                      <ListItemText primary="Remove" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Popover>
            </div>
          </div>
        );
      },
    },
  ]);

  return (
    <EnrolledCoursesContainer className="p-4">
      <h2 className="text-24 font-semibold">Enrolled Courses</h2>
      <Box>
        <ButtonGroup className="btngroup my-8">
          <Button
            variant="contained"
            onClick={() => setSelectedStatus("All")}
            sx={{
              background: selectedStatus === "All" ? "black" : "transparent",
              color: selectedStatus === "All" ? "#FFF" : "#999DAA",
              "&:hover": {
                backgroundColor:
                  selectedStatus === "All" ? "black" : "transparent",
              },
            }}
          >
            All
          </Button>

          <Button
            variant="contained"
            onClick={() => setSelectedStatus("Pending")}
            sx={{
              background:
                selectedStatus === "Pending" ? "black" : "transparent",
              color: selectedStatus === "Pending" ? "#FFF" : "#999DAA",
              "&:hover": {
                backgroundColor:
                  selectedStatus === "Pending" ? "black" : "transparent",
              },
            }}
          >
            Pending
          </Button>

          <Button
            variant="contained"
            onClick={() => setSelectedStatus("Completed")}
            sx={{
              background:
                selectedStatus === "Completed" ? "black" : "transparent",
              color: selectedStatus === "Completed" ? "#FFF" : "#999DAA",
              "&:hover": {
                backgroundColor:
                  selectedStatus === "Completed" ? "black" : "transparent",
              },
            }}
          >
            Completed
          </Button>
        </ButtonGroup>
      </Box>

      <Box>
        <Table
          data={enrolledCourses || []}
          columns={columns || []}
          loading={loading}
        />
      </Box>
    </EnrolledCoursesContainer>
  );
}

const url = "http://localhost:8080/api";

const ApiConfig = {
  register: `${url}/auth/register`,
  verifyOtp: `${url}/auth/verify-otp`,
  login: `${url}/auth/login`,
  forgotPassword: `${url}/auth/forgot-password`,
  myCourses: `${url}/my-courses`,
  categories: `${url}/categories`,
  uploadImage: `${url}/upload-image`,
  uploadVideo: `${url}/upload-video`,
  createCourse: `${url}/create-course`,
  createCourseTopic: `${url}/create-course-topic`,
  courseTopics: `${url}/course-topics`,
  createCourseSubtopic:`${url}/create-course-subtopic`,
};

export default ApiConfig;

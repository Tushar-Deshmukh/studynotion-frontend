const url = "http://localhost:8080/api";

const ApiConfig = {
  //auth
  register: `${url}/auth/register`,
  verifyOtp: `${url}/auth/verify-otp`,
  login: `${url}/auth/login`,
  forgotPassword: `${url}/auth/forgot-password`,

  //upload
  uploadImage: `${url}/upload-image`,
  uploadVideo: `${url}/upload-video`,

  //course
  createCourse: `${url}/create-course`,
  myCourses: `${url}/my-courses`,
  updateCourse: `${url}/update-course`,
  categories: `${url}/categories`,
  deleteCourse: `${url}/delete-course`,
  getAllCoursesByCategory: `${url}/get-all-courses`,
  course: `${url}/course`,
  myEnrolledCourses: `${url}/my-enrolled-courses`,
  updateCourseProgress: `${url}/update-course-progress`,
  myEnrolledCourse: `${url}/my-enrolled-course`,

  //cart
  addToCart: `${url}/add-to-cart`,
  myCart: `${url}/my-cart`,
  removeFromCart: `${url}/remove-from-cart`,

  //profile
  myProfile: `${url}/auth/my-profile`,
  updateProfile: `${url}/auth/update-profile`,

  //category
  category: `${url}/get-category`,

  //course topic
  createCourseTopic: `${url}/create-course-topic`,
  courseTopics: `${url}/course-topics`,

  //course sub topic
  createCourseSubtopic: `${url}/create-course-subtopic`,

  //checkout
  createCheckoutSession: `${url}/create-checkout-session`,

  //rating
  addRating:`${url}/add-rating`,
  ratings:`${url}/ratings`,

  //contact
  contactUs:`${url}/contact-us`,
};

export default ApiConfig;

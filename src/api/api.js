import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // Change to Render backend URL on deploy
});

export const fetchCourses = () => API.get("/courses/");
export const fetchServices = () => API.get("/services/");
export const fetchGallery = () => API.get("/gallery/");
export const fetchNews = () => API.get("/news/");
export const sendEnquiry = (data) => API.post("/enquiries/", data);
export const fetchEnquiries = () => API.get("/enquiries/");
export const deleteEnquiry = (id) => API.delete(`/enquiries/${id}/`);

import { action, thunk } from "easy-peasy";
import http from "../../utlis/htts";

const BlogsModel = {
  blogs: [],
  addBlog: action((state, payload) => {
    state.blogs.push(payload);
  }),
  getBlocksList: action((state, payload) => {
    state.blogs = payload;
  }),

  // Get all blogs API calling

  getAllBlogs: thunk(async (action, payload) => {
    const response = await http()
      .get("/getAllBlogs")
      .then((res) => {
        const { data } = res;
        action.getBlocksList(data);
        return new Promise((resolve, reject) => resolve(data));
      })
      .catch((err) => {
        return new Promise((resolve, reject) => reject(err));
      });
    return response;
  }),

  // Get all blogs API calling

  getMyBlogs: thunk(async (action, payload) => {
    const response = await http()
      .get("/getMyBlogs")
      .then((res) => {
        const { data } = res;
        action.getBlocksList(data);
        return new Promise((resolve, reject) => resolve(data));
      })
      .catch((err) => {
        return new Promise((resolve, reject) => reject(err));
      });
    return response;
  }),

  // Add new blog API calling

  addNewBlog: thunk(async (action, payload) => {
    const response = await http({
      headers: { "Content-Type": "application/json" },
    })
      .post("/addBlog", payload)
      .then((res) => {
        const { data } = res;
        action.addBlog(data);
        return new Promise((resolve, reject) => resolve(data));
      })
      .catch((err) => {
        return new Promise((resolve, reject) => reject(err));
      });
    return response;
  }),

  // Get Blog Details

  getBlogDetails: thunk(async (action, payload) => {
    const response = await http()
      .put(`/getBlogDetails/${payload.id}`)
      .then((res) => {
        const { data } = res;
        return new Promise((resolve, reject) => resolve(data));
      })
      .catch((err) => {
        return new Promise((resolve, reject) => reject(err));
      });
    return response;
  }),

  // Update Blog Details

  updateBlogDetails: thunk(async (action, payload) => {
    const response = await http()
      .put(`/updateBlog/${payload.id}`, payload.data)
      .then((res) => {
        const { data } = res;
        return new Promise((resolve, reject) => resolve(data));
      })
      .catch((err) => {
        return new Promise((resolve, reject) => reject(err));
      });
    return response;
  }),

  // Delete Blog

  deleteBlog: thunk(async (action, payload) => {
    const response = await http()
      .delete(`/deleteBlog/${payload.id}`)
      .then((res) => {
        const { data } = res;
        return new Promise((resolve, reject) => resolve(data));
      })
      .catch((err) => {
        return new Promise((resolve, reject) => reject(err));
      });
    return response;
  }),
};

export default BlogsModel;

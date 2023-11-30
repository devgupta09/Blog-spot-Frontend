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
    await http()
      .get("/getAllBlogs")
      .then((res) => {
        const { data } = res;
        action.getBlocksList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),

  // Add new blog API calling

  addNewBlog: thunk(async (action, payload) => {
    await http({ headers: { "Content-Type": "application/json" } })
      .post("/addBlog", payload)
      .then((res) => {
        const { data } = res;
        action.addBlog(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),
};

export default BlogsModel;

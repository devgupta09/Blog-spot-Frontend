import { action } from "easy-peasy";

const BlogsModel = {
  isLoading: false,
  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
};

export default BlogsModel;

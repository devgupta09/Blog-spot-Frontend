import { action } from "easy-peasy";

const BlogsModel = {
  isLoading: true,
  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
};

export default BlogsModel;

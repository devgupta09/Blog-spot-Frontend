import React from "react";

const AddBlog = React.lazy(() => import("../components/blog/AddBlog"));
const AllBlogs = React.lazy(() => import("../components/blog/AllBlogs"));
const MyBlogs = React.lazy(() => import("../components/blog/MyBlogs"));
const ErrorPage = React.lazy(() => import("../components/common/Page404"));

const routes = [
  { path: "/addBlog", name: "AddBlog", element: AddBlog },
  { path: "/allBlogs", name: "AllBlogs", element: AllBlogs },
  { path: "/myBlogs", name: "MyBlogs", element: MyBlogs },
  { path: "/errorPage", name: "ErrorPage", element: ErrorPage },
];

export default routes;

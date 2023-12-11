import React from "react";

const UserDeatils = React.lazy(() => import("../components/auth/UserDetails"));
const AddBlog = React.lazy(() => import("../components/blog/AddBlog"));
const AllBlogs = React.lazy(() => import("../components/blog/AllBlogs"));
const MyBlogs = React.lazy(() => import("../components/blog/MyBlogs"));
const ErrorPage = React.lazy(() => import("../components/common/ErrorPage"));

const routes = [
  { path: "/userDetails", name: "UserDeatils", element: UserDeatils },
  { path: "/allBlogs", name: "AllBlogs", element: AllBlogs },
  { path: "/myBlogs", name: "MyBlogs", element: MyBlogs },
  { path: "/addBlog", name: "AddBlog", element: AddBlog },
  { path: "/editBlog/:id", name: "EditBlog", element: AddBlog },
  { path: "/errorPage", name: "ErrorPage", element: ErrorPage },
];

export default routes;

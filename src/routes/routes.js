import React from "react";

const AllBlogs = React.lazy(() => import("../components/blog/AllBlogs"));
const MyBlogs = React.lazy(() => import("../components/blog/MyBlogs"));
const AddBlog = React.lazy(() => import("../components/blog/AddBlog"));
const EditBlog = React.lazy(() => import("../components/blog/EditBlog"));
const UserDeatils = React.lazy(() => import("../components/auth/UserDetails"));
const ErrorPage = React.lazy(() => import("../components/common/ErrorPage"));

const routes = [
  { path: "/allBlogs", name: "AllBlogs", element: AllBlogs },
  { path: "/myBlogs", name: "MyBlogs", element: MyBlogs },
  { path: "/addBlog", name: "AddBlog", element: AddBlog },
  { path: "/editBlog/:id", name: "EditBlog", element: EditBlog },
  { path: "/userDetails", name: "UserDeatils", element: UserDeatils },
  { path: "/errorPage", name: "ErrorPage", element: ErrorPage },
];

export default routes;

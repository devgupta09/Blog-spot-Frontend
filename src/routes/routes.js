import React from "react";

const DefaultPage = React.lazy(() => import("../pages/DefaultPage"));
const MainPage = React.lazy(() => import("../pages/MainPage"));

const routes = [
  { path: "/signIn", name: "SignIn", element: DefaultPage },
  { path: "/signUp", name: "SignUp", element: DefaultPage },
];

export default routes;

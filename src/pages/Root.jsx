import React from "react";
import MainNavigation from "../components/MainNavifation";
import { Outlet, redirect } from "react-router-dom";
const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default RootLayout;

export const loader = () => {
  if (!localStorage.getItem("tk")) {
    return redirect("/auth");
  } else {
    return null;
  }
};

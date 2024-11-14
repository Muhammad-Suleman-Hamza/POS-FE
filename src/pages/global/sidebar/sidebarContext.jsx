import MyProSidebar from "./MyProSidebar";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { ProSidebarProvider } from "react-pro-sidebar";
import React, { useState, createContext, useContext } from "react";

const SidebarContext = createContext({});

export const MyProSidebarProvider = ({ children }) => {
  const [sidebarRTL, setSidebarRTL] = useState(false);
  const [sidebarImage, setSidebarImage] = useState(undefined);
  const [sidebarBackgroundColor, setSidebarBackgroundColor] = useState(undefined);

  const { isLoading } = useSelector((state) => state.common);

  return (
    isLoading ?
      <Loader />
      :
      <ProSidebarProvider>
        <SidebarContext.Provider
          value={{
            sidebarBackgroundColor,
            setSidebarBackgroundColor,

            sidebarImage,
            setSidebarImage,

            sidebarRTL,
            setSidebarRTL,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: sidebarRTL ? "row-reverse" : "row",
            }}
          >
            <MyProSidebar />
            {children}
          </div>
        </SidebarContext.Provider>
      </ProSidebarProvider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);

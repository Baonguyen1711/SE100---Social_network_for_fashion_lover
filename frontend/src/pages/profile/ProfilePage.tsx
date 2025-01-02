import React from "react";
import SideBarLRForm from "../../components/shared/SideBarLR/SideBarLRForm";
import MainProfileForm from "../../components/profile/MainProfileForm"; 
import SideBarHome from "../../components/sideBar/SideBarRight/Home/SideBarHome";
import { SocketProvider } from "../../components/message/SocketContext";
import { SelectedUserProvider } from "../../components/message/SelectedUserContext";
import PublicLayout from "../../Layout";

const ProfilePage = () => {
  return (
    <PublicLayout
      mainContent={<MainProfileForm/>}
      recentChatsContent={<SideBarHome/>}
    />

  );  
};

export default ProfilePage;

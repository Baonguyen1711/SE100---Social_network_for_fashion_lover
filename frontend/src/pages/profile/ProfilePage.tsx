import React from "react";
import SideBarLRForm from "../../components/shared/SideBarLR/SideBarLRForm";
import MainProfileForm from "../../components/profile/MainProfileForm"; 

import { SocketProvider } from "../../components/message/SocketContext";
import { SelectedUserProvider } from "../../components/message/SelectedUserContext";

const ProfilePage = () => {
  return (
    <div>
        <SideBarLRForm>
          <MainProfileForm />
        </SideBarLRForm>
    </div>
  );  
};

export default ProfilePage;

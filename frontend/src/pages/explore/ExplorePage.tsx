import React from "react";
import SideBarLRForm from "../../components/shared/SideBarLR/SideBarLRForm";
import ExploreForm from "../../components/explore/ExploreForm";
import PublicLayout from "../../Layout";
import SideBarHome from "../../components/sideBar/SideBarRight/Home/SideBarHome";

import { SelectedUserProvider } from '../../components/message/SelectedUserContext'
import { SocketProvider } from '../../components/message/SocketContext'
import { BackgroundProvider, useBackground } from '../../components/message/BackgroundContext'

const ExplorePage = () => {
  return (
    <BackgroundProvider>
      <SocketProvider>
        <SelectedUserProvider>
          <PublicLayout
            mainContent={<ExploreForm />}
            recentChatsContent={<SideBarHome />}
          />

        </SelectedUserProvider>
      </SocketProvider>
    </BackgroundProvider>

  );
};

export default ExplorePage;

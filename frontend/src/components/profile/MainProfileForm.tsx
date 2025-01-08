import React, { useEffect, useState } from "react";
import ProfileContainer from "./ProfileContainer";
import clsx from 'clsx'
import style from "./css/MainProfileForm.module.css";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { User } from "../../types";
import { AccessUrlContext, AccessUrlProvider } from "./User/AccessUrlContext";

const MainProfileForm: React.FC = () => {
  const { userId } = useParams();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userData, setUserData] = useState<User>();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const lastPart = pathParts[pathParts.length - 1];
  console.log(userId);
  useEffect(() => {
    const fetchData = async () => {
      debugger;
      const url = `http://localhost:5000/api/v1/user/getbyid?userId=${userId}`;
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Error in getting user");
        }
        const data = await response.json();
        setUserData(data.user);
        setUserEmail(data.user.email);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };

    fetchData(); // Call fetchData inside useEffect
  }, [userId]);
  return (
    <div className={style.coverContainer}>
      <div className={style.bodyContainer}>
        <ProfileContainer userData={userData} />
        <nav className={style.navbar}>
          <a>
            <Link to={`/profile/${userId}/posts`} className={clsx(style.link,{
              [style.active]: lastPart === 'posts',
            })}>
              Posts
            </Link>
          </a>
          
          {userId !== localStorage.getItem("userId") ? (
            <a>
              <Link to={`/message/${userEmail}`} className={clsx(style.link,{
              [style.active]: lastPart === 'pets',
            })}>
                Message
              </Link>
            </a>
          ) : (
            ""
          )}

          <a>
            <Link to={`/profile/${userId}/following`} className={clsx(style.link,{
              [style.active]: lastPart === 'following',
            })}>
              Following
            </Link>
          </a>
          <a>
            <Link to={`/profile/${userId}/follower`} className={clsx(style.link,{
              [style.active]: lastPart === 'follower',
            })}>
              UserFollower
            </Link>
          </a>
        </nav>
        <div className={style.layout}>
        <AccessUrlProvider type="profile" TargetUserId={userId} userId={localStorage.getItem("userId")}>
            <Outlet />
          </AccessUrlProvider>
        </div>
      </div>
    </div>
  );
};

export default MainProfileForm;

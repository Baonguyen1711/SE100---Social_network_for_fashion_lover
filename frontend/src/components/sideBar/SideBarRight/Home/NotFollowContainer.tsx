import clsx from "clsx";
import { useEffect, useState } from "react";

import style from "./cssNotFollowContainer.module.css";
import { User } from "../../../../types";
import CardMightLikeBox from "./CardMightLikeBox";
const NotFollowContainer = () => {
  const [notFollowList, setNotFollowList] = useState<User[]>();
  useEffect(() => {
    const currentUserId = localStorage.getItem("user_id");
    const fetchData = async () => {
      const url = `http://localhost:5000/api/v1/follow/recommentfollow?followerId=${currentUserId}`;

      try {
        const response = await fetch(url, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Error in getting message");
        }
        const data = await response.json();
        if (data.notFollowed.length > 0) {
          setNotFollowList(data.notFollowed);
        }
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };

    fetchData(); // Call fetchData inside useEffect
  }, []);
  return (
    <>
      <div className={clsx(style.line)}></div>
      <div
        className={clsx(style.title)}
        style={{ justifyContent: "space-between", display: "flex" }}
      >
        <h5 >You might like</h5>
      </div>
      {notFollowList?.map((user) => {
        return <CardMightLikeBox notFollowUser={user} />;
      })}
    </>
  );
};

export default NotFollowContainer;

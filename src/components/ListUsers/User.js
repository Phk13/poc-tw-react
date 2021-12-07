import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_HOST } from "../../utils/constants";
import { getProfileApi } from "../../api/profile";
import AvatarNotFound from "../../assets/png/avatar-not-found.png";

export default function User(props) {
  const { user } = props;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getProfileApi(user.id).then((response) => {
      setUserInfo(response);
    });
  }, [user]);

  return (
    <Link as={Link} to={`/${user.id}`} className="list-users__user">
      <Image
        width={64}
        height={64}
        roundedCircle
        className="mr-3"
        src={
          userInfo?.avatar
            ? `${API_HOST}/getAvatar?id=${user.id}`
            : AvatarNotFound
        }
        alt={`${user.firstName} ${user.lastName}}`}
      />
      <div className="flex-grow-1 ms-3">
        <h5>
          {user.firstName} {user.lastName}
        </h5>
        <p>{userInfo?.bio}</p>
      </div>
    </Link>
  );
}

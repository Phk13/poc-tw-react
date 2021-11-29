import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import BannerAvatar from "../../components/Profile/BannerAvatar";
import InfoUser from "../../components/Profile/InfoUser";
import { getProfileApi } from "../../api/profile";

import "./Profile.scss";

export default function Profile(props) {
  const [profile, setProfile] = useState(null);
  let params = useParams();
  const loggedUser = useAuth();

  useEffect(() => {
    getProfileApi(params.id)
      .then((response) => {
        setProfile(response);
        if (!response) toast.error("User profile does not exist.");
      })
      .catch(() => {
        toast.error("User profile does not exist.");
      });
  }, [params.id]);
  return (
    <BasicLayout className="profile">
      <div className="profile__title">
        <h2>{profile ? `${profile.firstName} ${profile.lastName}` : ""}</h2>
      </div>
      <BannerAvatar profile={profile} loggedUser={loggedUser} />
      <InfoUser user={profile} />
      <div className="profile__tweets">Tweets</div>
    </BasicLayout>
  );
}

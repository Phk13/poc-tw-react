import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ConfigModal from "../../Modal/ConfigModal";
import EditUserForm from "../EditUserForm";
import AvatarNotFound from "../../../assets/png/avatar-not-found.png";
import { API_HOST } from "../../../utils/constants";

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { profile, loggedUser } = props;
  const [showModal, setShowModal] = useState(false);
  const bannerUrl = profile?.banner
    ? `${API_HOST}/getBanner?id=${profile.id}`
    : null;
  const avatarUrl = profile?.avatar
    ? `${API_HOST}/getAvatar?id=${profile.id}`
    : AvatarNotFound;
  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      ></div>
      {profile && (
        <div className="options">
          {loggedUser._id === profile.id && (
            <Button onClick={() => setShowModal(true)}>Edit profile</Button>
          )}

          {loggedUser._id !== profile.id && <Button>Follow</Button>}
        </div>
      )}
      <ConfigModal show={showModal} setShow={setShowModal} title="Edit profile">
        <EditUserForm user={profile} setShowModal={setShowModal} />
      </ConfigModal>
    </div>
  );
}

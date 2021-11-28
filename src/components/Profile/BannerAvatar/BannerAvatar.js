import React from "react";
import { API_HOST } from "../../../utils/constants";

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { profile } = props;
  const bannerUrl = profile?.banner
    ? `${API_HOST}/getBanner?id=${profile.id}`
    : null;
  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div className="avatar"></div>
    </div>
  );
}

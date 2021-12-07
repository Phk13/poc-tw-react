import React from "react";
import moment from "moment";
import localization from "moment/locale/en-gb";
import { Location, Link, DateBirth } from "../../../utils/icons";

import "./InfoUser.scss";

export default function InfoUser(props) {
  const { user } = props;
  return (
    <div className="info-user">
      <h2 className="name">
        {user?.firstName} {user?.lastName}
      </h2>
      <p className="email">{user?.email}</p>
      {user?.bio && <div className="description">{user.bio}</div>}

      <div className="more-info">
        {user?.location && (
          <p>
            <Location />
            {user.location}
          </p>
        )}
        {user?.site && (
          <a
            href={user.site}
            alt={user.site}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link /> {user.site}
          </a>
        )}
        {user?.birthDate && (
          <p>
            <DateBirth />
            {moment(user.birthDate)
              .locale("en", localization)
              .format("LL")}{" "}
          </p>
        )}
      </div>
    </div>
  );
}

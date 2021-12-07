import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import BannerAvatar from "../../components/Profile/BannerAvatar";
import InfoUser from "../../components/Profile/InfoUser";
import ListTweets from "../../components/ListTweets";
import { getProfileApi } from "../../api/profile";
import { getUserTweetsApi } from "../../api/tweet";

import "./Profile.scss";

export default function Profile(props) {
  const { setRefreshCheckLogin } = props;
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState(false);
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

  useEffect(() => {
    getUserTweetsApi(params.id, 1)
      .then((response) => {
        setTweets(response);
      })
      .catch(() => {
        setTweets([]);
      });
  }, [params.id]);

  const moreData = () => {
    const pageTemp = page + 1;
    setLoadingTweets(true);
    getUserTweetsApi(params.id, pageTemp).then((response) => {
      if (!response) {
        setLoadingTweets(0);
      } else {
        setTweets([...tweets, ...response]);
        setPage(pageTemp);
        setLoadingTweets(false);
      }
    });
  };

  return (
    <BasicLayout
      className="profile"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <div className="profile__title">
        <h2>{profile ? `${profile.firstName} ${profile.lastName}` : ""}</h2>
      </div>
      <BannerAvatar profile={profile} loggedUser={loggedUser} />
      <InfoUser user={profile} />
      <div className="profile__tweets">
        <h3>Tweets</h3>
        {tweets && <ListTweets tweets={tweets} />}
        <Button onClick={moreData}>
          {!loadingTweets ? (
            loadingTweets !== 0 && "Get more tweets"
          ) : (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              arian-hidden="true"
            />
          )}
        </Button>
      </div>
    </BasicLayout>
  );
}

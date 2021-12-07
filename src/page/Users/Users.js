import React, { useState, useEffect } from "react";
import { Spinner, ButtonGroup, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { isEmpty } from "lodash";
import { useDebouncedCallback } from "use-debounce";
import BasicLayout from "../../layout/BasicLayout";
import ListUsers from "../../components/ListUsers";
import { getFollowsApi } from "../../api/follow";

import "./Users.scss";

export default function Users(props) {
  const { setRefreshCheckLogin } = props;
  const [users, setUsers] = useState(null);
  const location = useLocation();
  const params = useUsersQuery(location);
  const [typeUser, setTypeUser] = useState(params.type || "follow");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const onSearch = useDebouncedCallback((value) => {
    setUsers(null);
    navigate({
      search: queryString.stringify({ ...params, search: value, page: 1 }),
    });
  }, 200);

  useEffect(() => {
    getFollowsApi(queryString.stringify(params))
      .then((response) => {
        // eslint-disable-next-line eqeqeq
        if (params.page == 1) {
          if (isEmpty(response)) {
            setUsers([]);
          } else {
            setUsers(response);
          }
        } else {
          if (!response) {
            setBtnLoading(0);
          } else {
            setUsers([...users, ...response]);
            setBtnLoading(0);
          }
        }
      })
      .catch(() => {
        setUsers([]);
      });
  }, [location]);

  const onChangeType = (type) => {
    setUsers(null);
    if (type === "new") {
      setTypeUser("new");
    } else {
      setTypeUser("follow");
    }
    navigate({
      search: queryString.stringify({ type: type, page: 1, search: "" }),
    });
  };

  const moreData = () => {
    setBtnLoading(true);
    const newPage = parseInt(params.page) + 1;
    navigate({
      search: queryString.stringify({ ...params, page: newPage }),
    });
  };

  return (
    <BasicLayout
      className="users"
      title="Users"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <div className="users__title">
        <h2>Users</h2>
        <input
          type="text"
          placeholder="Search an user..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <ButtonGroup className="users__options">
        <Button
          className={typeUser === "follow" && "active"}
          onClick={() => onChangeType("follow")}
        >
          Following
        </Button>
        <Button
          className={typeUser === "new" && "active"}
          onClick={() => onChangeType("new")}
        >
          New
        </Button>
      </ButtonGroup>
      {!users ? (
        <div className="users__loading">
          <Spinner animation="border" variant="info" />
          Loading users
        </div>
      ) : (
        <>
          <ListUsers users={users} />
          <Button onClick={moreData} className="load-more">
            {!btnLoading ? (
              btnLoading !== 0 && "Load more users"
            ) : (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="stauts"
                aria-hidden="true"
              />
            )}
          </Button>
        </>
      )}
    </BasicLayout>
  );
}

function useUsersQuery(location) {
  const {
    page = 1,
    type = "follow",
    search,
  } = queryString.parse(location.search);
  return { page, type, search };
}

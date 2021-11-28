import React from "react";
import BasicModal from "../../components/Modal/BasicModal";
import BasicLayout from "../../layout/BasicLayout";

import "./Home.scss";

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <h2>Home</h2>
    </BasicLayout>
  );
}

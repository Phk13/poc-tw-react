import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { map } from "lodash";
import configRouting from "./configRouting";

export default function Routing(props) {
  const { setRefreshCheckLogin } = props;
  return (
    <Router>
      <Routes>
        {map(configRouting, (route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <route.page setRefreshCheckLogin={setRefreshCheckLogin} />
              }
            />
          );
        })}
        ;
      </Routes>
    </Router>
  );
}

import React from "react";
import LineChart from "../LineChart/LineChart";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { setCurrentlySelectedResource } from "../../redux/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { Selector } from "./../Selectors/Selectors";
import { Card } from "antd";
​
function LineChartCard({ dataFetching, currentlyShowing }) {
  const { resources } = useSelector((state) => state.dashboard.selects);
​
  const dispatch = useDispatch();
​
  const resourceSelected = (rs) => {
    dispatch(setCurrentlySelectedResource(rs));
  };
​
  const labelStyle = {
    marginBottom: ".5rem",
    display: "block",
    color: "#666666",
  };
​
  return (
    <Card
      style={{ gridArea: "lc" }}
      title={
        <Selector
          title={false}
          data={resources.data}
          name="Resource"
          defaultVal={resources.currentlySelected}
          labelStyle={labelStyle}
          style={{ display: "block" }}
          onChange={resourceSelected}
        />
      }
    >
      {!dataFetching.isFetching && dataFetching.isSuccess ? (
        <LineChart data={dataFetching.data.historicalData} />
      ) : (
        <div
          style={{
            height: 500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingSpinner />
        </div>
      )}
    </Card>
  );
}
​
export default LineChartCard;
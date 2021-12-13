import { Card } from "antd";
import React from "react";
import LineChart from "../LineChart/LineChart";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function LineChartCard({ dataFetching, currentlyShowing }) {
  return (
    <Card style={{ gridArea: "lc" }} title={currentlyShowing}>
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

export default LineChartCard;

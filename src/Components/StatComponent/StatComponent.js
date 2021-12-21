import React from "react";
import { Card } from "antd";

function StatComponent({
  gridArea,
  title,
  loaded1,
  loaded2,
  stat1,
  stat2,
  unit,
}) {
  const statContainerStyle = {
    flex: "1",
    textAlign: "center",
    fontWeight: "bold",
  };

  return (
    <>
      <Card style={{ ...statContainerStyle, gridArea: gridArea }} title={title}>
        {loaded2
          ? loaded1 && loaded2
            ? `${stat1.toFixed(2)} ${unit} / ${stat2.toFixed(2)} ${unit}`
            : "Loading..."
          : loaded1
          ? `${stat1.toFixed(2)} ${unit ? unit : ""}`
          : "Loading..."}
      </Card>
    </>
  );
}

export default StatComponent;

import React from "react";
import { Card } from "antd";

function StatComponent({
  gridArea,
  title,
  isError,
  success1,
  success2,
  stat1,
  stat2,
  unit,
  integer = false,
}) {
  const statContainerStyle = {
    flex: "1",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "17px",
  };
  
 const decimals = integer? 0 : 2;

  return (
    <>
      <Card style={{ ...statContainerStyle, gridArea: gridArea }} title={title}>
        {success2
          ? success1 && success2
            ? (stat1 && stat2) ? `${stat1.toFixed(decimals)} ${unit} / ${stat2.toFixed(decimals)} ${unit}` : "No data"
            : "Loading..."
          : success1
          ? stat1 ? `${stat1.toFixed(decimals)} ${unit ? unit : ""}` : "No data"
          : "Loading..."}
      </Card>
    </>
  );
}

export default StatComponent;

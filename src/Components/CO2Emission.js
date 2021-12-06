import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import LineChart from "./Line/LineChart";
import React from 'react';
import { useGetCO2EmissionQuery } from "../redux/apiSlice";
import { convertDate } from "../Utilities/utilityFunctions";



function Co2Emission() {
  const {
    data: usage,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetCO2EmissionQuery({namespace:"production",interval:"5d",step:"1h"});

  


  return !isFetching && isSuccess ?
    <LineChart data={usage} />
    : <div style={{ height: 500, display: 'flex', justifyContent:'center',alignItems:'center'}}>
      <LoadingSpinner />
    </div>;

}

export default Co2Emission;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { convertDate } from "../Utilities/utilityFunctions";

//Converts the historical data to a format that the linechart can use
const convertHistoricalData = (data, xAxisName) => {
  const res = [];

  for (const d of data) {
    const o = {};
    o["Date"] = convertDate(d[0] * 1000);
    o[xAxisName] = parseFloat(d[1]);

    res.push(o);
  }
  return res;
};

function convertData(resData, xAxisName) {
  return {
    currentValue: parseFloat(
      resData[0].values[resData[0].values.length - 1][1]
    ),
    historicalData: convertHistoricalData(resData[0].values, xAxisName),
  };
}


//Add namespace to query parameters if it is present, otherwise don't
function createQueryparams(ns,sd,ed) {
  return ns ? 
    `?namespace=${ns}&start=${sd}&end=${ed}`:
    `?start=${sd}&end=${ed}`
}


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    getCO2Emission: builder.query({
      query: ({namespace, startDate, endDate}) => `/co2_emission_with_kube_green${createQueryparams(namespace,startDate,endDate)}`,
      transformResponse: resData => {
        return {historicalData:convertHistoricalData(resData[0].values,"Grams of CO2")}
      }
    }),
    getPods: builder.query({
      query: ({namespace, startDate, endDate}) => `/all_active_pods${createQueryparams(namespace,startDate,endDate)}`,
      transformResponse : resData => convertData(resData, "Number of pods")
    }),
    getCpuUsage: builder.query({
      query: ({namespace, startDate, endDate}) => `/cpu_usage${createQueryparams(namespace,startDate,endDate)}`,
      transformResponse : resData => convertData(resData, "CPU Usage")
    }),
    getCpuAllocation: builder.query({
      query: ({namespace, startDate, endDate}) => `cpu_allocation${createQueryparams(namespace,startDate,endDate)}`,
      transformResponse : resData => convertData(resData, "CPU Allocation")
    }),
    getMemoryUsage: builder.query({
      query: ({namespace, startDate, endDate}) => `/memory_usage${createQueryparams(namespace,startDate,endDate)}`,
      transformResponse : resData => convertData(resData, "Memory Usage")
    }),
    getMemoryAllocation: builder.query({
      query: ({namespace, startDate, endDate}) => `/memory_allocation${createQueryparams(namespace,startDate,endDate)}`,
      transformResponse : resData => convertData(resData, "Memory Allocation")
    }),
    getSavedEmission: builder.query({
      query: ({startDate, endDate,namespace}) => `saved_co2_emission${createQueryparams(namespace,startDate,endDate)}`,
      transformResponse: resData => {
        return parseFloat(resData[0].values.pop().pop())
      }
    }),
  }),
});

export const {
  useGetCO2EmissionQuery,
  useGetPodsQuery,
  useGetCpuUsageQuery,
  useGetCpuAllocationQuery,
  useGetMemoryUsageQuery,
  useGetMemoryAllocationQuery,
  useGetSavedEmissionQuery,
} = apiSlice;

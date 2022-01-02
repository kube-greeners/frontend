export const convertDate = (timeStamp) =>
  `${new Date(timeStamp).toLocaleDateString().replace(/\./g, "/")} ${new Date(
    timeStamp
  )
    .toLocaleTimeString()
    .replace(/\./g, ":")}`;

export function convertDateWithOutTimestamp(unixTimestamp) {
  const d = new Date(unixTimestamp);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

//Converts the historical data to a format that the linechart can use
export const convertHistoricalData = (data, xAxisName) => {
  const res = [];

  for (const d of data) {
    const o = {};
    o["Date"] = convertDate(d[0] * 1000);
    o[xAxisName] = parseFloat(d[1]);

    res.push(o);
  }
  return res;
};

export function convertData(resData, xAxisName) {
  return {
    currentValue: parseFloat(
      resData[0].values[resData[0].values.length - 1][1]
    ),
    historicalData: convertHistoricalData(resData[0].values, xAxisName),
  };
}

export function extractNamespaceName(resData) {
  const namespaces = resData.map((d) => d.metric.namespace);
  namespaces.unshift("All namespaces");
  return namespaces;
}

//Add namespace to query parameters if it is present, otherwise don't
export function createQueryparams(ns, sd, ed) {
  return ns
    ? `?namespace=${ns}&start=${sd}&end=${ed}`
    : `?start=${sd}&end=${ed}`;
}

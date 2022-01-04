import { testResData, convertedData, extractedNamespaces } from "./testResData";

const {
  convertDate,
  convertDateWithoutTimestamp,
  convertData,
  extractNamespaceName,
  createQueryparams,
} = require("./utilityFunctions");

const data = testResData;

for (const d of convertedData.historicalData) {
  d["Date"] = convertDate(d["Date"]);
}

test("Properly converts date without timestamp", () => {
  expect(convertDateWithoutTimestamp(1639937257705)).toEqual("19/12/2021");
});

test("Properly converts data", () => {
  expect(convertData(data, "Memory Usage")).toEqual(convertedData);
});

test("Properly extractes the namespace names", () => {
  expect(extractNamespaceName(data)).toStrictEqual(extractedNamespaces);
});

test("Properly creates query params", () => {
  expect(
    createQueryparams("frontend", 1639916278206, 1641125802316)
  ).toStrictEqual(`?namespace=frontend&start=1639916278206&end=1641125802316`);
  expect(createQueryparams(null, 1639916278206, 1641125802316)).toStrictEqual(
    `?start=1639916278206&end=1641125802316`
  );
});

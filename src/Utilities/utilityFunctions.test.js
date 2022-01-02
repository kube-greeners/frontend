import { cleanup } from "@testing-library/react";
import { mockedResData, convertedData, extractedNamespaces } from "./MockedResData";

afterEach(cleanup);

const {
  convertData,
  extractNamespaceName,
  createQueryparams,
} = require("./utilityFunctions");

const data = mockedResData;

test("Properly converts data", () => {
  expect(convertData(data, "Number of pods")).toStrictEqual(convertedData);
});

test("Properly extractes the namespace names", () => {
  expect(extractNamespaceName(data)).toStrictEqual(extractedNamespaces);
});

test("Properly creates query params", () => {
  expect(createQueryparams("frontend", 1639916278206, 1641125802316)).toBe(`?namespace=frontend&start=1639916278206&end=1641125802316`);
  expect(createQueryparams(null, 1639916278206, 1641125802316)).toBe(`?start=1639916278206&end=1641125802316`);

})

// todo flytte all namespaces til toppen
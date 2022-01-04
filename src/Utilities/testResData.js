export const testResData = [
  {
    metric: {
      namespace: "backend",
    },
    values: [
      [1640276213, "1"],
      [1640336693, "1"],
      [1640397173, "1"],
    ],
  },
  {
    metric: {
      namespace: "frontend",
    },
    values: [
      [1640276213, "1"],
      [1640336693, "1"],
      [1640397173, "1"],
    ],
  },
  {
    metric: {
      namespace: "kube-green",
    },
    values: [
      [1640276213, "1"],
      [1640336693, "1"],
      [1640397173, "1"],
    ],
  },
];


export const convertedData = {
  currentValue: 1,
  historicalData: [
    {
      Date: 1640276213000,
      "Memory Usage": 1,
    },
    {
      Date: 1640336693000,
      "Memory Usage": 1,
    },
    {
      Date: 1640397173000,
      "Memory Usage": 1,
    },
  ],
};

export const extractedNamespaces = [
  "All namespaces",
  "backend",
  "frontend",
  "kube-green",
];

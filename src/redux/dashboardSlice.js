import { createSlice } from "@reduxjs/toolkit";

const todaysDate = Number(new Date());
const twoWeeksAgo = Number(new Date()) - 12096e5;

const initialState = {
  selects: {
    namespaces: {
      currentlySelected: "production",
      data: [
        "production",
        "namespace1",
        "namespace2",
        "namespace3",
        "namespace4",
      ],
    },
    resources: {
      currentlySelected: "Estimated CO2 emission",
      data: [
        "CPU allocation",
        "CPU usage",
        "Memory usage",
        "Memory allocation",
        "Active pods",
        "Estimated CO2 emission",
      ],
    },
  },
  interval: {
    startDateUnix: twoWeeksAgo,
    endDateUnix: todaysDate,
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setCurrentlySelectedNamespace: (state, action) => {
      state.selects.namespaces.currentlySelected = action.payload;
    },
    setCurrentlySelectedResource: (state, action) => {
      state.selects.resources.currentlySelected = action.payload;
    },
    setCurrentInterval: (state, action) => {
      state.interval.startDate = Number(new Date(action.payload[0]));
      state.interval.endDate = Number(new Date(action.payload[1]));
    },
  },
});

export const {
  setCurrentlySelectedNamespace,
  setCurrentlySelectedResource,
  setCurrentInterval,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

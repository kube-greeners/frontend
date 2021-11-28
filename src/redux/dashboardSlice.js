import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCO2EmissionData,
  fetchActivePods,
  fetchCPU,
  fetchMemory,
} from "../Utilities/dataFetching";

const initialState = {
  co2: {
    status: "idle",
    data: [],
  },
  cpu: {
    status: "idle",
    allocated: [],
    usage: [],
    currentAllocated: 0,
    currentUsage: 0,
  },
  memory: {
    status: "idle",
    data: [],
    allocated: [],
    usage: [],
    currentAllocated: 0,
    currentUsage: 0,
  },
  pods: {
    status: "idle",
    data: [],
    currentValue: 0,
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //Co2Emission
      .addCase(fetchCO2EmissionData.pending, (state, action) => {
        state.co2.status = "loading";
      })
      .addCase(fetchCO2EmissionData.fulfilled, (state, action) => {
        state.co2.status = "succeeded";
        //We are just using the CPU data from first pod in the array. When when KG-121 it should just be state.Co2DiagramData = action.payload.values
        state.co2.data = action.payload[0].values;
      })
      .addCase(fetchCO2EmissionData.rejected, (state, action) => {
        state.co2.status = "failed";
      })
      //Active pods
      .addCase(fetchActivePods.pending, (state, action) => {
        state.pods.status = "loading";
      })
      .addCase(fetchActivePods.fulfilled, (state, action) => {
        state.pods.status = "succeeded";
        state.pods.currentValue = action.payload[0].values.pop().pop();
        state.pods.data = action.payload[0].values;
      })
      .addCase(fetchActivePods.rejected, (state, action) => {
        state.pods.status = "failed";
      })
      //Memory
      .addCase(fetchMemory.pending, (state, action) => {
        state.memory.status = "loading";
        state.memory.currentUsage = action.payload[0].values.pop().pop();
        state.memory.usage = action.payload[0].values;
      })
      .addCase(fetchMemory.fulfilled, (state, action) => {
        state.memory.status = "succeeded";
      })
      .addCase(fetchMemory.rejected, (state, action) => {
        state.memory.status = "failed";
      })
      //CPU
      .addCase(fetchCPU.pending, (state, action) => {
        state.cpu.status = "loading";
      })
      .addCase(fetchCPU.fulfilled, (state, action) => {
        state.cpu.status = "succeeded";
        state.cpu.currentUsage = action.payload[0].values.pop().pop();
        state.cpu.usage = action.payload[0].values;
      })
      .addCase(fetchCPU.rejected, (state, action) => {
        state.cpu.status = "failed";
      });
  },
});

export default dashboardSlice.reducer;

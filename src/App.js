import StatComponent from "./Components/StatComponent/StatComponent";

import NavBar from "./Components/NavBar/NavBar";
import { Divider, Modal } from "antd";
import LineChartCard from "./Components/LineChartCard/LineChartCard";
import { useSelector } from "react-redux";
import "./App.css";
import {
  useGetCO2EmissionQuery,
  useGetPodsQuery,
  useGetCpuUsageQuery,
  useGetCpuAllocationQuery,
  useGetMemoryUsageQuery,
  useGetMemoryAllocationQuery,
  useGetSavedEmissionQuery,
} from "./redux/apiSlice";
import Selectors from "./Components/Selectors/Selectors";
import { useRef } from "react";

function App() {
  const { resources,namespaces } = useSelector((state) => state.dashboard.selects);
  const { startDateUnix, endDateUnix } = useSelector(
    (state) => state.dashboard.interval
  );


  const queryParams = {
    namespace: namespaces.currentlySelected === 'All namespaces' ? null : namespaces.currentlySelected, 
    startDate: startDateUnix, 
    endDate: endDateUnix
  }


  const podFetch = useGetPodsQuery(queryParams);
  const cpuUsageFetch = useGetCpuUsageQuery(queryParams);
  const cpuAllocationFetch = useGetCpuAllocationQuery(queryParams);
  const memoryUsageFetch = useGetMemoryUsageQuery(queryParams);
  const memoryAllocationFetch = useGetMemoryAllocationQuery(queryParams);
  const co2EmissionQuery = useGetCO2EmissionQuery(queryParams);
  const savedEmissionFetch = useGetSavedEmissionQuery(queryParams);

  const modalIsOpen = useRef(false);

  const fetchingMap = {
    "Active pods": podFetch,
    "CPU allocation": cpuAllocationFetch,
    "CPU usage": cpuUsageFetch,
    "Memory usage": memoryUsageFetch,
    "Memory allocation": memoryAllocationFetch,
    "Estimated CO2 emission": co2EmissionQuery,
    "Saved Emission": savedEmissionFetch,
  };

  const allFetchesDone = Object.values(fetchingMap).every((f) => !f.isFetching);
  if (allFetchesDone) {
    const errors = Object.values(fetchingMap).filter((f) => f.isError);
    if (errors.length > 0 && !modalIsOpen.current) {
      modalIsOpen.current = true;
      Modal.error({
        title: "Error fetching",
        content: (
          <>
            <p>Something went wrong, please try again later</p>
          </>
        ),
        onOk: () => (modalIsOpen.current = false),
      });
    }
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <Selectors />
        <Divider />
        <div className="layout-grid">
          <LineChartCard
            currentlyShowing={resources.currentlySelected}
            dataFetching={fetchingMap[resources.currentlySelected]}
          />
          <StatComponent
            gridArea="b1"
            title="Saved Emission"
            success1={savedEmissionFetch.isSuccess}
            stat1={savedEmissionFetch.data} unit={'grams'}
          />
          <StatComponent
            gridArea="b2"
            title="CPU Usage and Allocation"
            success1={cpuAllocationFetch.isSuccess}
            success2={cpuUsageFetch.isSuccess}
            stat1={cpuAllocationFetch.data?.currentValue}
            stat2={cpuUsageFetch.data?.currentValue}
            unit={"core"}
          />
          <StatComponent
            gridArea="b3"
            title="Memory Usage  and Allocation"
            success1={memoryAllocationFetch.isSuccess}
            success2={memoryUsageFetch.isSuccess} stat1={memoryAllocationFetch.data?.currentValue}
            stat2={memoryUsageFetch.data?.currentValue} unit={'GB'}
          />
          <StatComponent
            gridArea="b4"
            title="N Active Pod"
            success1={podFetch.isSuccess}
            stat1={podFetch.data?.currentValue}
          />
        </div>
      </div>
    </>
  );
}

export default App;

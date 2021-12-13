import StatComponent from './Components/StatComponent/StatComponent';

import NavBar from './Components/NavBar/NavBar';
import { Divider,Modal } from 'antd'
import LineChartCard from './Components/LineChartCard/LineChartCard';
import { useSelector } from 'react-redux';
import './App.css';
import {
  useGetPodsQuery,
  useGetCpuUsageQuery,
  useGetCpuAllocationQuery,
  useGetMemoryUsageQuery,
  useGetMemoryAllocationQuery,
  useGetSavedEmissionQuery,
  useGetCO2EmissionQuery
} from './redux/apiSlice';
import Selectors from './Components/Selectors';
import { useRef } from 'react';


const queryParams = {namespace:"production",interval:"5d",step:"1h"}

function App() {

  const {resources} = useSelector(state => state.dashboard.selects);

  const podFetch = useGetPodsQuery(queryParams);
  const cpuUsageFetch = useGetCpuUsageQuery(queryParams);
  const cpuAllocationFetch = useGetCpuAllocationQuery(queryParams);
  const memoryUsageFetch = useGetMemoryUsageQuery(queryParams);
  const memoryAllocationFetch = useGetMemoryAllocationQuery(queryParams);
  const co2EmissionQuery = useGetCO2EmissionQuery(queryParams);
  const savedEmissionFetch = useGetSavedEmissionQuery({interval:queryParams.interval,step:queryParams.step});

  const modalIsOpen = useRef(false)

  const fetchingMap = {
    'Active pods': podFetch,
    'CPU allocation':cpuAllocationFetch,
    'CPU usage':cpuUsageFetch,
    'Memory usage':memoryUsageFetch,
    'Memory allocation':memoryAllocationFetch,
    'Estimated CO2 emission':co2EmissionQuery,
    'Saved Emission':savedEmissionFetch
  }

  
  const allFetchesDone = Object.values(fetchingMap).every(f => !f.isFetching)
  if(allFetchesDone) {
    const errors = Object.values(fetchingMap)
      .filter(f => f.isError)
    if(errors.length > 0 && !modalIsOpen.current) {
      modalIsOpen.current = true
      Modal.error({
        title:"Error fetching",
        content: (
          <>
            <p>Something went wrong, please try again later</p>
          </>
        ),
        onOk: () => modalIsOpen.current = false
      })
    }
  }
  
  return (
    <>
      <NavBar />
      <div className="container">
      <Selectors/>
      <Divider/>
        <div className="layout-grid">
        <LineChartCard currentlyShowing={resources.currentlySelected} dataFetching={fetchingMap[resources.currentlySelected]}/>
          <StatComponent
            gridArea="b1"
            title="Saved Emission"
            loaded1={savedEmissionFetch.isSuccess}
            stat1={savedEmissionFetch.data} unit={'grams'}
          />
          <StatComponent
            gridArea="b2"
            title="CPU Usage and Allocation"
            loaded1={cpuAllocationFetch.isSuccess}
            loaded2={cpuUsageFetch.isSuccess}
            stat1={cpuAllocationFetch.data?.currentValue}
            stat2={cpuUsageFetch.data?.currentValue} unit={'core'}
          />
          <StatComponent
            gridArea="b3"
            title="Memory Usage  and Allocation"
            loaded1={memoryAllocationFetch.isSuccess}
            loaded2={memoryUsageFetch.isSuccess} stat1={memoryAllocationFetch.data?.currentValue}
            stat2={memoryUsageFetch.data?.currentValue} unit={'GB'}
          />
          <StatComponent
            gridArea="b4"
            title="N Active Pod"
            loaded1={podFetch.isSuccess}
            stat1={podFetch.data?.currentValue}
          />
        </div>
      </div>
    </>
  );
}

export default App;

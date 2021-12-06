import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react';
import { Card } from 'antd'
import Co2Emission from './Components/CO2Emission'
import './App.css';
import { fetchActivePods, fetchCpuUsage, fetchCpuAllocation, fetchMemoryUsage, fetchMemoryAllocation, fetchSavedEmission } from './Utilities/dataFetching';
import NavBar from './Components/NavBar/NavBar';


function App() {

  const statusCpuUsage = useSelector(state => state.dashboard.cpu.statusUsage);
  const statusCpuAllocation = useSelector(state => state.dashboard.cpu.statusAllocation);
  const statusMemoryUsage = useSelector(state => state.dashboard.memory.statusUsage);
  const statusMemoryAllocation = useSelector(state => state.dashboard.memory.statusAllocation);
  const statusPods = useSelector(state => state.dashboard.pods.status);
  const statusSavedEmission = useSelector(state => state.dashboard.emission.status);

  const fetchingCpuUsageRef = useRef(false)
  const fetchingCpuAllocationRef = useRef(false)
  const fetchingMemoryUsageRef = useRef(false)
  const fetchingMemoryAllocationRef = useRef(false)
  const fetchingPods = useRef(false)
  const fetchingSavedEmission = useRef(false)

  const active_pods = useSelector(state => state.dashboard.pods.currentValue);
  const cpu_usage = useSelector(state => state.dashboard.cpu.currentUsage);
  const cpu_allocation = useSelector(state => state.dashboard.cpu.currentAllocated);
  const memory_usage = useSelector(state => state.dashboard.memory.currentUsage);
  const memory_allocation = useSelector(state => state.dashboard.memory.currentAllocated);
  const savedEmission = useSelector(state => state.dashboard.emission.data);



  const dispatch = useDispatch();

  const statContainerStyle = {
    flex: '1', 
    textAlign: 'center',
    fontWeight: 'bold'
  }

  useEffect(() => {
    const namespace = "production"
    const interval = "10d"
    const step = "1h"

    //Make sure we only fetch the data once. 
    //TODO: check edge cases for failed when we have the correct endpoint
    if (statusCpuUsage === 'idle' && !fetchingCpuUsageRef.current) {
      dispatch(fetchCpuUsage({ namespace, interval, step }))
      fetchingCpuUsageRef.current = true;
    }
    if (statusCpuAllocation === 'idle' && !fetchingCpuAllocationRef.current) {
      dispatch(fetchCpuAllocation({ namespace, interval, step }))
      fetchingCpuAllocationRef.current = true;
    }
    if (statusPods === 'idle' && !fetchingPods.current) {
      dispatch(fetchActivePods({ namespace, interval, step }))
      fetchingPods.current = true;
    }
    if (statusMemoryUsage === 'idle' && !fetchingMemoryUsageRef.current) {
      dispatch(fetchMemoryUsage({ namespace, interval, step }))
      fetchingMemoryUsageRef.current = true;
    }
    if (statusMemoryAllocation === 'idle' && !fetchingMemoryAllocationRef.current) {
      dispatch(fetchMemoryAllocation({ namespace, interval, step }))
      fetchingMemoryAllocationRef.current = true;
    }
    if (statusSavedEmission === 'idle' && !fetchingSavedEmission.current) {
      dispatch(fetchSavedEmission({ interval, step}))
      fetchingSavedEmission.current = true;
    }

  }, [dispatch, statusCpuAllocation, statusCpuUsage, statusPods, statusMemoryUsage, statusMemoryAllocation, statusSavedEmission])

  return (
    <>
    <NavBar/>
    <div className="container">
      <div className="layout-grid">
        <Card style={{ height: '100%', gridArea: 'lc' }} title="Estimated CO2 emission"><Co2Emission /> </Card>
        <Card style={{...statContainerStyle,gridArea:'b1'}} title="Saved Emission">
          {(statusSavedEmission === 'succeeded') ? 
            `${savedEmission.toFixed(2)} unit`  : 
            'Loading...'}
        </Card>
        <Card style={{...statContainerStyle,gridArea:'b2'}} title="CPU Usage and Allocation">
          {(statusCpuUsage === 'succeeded' && statusCpuAllocation === `succeeded`) ?
            `${cpu_usage.toFixed(2)} core / ${cpu_allocation.toFixed(2)} core` :
            `Loading...`}
        </Card>
        <Card style={{...statContainerStyle,gridArea:'b3'}} title="Memory Usage  and Allocation">
          {(statusMemoryAllocation === 'succeeded' && statusMemoryUsage === 'succeeded') ?
            `${memory_usage.toFixed(2)} GB / ${memory_allocation.toFixed(2)} GB` :
            'Loading...'}
        </Card>
        <Card style={{...statContainerStyle,gridArea:'b4'}} title="Active Pods">
          {(statusPods === 'succeeded') ?
            active_pods :
            'Loading...'}
        </Card>
      </div>
    </div>
    </>
  );
}

export default App;

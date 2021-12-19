import React from 'react'
import { Col, Row, Select, DatePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentlySelectedNamespace, setCurrentlySelectedResource, setCurrentInterval } from '../redux/dashboardSlice';
import moment from 'moment';
import { convertDateWithOutTimestamp } from '../Utilities/utilityFunctions';
const { Option } = Select;

export default function Selectors() {

    const {RangePicker} = DatePicker;

    const dateFormat = 'DD/MM/YYYY';

    const {namespaces,resources} = useSelector(state => state.dashboard.selects);
    const {startDateUnix, endDateUnix} = useSelector(state => state.dashboard.interval);
    const startDate = convertDateWithOutTimestamp(startDateUnix)
    const endDate = convertDateWithOutTimestamp(endDateUnix)


    const dispatch = useDispatch();
    
    const nameSpaceSelected = ns => {
        dispatch(setCurrentlySelectedNamespace(ns))
    }

    const resourceSelected = rs => {
        dispatch(setCurrentlySelectedResource(rs))
    }

    const intervalSelected = (date, dateString) => {
        dispatch(setCurrentInterval(dateString))

        
    }
    function disabledDate(current) {
        return current && current > moment().endOf('day');
      }

    const labelStyle = {
        marginBottom:'.5rem',
        display:'block',
        color:'#666666'
    }

    return (
        <>
            <Row gutter={24} style={{ paddingTop: '7rem' }}>
                <Col span={7}>
                    <Selector 
                    data={namespaces.data} 
                    name="Namespace" 
                    defaultVal={namespaces.currentlySelected} 
                    labelStyle={labelStyle}
                    style={{ display: 'block' }} 
                    onChange={nameSpaceSelected} />
                </Col>
                <Col span={7}>
                    <Selector
                        data={resources.data}
                        name="Resource" 
                        defaultVal={resources.currentlySelected} 
                        labelStyle={labelStyle}
                        style={{ display: 'block' }} 
                        onChange={resourceSelected} />
                </Col>
                <Col span={7}>
                    <label style={labelStyle}>Time interval</label>
                    <RangePicker
                        defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
                        format={dateFormat}
                        disabledDate={disabledDate}
                        onChange={intervalSelected}/>    
                </Col>
            </Row>
        </>
    )
}

function Selector({ data, name, defaultVal, labelStyle, ...rest }) {

    return (
        <>
            <label htmlFor={name} style={labelStyle}>{name}</label>
            <Select id={name} defaultValue={defaultVal} {...rest} >
                {data.map(n => <Option key={n} value={n}>{n}</Option>)}
            </Select>
        </>
    )
}

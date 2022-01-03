import React from "react";
import { Col, Row, Select, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentlySelectedNamespace,
  setCurrentInterval,
} from "../../redux/dashboardSlice";
import { useGetNameSpacesQuery } from "../../redux/apiSlice";
import moment from "moment";
import { convertDateWithoutTimestamp } from "../../Utilities/utilityFunctions";
const { Option } = Select;

export default function Selectors() {
  const { RangePicker } = DatePicker;

  const dateFormat = "DD/MM/YYYY";

  const { namespaces } = useSelector((state) => state.dashboard.selects);
  const { startDateUnix, endDateUnix } = useSelector(
    (state) => state.dashboard.interval
  );

  const startDate = convertDateWithoutTimestamp(startDateUnix);
  const endDate = convertDateWithoutTimestamp(endDateUnix);

  const namespaceNamesFetch = useGetNameSpacesQuery({
    startDate: startDateUnix,
    endDate: endDateUnix,
  });

  const dispatch = useDispatch();

  const nameSpaceSelected = (ns) => {
    dispatch(setCurrentlySelectedNamespace(ns));
  };

  const intervalSelected = (date, dateString) => {
    dispatch(setCurrentInterval(dateString));
  };

  function disabledDate(current) {
    return current > moment().endOf("day");
  }

  const labelStyle = {
    marginBottom: ".5rem",
    display: "block",
    color: "#666666",
  };

  return (
    <>
      <Row gutter={24} style={{ paddingTop: "7rem" }}>
        <Col span={7}>
          <Selector
            data={namespaceNamesFetch.data}
            name="Namespace"
            loading={namespaceNamesFetch.isFetching}
            defaultVal={namespaces.currentlySelected}
            labelStyle={labelStyle}
            style={{ display: "block" }}
            onChange={nameSpaceSelected}
          />
        </Col>
        <Col span={7}>
          <label style={labelStyle}>Time interval</label>
          <RangePicker
            defaultValue={[
              moment(startDate, dateFormat),
              moment(endDate, dateFormat),
            ]}
            format={dateFormat}
            disabledDate={disabledDate}
            onChange={intervalSelected}
          />
        </Col>
      </Row>
    </>
  );
}

export function Selector({
  title=true,
  data,
  name,
  defaultVal,
  labelStyle,
  ...rest
}) {
  return (
    <>
      {title && (
        <label htmlFor={name} style={labelStyle}>
          {name}
        </label>
      )}
      <Select id={name} defaultValue={defaultVal} {...rest}>
        {data &&
          data.map((n) => (
            <Option key={n} value={n}>
              {n}
            </Option>
          ))}
      </Select>
    </>
  );
}
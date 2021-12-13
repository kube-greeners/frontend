import LineChartCard from "./LineChartCard";
import renderer from "react-test-renderer";
import store from "../../redux/store";
import { Provider } from "react-redux";

test("matches LineChartCard snapshot", () => {
  const currentlyShowing = "production";
  const dataFetching = {
    status: "pending",
    endpointName: "getCO2Emission",
    requestId: "Rxqq7eCVdUEv-vzxZMo1q",
    originalArgs: {
      namespace: "production",
      interval: "5d",
      step: "1h",
    },
    startedTimeStamp: 1639324236170,
    isUninitialized: false,
    isLoading: true,
    isSuccess: false,
    isError: false,
    isFetching: true,
  };

  const tree = renderer
    .create(
      <Provider store={store}>
        <LineChartCard
          currentlyShowing={currentlyShowing}
          dataFetching={dataFetching}
        />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

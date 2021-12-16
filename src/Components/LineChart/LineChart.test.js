import LineChart from "./LineChart";
import renderer from "react-test-renderer";

test("matches LineChart snapshot", () => {
  const tree = renderer.create(<LineChart />).toJSON();
  expect(tree).toMatchSnapshot();
});

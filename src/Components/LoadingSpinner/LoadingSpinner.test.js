import LoadingSpinner from "./LoadingSpinner";
import renderer from "react-test-renderer";

test("matches LoadingSpinner snapshot", () => {
  const tree = renderer.create(<LoadingSpinner />).toJSON();
  expect(tree).toMatchSnapshot();
});

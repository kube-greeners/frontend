import StatComponent from "./StatComponent";
import renderer from "react-test-renderer";
import store from "../../redux/store";
import { Provider } from "react-redux";

test("matches StatComponent snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <StatComponent />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

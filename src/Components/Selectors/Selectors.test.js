import Selectors from "./Selectors";
import renderer from "react-test-renderer";
import store from "../../redux/store";
import { Provider } from "react-redux";

test("matches Selectors snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Selectors />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

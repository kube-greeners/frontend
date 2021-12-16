import App from "./App";
import renderer from "react-test-renderer";
import store from "./redux/store";
import { Provider } from "react-redux";

test("matches App snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <App />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

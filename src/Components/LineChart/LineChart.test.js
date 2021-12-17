import LineChart from "./LineChart";
import renderer from "react-test-renderer";

test("matches LineChart snapshot", () => {
    const data = [
        {
            valueOne: "test", //X-axis
            valueTwo: 20 //Y-axis
        },
        {
            valueOne: "test2",
            valueTwo: 30
        }
    ]
    const tree = renderer.create(<LineChart data={data}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

/* eslint-disable jest/valid-expect-in-promise,jest/valid-expect */
import {yAxisClipArea} from "../const";

describe("selecting a resource type for the diagram", () => {
    const testResourceType = (name: string) => {
        const resolveScreenshotPaths = (name: string) => {
            const newScreenshotPath = `cypress/screenshots/at2.spec.ts/${name}.png`;
            const oldScreenshotPath = `cypress/screenshots/base/${name}.png`;
            return  {first: newScreenshotPath, second: oldScreenshotPath};
        }

        return it(`should select the resource graph ${name}`, () => {

            // Make sure the graph is updated
            const old_canvas_path = `cypress/screenshots/at2.spec.ts/old.png`;
            const new_canvas_path = `cypress/screenshots/at2.spec.ts/new.png`;
            cy.get("canvas", {timeout: 20000}).screenshot("old", {overwrite: true});
            cy.get(".ant-card-head-title .ant-select-selector").click();
            cy.get(".ant-select-item-option").contains(name).click();
            cy.wait(300);
            cy.get("canvas", {timeout: 20000}).screenshot("new", {overwrite: true});
            cy.task("compareScreenshots", {first: old_canvas_path, second: new_canvas_path}).then(result => {
                expect(result).to.be.greaterThan(0.1);
            });

            // make sure that the new y axis matches the old one
            cy.get("canvas", {timeout: 20000}).screenshot(name, {
                overwrite: true,
                clip: yAxisClipArea,
            });
            cy.task("compareScreenshots", resolveScreenshotPaths(name)).then(result => {
                expect(result).to.be.lessThan(0.1);
            });
        })
    }
    before(() => {
        cy.cacheRequests();
        cy.visit(`dev`);
    });

    ["CPU usage", "Memory usage", "Active pods", "Estimated CO2 emission"].map(testResourceType);
})


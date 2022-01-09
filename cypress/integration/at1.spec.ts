import {yAxisClipArea} from "../const";

describe("Initial dashboard view", () => {
    const resolveScreenshotPaths = (name: string) => {
        const newScreenshotPath = `cypress/screenshots/at1.spec.ts/${name}.png`;
        const oldScreenshotPath = `cypress/screenshots/base/${name}.png`;
        return {first: newScreenshotPath, second: oldScreenshotPath};
    }
    before(() => {
        cy.cacheRequests();
        cy.visit(`dev`);
    });
    describe("contains all of its components", () => {
        describe("Upper part", () => {
            it("should contain the Mia Platform logo", () => {
                const screenshotName = "mia-logo";

                // A logo, otherwise this is snapshot tests
                cy.get("nav").children("div").children("svg").screenshot(screenshotName, {overwrite: true});
                cy.task("compareScreenshots", resolveScreenshotPaths(screenshotName)).then(result => {
                    expect(result).to.be.lessThan(0.05);
                });


            });
            it("should contain two selectors of Namespace and Time Interval", () => {
                cy.get(".ant-col").contains("label", "Namespace");
                cy.get(".ant-col").contains("label", "Time interval");
            });
        });
        describe("Main part", () => {
            it("should contain a dropdown specifying resource type", () => {
                const screenshotName = "co2_y_axis"

                cy.get("canvas", {timeout: 60000}).screenshot(screenshotName, {
                    overwrite: true,
                    clip: yAxisClipArea,
                });

                cy.task("compareScreenshots", resolveScreenshotPaths(screenshotName)).then(result => {
                    expect(result).to.be.lessThan(0.2);
                });

                cy.get(".layout-grid .ant-select-selection-item")
                    .then($el => {

                        expect($el).to.have.attr("title", "Estimated CO2 emission");
                    })
            })
        });
        describe("Right column", () => {
            it("should contain 4 boxes containing data of", () => {

                const cardContents: { title: string, matchText: RegExp }[] = [{
                    title: "Saved Emission",
                    matchText: /[0-9]+.[0-9]+ grams/
                }, {
                    title: "CPU Usage and Allocation",
                    matchText: /[0-9]+.[0-9]+ core \/ [0-9]+.[0-9]+ core/
                }, {
                    title: "Memory Usage and Allocation",
                    matchText: /[0-9]+.[0-9]+ GB \/ [0-9]+.[0-9]+ GB/
                }, {
                    title: "N Active Pod",
                    matchText: /[0-9]+/
                }]
                cardContents.map((content) => {
                    cy.get(".ant-card")
                        .contains(".ant-card-head-title", content.title)
                        .parents(".ant-card")
                        .contains(".ant-card-body", content.matchText, {timeout: 70000});
                });
            })
        })
    })
});

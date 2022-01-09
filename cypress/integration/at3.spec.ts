describe("selecting a namespace", () => {
    beforeEach(() => {
        cy.visit("/dev/");
    });
    const switchNamespace = (name: string) => {
        cy.get(".ant-row .ant-select-selection-item", {timeout: 70000}).click();
        cy.get(".ant-select-item-option", {timeout: 70000}).contains(name).click();
        cy.wait(300);
    }
    describe("empty namespace after All namespaces", function () {
        const runTest = (namespace: string) => {
            it(`should show no data for ${namespace} when there is no data on the graph`, () => {
                switchNamespace(namespace);
                const cardContents: { title: string, matchText: RegExp }[] = [{
                    title: "Saved Emission",
                    matchText: /0.00 grams/
                }, {
                    title: "CPU Usage and Allocation",
                    matchText: /No data/
                }, {
                    title: "Memory Usage and Allocation",
                    matchText: /No data/
                }, {
                    title: "N Active Pod",
                    matchText: /No data/
                }, ]
                cardContents.map((content) => {
                    cy.get(".ant-card")
                        .contains(".ant-card-head-title", content.title)
                        .parents(".ant-card")
                        .contains(".ant-card-body", content.matchText, {timeout: 70000});
                });
                cy.get(".ant-card-body").contains("No data");
            });
        }
        ["default", "frontend"].map(runTest);
    });
    describe("populated namespace after all namespaces", () => {
        const ready = () => {
            cy.get(".ant-card")
                .contains(".ant-card-head-title", "Saved Emission")
                .parents(".ant-card")
                .contains(".ant-card-body",  /[0-9]+.[0-9]+ grams/, {timeout: 70000});
            cy.get("canvas", {timeout: 70000});
        };
        const runTest = (namespace: string) => {
            it(`should display data on ${namespace} different than all namespaces`, () => {
                ready();
                cy.get(".ant-card-body").then($before => {
                    const beforeHtml = $before.html()
                    switchNamespace(namespace);
                    ready();
                    cy.get(".ant-card-body", {timeout: 30000}).then($after => {
                        expect($after.html()).not.to.be.eq(beforeHtml);
                    });

                });
            });
        }
        ["monitoring", "backend"].map(runTest);
    });
});

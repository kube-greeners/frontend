const ready = () => {
    cy.get(".ant-card")
        .contains(".ant-card-head-title", "Saved Emission")
        .parents(".ant-card")
        .contains(".ant-card-body", /[0-9]+.[0-9]+ grams/, {timeout: 70000});
    cy.get("canvas", {timeout: 70000});
};
describe("Time interval selector", () => {
    before(() => {
        cy.cacheRequests();
        cy.visit("/dev/");
    })
    it("should consistently update the saved emissions", () => {
        cy.get("input[placeholder='Start date']").focus().clear().type("06/01/2022").trigger("keypress", {key: 13});
        cy.get("input[placeholder='End date']").focus().clear().type("07/01/2022").trigger("keypress", {key: 13}).blur();
        ready();
        cy.get(".ant-card")
            .contains(".ant-card-head-title", "Saved Emission")
            .parents(".ant-card")
            .children(".ant-card-body").then($element => {
            cy.intercept("GET", Cypress.config("baseUrl") + "/saved_co2_emission?*").as("savedRequest");
            const smallerValue = Number.parseFloat($element.text());
            cy.get("input[placeholder='End date']").focus().clear().type("08/01/2022").trigger("keypress", {key: 13});
            cy.get("input[placeholder='Start date']").focus().clear().type("06/01/2022").trigger("keypress", {key: 13}).blur();

            cy.wait("@savedRequest", {timeout: 60000});
            ready();
            cy.get(".ant-card")
                .contains(".ant-card-head-title", "Saved Emission")
                .parents(".ant-card")
                .children(".ant-card-body").then($element2 => {
                expect(Number.parseFloat($element2.text())).to.be.greaterThan(smallerValue);
            });
        });
    });
    it("should update the graph", () => {
        cy.get("input[placeholder='Start date']").focus().clear().type("06/01/2022").trigger("keydown", {key: 13});
        cy.get("input[placeholder='End date']").focus().clear().type("07/01/2022").trigger("keydown", {key: 13}).blur();
        ready();
        const old_canvas_path = `cypress/screenshots/at4.spec.ts/old.png`;
        const new_canvas_path = `cypress/screenshots/at4.spec.ts/new.png`;
        cy.get("canvas", {timeout: 20000}).screenshot("old", {overwrite: true});
        cy.intercept("GET", Cypress.config("baseUrl") + "/co2_emission_with_kube_green?*").as("savedRequest");


        cy.get("input[placeholder='Start date']").focus().clear().type("05/01/2022").trigger("keydown", {key: 13});
        cy.get("input[placeholder='End date']").focus().clear().type("08/01/2022").trigger("keydown", {key: 13}).blur();
        ready();
        cy.wait("@savedRequest", {timeout: 60000});
        cy.get("canvas", {timeout: 20000}).screenshot("new", {overwrite: true});
        cy.task("compareScreenshots", {first: old_canvas_path, second: new_canvas_path}).then(result => {
            expect(result).to.be.greaterThan(0.1);
        });
    });
});

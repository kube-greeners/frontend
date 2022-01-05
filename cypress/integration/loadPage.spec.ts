describe("Visit Page", () => {
    const baseURL = "http://dev.dsd.ozyinc.com/dev"
    const load = () => {
        cy.visit(baseURL)
    }
    it("should load the page", () => {
        load()
    })

    it("should select all namespaces by default", () => {
        load()
        cy.get(".ant-select-selection-item").contains("All namespaces")
    })
})

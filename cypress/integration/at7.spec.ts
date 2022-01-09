describe("Frontend", () => {
    it("should have the initial load completed before 3 seconds", () => {
        const start = new Date();
        cy.visit("/dev/").then(() => {
            const end = new Date();
            expect((Number(end) - Number(start)) / 1000).to.be.lessThan(3);
        })
    })
});

describe("Backend queries", function () {
    it("queries should have an overhead less than 500ms", () => {
        const queries = ["namespace_names", "saved_co2_emission", "co2_emission_with_kube_green", "cpu_allocation", "memory_usage", "memory_allocation", "all_active_pods", "cpu_usage"]
        for (const query of queries) {
            cy.intercept("GET", Cypress.config("baseUrl") + `/${query}?*`, (req) => {
                req.query["measure"] = "true";
                const start = Number(new Date());
                req.continue((res) => {
                    const end = Number(new Date());
                    const queryTime = res.body[0].time;

                    const timeSpentWhileNotQuerying = end - start - queryTime;
                    expect(timeSpentWhileNotQuerying).to.be.lessThan(500, `Querying took ${queryTime} while total request took ${end - start}`)
                })
            }).as(query);
        }
        cy.visit("/dev/");
        for (const query of queries) {
            cy.wait("@" + query, {timeout: 60000});
        }

    });
});

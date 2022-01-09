// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {allQueries} from "../const";

var cache: { [key: string]: { start: number, end: number, result: object } } = {};
Cypress.Commands.add('cacheRequests', () => {
    for (const query of allQueries) {
        cy.intercept("GET", `/${query}?*`, req => {
            const ns = req.query["namespace"];
            const start = Number(req.query["start"]);
            const end = Number(req.query["end"]);
            if (cache[query + "_" + ns]) {
                const cached = cache[query + "_" + ns];
                if ((Math.abs(start - cached.start) < 5 * 60 * 1000) && (Math.abs(end - cached.end) < 5 * 60 * 1000)){
                    req.reply({statusCode: 200, body: cached.result});
                }
            } else {
                req.continue((res) => {
                    cache[query + "_" + ns] = {start, end, result: res.body};
                })
            }
        })
    }
})

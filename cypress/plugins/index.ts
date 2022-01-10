/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import {getSimilarityRatio} from "./util/compareImages";

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
    on('task', {
        compareScreenshots({first, second}: { first: string, second: string }) {
            try {
                return getSimilarityRatio(first, second);
            } catch (e) {
                cy.log(e.toString());
                return null;
            }
        }
    })
}

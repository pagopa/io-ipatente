/**
 * *** MSW Server Setup ***
 * The msw mocked API can be configured to work both in the browser and on the server.
 * The "setupServer" function is designed for NodeJS environment.
 */
import { setupServer } from "msw/node";

import { getHandlers } from "./handlers";

const server = setupServer(...getHandlers());

// Disabilita l'avviso per le richieste non gestite
server.events.on("request:unhandled", () => {
  // Intenzionalmente vuoto per sopprimere l'avviso
});

export { server };

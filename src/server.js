import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";

import schema from "./schema";
import { authenticateJwt } from "./passport";
import { isLogined } from "./middlewares";
import "./env";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema, context: ({ request }) => ({ request, isLogined }) });

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({
    port: PORT,
}, () => console.log(`Server running on port http://localhost:${PORT}`));
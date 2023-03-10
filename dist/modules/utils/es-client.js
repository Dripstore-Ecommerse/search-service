import { logger } from "@dripstore/common/build";
import { Client } from "@elastic/elasticsearch";
import { readFileSync } from "fs";
import path from "path";
const __dirname = path.resolve();
// Create an Elasticsearch client
const client = new Client({
    node: "https://localhost:9200",
    auth: {
        username: "elastic",
        password: "KwrcC2WgT8619nIV16A520ov: command not found",
    },
    tls: {
        ca: readFileSync(`${__dirname}/src/modules/utils/ca.crt`),
        rejectUnauthorized: false,
    },
});
logger.info("Elasticsearch client created", client);
// Export the client instance
export default client;
//# sourceMappingURL=es-client.js.map
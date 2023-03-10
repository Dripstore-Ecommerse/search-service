import { logger } from "@dripstore/common/build";
import { Client } from "@elastic/elasticsearch";

// Create an Elasticsearch client
const client = new Client({
  node: "http://elasticsearch-es-http:9200",
  auth: {
    username: "elastic",
    password: "bHao9Bs68DLo55GRm35p3E78",
  },
});
logger.info("Elasticsearch client created", client);

// Export the client instance
export default client;

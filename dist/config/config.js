export const ENVIRONMENT = process.env["APP_ENV"] || "development";
export const PORT = Number(process.env["APP_PORT"]) || 3003;
export const DB_URI = process.env["ES_URI"] || "http://localhost:9200";
export default { ENVIRONMENT, PORT, DB_URI };
//# sourceMappingURL=config.js.map
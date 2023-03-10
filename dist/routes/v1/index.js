import express from "express";
import searchRoute from "./search.route";
const router = express.Router();
const defaultIRoute = [
    {
        path: "/search",
        route: searchRoute,
    },
];
defaultIRoute.forEach((route) => {
    router.use(route.path, route.route);
});
export default router;
//# sourceMappingURL=index.js.map
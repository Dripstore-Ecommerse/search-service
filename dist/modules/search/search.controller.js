import { logger } from "@dripstore/common/build";
import { catchAsync } from "../utils";
import client from "../utils/es-client";
async function insertFakeData() {
    let products = [
        {
            _id: "1",
            name: "test",
            price: 200,
            category: ["test"],
            description: "test shoes",
            slug: "test",
            attributes: { test: "test" },
            image: ["test"],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            _id: "2",
            name: "test_2",
            price: 200,
            category: ["test"],
            description: "test jelly",
            slug: "test",
            attributes: { test: "test" },
            image: ["test"],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        logger.info(product);
        await client.index({
            index: "products",
            id: product._id || "0",
            body: product,
        });
    }
    return products;
}
export const createProduct = catchAsync(async (_req, res) => {
    const data = await insertFakeData();
    logger.info(data);
    res.status(200).json({
        status: true,
        data,
    });
});
export const searchProducts = catchAsync(async (req, res) => {
    const searchQuery = req.body;
    const body = await client.search({
        index: "products",
        body: {
            query: {
                multi_match: {
                    query: searchQuery.queryString,
                    fields: ["name^3", "description^2", "category", "attributes.*"],
                    fuzziness: "AUTO",
                    prefix_length: 2,
                    max_expansions: 50,
                },
            },
        },
    });
    const results = body.hits.hits.map((hit) => hit._source);
    res.json(results);
});
//# sourceMappingURL=search.controller.js.map
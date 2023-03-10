import { logger } from "@dripstore/common/build";
import { IProduct } from "../search/product.interface";
import client from "./es-client";

async function addProductToElasticsearch(product: IProduct) {
  const body = await client.index({
    index: "products",
    body: product,
  });
  logger.info(body);
}

async function searchProductByName(
  searchTerm: string
): Promise<(IProduct | undefined)[]> {
  const res = await client.search<IProduct>({
    index: "products",
    body: {
      query: {
        multi_match: {
          fields: ["name", "description"],
          query: searchTerm,
          fuzziness: "AUTO",
        },
      },
    },
  });

  return res.hits.hits.map((hit) => hit._source);
}

export { addProductToElasticsearch, searchProductByName };

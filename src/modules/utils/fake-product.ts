import { faker } from "@faker-js/faker";
import { IProduct } from "../search/product.interface";

function generateFakeProduct(): IProduct {
  const _id = faker.database.mongodbObjectId();
  const name = faker.commerce.productName();
  const description = faker.commerce.productDescription();
  const price = parseFloat(faker.commerce.price());
  const category = [faker.commerce.department(), faker.commerce.department()];
  const slug = faker.helpers.slugify(name);
  const attributes = {
    color: faker.commerce.color(),
  };
  const image = [faker.image.imageUrl(), faker.image.imageUrl()];
  const createdAt = faker.date.past();
  const updatedAt = faker.date.recent();

  return {
    _id,
    name,
    description,
    price,
    category,
    slug,
    attributes,
    image,
    createdAt,
    updatedAt,
  };
}

export default generateFakeProduct;

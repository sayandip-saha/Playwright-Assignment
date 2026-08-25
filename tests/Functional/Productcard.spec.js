// @ts-check

import { test, expect } from "@playwright/test";

import products from "../../data/products.js";
import ProductCard from "../../pages/ProductCard.js";

const productList = Object.values(products);
const firstProduct = productList[0];

test.describe("Product Details Functionality", () => {

  /** @type {ProductCard} */
  let productCard;

  test.beforeEach(async ({ page }) => {
    productCard = new ProductCard(page);

    await productCard.goto();
  });

  test("Verify product details", async () => {

    await expect(productCard.productName).toHaveText(
      firstProduct.name,
    );

    await expect(productCard.productDescription).toHaveText(
      firstProduct.description,
    );

    await expect(productCard.productPrice).toContainText(
      String(firstProduct.price),
    );
  });

  test("Add product to cart from product details", async () => {

    await expect(productCard.addToCartButton).toBeVisible();

    await productCard.addProductToCart();

    await expect(productCard.removeButton).toBeVisible();
    await expect(productCard.cartBadge).toBeVisible();
    await expect(productCard.cartBadge).toHaveText("1");
  });

  test("Remove product from cart from product details", async () => {

    await productCard.addProductToCart();

    await expect(productCard.removeButton).toBeVisible();

    await productCard.removeProductFromCart();

    await expect(productCard.addToCartButton).toBeVisible();
    await expect(productCard.cartBadge).not.toBeVisible();
  });

  test("Back button navigates to Products", async ({ page }) => {

    // Go to Products page
    await page.goto(
      "https://app.thetestingacademy.com/playwright/ttacart/inventory",
    );

    // Open first product
    await page.locator('[data-test="item-img-link"]').first().click();

    // Verify Product Details
    await expect(productCard.pageTitle).toHaveText(
      "Product Details",
    );

    // Click Back
    await productCard.goBack();

    // Verify Products page
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".page-title")).toHaveText(
      "Products",
    );
  });

  test("Added product should appear in cart", async ({ page }) => {

    const productName = await productCard.getProductName();

    expect(productName).not.toBeNull();

    await productCard.addProductToCart();
    await productCard.openCart();

    await expect(page.locator(".page-title")).toHaveText(
      "Your Cart",
    );

    await expect(
      page.getByText(productName, { exact: true }),
    ).toBeVisible();
  });

  test("Cart badge appears after adding product", async () => {

    await expect(productCard.cartBadge).not.toBeVisible();

    await productCard.addProductToCart();

    await expect(productCard.cartBadge).toBeVisible();
    await expect(productCard.cartBadge).toHaveText("1");
  });

});
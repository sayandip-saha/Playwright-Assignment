// @ts-check

import { test, expect } from "@playwright/test";
import products from "../../data/products.js";
import InventoryPage from "../../pages/InventoryPage.js";

const productList = Object.values(products);
const firstProduct = productList[0];

test.describe("Inventory Page UI", () => {
  /** @type {InventoryPage} */
  let inventoryPage;
  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);

    await inventoryPage.goto();
  });

  test("Show inventory page header", async () => {
    // Burger menu
    await expect(inventoryPage.burgerMenu).toBeVisible();
    // Brand title
    await expect(inventoryPage.brandTitle).toHaveText("TTACart");
    // Cart icon
    await expect(inventoryPage.cartIcon).toBeVisible();
    // Page title
    await expect(inventoryPage.pageTitle).toHaveText("Products");
    // Filter
    await expect(inventoryPage.sortDropdown).toBeVisible();
  });

  test("Show cart badge behavior", async () => {
    // Initially cart is empty
    await expect(inventoryPage.cartBadge).not.toBeVisible();
    // Add first product
    await inventoryPage.addProduct(0);
    // Badge should appear
    await expect(inventoryPage.cartBadge).toBeVisible();
  });

  test("Show product cards", async () => {
    // Product card
    await expect(inventoryPage.products.first()).toContainText(
      firstProduct.name,
    );
    // Product image
    await expect(inventoryPage.productImages.first()).toBeVisible();
    // Product name
    await expect(inventoryPage.productNames.first()).toBeVisible();
    // Product description
    await expect(inventoryPage.productDescriptions.first()).toBeVisible();
    // Product price
    await expect(inventoryPage.productPrices.first()).toBeVisible();
  });

  test("Show Add to Cart button", async () => {
    const addToCartButton = inventoryPage.productButtons.first();
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toContainText("Add to cart");
  });

  test("Show Footer", async () => {
    // Footer
    await expect(inventoryPage.footer).toBeVisible();
    // Footer icons
    await expect(inventoryPage.twitterIcon).toBeVisible();
    await expect(inventoryPage.facebookIcon).toBeVisible();
    await expect(inventoryPage.linkedinIcon).toBeVisible();
    // Footer text
    await expect(inventoryPage.footerText).toHaveText(
      "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy",
    );
  });
});

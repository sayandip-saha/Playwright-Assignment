// @ts-check

import { test, expect } from "@playwright/test";
import products from "../../data/products.js";
import InventoryPage from "../../pages/InventoryPage.js";

const productList = Object.values(products);
const firstProduct = productList[0];

test.describe("Inventory Page UI", () => {
  test("Show burger menu", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(inventoryPage.burgerMenu).toBeVisible();
  });

  test("Show Title", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(inventoryPage.brandTitle).toHaveText("TTACart");
  });

  test("Show Cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(inventoryPage.cartIcon).toBeVisible();
  });

  test("Cart badge visibility", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    // Initially cart is empty
    await expect(inventoryPage.cartBadge).not.toBeVisible();
    // Add first product
    await inventoryPage.addProduct(0);
    // Badge should now appear
    await expect(inventoryPage.cartBadge).toBeVisible();
  });

  test("Show Products", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(inventoryPage.pageTitle).toHaveText("Products");
  });

  test("Show Filter", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(inventoryPage.sortDropdown).toBeVisible();
  });

  test("Show Cards", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(inventoryPage.products.first()).toContainText(
      firstProduct.name,
    );
  });

  test("Show Card Picture", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(inventoryPage.productImages.first()).toBeVisible();
  });

  test("Show Card Title", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(inventoryPage.productNames.first()).toBeVisible();
  });

  test("Show Card Description", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(
      inventoryPage.productDescriptions.first(),
    ).toBeVisible();
  });

  test("Show Card Price", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(inventoryPage.productPrices.first()).toBeVisible();
  });

  test("Show Add to Cart button", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    const addToCartButton =
      inventoryPage.productButtons.first();
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toContainText("Add to cart");
  });

  test("Show Footer", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(inventoryPage.footer).toBeVisible();
  });

  test("Show Footer icons", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(inventoryPage.twitterIcon).toBeVisible();
    await expect(inventoryPage.facebookIcon).toBeVisible();
    await expect(inventoryPage.linkedinIcon).toBeVisible();
  });

  test("Show Footer text", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(inventoryPage.footerText).toHaveText(
      "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy",
    );
  });
});
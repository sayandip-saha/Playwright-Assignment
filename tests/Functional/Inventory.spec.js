// @ts-check

import { test, expect } from "@playwright/test";
import InventoryPage from "../../pages/InventoryPage.js";

test.describe("Inventory Functionality", () => {
  test("Add product to cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    const addToCartButton = inventoryPage.productButtons.first();

    await expect(addToCartButton).toContainText("Add to cart");

    await inventoryPage.addProduct(0);

    // Button should change to Remove
    await expect(addToCartButton).toContainText("Remove");

    // Cart badge should appear
    await expect(inventoryPage.cartBadge).toBeVisible();

    // Cart should contain 1 item
    await expect(inventoryPage.cartBadge).toHaveText("1");
  });

  test("Remove product from cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.goto();

    const productButton = inventoryPage.productButtons.first();

    // Add product
    await inventoryPage.addProduct(0);

    await expect(inventoryPage.cartBadge).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText("1");

    // Remove product
    await inventoryPage.removeProduct(0);

    await expect(productButton).toContainText("Add to cart");

    // Cart badge should disappear
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test("Cart badge updates when multiple products are added", async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.addProduct(0);
    await expect(inventoryPage.cartBadge).toHaveText("1");
    await inventoryPage.addProduct(1);
    await expect(inventoryPage.cartBadge).toHaveText("2");
    await inventoryPage.addProduct(2);
    await expect(inventoryPage.cartBadge).toHaveText("3");
  });

  test("Added product should appear in cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    const productName = await inventoryPage.getProductName(0);
    expect(productName).not.toBeNull();
    await inventoryPage.addProduct(0);
    await inventoryPage.openCart();
    await expect(page.getByText(productName, { exact: true })).toBeVisible();
  });

  test("Product price should be displayed in cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    const productPrice = await inventoryPage.getProductPrice(0);
    expect(productPrice).not.toBeNull();
    await inventoryPage.addProduct(0);
    await inventoryPage.openCart();
    await expect(page.getByText(productPrice, { exact: true })).toBeVisible();
  });

  test("Product initially shows Add to cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.goto();

    const productButton = inventoryPage.productButtons.first();

    await expect(productButton).toBeVisible();
    await expect(productButton).toContainText("Add to cart");
  });

  test("Filter products", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.openSortDropdown();
    await expect(inventoryPage.sortDropdown).toContainText("Name (A to Z)");
    await expect(inventoryPage.sortDropdown).toContainText("Name (Z to A)");
    await expect(inventoryPage.sortDropdown).toContainText(
      "Price (low to high)",
    );

    await expect(inventoryPage.sortDropdown).toContainText(
      "Price (high to low)",
    );
  });
});

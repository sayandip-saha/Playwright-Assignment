// @ts-check
import { test, expect } from "@playwright/test";

const INVENTORY_URL =
  "https://app.thetestingacademy.com/playwright/ttacart/inventory";

test("Checkout overview displays customer order", async ({ page }) => {
  // Go to Products
  await page.goto(INVENTORY_URL);

  // Add product
  await page.locator(".item-btn").first().click();

  // Open Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Click Checkout
  await page.locator('[data-test="checkout"]').click();

  // Fill customer information
  await page.locator("#first-name").fill("User");
  await page.locator("#last-name").fill("User");
  await page.locator("#postal-code").fill("700001");

  // Continue to Overview
  await page.locator('[data-test="continue"]').click();

  // Verify Overview page
  await expect(page).toHaveURL(/checkout-step-two/);

  await expect(page.locator('[data-test="title"]')).toHaveText(
    "Checkout: Overview",
  );

  // Verify order summary
  await expect(page.locator(".summary-block")).toContainText(
    "Payment Information:",
  );

  await expect(page.locator(".summary-block")).toContainText(
    "Shipping Information:",
  );

  await expect(page.locator(".summary-block")).toContainText("Price Total");

  await expect(page.locator(".summary-block")).toContainText("Total:");
});

test("Added product should appear in checkout overview", async ({ page }) => {
  await page.goto(INVENTORY_URL);

  const firstProduct = page.locator('[data-test="inventory-item"]').first();

  const productName = await firstProduct
    .locator('[data-test="inventory-item-name"]')
    .textContent();

  expect(productName).not.toBeNull();

  // Add product
  await firstProduct.locator(".item-btn").click();

  // Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Checkout
  await page.locator('[data-test="checkout"]').click();

  // Customer information
  await page.locator("#first-name").fill("User");
  await page.locator("#last-name").fill("User");
  await page.locator("#postal-code").fill("700001");

  // Overview
  await page.locator('[data-test="continue"]').click();

  // Verify product
  await expect(page.getByText(productName, { exact: true })).toBeVisible();
});

test("Finish checkout successfully", async ({ page }) => {
  await page.goto(INVENTORY_URL);

  // Add product
  await page.locator(".item-btn").first().click();

  // Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Checkout
  await page.locator('[data-test="checkout"]').click();

  // Fill information
  await page.locator("#first-name").fill("User");
  await page.locator("#last-name").fill("User");
  await page.locator("#postal-code").fill("700001");

  // Go to overview
  await page.locator('[data-test="continue"]').click();

  // Finish order
  await page.locator('[data-test="finish"]').click();

  // Verify successful order
  await expect(page).toHaveURL(/checkout-complete/);

  // Verify confirmation
  await expect(page.locator(".page-title")).toHaveText("Checkout: Complete!");
});

test("Cancel checkout from overview", async ({ page }) => {
  await page.goto(INVENTORY_URL);

  // Add product
  await page.locator(".item-btn").first().click();

  // Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Checkout
  await page.locator('[data-test="checkout"]').click();

  // Fill information
  await page.locator("#first-name").fill("User");
  await page.locator("#last-name").fill("User");
  await page.locator("#postal-code").fill("700001");

  // Overview
  await page.locator('[data-test="continue"]').click();

  // Cancel
  await page.locator('[data-test="cancel"]').click();

  // Verify return to Cart
  await expect(page).toHaveURL(/cart/);
  await expect(page.locator(".page-title")).toHaveText("Your Cart");
});

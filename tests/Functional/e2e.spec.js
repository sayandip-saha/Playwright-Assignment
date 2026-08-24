// @ts-check
import { test, expect } from "@playwright/test";

const INVENTORY_URL =
  "https://app.thetestingacademy.com/playwright/ttacart/inventory";

test("Complete checkout successfully", async ({ page }) => {
  // Products
  await page.goto(INVENTORY_URL);

  // Add product
  await page.locator(".item-btn").first().click();

  // Open Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Checkout
  await page.locator('[data-test="checkout"]').click();

  // Fill customer information
  await page.locator("#first-name").fill("Sayandip");
  await page.locator("#last-name").fill("Saha");
  await page.locator("#postal-code").fill("700001");

  // Continue to Overview
  await page.locator('[data-test="continue"]').click();

  // Finish order
  await page.locator('[data-test="finish"]').click();

  // Verify Checkout Complete page
  await expect(page).toHaveURL(/checkout-complete/);

  await expect(page.locator('[data-test="title"]')).toHaveText(
    "Checkout: Complete!",
  );

  // Verify order confirmation
  await expect(page.locator('[data-test="complete-header"]')).toHaveText(
    "Thank you for your order!",
  );

  await expect(page.locator('[data-test="complete-text"]')).toContainText(
    "Your order has been dispatched",
  );
});

test("Back Home navigates to Products", async ({ page }) => {
  await page.goto(
    "https://app.thetestingacademy.com/playwright/ttacart/inventory",
  );

  // Add product
  await page.locator(".item-btn").first().click();

  // Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Checkout
  await page.locator('[data-test="checkout"]').click();

  // Fill information
  await page.locator("#first-name").fill("Sayandip");
  await page.locator("#last-name").fill("Saha");
  await page.locator("#postal-code").fill("700001");

  // Overview
  await page.locator('[data-test="continue"]').click();

  // Finish
  await page.locator('[data-test="finish"]').click();

  // Verify completion page
  await expect(page).toHaveURL(/checkout-complete/);

  // Click Back Home
  await page.locator('[data-test="back-to-products"]').click();

  // Verify Products page
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator(".page-title")).toHaveText("Products");
});

test("Cart is empty after completing order", async ({ page }) => {
  const INVENTORY_URL =
    "https://app.thetestingacademy.com/playwright/ttacart/inventory";

  await page.goto(INVENTORY_URL);

  // Add product
  await page.locator(".item-btn").first().click();

  // Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Checkout
  await page.locator('[data-test="checkout"]').click();

  // Customer information
  await page.locator("#first-name").fill("Sayandip");
  await page.locator("#last-name").fill("Saha");
  await page.locator("#postal-code").fill("700001");

  // Overview
  await page.locator('[data-test="continue"]').click();

  // Finish
  await page.locator('[data-test="finish"]').click();

  // Verify completion
  await expect(page).toHaveURL(/checkout-complete/);

  // Go back to Products
  await page.locator('[data-test="back-to-products"]').click();

  // Open Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verify cart is empty
  await expect(page.locator('[data-test="cart-empty"]')).toHaveText(
    "Your cart is empty.",
  );
});

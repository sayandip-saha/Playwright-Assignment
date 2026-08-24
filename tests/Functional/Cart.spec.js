// @ts-check
import { test, expect } from "@playwright/test";

const BASE_URL = "https://app.thetestingacademy.com/playwright/ttacart/cart";

test("Show empty cart", async ({ page }) => {
  await page.goto(BASE_URL);

  const emptyCartMessage = page.locator('[data-test="cart-empty"]');

  await expect(emptyCartMessage).toBeVisible();
  await expect(emptyCartMessage).toHaveText("Your cart is empty.");
});

test("Added product should appear in cart", async ({ page }) => {
  // Go to Products page
  await page.goto(
    "https://app.thetestingacademy.com/playwright/ttacart/inventory",
  );

  const firstProduct = page.locator('[data-test="inventory-item"]').first();

  const productName = await firstProduct
    .locator('[data-test="inventory-item-name"]')
    .textContent();

  expect(productName).not.toBeNull();

  // Add product to cart
  await firstProduct.locator(".item-btn").click();

  // Open Cart page
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verify Cart page
  await expect(page.locator(".page-title")).toHaveText("Your Cart");

  // Verify product exists in cart
  await expect(page.getByText(productName, { exact: true })).toBeVisible();
});

test("Cart should show correct product quantity", async ({ page }) => {
  await page.goto(
    "https://app.thetestingacademy.com/playwright/ttacart/inventory",
  );

  const firstProduct = page.locator('[data-test="inventory-item"]').first();

  await firstProduct.locator(".item-btn").click();

  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verify quantity is 1
  await expect(page.locator(".qty").first()).toHaveText("1");
});

test("Remove product from cart", async ({ page }) => {
  // Go to Products
  await page.goto(
    "https://app.thetestingacademy.com/playwright/ttacart/inventory",
  );

  const firstProduct = page.locator('[data-test="inventory-item"]').first();

  // Add product
  await firstProduct.locator(".item-btn").click();

  // Go to Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verify product exists
  const cartItem = page.locator('[data-test="inventory-item"]').first();

  await expect(cartItem).toBeVisible();

  // Remove product
  await cartItem.locator(".btn-remove").click();

  // Verify cart is empty
  await expect(page.locator('[data-test="cart-empty"]')).toHaveText(
    "Your cart is empty.",
  );
});

test("Continue Shopping navigates to Products", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator('[data-test="continue-shopping"]').click();

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator(".page-title")).toHaveText("Products");
});

test("Checkout button navigates to checkout", async ({ page }) => {
  // Add product first
  await page.goto(
    "https://app.thetestingacademy.com/playwright/ttacart/inventory",
  );

  await page.locator(".item-btn").first().click();

  // Open cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Click checkout
  await page.locator('[data-test="checkout"]').click();

  // Verify checkout page
  await expect(page).toHaveURL(/checkout/);
});

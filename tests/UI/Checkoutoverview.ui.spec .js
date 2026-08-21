// @ts-check
import { test, expect } from "@playwright/test";

const BASE_URL = "https://app.thetestingacademy.com/playwright/ttacart/checkout-step-two";

test("Show burger menu", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator("#react-burger-menu-btn")).toBeVisible();
});

test("Show Title", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator(".tta-brand-title")).toHaveText(/TTACart/);
});

test("Show Checkout Title", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="title"]')).toContainText("Checkout: Overview");
});

test("Show Your Cart", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
});

test("Show QTY and Description", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('.cart-row-head')).toContainText("QTY");
  await expect(page.locator('.cart-row-head')).toContainText("Description");
});

test("Show Cart Contents or Empty Message ", async ({ page }) => {
  await page.goto(BASE_URL);

  // Define the locators for both possible states
  const cartItem = page.locator('[data-test="inventory-item"]').first();
  const emptyCartMessage = page.locator('[data-test="cart-empty"]');

  // Check if there is at least one item card in the cart
  const hasItems = await cartItem.isVisible();

  if (hasItems) {
    // State 1: Cart has items (Matches your uploaded image)
    await expect(cartItem).toBeVisible();
    await expect(page.locator('.qty').first()).toBeVisible();
    await expect(page.locator('.inventory-item-name').first()).toContainText("Test.allTheThings() T-Shirt (Red)");
    await expect(page.locator('[data-test="remove-test-allthethings-tshirt-red"]')).toBeVisible();
    await expect(page.locator('.cart-price')).toBeVisible();
    await expect(page.locator('.btn-remove').first()).toBeVisible();
  } else {
    // State 2: Cart is completely empty
    await expect(emptyCartMessage).toBeVisible();
    await expect(emptyCartMessage).toHaveText("Your cart is empty.");
  }
});

test("Show Cancel Button", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="cancel"]')).toContainText("Cancel");

});

test("Show Finish Button", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="checkout"]').first()).toContainText(
    "Finish",
  );

  const button = page.locator('[data-test="checkout"]');

  // Updated to match the actual class name received: "btn-continue"
  await expect(button).toHaveClass(/btn-primary/);
});

test("Show Footer", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="footer"]')).toBeVisible();
});

test("Show Footer icons", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="social-twitter"]')).toBeVisible();
  await expect(page.locator('[data-test="social-facebook"]')).toBeVisible();
  await expect(page.locator('[data-test="social-linkedin"]')).toBeVisible();
});

test("Show Footer text", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="footer-copy"]')).toHaveText(
    "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy",
  );
});
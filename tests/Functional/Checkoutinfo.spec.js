// @ts-check
import { test, expect } from "@playwright/test";

const INVENTORY_URL =
  "https://app.thetestingacademy.com/playwright/ttacart/inventory";

const CHECKOUT_URL =
  "https://app.thetestingacademy.com/playwright/ttacart/checkout-step-one";

test("Checkout with valid customer information", async ({ page }) => {
  // Go to Products
  await page.goto(INVENTORY_URL);

  // Add a product
  await page.locator(".item-btn").first().click();

  // Open Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Click Checkout
  await page.locator('[data-test="checkout"]').click();

  // Verify Checkout Information page
  await expect(page).toHaveURL(/checkout-step-one/);
  await expect(page.locator('[data-test="title"]')).toHaveText(
    "Checkout: Your Information",
  );

  // Fill customer information
  await page.locator("#first-name").fill("Sayandip");
  await page.locator("#last-name").fill("Saha");
  await page.locator("#postal-code").fill("700001");

  // Continue
  await page.locator('[data-test="continue"]').click();

  // Verify navigation to checkout overview
  await expect(page).toHaveURL(/checkout-step-two/);
});

test("Checkout with empty customer information", async ({ page }) => {
  await page.goto(CHECKOUT_URL);

  // Click Continue without filling anything
  await page.locator('[data-test="continue"]').click();

  // User should remain on the same page
  await expect(page).toHaveURL(/checkout-step-one/);
  await expect(page.getByRole("alert")).toHaveText(
    "Error: First Name is required",
  );
});

test("Checkout without first name", async ({ page }) => {
  await page.goto(CHECKOUT_URL);

  // Click Continue without filling anything
  await page.locator('[data-test="continue"]').click();

  // User should remain on the same page
  await expect(page).toHaveURL(/checkout-step-one/);
  await expect(page.getByRole("alert")).toHaveText(
    "Error: First Name is required",
  );
});

test("Checkout without last name", async ({ page }) => {
  await page.goto(CHECKOUT_URL);

  // Click Continue without filling anything
  await page.locator('[data-test="continue"]').click();

  // User should remain on the same page
  await expect(page).toHaveURL(/checkout-step-one/);
  await expect(page.getByRole("alert")).toHaveText(
    "Error: First Name is required",
  );
});

test("Checkout without postal code", async ({ page }) => {
  await page.goto(CHECKOUT_URL);

  // Click Continue without filling anything
  await page.locator('[data-test="continue"]').click();

  // User should remain on the same page
  await expect(page).toHaveURL(/checkout-step-one/);
  await expect(page.getByRole("alert")).toHaveText(
    "Error: First Name is required",
  );
});

test("Cancel checkout", async ({ page }) => {
  await page.goto(CHECKOUT_URL);

  await page.locator('[data-test="cancel"]').click();

  // Should return to Cart
  await expect(page).toHaveURL(/cart/);

  await expect(page.locator(".page-title")).toHaveText("Your Cart");
});

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

test("Show Cancel Button", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="cancel"]')).toContainText("Cancel");

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
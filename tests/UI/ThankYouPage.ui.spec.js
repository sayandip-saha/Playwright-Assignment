// @ts-check
import { test, expect } from "@playwright/test";

const BASE_URL = "https://app.thetestingacademy.com/playwright/ttacart/checkout-complete";

test("Show burger menu", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator("#react-burger-menu-btn")).toBeVisible();
});

test("Show Title", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator(".tta-brand-title")).toHaveText(/TTACart/);
});

test("Show Your Cart", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
});

test("Show Checkout Complete Title", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="title"]')).toContainText("Checkout: Complete!");
});

test("Show Product Summary", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('.tick')).toBeVisible();
  await expect(page.locator('[data-test="complete-header"]')).toContainText("Thank you for your order!");
  await expect(page.locator('[data-test="complete-text"]')).toContainText("Your order has been dispatched, and will arrive just as fast as the TTA Express pony can get there!");
});
test("Show Back to Home Button", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="back-to-products"]')).toContainText("Back Home");

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
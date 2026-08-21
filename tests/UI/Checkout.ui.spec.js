// @ts-check
import { test, expect } from "@playwright/test";

const BASE_URL = "https://app.thetestingacademy.com/playwright/ttacart/checkout-step-one";

test("Show burger menu", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator("#react-burger-menu-btn")).toBeVisible();
});

test("Show Title", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator(".tta-brand-title")).toHaveText(/TTACart/);
});

test("Show Checkout Information", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="title"]')).toContainText("Checkout: Your Information");
});

test("Show Your Cart", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator(".page-title")).toHaveText("Your Cart");
});

test("Show Details", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('#first-name')).toContainText("fdf");
  await expect(page.locator('#last-name')).toContainText("fsf");
  await expect(page.locator('#postal-code')).toContainText("fdsdfss");
});

test("Show Continue Shopping Button", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="continue-shopping"]')).toHaveText(
    "Continue Shopping",
  );

  const button1 = page.locator('[data-test="continue-shopping"]');

  // Updated to match the actual class name received: "btn-continue"
  await expect(button1).toHaveClass(/btn-continue/);
});

test("Show Checkout Button", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="checkout"]').first()).toContainText(
    "Checkout",
  );

  const button = page.locator('[data-test="checkout"]');

  // Updated to match the actual class name received: "btn-continue"
  await expect(button).toHaveClass(/btn-primary/);
});

test("Show Input Placeholders", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('#first-name')).toHaveAttribute('placeholder', 'First Name');
  await expect(page.locator('#last-name')).toHaveAttribute('placeholder', 'Last Name');
  await expect(page.locator('#postal-code')).toHaveAttribute('placeholder', 'Zip/Postal Code');
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

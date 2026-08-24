// @ts-check
import { test, expect } from "@playwright/test";
import products from "../../data/products.js";

const productList = Object.values(products);
const firstProduct = productList[0];

const BASE_URL =
  "https://app.thetestingacademy.com/playwright/ttacart/inventory-item?id=test-allthethings-tshirt-red";

test("Show burger menu", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator("#react-burger-menu-btn")).toBeVisible();
});

test("Show Title", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator(".tta-brand-title")).toHaveText(/TTACart/);
});

test("Show Cart", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
});

test("Show Product Details", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator(".page-title")).toHaveText("Product Details");
});

test("Show Back Button", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator(".back-btn")).toBeVisible();
});

test("Show Product Image", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator(".item-img")).toBeVisible();
});

test("Show Product Title", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(
    page.locator('[data-test="inventory-item-name"]').first(),
  ).toBeVisible();
});

test("Show Product Description", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(
    page.locator('[data-test="inventory-item-desc"]').first(),
  ).toBeVisible();
});

test("Show Product Price", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(
    page.locator('[data-test="inventory-item-price"]').first(),
  ).toBeVisible();
});

test("Show Add to Cart or Remove Button", async ({ page }) => {
  await page.goto(BASE_URL);

  const addToCartButton = page.locator('[data-test="add-to-cart"]');
  const removeButton = page.locator('[data-test="remove"]');

  // Check the immediate visibility state of the Add to Cart button
  const isAddToCartVisible = await addToCartButton.isVisible();

  if (isAddToCartVisible) {
    // If Add to Cart is there, verify its text
    await expect(addToCartButton).toContainText("Add to cart");
  } else {
    // If Add to Cart is NOT visible, verify the Remove button instead
    await expect(removeButton).toBeVisible();
    await expect(removeButton).toContainText("Remove");
  }
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

// @ts-check
import { test, expect } from "@playwright/test";
import products from "../../data/products.js";

const productList = Object.values(products);
const firstProduct = productList[0];

const BASE_URL =
  "https://app.thetestingacademy.com/playwright/ttacart/inventory";

test("Show burger menu", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator("//button[@id='react-burger-menu-btn']//*[name()='svg']")).toBeVisible();
});

test("Show Title", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.getByText('TTACart', { exact: true })).toHaveText(/TTACart/);
});

test("Show Cart", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator("//*[name()='path' and contains(@d,'M3 3h2l2.4')]")).toBeVisible();
});

test("Cart badge visibility", async ({ page }) => {
  await page.goto(BASE_URL);

  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  const addToCartButton = page.locator(".item-btn").first();

  // Initially cart is empty, so badge should NOT be visible
  await expect(cartBadge).not.toBeVisible();

  // Add first product to cart
  await addToCartButton.click();

  // Now cart has an item, so badge should be visible
  await expect(cartBadge).toBeVisible();
});

test("Show Products", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator(".page-title")).toHaveText("Products");
});

test("Show Filter", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator(".sort-wrap")).toBeVisible();
});

test("Show Cards", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(
    page.locator('[data-test="inventory-item"]').first(),
  ).toContainText(firstProduct.name);
});

test("Show Card Picture", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(
    page.locator('[data-test="item-img-link"]').first(),
  ).toBeVisible();
});

test("Show Card Title", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(
    page.locator('[data-test="inventory-item-name"]').first(),
  ).toBeVisible();
});

test("Show Card Description", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(
    page.locator('[data-test="inventory-item-desc"]').first(),
  ).toBeVisible();
});

test("Show Card Price", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(
    page.locator('[data-test="inventory-item-price"]').first(),
  ).toBeVisible();
});

test("Show Add to Cart or Remove Button", async ({ page }) => {
  await page.goto(BASE_URL);

  const addToCartButton = page.locator('.item-btn').first();
  const removeButton = page.locator('.item-btn is-remove').first();

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

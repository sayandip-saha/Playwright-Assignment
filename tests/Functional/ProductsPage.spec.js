// @ts-check
import { test, expect } from "@playwright/test";
import products from "../../data/products.js";

const productList = Object.values(products);
const firstProduct = productList[0];

const BASE_URL =
  "https://app.thetestingacademy.com/playwright/ttacart/inventory";

test("Add product to cart", async ({ page }) => {
  await page.goto(BASE_URL);

  const addToCartButton = page.locator(".item-btn").first();
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');

  // Verify product can be added
  await expect(addToCartButton).toContainText("Add to cart");

  await addToCartButton.click();

  // Button should change to Remove
  await expect(addToCartButton).toContainText("Remove");

  // Cart badge should appear
  await expect(cartBadge).toBeVisible();

  // Cart should contain 1 item
  await expect(cartBadge).toHaveText("1");
});

test("Remove product from cart", async ({ page }) => {
  await page.goto(BASE_URL);

  const productButton = page.locator(".item-btn").first();
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');

  // Add product
  await productButton.click();

  // Verify cart badge
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText("1");

  // Remove product
  await productButton.click();

  // Button should change back to Add to cart
  await expect(productButton).toContainText("Add to cart");

  // Cart badge should disappear
  await expect(cartBadge).not.toBeVisible();
});

test("Cart badge updates when multiple products are added", async ({
  page,
}) => {
  await page.goto(BASE_URL);

  const productButtons = page.locator(".item-btn");
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');

  // Add first product
  await productButtons.nth(0).click();

  await expect(cartBadge).toHaveText("1");

  // Add second product
  await productButtons.nth(1).click();

  await expect(cartBadge).toHaveText("2");

  // Add third product
  await productButtons.nth(2).click();

  await expect(cartBadge).toHaveText("3");
});

test("Added product should appear in cart", async ({ page }) => {
  await page.goto(BASE_URL);

  const firstProduct = page.locator('[data-test="inventory-item"]').first();

  const productName = await firstProduct
    .locator('[data-test="inventory-item-name"]')
    .textContent();

  expect(productName).not.toBeNull();

  // Add product
  await firstProduct.locator(".item-btn").click();

  // Open cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verify product is in cart
  await expect(page.getByText(productName, { exact: true })).toBeVisible();
});

test("Product price should be displayed in cart", async ({ page }) => {
  await page.goto(BASE_URL);

  const firstProduct = page.locator('[data-test="inventory-item"]').first();

  const productPrice = await firstProduct
    .locator('[data-test="inventory-item-price"]')
    .textContent();

  expect(productPrice).not.toBeNull();

  // Add product
  await firstProduct.locator(".item-btn").click();

  // Open cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verify price is displayed in cart
  await expect(page.getByText(productPrice, { exact: true })).toBeVisible();
});

test("Product initially shows Add to cart", async ({ page }) => {
  await page.goto(BASE_URL);

  const productButton = page.locator(".item-btn").first();

  await expect(productButton).toBeVisible();
  await expect(productButton).toContainText("Add to cart");
});

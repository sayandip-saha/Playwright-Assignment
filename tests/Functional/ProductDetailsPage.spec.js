// @ts-check
import { test, expect } from "@playwright/test";
import products from "../../data/products.js";

const productList = Object.values(products);
const firstProduct = productList[0];

const BASE_URL =
  "https://app.thetestingacademy.com/playwright/ttacart/inventory-item?id=test-allthethings-tshirt-red";

test("Verify product details", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
    firstProduct.name,
  );

  await expect(page.locator('[data-test="inventory-item-desc"]')).toHaveText(
    firstProduct.description,
  );

  await expect(
    page.locator('[data-test="inventory-item-price"]'),
  ).toContainText(String(firstProduct.price));
});

test("Add product to cart from product details", async ({ page }) => {
  await page.goto(BASE_URL);

  const addToCartButton = page.locator('[data-test="add-to-cart"]');
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');

  // Product should initially have Add to cart button
  await expect(addToCartButton).toBeVisible();

  // Add product
  await addToCartButton.click();

  // Button should change to Remove
  await expect(page.locator('[data-test="remove"]')).toBeVisible();

  // Cart badge should appear
  await expect(cartBadge).toBeVisible();

  // Cart should contain one item
  await expect(cartBadge).toHaveText("1");
});

test("Remove product from cart from product details", async ({ page }) => {
  await page.goto(BASE_URL);

  const addToCartButton = page.locator('[data-test="add-to-cart"]');
  const removeButton = page.locator('[data-test="remove"]');
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');

  // Add product
  await addToCartButton.click();

  // Verify Remove button
  await expect(removeButton).toBeVisible();

  // Remove product
  await removeButton.click();

  // Add to cart should appear again
  await expect(addToCartButton).toBeVisible();

  // Cart badge should disappear
  await expect(cartBadge).not.toBeVisible();
});

test("Back button navigates to Products", async ({ page }) => {
  const INVENTORY_URL =
    "https://app.thetestingacademy.com/playwright/ttacart/inventory";

  // Start from Products page
  await page.goto(INVENTORY_URL);

  // Open the first product
  await page.locator('[data-test="item-img-link"]').first().click();

  // Verify Product Details page
  await expect(page.locator(".page-title")).toHaveText("Product Details");

  // Click Back
  await page.locator(".back-btn").click();

  // Verify navigation back to Products
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator(".page-title")).toHaveText("Products");
});

test("Added product should appear in cart", async ({ page }) => {
  await page.goto(BASE_URL);

  const productName = page.locator('[data-test="inventory-item-name"]');

  const productNameText = await productName.textContent();

  expect(productNameText).not.toBeNull();

  // Add product
  await page.locator('[data-test="add-to-cart"]').click();

  // Open cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verify Cart page
  await expect(page.locator(".page-title")).toHaveText("Your Cart");

  // Verify product exists in cart
  await expect(page.getByText(productNameText, { exact: true })).toBeVisible();
});

test("Cart badge appears after adding product", async ({ page }) => {
  await page.goto(BASE_URL);

  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');

  // Cart should initially be empty
  await expect(cartBadge).not.toBeVisible();

  // Add product
  await page.locator('[data-test="add-to-cart"]').click();

  // Badge should appear
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText("1");
});

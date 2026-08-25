// @ts-check

import { test, expect } from "@playwright/test";
import InventoryPage from "../../pages/InventoryPage.js";
import CartPage from "../../pages/CartPage.js";

test.describe("Cart Functionality", () => {
  test("Show empty cart", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.emptyCartMessage).toBeVisible();
    await expect(cartPage.emptyCartMessage).toHaveText("Your cart is empty.");
  });

  test("Added product should appear in cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await inventoryPage.goto();
    const productName = await inventoryPage.getProductName(0);
    expect(productName).not.toBeNull();
    await inventoryPage.addProduct(0);
    await inventoryPage.openCart();
    await expect(cartPage.pageTitle).toHaveText("Your Cart");
    await expect(page.getByText(productName, { exact: true })).toBeVisible();
  });

  test("Cart should show correct product quantity", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await inventoryPage.goto();
    await inventoryPage.addProduct(0);
    await inventoryPage.openCart();
    await expect(cartPage.quantity.first()).toHaveText("1");
  });

  test("Remove product from cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await inventoryPage.goto();
    await inventoryPage.addProduct(0);
    await inventoryPage.openCart();
    const cartItem = cartPage.getCartItem(0);
    await expect(cartItem).toBeVisible();
    await cartPage.removeProduct(0);
    await expect(cartPage.emptyCartMessage).toHaveText("Your cart is empty.");
  });

  test("Continue Shopping navigates to Products", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".page-title")).toHaveText("Products");
  });

  test("Checkout button navigates to checkout", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await inventoryPage.goto();
    await inventoryPage.addProduct(0);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout/);
  });
});

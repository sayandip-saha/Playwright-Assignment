// @ts-check

import { test, expect } from "@playwright/test";

import InventoryPage from "../../pages/InventoryPage.js";
import CartPage from "../../pages/CartPage.js";
import CheckoutStepOnePage from "../../pages/CheckoutStepOnePage.js";
import CheckoutStepTwoPage from "../../pages/CheckoutStepTwoPage.js";

test.describe("Checkout Step Two Functionality", () => {
  test("Checkout overview displays customer order", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    // Products
    await inventoryPage.goto();
    // Add product
    await inventoryPage.addProduct(0);
    // Cart
    await inventoryPage.openCart();
    // Checkout
    await cartPage.checkout();
    // Customer information
    await checkoutStepOne.fillCustomerInformation("User", "User", "700001");
    await checkoutStepOne.continue();
    // Verify Overview
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(checkoutStepTwo.pageTitle).toHaveText("Checkout: Overview");
    // Verify order summary
    await expect(checkoutStepTwo.summaryBlock).toContainText(
      "Payment Information:",
    );
    await expect(checkoutStepTwo.summaryBlock).toContainText(
      "Shipping Information:",
    );
    await expect(checkoutStepTwo.summaryBlock).toContainText("Price Total");
    await expect(checkoutStepTwo.summaryBlock).toContainText("Total:");
  });

  test("Added product should appear in checkout overview", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    await inventoryPage.goto();
    // Get product name
    const productName = await inventoryPage.getProductName(0);
    expect(productName).not.toBeNull();
    // Add product
    await inventoryPage.addProduct(0);
    // Cart
    await inventoryPage.openCart();
    // Checkout
    await cartPage.checkout();
    // Customer information
    await checkoutStepOne.fillCustomerInformation("User", "User", "700001");
    await checkoutStepOne.continue();
    // Verify product
    await expect(page.getByText(productName, { exact: true })).toBeVisible();
    // Optional: verify using POM locator
    await expect(checkoutStepTwo.productNames.first()).toBeVisible();
  });

  test("Finish checkout successfully", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    // Products
    await inventoryPage.goto();
    // Add product
    await inventoryPage.addProduct(0);
    // Cart
    await inventoryPage.openCart();
    // Checkout
    await cartPage.checkout();
    // Customer information
    await checkoutStepOne.fillCustomerInformation("User", "User", "700001");
    await checkoutStepOne.continue();
    // Finish
    await checkoutStepTwo.finishCheckout();
    // Verify completion
    await expect(page).toHaveURL(/checkout-complete/);

    await expect(page.locator(".page-title")).toHaveText("Checkout: Complete!");
  });

  test("Cancel checkout from overview", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    // Products
    await inventoryPage.goto();
    // Add product
    await inventoryPage.addProduct(0);
    // Cart
    await inventoryPage.openCart();
    // Checkout
    await cartPage.checkout();
    // Customer information
    await checkoutStepOne.fillCustomerInformation("User", "User", "700001");
    await checkoutStepOne.continue();
    // Cancel
    await checkoutStepTwo.cancelCheckout();
    // Verify return to Cart
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator(".page-title")).toHaveText("Your Cart");
  });
});

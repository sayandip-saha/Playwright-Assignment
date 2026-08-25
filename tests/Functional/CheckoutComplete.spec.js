// @ts-check

import { test, expect } from "@playwright/test";

import InventoryPage from "../../pages/InventoryPage.js";
import CartPage from "../../pages/CartPage.js";
import CheckoutStepOnePage from "../../pages/CheckoutStepOnePage.js";
import CheckoutStepTwoPage from "../../pages/CheckoutStepTwoPage.js";
import CheckoutCompletePage from "../../pages/CheckoutCompletePage.js";

test.describe("Checkout Complete Functionality", () => {
  test("Complete checkout successfully", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    const checkoutComplete = new CheckoutCompletePage(page);
    // Products
    await inventoryPage.goto();
    // Add product
    await inventoryPage.addProduct(0);
    // Cart
    await inventoryPage.openCart();
    // Checkout
    await cartPage.checkout();
    // Customer information
    await checkoutStepOne.fillCustomerInformation("Sayandip", "Saha", "700001");
    await checkoutStepOne.continue();
    // Overview
    await checkoutStepTwo.finishCheckout();
    // Verify completion
    await expect(page).toHaveURL(/checkout-complete/);

    await expect(checkoutComplete.pageTitle).toHaveText("Checkout: Complete!");

    // Verify confirmation
    await expect(checkoutComplete.completeHeader).toHaveText(
      "Thank you for your order!",
    );

    await expect(checkoutComplete.completeText).toContainText(
      "Your order has been dispatched",
    );
  });

  test("Back Home navigates to Products", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    const checkoutComplete = new CheckoutCompletePage(page);
    // Products
    await inventoryPage.goto();
    // Add product
    await inventoryPage.addProduct(0);
    // Cart
    await inventoryPage.openCart();
    // Checkout
    await cartPage.checkout();
    // Customer information
    await checkoutStepOne.fillCustomerInformation("Sayandip", "Saha", "700001");
    await checkoutStepOne.continue();
    // Finish
    await checkoutStepTwo.finishCheckout();
    // Verify completion page
    await expect(page).toHaveURL(/checkout-complete/);
    // Back Home
    await checkoutComplete.backToProducts();
    // Verify Products
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".page-title")).toHaveText("Products");
  });

  test("Cart is empty after completing order", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    const checkoutComplete = new CheckoutCompletePage(page);
    // Products
    await inventoryPage.goto();
    // Add product
    await inventoryPage.addProduct(0);
    // Cart
    await inventoryPage.openCart();
    // Checkout
    await cartPage.checkout();
    // Customer information
    await checkoutStepOne.fillCustomerInformation("Sayandip", "Saha", "700001");
    await checkoutStepOne.continue();
    // Finish
    await checkoutStepTwo.finishCheckout();
    // Verify completion
    await expect(page).toHaveURL(/checkout-complete/);
    // Back Home
    await checkoutComplete.backToProducts();
    // Open Cart
    await inventoryPage.openCart();
    // Verify cart is empty
    await expect(page.locator('[data-test="cart-empty"]')).toHaveText(
      "Your cart is empty.",
    );
  });
});

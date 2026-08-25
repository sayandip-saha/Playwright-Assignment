// @ts-check

import { test, expect } from "@playwright/test";
import InventoryPage from "../../pages/InventoryPage.js";
import CartPage from "../../pages/CartPage.js";
import CheckoutStepOnePage from "../../pages/CheckoutStepOnePage.js";
import CheckoutStepTwoPage from "../../pages/CheckoutStepTwoPage.js";
import CheckoutCompletePage from "../../pages/CheckoutCompletePage.js";
test.describe("Checkout Complete Functionality", () => {
  /** @type {InventoryPage} */
  let inventoryPage;
  /** @type {CartPage} */
  let cartPage;

  /** @type {CheckoutStepOnePage} */
  let checkoutStepOne;

  /** @type {CheckoutStepTwoPage} */
  let checkoutStepTwo;

  /** @type {CheckoutCompletePage} */
  let checkoutComplete;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOne = new CheckoutStepOnePage(page);
    checkoutStepTwo = new CheckoutStepTwoPage(page);
    checkoutComplete = new CheckoutCompletePage(page);
  });

  test("Complete checkout successfully", async ({ page }) => {
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
    await expect(checkoutComplete.completeHeader).toHaveText(
      "Thank you for your order!",
    );
    await expect(checkoutComplete.completeText).toContainText(
      "Your order has been dispatched",
    );
  });

  test("Back Home navigates to Products", async ({ page }) => {
    await inventoryPage.goto();
    await inventoryPage.addProduct(0);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutStepOne.fillCustomerInformation("User", "User", "700001");
    await checkoutStepOne.continue();
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
    await inventoryPage.goto();
    await inventoryPage.addProduct(0);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutStepOne.fillCustomerInformation("User", "User", "700001");
    await checkoutStepOne.continue();
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

// @ts-check

import { test, expect } from "@playwright/test";
import InventoryPage from "../../pages/InventoryPage.js";
import CartPage from "../../pages/CartPage.js";
import CheckoutStepOnePage from "../../pages/CheckoutStepOnePage.js";

test.describe("Checkout Step One Functionality", () => {
  test("Checkout with valid customer information", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutStepOnePage(page);
    // Go to Products
    await inventoryPage.goto();
    // Add product
    await inventoryPage.addProduct(0);
    // Open Cart
    await inventoryPage.openCart();
    // Checkout
    await cartPage.checkout();
    // Verify Checkout Information
    await expect(checkoutPage.pageTitle).toHaveText(
      "Checkout: Your Information",
    );
    // Fill customer information
    await checkoutPage.fillCustomerInformation("Sayandip", "Saha", "700001");
    // Continue
    await checkoutPage.continue();
    // Verify Checkout Overview
    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test("Checkout with empty customer information", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    await checkoutPage.continue();
    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: First Name is required",
    );
  });

  test("Checkout without first name", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);

    await checkoutPage.goto();

    // Fill last name and postal code
    await checkoutPage.lastNameInput.fill("Saha");
    await checkoutPage.postalCodeInput.fill("700001");

    await checkoutPage.continue();

    await expect(page).toHaveURL(/checkout-step-one/);

    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: First Name is required",
    );
  });

  test("Checkout without last name", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    // Fill first name and postal code
    await checkoutPage.firstNameInput.fill("Sayandip");
    await checkoutPage.postalCodeInput.fill("700001");
    await checkoutPage.continue();
    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: Last Name is required",
    );
  });

  test("Checkout without postal code", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    // Fill first and last name
    await checkoutPage.firstNameInput.fill("Sayandip");
    await checkoutPage.lastNameInput.fill("Saha");

    await checkoutPage.continue();

    await expect(page).toHaveURL(/checkout-step-one/);

    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: Postal Code is required",
    );
  });

  test("Cancel checkout", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    await checkoutPage.cancel();
    // Should return to Cart
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator(".page-title")).toHaveText("Your Cart");
  });
});

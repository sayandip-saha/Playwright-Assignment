// @ts-check

import { test, expect } from "@playwright/test";
import InventoryPage from "../../pages/InventoryPage.js";
import CartPage from "../../pages/CartPage.js";
import CheckoutStepOnePage from "../../pages/CheckoutStepOnePage.js";

test.describe("Checkout Step One Functionality", () => {
  /** @type {InventoryPage} */
  let inventoryPage;
  /** @type {CartPage} */
  let cartPage;
  /** @type {CheckoutStepOnePage} */
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutStepOnePage(page);
  });
  async function goToCheckout() {
    await inventoryPage.goto();
    await inventoryPage.addProduct(0);
    await inventoryPage.openCart();
    await cartPage.checkout();
  }

  test("Checkout with valid customer information", async ({ page }) => {
    await goToCheckout();
    await expect(checkoutPage.pageTitle).toHaveText(
      "Checkout: Your Information",
    );
    await checkoutPage.fillCustomerInformation("Sayandip", "Saha", "700001");
    await checkoutPage.continue();
    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test("Checkout with empty customer information", async ({ page }) => {
    await checkoutPage.goto();

    await checkoutPage.continue();

    await expect(page).toHaveURL(/checkout-step-one/);

    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: First Name is required",
    );
  });

  test("Checkout without first name", async ({ page }) => {
    await checkoutPage.goto();
    await checkoutPage.lastNameInput.fill("Saha");
    await checkoutPage.postalCodeInput.fill("700001");
    await checkoutPage.continue();
    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: First Name is required",
    );
  });

  test("Checkout without last name", async ({ page }) => {
    await checkoutPage.goto();
    await checkoutPage.firstNameInput.fill("Sayandip");
    await checkoutPage.postalCodeInput.fill("700001");
    await checkoutPage.continue();
    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: Last Name is required",
    );
  });

  test("Checkout without postal code", async ({ page }) => {
    await checkoutPage.goto();
    await checkoutPage.firstNameInput.fill("Sayandip");
    await checkoutPage.lastNameInput.fill("Saha");
    await checkoutPage.continue();
    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: Postal Code is required",
    );
  });

  test("Cancel checkout", async ({ page }) => {
    await checkoutPage.goto();
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator(".page-title")).toHaveText("Your Cart");
  });
});

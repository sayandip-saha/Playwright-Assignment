// @ts-check

import { test, expect } from "@playwright/test";

import InventoryPage from "../../pages/InventoryPage.js";
import CartPage from "../../pages/CartPage.js";
import CheckoutStepOnePage from "../../pages/CheckoutStepOnePage.js";
import CheckoutStepTwoPage from "../../pages/CheckoutStepTwoPage.js";

test.describe("Checkout Step Two Functionality", () => {
  /** @type {InventoryPage} */
  let inventoryPage;
  /** @type {CartPage} */
  let cartPage;
  /** @type {CheckoutStepOnePage} */
  let checkoutStepOne;
  /** @type {CheckoutStepTwoPage} */
  let checkoutStepTwo;
  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOne = new CheckoutStepOnePage(page);
    checkoutStepTwo = new CheckoutStepTwoPage(page);
  });

  async function goToCheckoutOverview() {
    await inventoryPage.goto();
    await inventoryPage.addProduct(0);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutStepOne.fillCustomerInformation("User", "User", "700001");
    await checkoutStepOne.continue();
    await expect(checkoutStepTwo.pageTitle).toHaveText("Checkout: Overview");
  }

  test("Checkout overview displays customer order", async () => {
    await goToCheckoutOverview();
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
    await inventoryPage.goto();
    const productName = await inventoryPage.getProductName(0);
    expect(productName).not.toBeNull();
    await inventoryPage.addProduct(0);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutStepOne.fillCustomerInformation("User", "User", "700001");
    await checkoutStepOne.continue();
    await expect(page.getByText(productName, { exact: true })).toBeVisible();
    await expect(checkoutStepTwo.productNames.first()).toBeVisible();
  });

  test("Finish checkout successfully", async ({ page }) => {
    await goToCheckoutOverview();
    await checkoutStepTwo.finishCheckout();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.locator(".page-title")).toHaveText("Checkout: Complete!");
  });

  test("Cancel checkout from overview", async ({ page }) => {
    await goToCheckoutOverview();
    await checkoutStepTwo.cancelCheckout();
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator(".page-title")).toHaveText("Your Cart");
  });
});

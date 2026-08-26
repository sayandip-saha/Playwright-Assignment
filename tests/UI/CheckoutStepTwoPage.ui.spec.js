// @ts-check

import { test, expect } from "@playwright/test";

import CheckoutStepTwoPage from "../../pages/CheckoutStepTwoPage.js";

test.describe("Checkout Step Two UI", () => {
  /** @type {CheckoutStepTwoPage} */
  let checkoutPage;
  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutStepTwoPage(page);

    await checkoutPage.goto();
  });

  test("Show checkout overview header", async () => {
    // Burger menu
    await expect(checkoutPage.burgerMenu).toBeVisible();
    // Brand title
    await expect(checkoutPage.brandTitle).toHaveText(/TTACart/);
    // Cart link
    await expect(checkoutPage.cartLink).toBeVisible();
    // Page title
    await expect(checkoutPage.pageTitle).toContainText("Checkout: Overview");
  });

  test("Show cart information", async () => {
    await expect(checkoutPage.cartHeader).toContainText("QTY");

    await expect(checkoutPage.cartHeader).toContainText("Description");
  });

  test("Show order summary", async () => {
    await expect(checkoutPage.summaryBlock).toContainText(
      "Payment Information:",
    );
    await expect(checkoutPage.summaryBlock).toContainText(
      "Shipping Information:",
    );
    await expect(checkoutPage.summaryBlock).toContainText("Price Total");
    await expect(checkoutPage.summaryBlock).toContainText("Total:");
  });

  test("Show checkout action buttons", async () => {
    // Cancel
    await expect(checkoutPage.cancelButton).toContainText("Cancel");
    // Finish
    await expect(checkoutPage.finishButton).toContainText("Finish");
  });

  test("Show Footer", async () => {
    // Footer
    await expect(checkoutPage.footer).toBeVisible();
    // Footer icons
    await expect(checkoutPage.twitterIcon).toBeVisible();
    await expect(checkoutPage.facebookIcon).toBeVisible();
    await expect(checkoutPage.linkedinIcon).toBeVisible();
    // Footer text
    await expect(checkoutPage.footerText).toHaveText(
      "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy",
    );
  });
});

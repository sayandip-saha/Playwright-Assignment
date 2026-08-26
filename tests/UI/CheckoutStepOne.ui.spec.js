// @ts-check

import { test, expect } from "@playwright/test";
import CheckoutStepOnePage from "../../pages/CheckoutStepOnePage.js";

test.describe("Checkout Step One UI", () => {
  /** @type {CheckoutStepOnePage} */
  let checkoutPage;
  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutStepOnePage(page);

    await checkoutPage.goto();
  });

  test("Show checkout information header", async () => {
    // Burger menu
    await expect(checkoutPage.burgerMenu).toBeVisible();
    // Brand title
    await expect(checkoutPage.brandTitle).toHaveText(/TTACart/);
    // Cart link
    await expect(checkoutPage.cartLink).toBeVisible();

    // Page title
    await expect(checkoutPage.pageTitle).toContainText(
      "Checkout: Your Information",
    );
  });

  test("Show customer information form", async () => {
    // First name
    await expect(checkoutPage.firstNameInput).toHaveAttribute(
      "placeholder",
      "First Name",
    );
    // Last name
    await expect(checkoutPage.lastNameInput).toHaveAttribute(
      "placeholder",
      "Last Name",
    );
    // Postal code
    await expect(checkoutPage.postalCodeInput).toHaveAttribute(
      "placeholder",
      "Zip/Postal Code",
    );
  });

  test("Show checkout action buttons", async () => {
    // Continue
    await expect(checkoutPage.continueButton).toContainText("Continue");
    // Cancel
    await expect(checkoutPage.cancelButton).toContainText("Cancel");
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

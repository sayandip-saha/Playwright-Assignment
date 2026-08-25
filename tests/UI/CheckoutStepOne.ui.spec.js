// @ts-check

import { test, expect } from "@playwright/test";
import CheckoutStepOnePage from "../../pages/CheckoutStepOnePage.js";

test.describe("Checkout Step One UI", () => {
  test("Show burger menu", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.burgerMenu).toBeVisible();
  });

  test("Show Title", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.brandTitle).toHaveText(/TTACart/);
  });

  test("Show Checkout Information", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.pageTitle).toContainText(
      "Checkout: Your Information",
    );
  });

  test("Show Your Cart", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.cartLink).toBeVisible();
  });

  test("Show Input Placeholders", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.firstNameInput).toHaveAttribute(
      "placeholder",
      "First Name",
    );
    await expect(checkoutPage.lastNameInput).toHaveAttribute(
      "placeholder",
      "Last Name",
    );
    await expect(checkoutPage.postalCodeInput).toHaveAttribute(
      "placeholder",
      "Zip/Postal Code",
    );
  });

  test("Show Continue Button", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.continueButton).toContainText("Continue");
  });

  test("Show Cancel Button", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.cancelButton).toContainText("Cancel");
  });

  test("Show Footer", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.footer).toBeVisible();
  });

  test("Show Footer icons", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.twitterIcon).toBeVisible();
    await expect(checkoutPage.facebookIcon).toBeVisible();
    await expect(checkoutPage.linkedinIcon).toBeVisible();
  });

  test("Show Footer text", async ({ page }) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await checkoutPage.goto();
    await expect(checkoutPage.footerText).toHaveText(
      "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy",
    );
  });
});

// @ts-check

export class FooterComponent {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.footer = page.locator('[data-test="footer"]');

    this.twitterIcon = page.locator(
      '[data-test="social-twitter"]'
    );

    this.facebookIcon = page.locator(
      '[data-test="social-facebook"]'
    );

    this.linkedinIcon = page.locator(
      '[data-test="social-linkedin"]'
    );

    this.footerText = page.locator(
      '[data-test="footer-copy"]'
    );
  }
}
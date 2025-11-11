import { Page } from '@playwright/test';
import { extractNumber, getNumericValue } from '../helpers/numericHelpers';

export class EarnPage {
  constructor(private page: Page) {}

  async open(baseUrl: string) {
    await this.page.goto(`${baseUrl}/overview`);
    await this.page.locator('[data-test="widget_navbar_tab_earn"]').click();
  }

  async selectAsset(assetName: string) {
    await this.page
      .locator('[data-test="widget_earn_select_asset_dropdown_trigger"]')
      .click();
    await this.page
      .getByRole('button', { name: new RegExp(assetName) })
      .click();
  }

  async clickMax() {
    await this.page
      .locator('[data-test="widget_earn_input_max_button"]')
      .click();
  }

  async getEnteredAmount(): Promise<number> {
    const input = this.page.getByRole('textbox', { name: '0.00' });
    return getNumericValue(input);
  }

  async getAvailableBalance(): Promise<number> {
    const available = await this.page.locator('text=/Available/i').first();
    const container = await available.locator('xpath=ancestor::*[1]');
    const text = await container.innerText();
    return extractNumber(text);
  }
}

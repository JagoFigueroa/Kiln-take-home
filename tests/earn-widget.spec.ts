import { test, expect } from '@playwright/test';
import { EarnPage } from '../pages/EarnPage';

const BASE_URL = process.env.BASE_URL || 'https://widget.devnet.kiln.fi';
const ASSET_NAME = process.env.ASSET_NAME || 'ETH ETH 1';
const STAKING_UNIT = Number(process.env.STAKING_UNIT) || 32;

test.describe('Kiln Widget - Earning MAX ETH', () => {
  test('should set MAX amount to a multiple of 32 ETH within available balance', async ({ page }) => {
    const earnPage = new EarnPage(page);

    await test.step('Navigate to Earn page', async () => {
      await earnPage.open(BASE_URL);
    });

    await test.step(`Select asset: ${ASSET_NAME}`, async () => {
      await earnPage.selectAsset(ASSET_NAME);
    });

    await test.step('Click MAX button and validate value', async () => {
      await earnPage.clickMax();

      const enteredAmount = await earnPage.getEnteredAmount();
      console.log('Entered amount:', enteredAmount);
      expect(enteredAmount % STAKING_UNIT).toBe(0);

      const availableBalance = await earnPage.getAvailableBalance();
      console.log('Available balance:', availableBalance);

      const expectedMax =
        Math.floor(availableBalance / STAKING_UNIT) * STAKING_UNIT;
      console.log('Expected MAX (multiple of 32):', expectedMax);

      expect(enteredAmount).toBe(expectedMax);
    });
  });
});
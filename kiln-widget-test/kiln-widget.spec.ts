import { test, expect, Page } from '@playwright/test';

const STAKING_UNIT = 32;
const ASSET_NAME = 'ETH ETH 14,132.60';

// Helper: Extract numeric value from text
async function extractNumber(text: string): Promise<number> {
    const value = parseFloat(text.replace(/[^\d.]/g, ''));
    expect(!isNaN(value), `Expected numeric value, got "${text}"`).toBeTruthy();
    return value;
}

// Helper: Get numeric value from input by role name
async function getNumericValue(page: Page, locatorRoleName: string) {
    const input = page.getByRole('textbox', { name: locatorRoleName });
    return extractNumber(await input.inputValue());
}

// Helper: Get numeric available balance
async function getAvailableBalance(page: Page) {
    const text = await page.getByText(/Available/i).locator('..').innerText();
    return extractNumber(text);
}

test.describe('Kiln Widget - Earning MAX ETH', () => {
    test('Max value is a multiple of 32 ETH and is the max we can set compared to the current available balance', async ({ page }) => {

        // 1. Navigate to the Kiln widget
        await page.goto('https://widget.devnet.kiln.fi/overview');

        // 2. Access the Earn page
        await page.locator('[data-test="widget_navbar_tab_earn"]').click();

        // 3. Select ETH
        await page.locator('[data-test="widget_earn_select_asset_dropdown_trigger"]').click();
        await page.getByRole('button', { name: new RegExp(ASSET_NAME) }).click();
        //await page.getByRole('button', { name: 'ETH' }).nth(1).click(); works in debug mode only
        //as there are 2 buttons with the same name I had to do it like this and specify the second element with the same name

        // 4. Click on MAX
        await page.locator('[data-test="widget_earn_input_max_button"]').click();

        // 5. Check displayed value is a multiple of 32
        const numericValue = await getNumericValue(page, '0.00');
        //no data-test id, so I had to go with the placeholder atribute
        expect(numericValue % STAKING_UNIT).toBe(0);
        console.log('Displayed value:', numericValue);

        // 6. Check that displayed value is the max we can set to the current available balance
        const availableBalance = await getAvailableBalance(page);
        console.log('Available balance:', availableBalance);

        const maxAllowed = Math.floor(availableBalance / STAKING_UNIT) * STAKING_UNIT;
        console.log('Max allowed multiple of 32:', maxAllowed);
        expect(numericValue).toBe(maxAllowed);
    });
});

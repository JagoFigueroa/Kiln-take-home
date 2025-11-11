import { Locator, expect } from '@playwright/test';

export async function extractNumber(text: string): Promise<number> {
    const value = parseFloat(text.replace(/[^\d.]/g, ''));
    expect(!isNaN(value), `Expected numeric value, got "${text}"`).toBeTruthy();
    return value;
}

export async function getNumericValue(locator: Locator): Promise<number> {
    try {
        const tagName = await locator.evaluate(el => el.tagName.toLowerCase());
        if (tagName === 'input' || tagName === 'textarea') {
            const value = await locator.inputValue();
            return extractNumber(value);
        }

        const text = await locator.innerText();
        return extractNumber(text);

    } catch (err) {
        throw new Error(
            `Failed to extract numeric value from locator: ${(err as Error).message}`
        );
    }
}

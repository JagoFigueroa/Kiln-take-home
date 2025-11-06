# Kiln Widget Automated Test

This repository contains an automated test for the Kiln widget.

## Test Objectives

- Access the Earn page
- Select ETH
- Click on MAX
- Validate:
  - Displayed value is a multiple of 32 ETH
  - Displayed value is the max setable 

## Implementation notes

- Written with Playwright and TypeScript
- Uses helper functions for numeric extraction and validation
- Includes console logs for additional visibility during test execution
- Added comments for clarity

## How to Run

1. Clone this repository: `git clone https://github.com/JagoFigueroa/kiln-widget-test.git`
   
2. Navigate to the directory containing the test: `cd kiln-widget-test`

3. Install dependencies: `npm install`

4. Run the test: `npm run test` (or `npx playwright test`)

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

- Written using Playwright with TypeScript
- Includes console logs to improve visibility during test execution

## Setup

1. Clone this repository: `git clone https://github.com/JagoFigueroa/Kiln-take-home.git`
   
2. Navigate to the project directory: `cd Kiln‑take‑home`

3. Install dependencies: `npm install`

## Running the test

`npm run test (or npx playwright test)`

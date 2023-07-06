# Instructions

## Prerequisites

Git and npm are installed

## How to setup test environment

1. Clone repository
git clone https://github.com/olenavm/Automation-Tester-Interview.git

2. Change current directory 
cd Automation-Tester-Interview

3. Install Playwright and other packages
npm install

4. Create config file by copying the template
```
copy local.config-copy.js local.config.js
```
Change credentials with real data

## How to run the tests

1. Go to https://dashboard.nexudus.com/billing/products and login as test user.
2. Ensure the Location is equal 'Kalkio Network'
3. Run the tests from command line.

```
npx playwright test
```

## How to view report

```
npx playwright show-report
```
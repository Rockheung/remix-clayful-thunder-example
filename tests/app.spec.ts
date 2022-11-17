import { test, expect } from '@playwright/test';

test('homepage has loaded', async ({ page }) => {
  await page.goto('http://localhost:8080');

  const getStarted = page.getByRole('link', { name: 'Home' });

  await expect(getStarted).toHaveAttribute('href', '/');

});

test('thunder component loaded', async ({page}) => {
  await page.goto('http://localhost:8080');

  const thunderContent = page.getByText("상품").nth(1);

  thunderContent.click();

  await expect(page).toHaveURL(/products/)

  await expect(page.getByText('바로 구매')).toBeVisible()

})
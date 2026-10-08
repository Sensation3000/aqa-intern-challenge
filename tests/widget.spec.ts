import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');

    // close cookies popup
    await page.click('._UCHI_COOKIE__button');
    
    // Wait for network idle to ensure widget is loaded
    await page.waitForLoadState('networkidle'); 
  });

  test('opens', async () => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible()
  });

  test('has correct title', async () => {
    await widgetPage.openWidget();
    await widgetPage.clickFirstPopularArticle();
    await widgetPage.clickWriteToUs();

    expect(await widgetPage.getTitle()).toEqual('Связь с поддержкой');
  });
});

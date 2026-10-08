import {Page} from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test=openWidget]',
    BUTTON_WRITE_TO_US = '[data-test=button_feedback_form]',
    ARTICLE_POPULAR_LIST_ITEM = '[data-testid=article-list-item]',
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER)
    }

    async openWidget() {
        const button = this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN);
        await button.waitFor({ state: 'visible', timeout: 5000 });
        await button.click();
    }

    getPopularArticlesList() {
        return this.page.locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM);
    }

    async clickFirstPopularArticle(){
        const article = this.getPopularArticlesList().first();

        await article.waitFor({ state: 'visible', timeout: 5000 });
        await article.click();
    }

    async clickPopularArticleByTitle(title: string) {
        const article = this.getPopularArticlesList().filter({ hasText: title });

        await article.waitFor({ state: 'visible', timeout: 5000 });
        await article.click();
    }


    async clickWriteToUs() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    async getTitle() {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT).textContent();
    }

    getWidgetBody() {
        return this.page.locator(WidgetPage.selector.WIDGET_BODY);
    }
}


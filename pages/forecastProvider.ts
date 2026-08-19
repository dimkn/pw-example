import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base";

export class ForecastProviderPage extends BasePage {
  private readonly locationInput: Locator;
  private forecastedDays: Locator[] = new Array<Locator>();

  constructor(page: Page) {
    super(page, "") // TODO pass the url

    this.locationInput = this.page.locator("//input[@id='q']")
  }

  public async shouldHaveLocation(city: string) {
    expect(this.locationInput, "Weather forecast was shown to a different location").toHaveText(city);
  }

  public async shouldPredictWeather() {
    this.forecastedDays = await this.page.locator("//span[contains(@class, 'temperatures')]").all();

    expect(this.forecastedDays, "A forecast should exist for a limited amount of days").toHaveLength(4);
    // TODO check data output format
  }
}

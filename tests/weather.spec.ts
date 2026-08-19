import { test } from './fixture'

test.describe('Weather website', () => {
    test('should show weather for the next 4 days', async ({ weather }) => {
        const forDays = 4

        await weather.open()

        await weather.shouldPredictWeather(forDays)
        await weather.shouldHaveLocation('Paris')
    })
})

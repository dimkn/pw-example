import { test } from './fixture'

test.describe('Search engine', () => {
    test.beforeEach(async ({ search }) => {
        await search.open()
    })

    test('should return results related to the search request', async ({
        search,
    }) => {
        const query = 'windy'

        await search.searchFor(query)

        await search.shouldHaveSearchResults(10)
        await search.shouldHaveRelatedResults(query, 6)
    })

    test('should have multiple results for the search request', async ({
        search,
        weather,
    }) => {
        await search.searchFor('windy')
        await search.navigateToFirstResult()

        await weather.shouldBeOpen()
    })
})

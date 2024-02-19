import '../js/number_interval_extensions.js'

test('NumberIntervalExtensions', () => {
    expect((1).second()).toBe(1000)
    expect((1).minute()).toBe(60000)
    expect((1).hour()).toBe(3600000)
    expect((1).day()).toBe(86400000)
    expect((1).week()).toBe(604800000)
    expect((1).fortnight()).toBe(1209600000)
    expect((1).month()).toBe(2592000000)
    expect((1).year()).toBe(31104000000)
});
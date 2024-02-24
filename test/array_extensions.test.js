import '../js/array_extensions.js'

test('ArrayExtensions', () => {
    expect([1, 2, 3].first()).toBe(1);
    expect([1, 2, 3].last()).toBe(3);
    expect([].toSentence()).toBe("");
    expect([1].toSentence()).toBe("1");
    expect([1, 2].toSentence()).toBe("1 and 2");
    expect([1, 2, 3].toSentence()).toBe("1, 2, and 3");
})
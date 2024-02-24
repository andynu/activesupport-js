import {$Q} from '../js/string_interpolation.js'

test('StringInterpolation', () => {

    expect($Q("Hello, #{name}!", {name: "World"})).toBe("Hello, World!");

    window.name = "World";
    expect($Q("Hello, #{name}!")).toBe("Hello, World!");
})
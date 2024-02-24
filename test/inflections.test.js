/* global expect */
import {Inflector} from '../js/inflections.js'

test('Inflections', () => {
    expect(Inflector.pluralize('word')).toBe('words');
    expect(Inflector.pluralize('hive')).toBe('hives');
    expect(Inflector.pluralize('octopus')).toBe('octopi');
    expect(Inflector.pluralize('status')).toBe('statuses');
    expect(Inflector.pluralize('axis')).toBe('axes');
    expect(Inflector.pluralize('equipment')).toBe('equipment');
    expect(Inflector.pluralize('information')).toBe('information');

    expect(Inflector.singularize('words')).toBe('word');
    expect(Inflector.singularize('hives')).toBe('hive');
    expect(Inflector.singularize('equipment')).toBe('equipment');

    expect(Inflector.ordinalize(1)).toBe('1st');
    expect(Inflector.ordinalize(2)).toBe('2nd');
    expect(Inflector.ordinalize(3)).toBe('3rd');
    expect(Inflector.ordinalize(4)).toBe('4th');
    expect(Inflector.ordinalize(11)).toBe('11th');
    expect(Inflector.ordinalize(12)).toBe('12th');
    expect(Inflector.ordinalize(13)).toBe('13th');
    expect(Inflector.ordinalize(14)).toBe('14th');
    expect(Inflector.ordinalize(21)).toBe('21st');
    expect(Inflector.ordinalize(22)).toBe('22nd');
    expect(Inflector.ordinalize(23)).toBe('23rd');
    expect(Inflector.ordinalize(24)).toBe('24th');
    expect(Inflector.ordinalize(101)).toBe('101st');
    expect(Inflector.ordinalize(102)).toBe('102nd');
    expect(Inflector.ordinalize(103)).toBe('103rd');
    expect(Inflector.ordinalize(104)).toBe('104th');
    expect(Inflector.ordinalize(111)).toBe('111th');
    expect(Inflector.ordinalize(112)).toBe('112th');
    expect(Inflector.ordinalize(113)).toBe('113th');
    expect(Inflector.ordinalize(114)).toBe('114th');
    expect(Inflector.ordinalize(1001)).toBe('1001st');
    expect(Inflector.ordinalize(1002)).toBe('1002nd');
    expect(Inflector.ordinalize(1003)).toBe('1003rd');
    expect(Inflector.ordinalize(1004)).toBe('1004th');
    expect(Inflector.ordinalize(1011)).toBe('1011th');
    expect(Inflector.ordinalize(1012)).toBe('1012th');
    expect(Inflector.ordinalize(1013)).toBe('1013th');
    expect(Inflector.ordinalize(1014)).toBe('1014th');
    expect(Inflector.ordinalize(1111)).toBe('1111th');

    expect("one".pluralize()).toBe("ones")
    expect("ones".singularize()).toBe("one")
    expect((1).ordinalize()).toBe("1st")
});

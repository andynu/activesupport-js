import {pluralize} from '../js/active_support.js';

test('ActiveSupport', () => {
    expect(pluralize(1, 'word')).toBe('1 word');
    expect(pluralize(2, 'word')).toBe('2 words');
    expect(pluralize(1, 'hive')).toBe('1 hive');
    expect(pluralize(2, 'hive')).toBe('2 hives');
    expect(pluralize(1, 'octopus')).toBe('1 octopus');
    // expect(pluralize(1, 'status')).toBe('1 status');
    // expect(pluralize(2, 'status')).toBe('2 statuses');
    // expect(pluralize(1, 'axis')).toBe('1 axis');
    // expect(pluralize(2, 'axis')).toBe('2 axes');
    // expect(pluralize(1, 'equipment')).toBe('1 equipment');
    // expect(pluralize(2, 'equipment')).toBe('2 equipment');
    // expect(pluralize(1, 'information')).toBe('1 information');
    // expect(pluralize(2, 'information')).toBe('2 information');
})
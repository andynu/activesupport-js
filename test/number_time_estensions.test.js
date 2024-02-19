import '../js/number_time_extensions.js'
import {jest} from '@jest/globals';

test('TimeExtensions', () => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2023-01-01T00:00:00Z'));

    expect((0).since()).toEqual(new Date());
    expect((0).ago()).toEqual(new Date());
    expect((0).fromNow()).toEqual(new Date());
    expect((0).toDate()).toEqual(new Date());
    expect((0).until()).toEqual(new Date());

    expect((1000).since()).toEqual(new Date('2023-01-01T00:00:01Z'));
    expect((1000).ago()).toEqual(new Date('2022-12-31T23:59:59Z'));
    expect((1000).fromNow()).toEqual(new Date('2023-01-01T00:00:01Z'));
    expect((1000).toDate()).toEqual(new Date('2022-12-31T23:59:59Z'));
    expect((1000).until()).toEqual(new Date('2022-12-31T23:59:59Z'));

    expect((1000).since(new Date('2023-01-01T00:00:00Z'))).toEqual(new Date('2023-01-01T00:00:01Z'));
    expect((1000).ago(new Date('2023-01-01T00:00:00Z'))).toEqual(new Date('2022-12-31T23:59:59Z'));
    expect((1000).fromNow(new Date('2023-01-01T00:00:00Z'))).toEqual(new Date('2023-01-01T00:00:01Z'));
    expect((1000).toDate(new Date('2023-01-01T00:00:00Z'))).toEqual(new Date('2022-12-31T23:59:59Z'));
    expect((1000).until(new Date('2023-01-01T00:00:00Z'))).toEqual(new Date('2022-12-31T23:59:59Z'));

    // In practice these go very well with the NumberIntervalExtensions, but I don't want to mix the testing.
    // e.g. expect((1).second().since()).toEqual(new Date('2023-01-01T00:00:01Z'));

    jest.useRealTimers();
});
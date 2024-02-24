/* global expect */
import '../js/date_extensions.js'
import '../js/number_interval_extensions.js'
import {jest} from "@jest/globals";

test('DateExtensions', () => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2023-01-01T00:00:00'));
    const date = new Date('2023-01-01T00:00:00');

    // today
    expect(Date.today()).toEqual(new Date('2023-01-01T00:00:00'));

    expect(date.getMonth()).toEqual(0);
    expect(date.getMonthName()).toEqual('January');
    expect(date.getDayName()).toEqual('Sunday');

    const leapYears = [ 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048]
    for(let year=2000; year<=2048; year++){
        let date = new Date(year, 1, 1); // feb 1st
        if (leapYears.includes(year)) {
            expect(date.isLeapYear()).toEqual(true);
            expect(date.getDaysInMonth()).toEqual(29);
        } else {
            expect(date.isLeapYear()).toEqual(false);
            expect(date.getDaysInMonth()).toEqual(28);
        }
    }

    let relative_expectations = [
        [(-1).day(),'yesterday at 00:00'],
        [(0).second(),'less than a minute'],
        [(10).minute(),'about 10 minutes'],
        [(1).hour(),'about an hour'],
        [(2).hour(),'about 2 hours'],
        [(3).hour(),'around 3 hours'],
        [(1).day(),'tomorrow at 00:00'],
        [(2).day(),'Jan 3rd at 00:00'],
        [(3).day(),'Jan 4th at 00:00'],
    ]
    relative_expectations.forEach(([offset, expectation]) => {
        expect(offset.since(date).relativeTime()).toEqual(expectation);
    });

    // relativeDate test
    let relativeDate_expectations = [
        [(-1).day(),'yesterday'],
        [(0).second(),'today'],
        [(1).day(),'tomorrow'],
        [(2).day(),'Jan 3rd'],
        [(3).day(),'Jan 4th'],
    ]
    relativeDate_expectations.forEach(([offset, expectation]) => {
        expect(offset.since(date).relativeDate()).toEqual(expectation);
    });

    expect(date.since((1).second())).toEqual(new Date('2023-01-01T00:00:01'));
    expect(date.ago((1).second())).toEqual(new Date('2022-12-31T23:59:59'));
    expect(date.beginningOfDay()).toEqual(new Date('2023-01-01T00:00:00'));

    expect(date.beginningOfWeek()).toEqual(new Date('2022-12-26T00:00:00'));
    expect((new Date(2023, 1, 8)).beginningOfWeek()).toEqual(new Date('2023-02-06T00:00:00'));

    expect(date.beginningOfMonth()).toEqual(new Date('2023-01-01T00:00:00'));
    expect(date.beginningOfQuarter()).toEqual(new Date('2023-01-01T00:00:00'));

    expect((new Date(2023, 1, 1)).beginningOfQuarter()).toEqual(new Date('2023-01-01T00:00:00'));
    expect((new Date(2023, 4, 1)).beginningOfQuarter()).toEqual(new Date('2023-04-01T00:00:00'));
    expect((new Date(2023, 7, 1)).beginningOfQuarter()).toEqual(new Date('2023-07-01T00:00:00'));
    expect((new Date(2023, 10, 1)).beginningOfQuarter()).toEqual(new Date('2023-10-01T00:00:00'));

    expect(date.beginningOfYear()).toEqual(new Date('2023-01-01T00:00:00'));
    expect(new Date(2023, 6, 6).beginningOfYear()).toEqual(new Date('2023-01-01T00:00:00'));
    expect(date.endOfDay()).toEqual(new Date('2023-01-01T23:59:59.999'));
    expect(date.endOfWeek()).toEqual(new Date('2023-01-02T23:59:59.999'));
    expect(date.endOfMonth()).toEqual(new Date('2023-01-31T23:59:59.999'));

    expect(new Date(2023, 0, 1).endOfQuarter()).toEqual(new Date('2023-03-31T23:59:59.999'));
    expect(new Date(2023, 3, 1).endOfQuarter()).toEqual(new Date('2023-06-30T23:59:59.999'));
    expect(new Date(2023, 6, 1).endOfQuarter()).toEqual(new Date('2023-09-30T23:59:59.999'));
    expect(new Date(2023, 9, 1).endOfQuarter()).toEqual(new Date('2023-12-31T23:59:59.999'));

    expect(date.yesterday()).toEqual(new Date('2022-12-31T00:00:00'));
    expect(date.tomorrow()).toEqual(new Date('2023-01-02T00:00:00'));

    expect(date.toFormattedString('%Y-%m-%d')).toEqual('2023-01-01');
    expect(date.toFormattedString('%Y-%m-%d %H:%M:%S')).toEqual('2023-01-01 00:00:00');
    expect(date.toFormattedString('%Y-%m-%d %H:%M:%S %A')).toEqual('2023-01-01 00:00:00 Sunday');
    expect(date.toFormattedString('%Y-%m-%d %H:%M:%S %a')).toEqual('2023-01-01 00:00:00 Sun');
    expect(date.toFormattedString('%Y-%m-%d %H:%M:%S %B')).toEqual('2023-01-01 00:00:00 January');
    expect(date.toFormattedString('%Y-%m-%d %H:%M:%S %b')).toEqual('2023-01-01 00:00:00 Jan');
    expect(date.toFormattedString('%Y-%m-%d %H:%M:%S %p')).toEqual('2023-01-01 00:00:00 AM');
    expect(date.toFormattedString('%Y-%m-%d %H:%M:%S %P')).toEqual('2023-01-01 00:00:00 am');
    expect(date.toFormattedString('%Y-%m-%d %I:%M:%S')).toEqual('2023-01-01 00:00:00');
    expect(date.toFormattedString('%c')).toEqual('1/1/2023, 12:00:00 AM');
    // catch error
    expect(() => date.toFormattedString('%j')).toThrow('not implemented');
    expect(() => date.toFormattedString('%U')).toThrow('not implemented');
    expect(() => date.toFormattedString('%W')).toThrow('not implemented');
    expect(date.toFormattedString('%w')).toEqual('0');
    expect(() => date.toFormattedString('%x')).toThrow('not implemented');
    expect(() => date.toFormattedString('%X')).toThrow('not implemented');
    expect(date.toFormattedString('%y')).toEqual('123');
    expect(date.toFormattedString('%Y')).toEqual('2023');
    expect(() => date.toFormattedString('%Z')).toThrow('not implemented');

    expect(date.succ()).toEqual(new Date('2023-01-01T00:00:01'));

    expect(date.isToday()).toEqual(true);

    expect(date.atBeginningOfDay()).toEqual(new Date('2023-01-01T00:00:00'));
    expect(date.atBeginningOfWeek()).toEqual(new Date('2022-12-26T00:00:00'));
    expect(date.atBeginningOfMonth()).toEqual(new Date('2023-01-01T00:00:00'));
    expect(date.atBeginningOfQuarter()).toEqual(new Date('2023-01-01T00:00:00'));
    expect(date.atBeginningOfYear()).toEqual(new Date('2023-01-01T00:00:00'));
    expect(date.atEndOfDay()).toEqual(new Date('2023-01-01T23:59:59.999'));
    expect(date.atEndOfMonth()).toEqual(new Date('2023-01-31T23:59:59.999'));
    expect(date.atEndOfQuarter()).toEqual(new Date('2023-03-31T23:59:59.999'));



    let d = new Date('2023-01-01T00:00:00'); // Sunday
    let day_truths = [false, false, false, false, false, false, true]
    for (let i = 0; i < 7; i++) {
        expect(d.isMonday()).toEqual(day_truths[0]);
        expect(d.isTuesday()).toEqual(day_truths[1]);
        expect(d.isWednesday()).toEqual(day_truths[2]);
        expect(d.isThursday()).toEqual(day_truths[3]);
        expect(d.isFriday()).toEqual(day_truths[4]);
        expect(d.isSaturday()).toEqual(day_truths[5]);
        expect(d.isSunday()).toEqual(day_truths[6]);
        d = d.since((1).day());
        day_truths.unshift(day_truths.pop());
    }


    jest.useRealTimers();
});
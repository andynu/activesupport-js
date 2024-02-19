 import '../js/number_byte_extensions.js';

test('NumberByteExtensions', () => {
	// Single method names
	expect((1).byte()).toBe(1);
	expect((1).kilobyte()).toBe(1024);
	expect((1).megabyte()).toBe(1024 * 1024);
	expect((1).gigabyte()).toBe(1024 * 1024 * 1024);
	expect((1).terabyte()).toBe(1024 * 1024 * 1024 * 1024);
	expect((1).petabyte()).toBe(1024 * 1024 * 1024 * 1024 * 1024);
	expect((1).exabyte()).toBe(1024 * 1024 * 1024 * 1024 * 1024 * 1024);

	// Pluralize method names
	expect((1).bytes()).toBe(1);
	expect((1).kilobytes()).toBe(1024);
	expect((1).megabytes()).toBe(1024 * 1024);
	expect((1).gigabytes()).toBe(1024 * 1024 * 1024);
	expect((1).terabytes()).toBe(1024 * 1024 * 1024 * 1024);
	expect((1).petabytes()).toBe(1024 * 1024 * 1024 * 1024 * 1024);
	expect((1).exabytes()).toBe(1024 * 1024 * 1024 * 1024 * 1024 * 1024);
});

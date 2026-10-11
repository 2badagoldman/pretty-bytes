import test from 'ava';
import prettyBytes from './index.js';

test('throws on invalid input', t => {
	t.throws(() => {
		prettyBytes('');
	});

	t.throws(() => {
		prettyBytes('1');
	});

	t.throws(() => {
		prettyBytes(Number.NaN);
	});

	t.throws(() => {
		prettyBytes(true);
	});

	t.throws(() => {
		prettyBytes(Number.POSITIVE_INFINITY);
	});

	t.throws(() => {
		prettyBytes(Number.NEGATIVE_INFINITY);
	});

	t.throws(() => {
		prettyBytes(null);
	});

	// Invalid fixedWidth
	t.throws(() => {
		prettyBytes(1337, {fixedWidth: -1});
	});

	t.throws(() => {
		prettyBytes(1337, {fixedWidth: 1.5});
	});
});

test('converts bytes to human readable strings', t => {
	t.is(prettyBytes(0), '0 B');
	t.is(prettyBytes(0n), '0 B');
	t.is(prettyBytes(0.4), '0.4 B');
	t.is(prettyBytes(0.7), '0.7 B');
	t.is(prettyBytes(0.001), '0.001 B');
	t.is(prettyBytes(0.0001), '0.0001 B');
	t.is(prettyBytes(0.1005), '0.101 B');
	t.is(prettyBytes(0.123_456), '0.123 B');
	t.is(prettyBytes(10), '10 B');
	t.is(prettyBytes(10n), '10 B');
	t.is(prettyBytes(10.1), '10.1 B');
	t.is(prettyBytes(999), '999 B');
	t.is(prettyBytes(999n), '999 B');
	t.is(prettyBytes(1001), '1 kB');
	t.is(prettyBytes(1001n), '1 kB');
	t.is(prettyBytes(1e16), '10 PB');
	t.is(prettyBytes(10n ** 16n), '10 PB');
	t.is(prettyBytes(1e30), '1000000 YB');
	t.is(prettyBytes(10n ** 30n), '1000000 YB');
	t.is(prettyBytes(827_181 * 1e26), '82718100 YB');
});

test('supports negative number', t => {
	t.is(prettyBytes(-0.4), '-0.4 B');
	t.is(prettyBytes(-0.7), '-0.7 B');
	t.is(prettyBytes(-10.1), '-10.1 B');
	t.is(prettyBytes(-999), '-999 B');
	t.is(prettyBytes(-999n), '-999 B');
	t.is(prettyBytes(-1001), '-1 kB');
	t.is(prettyBytes(-1001n), '-1 kB');
});

test('locale option', t => {
	t.is(prettyBytes(-0.4, {locale: 'de'}), '-0,4 B');
	t.is(prettyBytes(0.4, {locale: 'de'}), '0,4 B');
	t.is(prettyBytes(1001, {locale: 'de'}), '1 kB');
	t.is(prettyBytes(1001n, {locale: 'de'}), '1 kB');
	t.is(prettyBytes(10.1, {locale: 'de'}), '10,1 B');
	t.is(prettyBytes(1e30, {locale: 'de'}), '1.000.000 YB');
	t.is(prettyBytes(10n ** 30n, {locale: 'de'}), '1.000.000 YB');
	t.is(prettyBytes(827_181 * 1e26, {locale: 'de'}), '82.718.100 YB');

	t.is(prettyBytes(-0.4, {locale: 'en'}), '-0.4 B');
	t.is(prettyBytes(0.4, {locale: 'en'}), '0.4 B');
	t.is(prettyBytes(1001, {locale: 'en'}), '1 kB');
	t.is(prettyBytes(1001n, {locale: 'en'}), '1 kB');
	t.is(prettyBytes(10.1, {locale: 'en'}), '10.1 B');
	t.is(prettyBytes(1e30, {locale: 'en'}), '1,000,000 YB');
	t.is(prettyBytes(10n ** 30n, {locale: 'en'}), '1,000,000 YB');
	t.is(prettyBytes(827_181 * 1e26, {locale: 'en'}), '82,718,100 YB');

	t.is(prettyBytes(-0.4, {locale: ['unknown', 'de', 'en']}), '-0,4 B');
	t.is(prettyBytes(0.4, {locale: ['unknown', 'de', 'en']}), '0,4 B');
	t.is(prettyBytes(1001, {locale: ['unknown', 'de', 'en']}), '1 kB');
	t.is(prettyBytes(1001n, {locale: ['unknown', 'de', 'en']}), '1 kB');
	t.is(prettyBytes(10.1, {locale: ['unknown', 'de', 'en']}), '10,1 B');
	t.is(prettyBytes(1e30, {locale: ['unknown', 'de', 'en']}), '1.000.000 YB');
	t.is(prettyBytes(10n ** 30n, {locale: ['unknown', 'de', 'en']}), '1.000.000 YB');
	t.is(prettyBytes(827_181 * 1e26, {locale: ['unknown', 'de', 'en']}), '82.718.100 YB');

	t.is(prettyBytes(-0.4, {locale: true}), '-0.4 B');
	t.is(prettyBytes(0.4, {locale: true}), '0.4 B');
	t.is(prettyBytes(1001, {locale: true}), '1 kB');
	t.is(prettyBytes(1001n, {locale: true}), '1 kB');
	t.is(prettyBytes(10.1, {locale: true}), '10.1 B');
	t.is(prettyBytes(1e30, {locale: true}), '1,000,000 YB');
	t.is(prettyBytes(10n ** 30n, {locale: true}), '1,000,000 YB');
	t.is(prettyBytes(827_181 * 1e26, {locale: true}), '82,718,100 YB');

	t.is(prettyBytes(-0.4, {locale: false}), '-0.4 B');
	t.is(prettyBytes(0.4, {locale: false}), '0.4 B');
	t.is(prettyBytes(1001, {locale: false}), '1 kB');
	t.is(prettyBytes(1001n, {locale: false}), '1 kB');
	t.is(prettyBytes(10.1, {locale: false}), '10.1 B');
	t.is(prettyBytes(1e30, {locale: false}), '1000000 YB');
	t.is(prettyBytes(10n ** 30n, {locale: false}), '1000000 YB');
	t.is(prettyBytes(827_181 * 1e26, {locale: false}), '82718100 YB');

	t.is(prettyBytes(-0.4, {locale: undefined}), '-0.4 B');
	t.is(prettyBytes(0.4, {locale: undefined}), '0.4 B');
	t.is(prettyBytes(1001, {locale: undefined}), '1 kB');
	t.is(prettyBytes(1001n, {locale: undefined}), '1 kB');
	t.is(prettyBytes(10.1, {locale: undefined}), '10.1 B');
	t.is(prettyBytes(1e30, {locale: undefined}), '1000000 YB');
	t.is(prettyBytes(10n ** 30n, {locale: undefined}), '1000000 YB');
	t.is(prettyBytes(827_181 * 1e26, {locale: undefined}), '82718100 YB');
});

test('signed option', t => {
	t.is(prettyBytes(42, {signed: true}), '+42 B');
	t.is(prettyBytes(42n, {signed: true}), '+42 B');
	t.is(prettyBytes(-13, {signed: true}), '-13 B');
	t.is(prettyBytes(-13n, {signed: true}), '-13 B');
	t.is(prettyBytes(0, {signed: true}), ' 0 B');
	t.is(prettyBytes(0n, {signed: true}), ' 0 B');
});

test('bits option', t => {
	t.is(prettyBytes(0, {bits: true}), '0 b');
	t.is(prettyBytes(0n, {bits: true}), '0 b');
	t.is(prettyBytes(0.4, {bits: true}), '0.4 b');
	t.is(prettyBytes(0.7, {bits: true}), '0.7 b');
	t.is(prettyBytes(10, {bits: true}), '10 b');
	t.is(prettyBytes(10n, {bits: true}), '10 b');
	t.is(prettyBytes(10.1, {bits: true}), '10.1 b');
	t.is(prettyBytes(999, {bits: true}), '999 b');
	t.is(prettyBytes(999n, {bits: true}), '999 b');
	t.is(prettyBytes(1001, {bits: true}), '1 kbit');
	t.is(prettyBytes(1001n, {bits: true}), '1 kbit');
	t.is(prettyBytes(1e16, {bits: true}), '10 Pbit');
	t.is(prettyBytes(10n ** 16n, {bits: true}), '10 Pbit');
	t.is(prettyBytes(1e30, {bits: true}), '1000000 Ybit');
	t.is(prettyBytes(10n ** 30n, {bits: true}), '1000000 Ybit');
	t.is(prettyBytes(827_181 * 1e26, {bits: true}), '82718100 Ybit');
});

test('binary option', t => {
	t.is(prettyBytes(0, {binary: true}), '0 B');
	t.is(prettyBytes(0n, {binary: true}), '0 B');
	t.is(prettyBytes(4, {binary: true}), '4 B');
	t.is(prettyBytes(4n, {binary: true}), '4 B');
	t.is(prettyBytes(10, {binary: true}), '10 B');
	t.is(prettyBytes(10n, {binary: true}), '10 B');
	t.is(prettyBytes(10.1, {binary: true}), '10.1 B');
	t.is(prettyBytes(999, {binary: true}), '999 B');
	t.is(prettyBytes(999n, {binary: true}), '999 B');
	t.is(prettyBytes(1025, {binary: true}), '1 KiB');
	t.is(prettyBytes(1025n, {binary: true}), '1 KiB');
	t.is(prettyBytes(1001, {binary: true}), '1001 B');
	t.is(prettyBytes(1001n, {binary: true}), '1001 B');
	t.is(prettyBytes(1e16, {binary: true}), '8.88 PiB');
	t.is(prettyBytes(10n ** 16n, {binary: true}), '8.88 PiB');
	t.is(prettyBytes(1e30, {binary: true}), '827181 YiB');
	t.is(prettyBytes(10n ** 30n, {binary: true}), '827181 YiB');
});

test('bits and binary option', t => {
	t.is(prettyBytes(0, {bits: true, binary: true}), '0 b');
	t.is(prettyBytes(0n, {bits: true, binary: true}), '0 b');
	t.is(prettyBytes(4, {bits: true, binary: true}), '4 b');
	t.is(prettyBytes(4n, {bits: true, binary: true}), '4 b');
	t.is(prettyBytes(10, {bits: true, binary: true}), '10 b');
	t.is(prettyBytes(10n, {bits: true, binary: true}), '10 b');
	t.is(prettyBytes(999, {bits: true, binary: true}), '999 b');
	t.is(prettyBytes(999n, {bits: true, binary: true}), '999 b');
	t.is(prettyBytes(1025, {bits: true, binary: true}), '1 kibit');
	t.is(prettyBytes(1025n, {bits: true, binary: true}), '1 kibit');
	t.is(prettyBytes(1e6, {bits: true, binary: true}), '977 kibit');
	t.is(prettyBytes(10n ** 6n, {bits: true, binary: true}), '977 kibit');
	t.is(prettyBytes(1e30, {bits: true, binary: true}), '827181 Yibit');
	t.is(prettyBytes(10n ** 30n, {bits: true, binary: true}), '827181 Yibit');
});

test('fractional digits options', t => {
	t.is(prettyBytes(1900, {maximumFractionDigits: 1}), '1.9 kB');
	t.is(prettyBytes(1900n, {maximumFractionDigits: 1}), '1.9 kB');
	t.is(prettyBytes(1900, {minimumFractionDigits: 3}), '1.900 kB');
	t.is(prettyBytes(1900n, {minimumFractionDigits: 3}), '1.900 kB');
	t.is(prettyBytes(1911, {maximumFractionDigits: 1}), '1.9 kB');
	t.is(prettyBytes(1911n, {maximumFractionDigits: 1}), '1.9 kB');
	t.is(prettyBytes(1111, {maximumFractionDigits: 2}), '1.11 kB');
	t.is(prettyBytes(1111n, {maximumFractionDigits: 2}), '1.11 kB');
	t.is(prettyBytes(1019, {maximumFractionDigits: 3}), '1.019 kB');
	t.is(prettyBytes(1019n, {maximumFractionDigits: 3}), '1.019 kB');
	t.is(prettyBytes(1001, {maximumFractionDigits: 3}), '1.001 kB');
	t.is(prettyBytes(1001n, {maximumFractionDigits: 3}), '1.001 kB');
	t.is(prettyBytes(1000, {minimumFractionDigits: 1, maximumFractionDigits: 3}), '1.0 kB');
	t.is(prettyBytes(1000n, {minimumFractionDigits: 1, maximumFractionDigits: 3}), '1.0 kB');
	t.is(prettyBytes(3942, {minimumFractionDigits: 1, maximumFractionDigits: 2}), '3.94 kB');
	t.is(prettyBytes(3942n, {minimumFractionDigits: 1, maximumFractionDigits: 2}), '3.94 kB');
	t.is(prettyBytes(59_952_784, {maximumFractionDigits: 1}), '59.9 MB');
	t.is(prettyBytes(59_952_784n, {maximumFractionDigits: 1}), '59.9 MB');
	t.is(prettyBytes(59_952_784, {minimumFractionDigits: 1, maximumFractionDigits: 1}), '59.9 MB');
	t.is(prettyBytes(59_952_784n, {minimumFractionDigits: 1, maximumFractionDigits: 1}), '59.9 MB');
	t.is(prettyBytes(4001, {maximumFractionDigits: 3, binary: true}), '3.907 KiB');
	t.is(prettyBytes(4001n, {maximumFractionDigits: 3, binary: true}), '3.907 KiB');
	t.is(prettyBytes(18_717, {maximumFractionDigits: 2, binary: true}), '18.27 KiB');
	t.is(prettyBytes(18_717n, {maximumFractionDigits: 2, binary: true}), '18.27 KiB');
	t.is(prettyBytes(18_717, {maximumFractionDigits: 4, binary: true}), '18.2783 KiB');
	t.is(prettyBytes(18_717n, {maximumFractionDigits: 4, binary: true}), '18.2783 KiB');
	t.is(prettyBytes(32_768, {minimumFractionDigits: 2, maximumFractionDigits: 3, binary: true}), '32.00 KiB');
	t.is(prettyBytes(32_768n, {minimumFractionDigits: 2, maximumFractionDigits: 3, binary: true}), '32.00 KiB');
	t.is(prettyBytes(65_536, {minimumFractionDigits: 1, maximumFractionDigits: 3, binary: true}), '64.0 KiB');
	t.is(prettyBytes(65_536n, {minimumFractionDigits: 1, maximumFractionDigits: 3, binary: true}), '64.0 KiB');
});

test('space option', t => {
	t.is(prettyBytes(0), '0 B');
	t.is(prettyBytes(0n), '0 B');
	t.is(prettyBytes(0, {space: false}), '0B');
	t.is(prettyBytes(0n, {space: false}), '0B');
	t.is(prettyBytes(999), '999 B');
	t.is(prettyBytes(999n), '999 B');
	t.is(prettyBytes(999, {space: false}), '999B');
	t.is(prettyBytes(999n, {space: false}), '999B');
	t.is(prettyBytes(-13, {signed: true}), '-13 B');
	t.is(prettyBytes(-13n, {signed: true}), '-13 B');
	t.is(prettyBytes(-13, {signed: true, space: false}), '-13B');
	t.is(prettyBytes(-13n, {signed: true, space: false}), '-13B');
	t.is(prettyBytes(42, {signed: true}), '+42 B');
	t.is(prettyBytes(42n, {signed: true}), '+42 B');
	t.is(prettyBytes(42, {signed: true, space: false}), '+42B');
	t.is(prettyBytes(42n, {signed: true, space: false}), '+42B');
});

test('nonBreakingSpace option', t => {
	// Basic non-breaking space functionality
	t.is(prettyBytes(1337, {nonBreakingSpace: true}), '1.34\u00A0kB');
	t.is(prettyBytes(1337n, {nonBreakingSpace: true}), '1.34\u00A0kB');

	// When space: false, nonBreakingSpace should be ignored
	t.is(prettyBytes(1337, {space: false, nonBreakingSpace: true}), '1.34kB');
	t.is(prettyBytes(1337n, {space: false, nonBreakingSpace: true}), '1.34kB');

	// Test with signed option (special case with leading space for zero)
	t.is(prettyBytes(0, {signed: true, nonBreakingSpace: true}), ' 0\u00A0B');
	t.is(prettyBytes(0n, {signed: true, nonBreakingSpace: true}), ' 0\u00A0B');
});

test('fixedWidth option', t => {
	// Basic fixed width functionality
	t.is(prettyBytes(1, {fixedWidth: 7}), '    1 B');
	t.is(prettyBytes(100, {fixedWidth: 7}), '  100 B');
	t.is(prettyBytes(1000, {fixedWidth: 7}), '   1 kB');
	t.is(prettyBytes(100_000, {fixedWidth: 7}), ' 100 kB');
	t.is(prettyBytes(1_000_000, {fixedWidth: 7}), '   1 MB');

	// With bigint (representative cases only)
	t.is(prettyBytes(1n, {fixedWidth: 7}), '    1 B');
	t.is(prettyBytes(1_000_000n, {fixedWidth: 7}), '   1 MB');

	// Different width
	t.is(prettyBytes(1337, {fixedWidth: 10}), '   1.34 kB');

	// With binary option
	t.is(prettyBytes(1024, {fixedWidth: 8, binary: true}), '   1 KiB');
	t.is(prettyBytes(10_240, {fixedWidth: 8, binary: true}), '  10 KiB');

	// With signed option
	t.is(prettyBytes(42, {fixedWidth: 8, signed: true}), '   +42 B');
	t.is(prettyBytes(-13, {fixedWidth: 8, signed: true}), '   -13 B');
	t.is(prettyBytes(0, {fixedWidth: 8, signed: true}), '     0 B');

	// When output is wider than fixedWidth, no padding is applied
	t.is(prettyBytes(1_000_000_000_000, {fixedWidth: 3}), '1 TB');

	// With locale
	t.is(prettyBytes(1337, {fixedWidth: 8, locale: 'de'}), ' 1,34 kB');

	// With bits option
	t.is(prettyBytes(1337, {fixedWidth: 10, bits: true}), ' 1.34 kbit');

	// FixedWidth: undefined (default) should not add padding
	t.is(prettyBytes(1337, {fixedWidth: undefined}), '1.34 kB');
	t.is(prettyBytes(1337, {}), '1.34 kB'); // Default behavior

	// With no space
	t.is(prettyBytes(1337, {fixedWidth: 7, space: false}), ' 1.34kB');

	// Edge cases
	t.is(prettyBytes(1337, {fixedWidth: 0}), '1.34 kB'); // No padding for 0 width

	// Invalid fixedWidth values should throw
	t.throws(() => prettyBytes(1337, {fixedWidth: -5}), {
		instanceOf: TypeError,
		message: 'Expected fixedWidth to be a non-negative integer, got number: -5',
	});
	t.throws(() => prettyBytes(1337, {fixedWidth: Number.POSITIVE_INFINITY}), {
		instanceOf: TypeError,
		message: 'Expected fixedWidth to be a non-negative integer, got number: Infinity',
	});
	t.throws(() => prettyBytes(1337, {fixedWidth: Number.NaN}), {
		instanceOf: TypeError,
		message: 'Expected fixedWidth to be a non-negative integer, got number: NaN',
	});
	t.throws(() => prettyBytes(1337, {fixedWidth: 3.5}), {
		instanceOf: TypeError,
		message: 'Expected fixedWidth to be a non-negative integer, got number: 3.5',
	});
	t.throws(() => prettyBytes(1337, {fixedWidth: '10'}), {
		instanceOf: TypeError,
		message: 'Expected fixedWidth to be a non-negative integer, got string: 10',
	});
	t.throws(() => prettyBytes(1337, {fixedWidth: Number.MAX_SAFE_INTEGER + 1}), {
		instanceOf: TypeError,
		message: `Expected fixedWidth to be a non-negative integer, got number: ${Number.MAX_SAFE_INTEGER + 1}`,
	});

	// With fractional digits
	t.is(prettyBytes(1500, {fixedWidth: 10, maximumFractionDigits: 1}), '    1.5 kB');

	// With small numbers
	t.is(prettyBytes(0.5, {fixedWidth: 8}), '   0.5 B');

	// With negative numbers (non-signed)
	t.is(prettyBytes(-1337, {fixedWidth: 8}), '-1.34 kB');

	// With non-breaking space
	t.is(prettyBytes(1337, {fixedWidth: 8, nonBreakingSpace: true}), ' 1.34\u00A0kB');
});

test('rounding carries across unit boundaries', t => {
	t.is(prettyBytes(999_999), '1 MB');
	t.is(prettyBytes(999_999n), '1 MB');
	t.is(prettyBytes(1_048_575, {binary: true}), '1 MiB');
	t.is(prettyBytes(1_048_575n, {binary: true}), '1 MiB');
	t.is(prettyBytes(999.499 * 1000), '999 kB');
	t.is(prettyBytes(-999_999), '-1 MB');
	t.is(prettyBytes(999.5), '1 kB');
	t.is(prettyBytes(999.4), '999 B');

	for (let i = 1; i < 8; i++) {
		const decimal = (10n ** BigInt(3 * (i + 1))) - 1n;
		const binary = 2n ** BigInt(10 * (i + 1));
		const binaryMinusOne = binary - 1n;
		const dUnit = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i];
		const bUnit = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'][i];
		t.is(prettyBytes(decimal), `1 ${dUnit}`);
		t.is(prettyBytes(Number(decimal)), `1 ${dUnit}`);
		t.is(prettyBytes(binaryMinusOne, {binary: true}), `1 ${bUnit}`);
		t.is(prettyBytes(Number(binaryMinusOne), {binary: true}), `1 ${bUnit}`);
	}

	// Values just under each boundary (B up to YB/YiB), as Number and BigInt
	const decimalUnits = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const binaryUnits = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	for (let i = 0; i < 8; i++) {
		for (const [base, units, binary] of [[1000n, decimalUnits, false], [1024n, binaryUnits, true]]) {
			const boundary = base ** BigInt(i + 1);
			const under = boundary - (boundary / 4000n) - 1n;
			const fraction = Number(boundary) * (1 - (1 / 4000));
			t.is(prettyBytes(fraction, {binary}), `1 ${units[i]}`);
			t.is(prettyBytes(-fraction, {binary}), `-1 ${units[i]}`);
			if (i > 0) {
				t.is(prettyBytes(under, {binary}), `1 ${units[i]}`);
			}
		}
	}

	// 4 significant digits at exponent 0: 1023.6 rounds to 1024 (carries), 1023.4 rounds to 1023
	t.is(prettyBytes(1023.6, {binary: true}), '1 KiB');
	t.is(prettyBytes(1023.4, {binary: true}), '1023 B');

	// Exact rounding thresholds for every unit (999.5 / 1023.5 of the unit), Number and BigInt
	for (let i = 1; i < 8; i++) {
		const dUnit = 1000n ** BigInt(i);
		const bUnit = 1024n ** BigInt(i);
		const dNames = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const bNames = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
		t.is(prettyBytes((dUnit * 9995n) / 10n), `1 ${dNames[i]}`);
		t.is(prettyBytes(Number((dUnit * 9995n) / 10n)), `1 ${dNames[i]}`);
		t.is(prettyBytes((bUnit * 10_235n) / 10n, {binary: true}), `1 ${bNames[i]}`);
		t.is(prettyBytes(Number((bUnit * 10_235n) / 10n), {binary: true}), `1 ${bNames[i]}`);
	}

	// Largest unit never carries further
	t.is(prettyBytes(1000n ** 9n), '1000 YB');
});

test('rounding carries with fraction digit options', t => {
	t.is(prettyBytes(999_999, {maximumFractionDigits: 0}), '1 MB');
	t.is(prettyBytes(999_999n, {maximumFractionDigits: 0}), '1 MB');
	t.is(prettyBytes(999_999, {maximumFractionDigits: 1}), '1 MB');
	t.is(prettyBytes(999_999, {minimumFractionDigits: 1, maximumFractionDigits: 1}), '1.0 MB');
	t.is(prettyBytes(1_048_575, {binary: true, maximumFractionDigits: 0}), '1 MiB');
	t.is(prettyBytes(999_999, {maximumFractionDigits: 0, fixedWidth: 6}), '  1 MB');
	t.is(prettyBytes(999_499, {maximumFractionDigits: 0}), '999 kB');
	t.is(prettyBytes((1000n ** 9n) - 1n, {maximumFractionDigits: 0}), '1,000 YB');
});

test('rounding carries for every unit with fraction digit options', t => {
	const decimal = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const binary = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	for (let i = 2; i <= 8; i++) {
		for (const [base, names, isBinary] of [[1000n, decimal, false], [1024n, binary, true]]) {
			const value = (base ** BigInt(i)) - 1n;
			const expected = `1 ${names[i - 1]}`;
			t.is(prettyBytes(value, {binary: isBinary, maximumFractionDigits: 0}), expected);
			t.is(prettyBytes(Number(value), {binary: isBinary, maximumFractionDigits: 0}), expected);
			t.is(prettyBytes(-value, {binary: isBinary, maximumFractionDigits: 0}), `-${expected}`);
			t.is(prettyBytes(value, {binary: isBinary, minimumFractionDigits: 1, maximumFractionDigits: 1}), `1.0 ${names[i - 1]}`);
		}
	}

	// Floating-point error in the logarithm must not yield 0 of the next unit
	t.is(prettyBytes(999_999_999_999_999), '1 PB');
	t.is(prettyBytes(999_999_999_999_999n), '1 PB');
	t.is(prettyBytes((2 ** 50) - 1, {binary: true}), '1 PiB');
});

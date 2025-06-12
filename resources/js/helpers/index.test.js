import { expect, test } from 'vitest'
import { reviseLinkUrls, maskPhoneNumber } from './index';

test('add protocol to one link', () => {
    const text = '<a href="example.com">Example</a>';
    const revisedText = reviseLinkUrls(text);
    expect(revisedText).toBe('<a href="https://example.com">Example</a>');
});

test('add protocol to multiple links', () => {
    const text = '<a href="example.com">Example</a> <a href="example.org">Example</a>';
    const revisedText = reviseLinkUrls(text);
    expect(revisedText).toBe('<a href="https://example.com">Example</a> <a href="https://example.org">Example</a>');
});

test('do not add protocol to already valid links', () => {
    const text = '<a href="https://example.com">Example</a> <a href="http://example.org">Example</a>';
    const revisedText = reviseLinkUrls(text);
    expect(revisedText).toBe('<a href="https://example.com">Example</a> <a href="http://example.org">Example</a>');
});

test('add protocol to links within other markup', () => {
    const text = '<div><a href="example.com">Example</a></div>';
    const revisedText = reviseLinkUrls(text);
    expect(revisedText).toBe('<div><a href="https://example.com">Example</a></div>');
});

test('all intentional relative links', () => {
    const text = '<a href="/example">Example</a> <a href="./example">Example</a> <a href="../example">Example</a>';
    const revisedText = reviseLinkUrls(text);
    expect(revisedText).toBe('<a href="/example">Example</a> <a href="./example">Example</a> <a href="../example">Example</a>');
});

test('handle empty string', () => {
    const text = '';
    const revisedText = reviseLinkUrls(text);
    expect(revisedText).toBe('');
});
test('handle undefined', () => {
    const text = undefined;
    const revisedText = reviseLinkUrls(text);
    expect(revisedText).toBe('');
});

test('mask us phone number', () => {
    expect(maskPhoneNumber('3035556666')).toBe('+1 (303) 555-6666');
})
test('mask us phone number with prefix', () => {
    expect(maskPhoneNumber('+1 3035556666')).toBe('+1 (303) 555-6666');
    expect(maskPhoneNumber('+13035556666')).toBe('+1 (303) 555-6666');
});
test('unrecognized phone number unchanged', () => {
    expect(maskPhoneNumber('3887955')).toBe('3887955');
    expect(maskPhoneNumber('71234567')).toBe('71234567');
    expect(maskPhoneNumber('+44 20 7123 4567')).toBe('+44 20 7123 4567');
});

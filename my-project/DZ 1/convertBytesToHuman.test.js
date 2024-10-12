/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBeFalsy;
  expect(convertBytesToHuman("string")).toBeFalsy;
  expect(convertBytesToHuman(null)).toBeFalsy;
  expect(convertBytesToHuman(undefined)).toBeFalsy;
  expect(convertBytesToHuman(NaN)).toBeFalsy;
  expect(convertBytesToHuman({})).toBeFalsy;
  expect(convertBytesToHuman([])).toBeFalsy;
  expect(convertBytesToHuman(Infinity).toBeFalsy);
  expect(convertBytesToHuman("123").toBeFalsy);
});


test('Возвращает корректное значение для чисел', () => {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']; 

  for (let i = 0; i < units.length; i++) {
    const value = 1024 ** i; 
    const expected = `1 ${units[i]}`; 
    expect(convertBytesToHuman(value)).toBe(expected); 
  }
});

test('Пограничные значения', () => {
  expect(convertBytesToHuman(1023)).toBe("1023 Bytes");
  expect(convertBytesToHuman(1024 * 1024 - 1)).toBe("1024 KB");
})


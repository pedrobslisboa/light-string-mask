import StringMask from './index';

describe('StringMask', () => {
  it('should instance with mask', () => {
    const mask = new StringMask({
      mask: '000.000.000-00',
    });

    expect(mask.options).toEqual({
      mask: '000.000.000-00',
    });
  });

  it('should apply mask', () => {
    const mask = new StringMask({ mask: '000.000.000-00' });

    expect(mask.apply('12345678901')).toEqual({
      maskedValue: '123.456.789-01',
      unmaskedValue: '12345678901',
    });
  });

  it('should apply mask with reverse', () => {
    const mask = new StringMask({ mask: '00/00/0000', reverse: true });

    expect(mask.apply('041994')).toEqual({
      maskedValue: '04/1994',
      unmaskedValue: '041994',
    });
  });

  it('should apply mask with optional and reverse', () => {
    const mask = new StringMask({ mask: '00/00/{00}00', reverse: true });

    expect(mask.apply('04/94')).toEqual({
      maskedValue: '04/94',
      unmaskedValue: '0494',
    });

    expect(mask.apply('04/1994')).toEqual({
      maskedValue: '04/1994',
      unmaskedValue: '041994',
    });
  });

  it('should apply mask with optional', () => {
    const mask = new StringMask({ mask: '00/00/{00}00' });

    expect(mask.apply('110494')).toEqual({
      maskedValue: '11/04/94',
      unmaskedValue: '110494',
    });

    expect(mask.apply('0494')).toEqual({
      maskedValue: '04/94',
      unmaskedValue: '0494',
    });

    expect(mask.updateOptions({ mask: '{7 }(00)' }));

    expect(mask.apply('(5')).toEqual({
      maskedValue: '(5',
      unmaskedValue: '5',
    });
  });

  it('should apply mask with recursive', () => {
    const mask = new StringMask({ mask: '00,0[00.0]' });

    expect(mask.apply('123456789012345')).toEqual({
      maskedValue: '12,345.678.901.234.5',
      unmaskedValue: '123456789012345',
    });

    expect(mask.apply('12,345.678.901.234.5')).toEqual({
      maskedValue: '12,345.678.901.234.5',
      unmaskedValue: '123456789012345',
    });
  });

  it('should apply mask with recursive and reverse', () => {
    const mask = new StringMask({ mask: '[.000],00', reverse: true });

    expect(mask.apply('123456789012345')).toEqual({
      maskedValue: '1.234.567.890.123,45',
      unmaskedValue: '123456789012345',
    });

    expect(mask.apply('1.234.567.890.123,45')).toEqual({
      maskedValue: '1.234.567.890.123,45',
      unmaskedValue: '123456789012345',
    });
  });

  it('should apply mask with recursive, optional and reverse', () => {
    const mask = new StringMask({ mask: '[0.{0}0]0,00', reverse: true });

    expect(mask.apply('123456789012345')).toEqual({
      maskedValue: '1.234.567.890.123,45',
      unmaskedValue: '123456789012345',
    });

    expect(mask.apply('1.234.567.90.123,45')).toEqual({
      maskedValue: '1.234.567.90.123,45',
      unmaskedValue: '12345679012345',
    });
  });

  it('should apply mask with letters', () => {
    const mask = new StringMask({ mask: 'AAA-0000' });

    expect(mask.apply('ABC1234')).toEqual({
      maskedValue: 'ABC-1234',
      unmaskedValue: 'ABC1234',
    });

    expect(mask.apply('ABC-1234')).toEqual({
      maskedValue: 'ABC-1234',
      unmaskedValue: 'ABC1234',
    });
  });

  it('should apply mask with letters and reverse', () => {
    const mask = new StringMask({ mask: 'AAA-0000', reverse: true });

    expect(mask.apply('AABC1234')).toEqual({
      maskedValue: 'ABC-1234',
      unmaskedValue: 'ABC1234',
    });

    expect(mask.apply('AABC-1234')).toEqual({
      maskedValue: 'ABC-1234',
      unmaskedValue: 'ABC1234',
    });
  });

  it('should apply mask with letters, reverse and optional', () => {
    const mask = new StringMask({ mask: 'AAA-{A}0000', reverse: true });

    expect(mask.apply('ABC-1234')).toEqual({
      maskedValue: 'ABC-1234',
      unmaskedValue: 'ABC1234',
    });

    expect(mask.apply('ABCC1234')).toEqual({
      maskedValue: 'ABC-C1234',
      unmaskedValue: 'ABCC1234',
    });

    expect(mask.apply('ABC-C1234')).toEqual({
      maskedValue: 'ABC-C1234',
      unmaskedValue: 'ABCC1234',
    });
  });

  it('should apply mask with letters optional', () => {
    const mask = new StringMask({ mask: 'AA{A}-000' });

    expect(mask.apply('ABC-234')).toEqual({
      maskedValue: 'ABC-234',
      unmaskedValue: 'ABC234',
    });

    expect(mask.apply('ABC234')).toEqual({
      maskedValue: 'ABC-234',
      unmaskedValue: 'ABC234',
    });

    expect(mask.apply('AB234')).toEqual({
      maskedValue: 'AB-234',
      unmaskedValue: 'AB234',
    });
  });

  it('should apply mask with alphanumeric', () => {
    const mask = new StringMask({ mask: 'SSS-A00' });

    expect(mask.apply('A1B-C34')).toEqual({
      maskedValue: 'A1B-C34',
      unmaskedValue: 'A1BC34',
    });

    expect(mask.apply('A1BC34')).toEqual({
      maskedValue: 'A1B-C34',
      unmaskedValue: 'A1BC34',
    });
  });

  it('should apply mask with alphanumeric and reverse', () => {
    const mask = new StringMask({ mask: 'SSS-A00' });

    expect(mask.apply('A1B-C34')).toEqual({
      maskedValue: 'A1B-C34',
      unmaskedValue: 'A1BC34',
    });

    expect(mask.apply('A1BC34')).toEqual({
      maskedValue: 'A1B-C34',
      unmaskedValue: 'A1BC34',
    });
  });

  it('should apply mask with alphanumeric and reverse', () => {
    const mask = new StringMask({ mask: 'SS-S00', reverse: true });

    expect(mask.apply('AB1-C34')).toEqual({
      maskedValue: 'B1-C34',
      unmaskedValue: 'B1C34',
    });

    expect(mask.apply('AB1C34')).toEqual({
      maskedValue: 'B1-C34',
      unmaskedValue: 'B1C34',
    });
  });

  it('should apply mask with alphanumeric, optional and reverse', () => {
    const mask = new StringMask({ mask: 'SS-{S}00', reverse: true });

    expect(mask.apply('AB1-C34')).toEqual({
      maskedValue: 'B1-C34',
      unmaskedValue: 'B1C34',
    });

    expect(mask.apply('AB1-34')).toEqual({
      maskedValue: 'B1-34',
      unmaskedValue: 'B134',
    });

    expect(mask.apply('AB1C34')).toEqual({
      maskedValue: 'B1-C34',
      unmaskedValue: 'B1C34',
    });
  });

  it('should apply mask with escape token char', () => {
    const mask = new StringMask({ mask: 'AAA-$000' });

    expect(mask.apply('ABC-34')).toEqual({
      maskedValue: 'ABC-034',
      unmaskedValue: 'ABC34',
    });

    expect(mask.apply('ABC34')).toEqual({
      maskedValue: 'ABC-034',
      unmaskedValue: 'ABC34',
    });
  });

  it('should apply mask with escape the escape char', () => {
    const mask = new StringMask({ mask: 'AAA-$$00' });

    expect(mask.apply('ABC-34')).toEqual({
      maskedValue: 'ABC-$34',
      unmaskedValue: 'ABC34',
    });

    expect(mask.apply('ABC34')).toEqual({
      maskedValue: 'ABC-$34',
      unmaskedValue: 'ABC34',
    });

    expect(mask.apply('ABC$')).toEqual({
      maskedValue: 'ABC-$',
      unmaskedValue: 'ABC',
    });
  });

  it('should apply mask with any char', () => {
    const mask = new StringMask({ mask: 'AAA-*00' });

    expect(mask.apply('ABC-/34')).toEqual({
      maskedValue: 'ABC-/34',
      unmaskedValue: 'ABC/34',
    });

    expect(mask.apply('ABC/34')).toEqual({
      maskedValue: 'ABC-/34',
      unmaskedValue: 'ABC/34',
    });
  });

  it('should apply mask ignoring not valid inputs', () => {
    const mask = new StringMask({ mask: 'AAA-000' });

    expect(mask.apply('AB2313133133C-123')).toEqual({
      maskedValue: 'ABC-123',
      unmaskedValue: 'ABC123',
    });
  });

  it('should update mask', () => {
    const mask = new StringMask({ mask: 'AAA-000' });

    expect(mask.apply('ABC-1234')).toEqual({
      maskedValue: 'ABC-123',
      unmaskedValue: 'ABC123',
    });

    mask.updateOptions({
      mask: 'AAA-000',
    });

    expect(mask.maskedValue).toEqual('ABC-123');
    expect(mask.unmaskedValue).toEqual('ABC123');

    const values = mask.updateOptions({
      mask: 'AA-A000',
    });

    expect(values).toEqual({
      maskedValue: 'AB-C123',
      unmaskedValue: 'ABC123',
    });
  });

  it('should mask with non pattern token', () => {
    const mask = new StringMask({ mask: 'AAAF-0000' });

    expect(mask.apply('ABCF-1234')).toEqual({
      maskedValue: 'ABCF-1234',
      unmaskedValue: 'ABC1234',
    });
  });

  it('should call onProcessInputChar', () => {
    const mask = new StringMask({
      mask: '$0*,0[0{0}.0]',
    });

    let inputChar: string[] = [];
    let fixedChar: string[] = [];
    mask.apply('2,a345.67.8', {
      onProcessInputChar: (char) => {
        inputChar.push(char);
      },
      onProcessFixedChar: (char) => {
        fixedChar.push(char);
      },
    });

    expect(fixedChar).toEqual(['0', ',', '.', '.']);
    expect(inputChar).toEqual([
      '2',
      ',',
      'a',
      '3',
      '4',
      '5',
      '.',
      '6',
      '7',
      '.',
      '8',
    ]);

    inputChar = [];
    fixedChar = [];
    mask.apply('1234567890123456789', {
      onProcessInputChar: (char) => {
        inputChar.push(char);
      },
      onProcessFixedChar: (char) => {
        fixedChar.push(char);
      },
    });

    expect(inputChar).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ]);
    expect(fixedChar).toEqual(['0', ',', '.', '.', '.', '.', '.']);
  });
});

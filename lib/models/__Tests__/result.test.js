const Result = require('../result');

describe('Result model', () => {
  it('validates correct model', () => {
    const match = {
      result: 'Random story'
    };
    const result = new Result(match);
    const errors = result.validateSync();
    expect(errors).toBeUndefined();
  });

  it('validates required properties', () => {
    const  empty = {};
    const result = new Result(empty);
    const { errors } = result.validateSync();

    expect(errors.result.kind).toBe('required');
  });
});
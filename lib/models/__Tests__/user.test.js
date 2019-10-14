const User = require('../user');

describe('User Model', () => {
  it('Valid User Model', () => {
    const data = {
      email: 'user@user.com',
      password: 'abc123',
      name: 'Bill',
      age: 18,
      minPrefAge: 18,
      maxPrefAge: 120,
      gender: 'non-binary',
      genderPref: 'non-binary'
    };

    const user = new User(data);
    expect(user.email).toBe(data.email);

    expect(user.password).toBeUndefined(user.password);
    expect(user.hash).toBeDefined();
    expect(user.hash).not.toBe(data.password);

    expect(user.validateSync()).toBeUndefined();

    expect(user.comparePassword(data.password)).toBe(true);
    expect(user.comparePassword('bad password')).toBe(false);
  });

  it('Requires email and hash', () => {
    const data = {};
    const user = new User(data);
    const { errors } = user.validateSync();
    expect(errors.email.kind).toBe('required');
    expect(errors.hash.kind).toBe('required');
    expect(errors.name.kind).toBe('required');
  });

  it('enforces min age and minPrefAge', () => {
    const data = {
      email: 'user@user.com',
      password: 'abc123',
      name: 'Bill',
      age: 16,
      minPrefAge: 15,
      maxPrefAge: 120,
      gender: 'non-binary',
      genderPref: 'non-binary'
    };
    const user = new User(data);
    const { errors } = user.validateSync();

    expect(errors.age.kind).toBe('min');
    expect(errors.minPrefAge.kind).toBe('min');
  });

  it('enforces max age', () => {
    const data = {
      email: 'user@user.com',
      password: 'abc123',
      name: 'Bill',
      age: 18,
      minPrefAge: 18,
      maxPrefAge: 121,
      gender: 'non-binary',
      genderPref: 'non-binary'
    };
    const user = new User(data);
    const { errors } = user.validateSync();

    expect(errors.maxPrefAge.kind).toBe('max');
  });

  it('validates enum', () => {
    const data = {
      gender: 'space potato',
      genderPref: 'potato'
    };
    const user = new User(data);
    const { errors } = user.validateSync();

    expect(errors.gender.kind).toBe('enum');
    expect(errors.genderPref.kind).toBe('enum');
  });
});
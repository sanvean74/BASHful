const Match = require('../match');

describe('Match model', () => {
  it('validates correct match model', () => {
    const match = {
      name: 'Light Yagami',
      gender: ['male'],
      age: 19,
      location: {
        city: 'Portland',
        state: 'Oregon'
      },
      image: '/assets/images/testm.jpg'
    };
    const testMatch = new Match(match);
    const errors = testMatch.validateSync();
    expect(errors).toBeUndefined();

    const json = testMatch.toJSON();

    expect(json).toMatchInlineSnapshot(
      {
        ...match,
        _id: expect.any(Object),
        location: {
          ...match.location
        }
      },
      `
      Object {
        "_id": Any<Object>,
        "age": 19,
        "gender": Array [
          "male",
        ],
        "image": "/assets/images/testm.jpg",
        "location": Object {
          "city": "Portland",
          "state": "Oregon",
        },
        "name": "Light Yagami",
      }
    `
    );
  });

  it('validates required properties', () => {
    const empty = {
      location: {}
    };
    const failure = new Match(empty);
    const { errors } = failure.validateSync();

    expect(errors.name.kind).toBe('required');
    expect(errors.age.kind).toBe('required');
    expect(errors.image.kind).toBe('required');
  });

  it('enforces min age', () => {
    const underAge = {
      name: 'Light Yagami',
      gender: ['male'],
      age: 15,
      location: {
        city: 'Portland',
        state: 'Oregon'
      },
      image: '/assets/images/testm.jpg'
    };
    const bad = new Match(underAge);
    const { errors } = bad.validateSync();

    expect(errors.age.kind).toBe('min');
  });

  it('validates enum', () => {
    const failure = {
      gender: ['potato']
    };
    const bad = new Match(failure);
    const { errors } = bad.validateSync();

    expect(errors['gender.0'].kind).toBe('enum');
  });
});

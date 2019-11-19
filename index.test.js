const functions = require('./index');

test.each`
  multiplier | textLength | rate | expected
  ${1}   | ${1000} | ${0.12} | ${120}
  ${1}   | ${1000} | ${0.05} | ${50}
  ${1.2} | ${1000} | ${0.05} | ${60}
  `('returns $expected when $multiplier and $textLength and $rate',
  ({ multiplier, textLength, rate, expected }) => {
    expect(functions.getCost(multiplier, textLength, rate)).toBe(expected);
  });

test.each`
  multiplier  | textLength | language | expected
  ${1}   | ${500}  | ${"eng"} | ${121} 
  ${1}   | ${500}  | ${"rus"} | ${60} 
  ${1}   | ${500}  | ${"ukr"} | ${60} 
  ${1}   | ${1500} | ${"eng"} | ${301}
  ${1}   | ${1500} | ${"rus"} | ${98}
  ${1}   | ${1500} | ${"ukr"} | ${98}
  ${1.2} | ${500}  | ${"eng"} | ${139}
  ${1.2} | ${500}  | ${"rus"} | ${60}
  ${1.2} | ${500}  | ${"ukr"} | ${60}
  ${1.2} | ${1500} | ${"eng"} | ${355}
  ${1.2} | ${1500} | ${"rus"} | ${112}
  ${1.2} | ${1500} | ${"ukr"} | ${112}
  `('returns $expected when textLength = $textLength & $language & $multiplier ',
  ({ multiplier, textLength, language, expected }) => {
    expect(functions.getTimeEstimate(multiplier, textLength, language)).toBe(expected);
  });
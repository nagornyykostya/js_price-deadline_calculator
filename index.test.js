const functions = require('./index');

describe('getCost', () => {
  test.each`
  multiplier | textLength | rate    | expected
  ${1}       | ${500}     | ${0.12} | ${120}
  ${1}       | ${500}     | ${0.05} | ${50}
  ${1.2}     | ${500}     | ${0.05} | ${60}
  ${1.2}     | ${500}     | ${0.12} | ${144}
  ${1}       | ${1500}    | ${0.12} | ${180}
  ${1}       | ${1500}    | ${0.05} | ${75}
  ${1.2}     | ${1500}    | ${0.05} | ${90}
  ${1.2}     | ${1500}    | ${0.12} | ${216}
  `('returns $expected when $multiplier and $textLength and $rate',
    ({ multiplier, textLength, rate, expected }) => {
      expect(functions.getCost(multiplier, textLength, rate)).toBe(expected);
    });
});

describe('getTimeEstimate', () => {
  test.each`
  multiplier | textLength | language | expected
  ${1}       | ${500}     | ${"eng"} | ${121} 
  ${1}       | ${500}     | ${"rus"} | ${60} 
  ${1}       | ${500}     | ${"ukr"} | ${60} 
  ${1}       | ${1500}    | ${"eng"} | ${301}
  ${1}       | ${1500}    | ${"rus"} | ${98}
  ${1}       | ${1500}    | ${"ukr"} | ${98}
  ${1.2}     | ${500}     | ${"eng"} | ${139}
  ${1.2}     | ${500}     | ${"rus"} | ${60}
  ${1.2}     | ${500}     | ${"ukr"} | ${60}
  ${1.2}     | ${1500}    | ${"eng"} | ${355}
  ${1.2}     | ${1500}    | ${"rus"} | ${112}
  ${1.2}     | ${1500}    | ${"ukr"} | ${112}
  `('returns $expected when textLength = $textLength & $language & $multiplier ',
    ({ multiplier, textLength, language, expected }) => {
      expect(functions.getTimeEstimate(multiplier, textLength, language)).toBe(expected);
    });
});

describe('getFinishTime', () => {
  test.each`
  minutes | currentKievTime                           | expected
  ${60}   | ${new Date('November 01, 2019 10:00:00')} | ${new Date('November 01, 2019 11:00:00')}
  ${6000} | ${new Date('November 01, 2019 15:00:00')} | ${new Date('November 18, 2019 16:00:00')}
  ${60}   | ${new Date('November 02, 2019 10:00:00')} | ${new Date('November 04, 2019 11:00:00')}
  ${60}   | ${new Date('November 02, 2019 15:00:00')} | ${new Date('November 04, 2019 16:00:00')}
  ${600}  | ${new Date('November 02, 2019 15:00:00')} | ${new Date('November 05, 2019 16:00:00')}
  ${60}   | ${new Date('November 03, 2019 11:00:00')} | ${new Date('November 04, 2019 12:00:00')}
  ${600}  | ${new Date('November 01, 2019 10:00:00')} | ${new Date('November 04, 2019 11:00:00')}
  ${450}  | ${new Date('November 04, 2019 13:00:00')} | ${new Date('November 05, 2019 11:30:00')}
  ${1620} | ${new Date('November 06, 2019 17:30:00')} | ${new Date('November 11, 2019 17:30:00')}
  ${7023} | ${new Date('November 07, 2019 18:30:00')} | ${new Date('November 26, 2019 18:33:00')}


  `('returns $expected when $minutes & $currentKievTime',
    ({ minutes, currentKievTime, expected }) => {
      expect(functions.getFinishTime(minutes, currentKievTime)).toEqual(expected);
    });
});

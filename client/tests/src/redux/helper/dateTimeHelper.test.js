import { toStandardFormat } from 'components/helper/dateTimeHelper';

describe('method toStandardFormat', () => {
  test('shoud return date in set format ', () => {
    const date = '2018-04-11T13:00:08.598Z';
    const standartForm = toStandardFormat(date);

    expect(standartForm).toEqual('11.04.2018 04:00 PM');
  });
});

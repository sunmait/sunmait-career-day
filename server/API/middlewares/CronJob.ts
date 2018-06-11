import cron = require('cron');

const job = new cron.CronJob({
  cronTime: '* * * * *',
  // TODO set '0 12 * * *' = at afternoon every day
  onTick: () => {

    // console.log('THIS IS  JOOOOOOOOOBA');
  },
  start: false,
});

job.start();
/*
const unitManagerName = 'Unit Manager';
const employeeName = 'Employee';
const careerDayDate = '06-06-2018';
*/

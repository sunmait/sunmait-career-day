'use strict';

const TABLE_NAME = 'Objectives';
const SCHEMA_NAME = process.env.DB_SCHEMA;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      { tableName: TABLE_NAME, schema: SCHEMA_NAME },
      [
        {
          Title: 'test',
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          CareerDayId: 1,
          StatusId: 3,
          Progress: 1,
          CreatedAt: new Date('November 1, 2017 16:41:56'),
          UpdatedAt: new Date('November 1, 2017 16:41:56'),
        },
        {
          Title: 'test',
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          CareerDayId: 1,
          StatusId: 3,
          Progress: 1,
          CreatedAt: new Date('November 1, 2017 16:41:56'),
          UpdatedAt: new Date('November 1, 2017 16:41:56'),
        },
        {
          Title: 'test',
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          CareerDayId: 2,
          StatusId: 3,
          Progress: 1,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 18, 2017 16:41:56'),
        },
        {
          Title: 'test',
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          CareerDayId: 2,
          StatusId: 3,
          Progress: 1,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 18, 2017 16:41:56'),
        },
        {
          Title: 'test',
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          CareerDayId: 3,
          StatusId: 3,
          Progress: 1,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 18, 2017 16:41:56'),
        },
        {
          Title: 'test',
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          CareerDayId: 3,
          StatusId: 3,
          Progress: 1,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 18, 2017 16:41:56'),
        },

        {
          Title: 'objective 1',
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          CareerDayId: 4,
          StatusId: 3,
          Progress: 1,
          CreatedAt: new Date('February 1, 2018 16:41:56'),
          UpdatedAt: new Date('February 1, 2018 16:41:56'),
        },
        {
          Title: 'objective 2',
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          CareerDayId: 4,
          StatusId: 3,
          Progress: 1,
          CreatedAt: new Date('February 1, 2018 16:41:56'),
          UpdatedAt: new Date('February 1, 2018 16:41:56'),
        },
        {
          Title: 'objective 3',
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          CareerDayId: 4,
          StatusId: 1,
          Progress: 0.76,
          CreatedAt: new Date('February 1, 2018 16:41:56'),
          UpdatedAt: new Date('February 1, 2018 16:41:56'),
        },
        {
          Title: 'objective 3',
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
          CareerDayId: 4,
          StatusId: 2,
          Progress: 0,
          CreatedAt: new Date('February 1, 2018 16:41:56'),
          UpdatedAt: new Date('February 1, 2018 16:41:56'),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      { tableName: TABLE_NAME, schema: SCHEMA_NAME },
      null,
      {}
    );
  },
};

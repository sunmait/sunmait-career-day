import * as express from 'express';
import {
  controller,
  httpGet,
  interfaces,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import { IObjectiveService } from './../../Domain/Services/index';

/**
 * Operations about objectives.
 */
@controller('/api/objectives')
export class ObjectiveController implements interfaces.Controller {
  private readonly _objectiveService: IObjectiveService;

  constructor(@inject('ObjectiveService') objectiveService: IObjectiveService) {
    this._objectiveService = objectiveService;
  }

  /**
   * Get objectives
   * id: employee id
   */
  @httpGet('/')
  private async get(@response() res: express.Response): Promise<void> {
    res.json([
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
        id: 10,
        Title: 'objective 3',
        Description:
          'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
        CareerDayId: 4,
        StatusId: 2,
        Progress: 0,
        CreatedAt: new Date('February 1, 2018 16:41:56'),
        UpdatedAt: new Date('February 1, 2018 16:41:56'),
      },
    ]);
  }
}

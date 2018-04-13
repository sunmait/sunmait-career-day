import express = require('express');
import { IUserDecodedFromToken } from '../../Domain/helpers/index';

export interface IRequest extends express.Request {
  user: IUserDecodedFromToken;
}

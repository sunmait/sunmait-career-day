import express = require('express');
import IUserDecodedFromToken from './IUserDecodedFromToken';

export default interface IRequest extends express.Request {
  user: IUserDecodedFromToken;
}

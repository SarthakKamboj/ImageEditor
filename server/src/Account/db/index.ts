import { buildDbFunctions } from './buildDbFunctions';
import { knex } from '../../Knex';

export const dbFunctions = buildDbFunctions(knex);

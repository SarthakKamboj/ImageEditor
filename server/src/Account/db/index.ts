import { buildDbFunctions } from './buildDbFunctions';
import { pool } from '../../Pool';

export const dbFunctions = buildDbFunctions({ pool });

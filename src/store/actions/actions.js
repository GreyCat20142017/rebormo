import {ACTIONS as uiActions} from './uiActions';
import {ACTIONS as dataActions} from './dataActions';
import {ACTIONS as configActions} from './configActions';

export * from  './uiActions';
export * from './dataActions';
export * from  './configActions';

export const ACTIONS = {...uiActions, ...dataActions, ...configActions};

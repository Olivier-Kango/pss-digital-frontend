import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import singleFoodReducer from './foods/foodDetails';
import reducerFood from './foods/foods';
import orderReducer from './reducer/OrderReducer';

const rootReducer = combineReducers({
  // food: reducerSingleFood,
  orders: orderReducer,
  // order: reducerSingleOrder,
  foods: reducerFood,
  // newFood: reducerAddFood,
  food: singleFoodReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;

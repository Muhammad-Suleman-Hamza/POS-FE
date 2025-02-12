import LogRocket from 'logrocket'
import itemReducer from './slices/item'
import orderReducer from './slices/order'
import loginReducer from './slices/auth'
import commonReducer from './slices/common'
import vendorReducer from './slices/vendor'
import customerReducer from './slices/customer'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    item: itemReducer,
    auth: loginReducer,
    order: orderReducer,
    common: commonReducer,
    vendor: vendorReducer,
    customer: customerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LogRocket.reduxMiddleware()),
});
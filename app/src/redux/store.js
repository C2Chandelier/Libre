import reducers from "./reducers";
import * as Sentry from "@sentry/react";
import { configureStore } from "@reduxjs/toolkit";

const sentryReduxEnhancer = Sentry.createReduxEnhancer();

export default configureStore({
  reducer: reducers,
  enhancers: [sentryReduxEnhancer],
});

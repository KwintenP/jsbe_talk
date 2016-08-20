/*
 import { provideStore} from "@ngrx/store";
 import {rootReducer} from "./reducers/reducers";
 import {bootstrap} from "@angular/platform-browser-dynamic";
 import {instrumentStore} from "@ngrx/store-devtools";
 import { useLogMonitor } from "@ngrx/store-log-monitor";
 import {ApplicationContainer} from "./containers/application.container";

 bootstrap(ApplicationContainer, [
 provideStore(rootReducer),
 instrumentStore({
 monitor: useLogMonitor({
 visible: false,
 position: "right"
 })
 }),
 ]);*/

import {provideStore, Store, Dispatcher, Reducer, combineReducers, State} from "@ngrx/store";
import {rootReducer} from "./reducers/reducers";
import {storeLogger} from "ngrx-store-logger/dist/index";
import {compose} from "@ngrx/core/compose";
import {TOGGLE_TOPBAR, ADD_TWEET, TOGGLE_SIDEBAR} from "./actions";
import {Tweet} from "./entities/tweet.entity";
provideStore(rootReducer);

// Redux setup (can vary based on redux architecture implementation)
let dispatcher: Dispatcher = new Dispatcher();
let reducers: any = compose(
    storeLogger(),
    combineReducers
)(rootReducer);
let reducer: Reducer = new Reducer(dispatcher, reducers);
let store: Store = new Store(dispatcher, new Reducer(dispatcher, reducers), new State({}, dispatcher, reducer), {});

debugger;

// Dispatch the first action to the store
store.dispatch({type: TOGGLE_TOPBAR});

debugger;

store.dispatch({type: TOGGLE_TOPBAR});

debugger;

store.dispatch(
    {
        type: ADD_TWEET,
        payload: {
            tweet: new Tweet(1, "@KwintenP", "I'm giving a talk at JSBE", true)
        }
    }
);

debugger;

store.dispatch({type: TOGGLE_SIDEBAR});
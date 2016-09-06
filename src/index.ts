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
import {TOGGLE_TOPBAR, ADD_TWEET, TOGGLE_SIDEBAR} from "./actions";
import {Tweet} from "./entities/tweet.entity";
import {ApplicationState} from "./applicationState";
provideStore(rootReducer);
let dispatcher: Dispatcher = new Dispatcher();
let reducers: any = combineReducers(rootReducer);
let reducer: Reducer = new Reducer(dispatcher, reducers);
let store: Store<{}> = new Store<ApplicationState>(dispatcher,
    new Reducer(dispatcher, reducers),
    new State<ApplicationState>(undefined, dispatcher, reducer),
    undefined
);
store.dispatch({type: Dispatcher.INIT});

store.subscribe((state: ApplicationState) => {
    console.log("tweets ", state.tweets);
    console.log("topbarCollapsed", state.topbarCollapsed);
    console.log("sidebarCollapsed", state.sidebarCollapsed);
});

debugger;

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
import {MainPageState} from "../applicationState";
import {Action} from "@ngrx/store";
import {TOGGLE_TOPBAR} from "./topbar.actions";
import {TOGGLE_SIDEBAR} from "./sidebar.actions";

export function mainPageReducer(state: MainPageState, action: Action): MainPageState {
    switch (action.type) {
        case TOGGLE_TOPBAR:
            Object.assign({}, {test:"test"});
            return Object.assign({}, state);
        case TOGGLE_SIDEBAR:
            return Object.assign({}, state, {sidebarCollapsed: !state.sidebarCollapsed});
        default:
            return state;
    }
}

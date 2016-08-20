import {MainPageState} from "../applicationState";
import {Action} from "@ngrx/store";
import {TOGGLE_TOPBAR} from "./topbar.actions";
import {TOGGLE_SIDEBAR} from "./sidebar.actions";
import {Object} from "es6-shim";

export function mainPageReducer(state: MainPageState, action: Action): MainPageState {
    switch (action.type) {
        case TOGGLE_TOPBAR:
            return Object.assign({}, state, {topbarCollapsed: !state.topbarCollapsed});
        case TOGGLE_SIDEBAR:
            return Object.assign({}, state, {sidebarCollapsed: !state.sidebarCollapsed});
        default:
            return state;
    }
}

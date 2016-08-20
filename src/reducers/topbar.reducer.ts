import {Action} from "@ngrx/store";
import {TOGGLE_TOPBAR} from "./topbar.actions";
export function topbarReducer(state: boolean = false, action: Action): boolean {
    switch (action.type) {
        case TOGGLE_TOPBAR:
            return !state;
        default:
            return state;
    }
}

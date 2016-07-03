import {Component, OnDestroy} from "@angular/core";
import {Store} from "@ngrx/store";
import {StoreLogMonitorComponent} from "@ngrx/store-log-monitor";
import {ApplicationState} from "../applicationState";
import {SET_TWEETS, ADD_TWEET, REMOVE_TWEET, TOGGLE_STAR_TWEET, TOGGLE_TOPBAR, TOGGLE_SIDEBAR} from "../actions";
import {Tweet} from "../entities/tweet.entity";
import {SidebarComponent} from "../components/sidebar.component";
import {Subscription} from "rxjs/Rx";
import * as _ from "lodash";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./application.container.scss";
import {ContentComponent} from "../components/content.component";
import {TopbarComponent} from "../components/topbar.component";

@Component({
    selector: "application",
    directives: [StoreLogMonitorComponent, SidebarComponent, TopbarComponent, ContentComponent],
    template: `        
        <sidebar [class.sidebar-collapsed]="sidebarCollapsed$|async"
                 [isCollapsed]="sidebarCollapsed$|async"
                 [starredTweets]="starredTweets$|async"
                 (toggleCollapse)="onToggleCollapseSidebar()">
        </sidebar>
        <main>
            <topbar [class.topbar-collapsed]="topbarCollapsed$|async"
                    [isCollapsed]="topbarCollapsed$|async"   
                    (addTweet)="onAddTweet($event)"
                    (toggleCollapse)="onToggleCollapseTopbar()">
            </topbar>
            <content [tweets]="tweets$|async"
                     (removeTweet)="onRemoveTweet($event)"
                     (toggleStarTweet)="onStarTweet($event)">
            </content>
        </main>
        <ngrx-store-log-monitor toggleCommand="ctrl-t" positionCommand="ctrl-m"></ngrx-store-log-monitor>
            `
})
export class ApplicationContainer {
    sidebarCollapsed$ = this.store.select(state => state.sidebarCollapsed);
    topbarCollapsed$ = this.store.select(state => state.topbarCollapsed);
    tweets$ = this.store.select(state => state.tweets);
    starredTweets$ = this.tweets$.map(tweets => tweets.filter(tweet => tweet.starred));

    constructor(private store: Store<ApplicationState>) {
        let tweets: Array<Tweet> = [];
        for (let i = 0; i < 10; i++) {
            tweets.push(new Tweet(Number(_.uniqueId()), "@brechtbilliet", `Just a dummy tweet ${i}`, false));
        }
        this.store.dispatch({type: SET_TWEETS, payload: {tweets}});
    }

    onAddTweet(content: string): void {
        let tweet = new Tweet(Number(_.uniqueId()), "@brechtbilliet", content, false);
        this.store.dispatch({type: ADD_TWEET, payload: {tweet}});
    }

    onRemoveTweet(id: number): void {
        this.store.dispatch({type: REMOVE_TWEET, payload: {id}});
    }

    onStarTweet(id: number): void {
        this.store.dispatch({type: TOGGLE_STAR_TWEET, payload: {id}});
    }

    onToggleCollapseTopbar(): void {
        this.store.dispatch({type: TOGGLE_TOPBAR});
    }

    onToggleCollapseSidebar(): void {
        this.store.dispatch({type: TOGGLE_SIDEBAR});
    }
}
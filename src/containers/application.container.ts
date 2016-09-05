import {Component, OnDestroy} from "@angular/core";
import {Store} from "@ngrx/store";
import {StoreLogMonitorComponent} from "@ngrx/store-log-monitor";
import {ApplicationState} from "../applicationState";
import {Tweet} from "../entities/tweet.entity";
import {SidebarComponent} from "../components/sidebar.component";
import {Subscription} from "rxjs/Rx";
import * as _ from "lodash";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./application.container.scss";
import {ContentComponent} from "../components/content.component";
import {TopbarComponent} from "../components/topbar.component";
import {
    tweetUnLiked,
    tweetUnRetweeted,
    tweetLiked,
    addTweet,
    setTweets,
    removeTweet,
    toggleStarTweet,
    tweetRetweeted
} from "../reducers/tweet.actions";
import {toggleSideBar} from "../reducers/sidebar.actions";

@Component({
    selector: "application",
    directives: [StoreLogMonitorComponent, SidebarComponent, TopbarComponent, ContentComponent],
    template: `        
        <sidebar [class.sidebar-collapsed]="sidebarCollapsed"
                 [isCollapsed]="sidebarCollapsed"
                 [starredTweets]="starredTweets"
                 (toggleCollapse)="onToggleCollapseSidebar()">
        </sidebar>
        <main>
            <topbar [class.topbar-collapsed]="topbarCollapsed"
                    [isCollapsed]="topbarCollapsed"   
                    (addTweet)="onAddTweet($event)"
                    (toggleCollapse)="onToggleCollapseTopbar()">
            </topbar>
            <content [tweets]="tweets"
                     (removeTweet)="onRemoveTweet($event)"
                     (toggleStarTweet)="onStarTweet($event)"
                     (tweetLiked)="onTweetLiked($event)"
                     (tweetUnLiked)="onTweetUnLiked($event)"
                     (tweetRetweeted)="onTweetRetweeted($event)"
                     (tweetUnRetweeted)="onTweetUnRetweeted($event)">
            </content>
        </main>
        <ngrx-store-log-monitor toggleCommand="ctrl-t" positionCommand="ctrl-m"></ngrx-store-log-monitor>
            `
})
export class ApplicationContainer implements OnDestroy {
    sidebarCollapsed = false;
    topbarCollapsed = false;
    starredTweets: Array<Tweet> = [];
    tweets: Array<Tweet> = [];

    private storeSubscription: Subscription;

    constructor(private store: Store<ApplicationState>) {
        this.storeSubscription = this.store.subscribe((state: ApplicationState) => {
            this.sidebarCollapsed = state.ui.mainPage.sidebarCollapsed;
            this.topbarCollapsed = state.ui.mainPage.topbarCollapsed;
            this.tweets = state.data.tweets;
            this.starredTweets = state.data.tweets.filter(tweet => tweet.starred);
        });
        let tweets: Array<Tweet> = [];
        for (let i = 0; i < 10; i++) {
            tweets.push(new Tweet(Number(_.uniqueId()), "@KwintenP", `Just a dummy tweet ${i}`, false, false, 0, 0));
        }
        this.store.dispatch(setTweets(tweets));
    }

    onAddTweet(content: string): void {
        let tweet = new Tweet(Number(_.uniqueId()), "@KwintenP", content, false, false, 0, 0);
        this.store.dispatch(addTweet(tweet));
    }

    onRemoveTweet(id: number): void {
        this.store.dispatch(removeTweet(id));
    }

    onStarTweet(id: number): void {
        this.store.dispatch(toggleStarTweet(id));
    }

    onToggleCollapseTopbar(): void {
        this.store.dispatch(toggleSideBar());
    }

    onToggleCollapseSidebar(): void {
        this.store.dispatch(toggleSideBar());
    }

    onTweetLiked(id: number): void {
        this.store.dispatch(tweetLiked(id));
    }

    onTweetUnLiked(id: number): void {
        this.store.dispatch(tweetUnLiked(id));
    }

    onTweetUnRetweeted(id: number): void {
        this.store.dispatch(tweetUnRetweeted(id));
    }

    onTweetRetweeted(id: number): void {
        this.store.dispatch(tweetRetweeted(id));
    }

    ngOnDestroy(): void {
        this.storeSubscription.unsubscribe();
    }
}
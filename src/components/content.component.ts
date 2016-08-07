import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from "@angular/core";
import {Tweet} from "../entities/tweet.entity";
import {StarComponent} from "./star.component";
import {LikesComponent} from "./likes.component";
import {RetweetsComponent} from "./retweet.component";
@Component({
    selector: "content",
    directives: [StarComponent, LikesComponent, RetweetsComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<h2>Feed</h2>
<p>These are the most recent tweets</p>
<div class="nf-tweets">
    <div class="row nf-tweet" *ngFor="let tweet of tweets">
        <div class="col-sm-6">
            <h3>{{tweet.userName}} Tweeted</h3>
            <p>{{tweet.content}}</p>
        </div>
        <div class="col-sm-1">
             <likes [numberOfLikes]="tweet.likes" [hasLiked]="tweet.hasLiked" (onLike)="onLiked(tweet)"></likes>
        </div>
        <div class="col-sm-1">
             <retweets [numberOfRetweets]="tweet.retweets" [userHasRetweeted]="tweet.hasRetweeted" (toggle)="onRetweeted(tweet)"></retweets>
        </div>
        <div class="col-sm-2">
            <star [starred]="tweet.starred" (toggle)="onToggleStar(tweet)" class="pull-right"></star>
        </div>
        <div class="col-sm-2">
            <button class="btn btn-danger pull-right" (click)="onRemoveTweet(tweet)">
                <i class="fa fa-trash-o"></i>
            </button>
        </div>
    </div>
</div>
`
})
export class ContentComponent {
    @Input() tweets:Array<Tweet>;
    @Output() toggleStarTweet = new EventEmitter<number>();
    @Output() removeTweet = new EventEmitter<number>();
    @Output() tweetLiked = new EventEmitter<number>();
    @Output() tweetUnLiked = new EventEmitter<number>();
    @Output() tweetRetweeted = new EventEmitter<number>();
    @Output() tweetUnRetweeted = new EventEmitter<number>();

    onToggleStar(tweet:Tweet):void {
        this.toggleStarTweet.emit(tweet.id);
    }

    onRemoveTweet(tweet:Tweet):void {
        this.removeTweet.emit(tweet.id);
    }

    onLiked(tweet: Tweet): void {
        if(tweet.hasLiked) {
            this.tweetUnLiked.emit(tweet.id);
        } else {
            this.tweetLiked.emit(tweet.id);
        }
    }

    onRetweeted(tweet: Tweet): void {
        console.log("entered");
        if(tweet.hasRetweeted) {
            this.tweetUnRetweeted.emit(tweet.id);
        } else {
            this.tweetRetweeted.emit(tweet.id);
        }
    }
}
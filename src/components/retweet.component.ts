import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
    selector: 'retweets',
    template: `
    <i class="fa fa-retweet fa-2x" aria-hidden="true" 
    [class.retweeted]="userHasRetweeted" 
    (click)="onRetweetClicked()"></i> 
    {{numberOfRetweets}}
`
})
export class RetweetsComponent implements OnInit {
    @Input() userHasRetweeted:boolean;
    @Input() numberOfRetweets:number;
    @Output() toggle:EventEmitter<{}> = new EventEmitter<{}>();

    constructor() { }

    ngOnInit() { }

    onRetweetClicked() {
        this.toggle.emit(null);
    }

}

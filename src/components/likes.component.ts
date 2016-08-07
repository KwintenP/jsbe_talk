import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
    selector: 'likes',
    template: `
    <i class="fa fa-heart fa-2x" aria-hidden="true" [class.liked]="hasLiked" (click)="onLikeClicked()"></i> {{numberOfLikes}}
`
})
export class LikesComponent implements OnInit {
    @Input()
    numberOfLikes: number;
    @Input()
    hasLiked: boolean;
    @Output()
    onLike: EventEmitter<{}> = new EventEmitter<{}>();

    constructor() { }

    ngOnInit() { }

    onLikeClicked(): void {
        this.onLike.emit(null);
    }
    
}
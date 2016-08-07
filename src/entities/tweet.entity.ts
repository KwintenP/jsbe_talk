export class Tweet {
    constructor(public id:number,
                public userName:string,
                public content:string,
                public starred:boolean = false,
                public hasLiked: boolean,
                public likes: number = 0,
                public retweets:number = 0,
                public hasRetweeted: boolean = false) {
    }
}
import {Column} from "typeorm";

class Rating{

    @Column()
    private stars: number;
    @Column()
    private timesRated: number;

    constructor(stars: number,timesRated: number) {
        this.stars = stars;
        this.timesRated = timesRated;
    }

    static create(): Rating{
        return new Rating(0, 0);
    }

    addRating(stars: number){
        this.timesRated++;
        this.stars = ((this.stars * this.timesRated) + stars)/this.timesRated;
    }
}

export {Rating}
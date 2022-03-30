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
        return new Rating(5, 0);
    }

    addRating(stars: number){
        if(this.timesRated === 0) {
            this.stars = 0;
        }
        this.timesRated++;
        this.stars = ((this.stars * this.timesRated) + stars)/this.timesRated;
    }

    getStars(): number{
        return this.stars;
    }
}

export {Rating}
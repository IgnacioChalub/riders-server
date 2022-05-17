import {Column} from "typeorm";

class Rating{

    @Column({type:"decimal"})
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

    addRating(stars: number): void{
        if(this.timesRated === 0) {
            this.stars = 0;
        }
        this.stars = ((this.stars * this.timesRated) + stars)/(this.timesRated+1);
        this.timesRated++;
    }

    getStars(): number{
        return this.stars;
    }

    getTimesRated(): number{
        return this.timesRated;
    }

}

export {Rating}
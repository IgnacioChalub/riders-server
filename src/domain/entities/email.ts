import {Column} from "typeorm";

class Email{

    @Column()
    private address: string;

    constructor(address: string) {
        this.address = address;
    }

    static create(address: string): Email{
        if (
            /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(
                address,
            )
        ) {
            return new Email(address);
        }
        if (address.trim() === '') {
            throw Error('Invalid email')
        }
        throw Error('Invalid email');
    }
}

export {Email};
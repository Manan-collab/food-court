import { Column, Entity } from "typeorm";
import { baseEntity } from "../../utility/base-entity";


@Entity()
export class User extends baseEntity {
    @Column()
    name: string;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    contact: string;

}

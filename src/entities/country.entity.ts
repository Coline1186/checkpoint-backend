import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export default class Country {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    code: string;

    @Field()
    @Column()
    continent: string;

    @Field()
    @Column()
    emoji: string;
}
@InputType()
export class InputCreateCountry implements Omit<Country, "id"> {
    @Field()
    name: string;

    @Field()
    code: string;

    @Field()
    continent: string;

    @Field()
    emoji: string;
}
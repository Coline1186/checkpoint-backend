import { Field, ObjectType } from "type-graphql";
import Country from "../entities/country.entity";

@ObjectType()
export class CountryTotalResponse {
    @Field(() => [Country])
    countries: Country[];

    @Field()
    total: number;
}
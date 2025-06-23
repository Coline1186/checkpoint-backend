import { Query, Resolver } from "type-graphql";
import Country from "../entities/country.entity";
import CountryService from "../services/country.service";

@Resolver()
export default class CountryResolver {
    @Query(() => [Country])
    async countries() {
        return await new CountryService().listCountries();
    }
}
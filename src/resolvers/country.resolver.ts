import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Country, { InputCreateCountry } from "../entities/country.entity";
import CountryService from "../services/country.service";

@Resolver()
export default class CountryResolver {
    @Query(() => [Country])
    async countries() {
        return await new CountryService().listCountries();
    }

    @Query(() => Country)
    async country(@Arg("code") code: string) {
        return await new CountryService().findCountryByCode(code);
    }

    @Query(() => [Country])
    async countriesByContinent(@Arg("continent") continent: string) {
        return await new CountryService().findCountryByContinent(continent);
    }

    @Mutation(() => Country)
    async createCountry(@Arg("infos") infos: InputCreateCountry) {
        const newCountry = await new CountryService().createCountry(infos);
        return newCountry;
    }
}
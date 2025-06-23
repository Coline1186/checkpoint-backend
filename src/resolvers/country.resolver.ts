import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Country, { InputCreateCountry } from "../entities/country.entity";
import CountryService from "../services/country.service";
import { CountryTotalResponse } from "../dto/CountryTotalResponse";
import datasource from "../lib/datasource";

@Resolver()
export default class CountryResolver {
    @Query(() => CountryTotalResponse)
    async countries(): Promise<CountryTotalResponse> {
        const repo = datasource.getRepository(Country);
        const countries = await repo.find();

        return {
            countries,
            total: countries.length
        }
    }

    @Query(() => Country)
    async country(@Arg("code") code: string) {
        return await new CountryService().findCountryByCode(code);
    }

    @Query(() => CountryTotalResponse)
    async countriesByContinent(@Arg("continent") continent: string) {
        const repo = datasource.getRepository(Country);
        const countries = await repo.find({ where: { continent } });
        if (countries.length === 0) {
            throw new Error(`No countries found for continent ${continent}`);
        }
        return {
            countries,
            total: countries.length
        };
    }

    @Mutation(() => Country)
    async createCountry(@Arg("infos") infos: InputCreateCountry) {
        const newCountry = await new CountryService().createCountry(infos);
        return newCountry;
    }
}
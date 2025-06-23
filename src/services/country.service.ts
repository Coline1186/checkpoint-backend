import { Repository } from "typeorm";
import Country, { InputCreateCountry } from "../entities/country.entity";
import datasource from "../lib/datasource";

export default class CountryService {
    db: Repository<Country>;
    constructor() {
        this.db = datasource.getRepository(Country);
    }

    async listCountries() {
        return this.db.find();
    }
    
    async findCountryByCode(code: string) {
        const country = await this.db.findOneBy({ code });
        if (!country) {
            throw new Error(`Country with code ${code} not found`);
        }
        return country;
    }

    async findCountryByContinent(continent: string) {
        const countries = await this.db.find({ where: { continent } });
        if (countries.length === 0) {
            throw new Error(`No countries found for continent ${continent}`);
        }
        return countries;
    }

    async createCountry({ name, code, emoji, continent }: InputCreateCountry) {
        const newCountry = this.db.create({ name, code, emoji, continent });
        const existingCountry = await this.db.findOne({ where: { name } });
        if (existingCountry) {
            throw new Error(`Country with name ${name} already exists`);
        }
        if (!name || !code || !emoji || !continent) {
            throw new Error("All fields (name, code, emoji) are required");
        }
        return await this.db.save(newCountry);
    }
}
import { Repository } from "typeorm";
import Country from "../entities/country.entity";
import datasource from "../lib/datasource";

export default class CountryService {
    db: Repository<Country>;
    constructor() {
        this.db = datasource.getRepository(Country);
    }

    async listCountries() {
        return this.db.find();
    }
}
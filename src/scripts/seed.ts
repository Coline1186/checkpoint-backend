import Country from "../entities/country.entity";
import datasource from "../lib/datasource";

async function seed() {
  await datasource.initialize();

  const countryRepo = datasource.getRepository(Country);
  const countries = [
    { name: "France", code: "FR", emoji: "🇫🇷", continent: "EU" },
    { name: "Allemagne", code: "DE", emoji: "🇩🇪", continent: "EU" },
    { name: "Espagne", code: "ES", emoji: "🇪🇸", continent: "EU" },
    { name: "Italie", code: "IT", emoji: "🇮🇹", continent: "EU" },
    { name: "Royaume-Uni", code: "GB", emoji: "🇬🇧", continent: "EU" },
    { name: "États-Unis", code: "US", emoji: "🇺🇸", continent: "AM" },
    { name: "Canada", code: "CA", emoji: "🇨🇦", continent: "AM" },
    { name: "Australie", code: "AU", emoji: "🇦🇺", continent: "OC" },
    { name: "Japon", code: "JP", emoji: "🇯🇵", continent: "AS" },
    { name: "Chine", code: "CN", emoji: "🇨🇳", continent: "AS" },
    { name: "Inde", code: "IN", emoji: "🇮🇳", continent: "AS" },
    { name: "Brésil", code: "BR", emoji: "🇧🇷", continent: "AM" },
    { name: "Afrique du Sud", code: "ZA", emoji: "🇿🇦", continent: "AF" },
    { name: "Mexique", code: "MX", emoji: "🇲🇽", continent: "AM" },
    { name: "Corée du Sud", code: "KR", emoji: "🇰🇷", continent: "AS" },
    { name: "Argentine", code: "AR", emoji: "🇦🇷", continent: "AM" },
    { name: "Turquie", code: "TR", emoji: "🇹🇷", continent: "AS" },
    { name: "Arabie saoudite", code: "SA", emoji: "🇸🇦", continent: "AS" },
  ];
    await countryRepo.clear();

  for (const data of countries) {
    const country = countryRepo.create(data);
    await countryRepo.save(country);
  }
  console.log("✅ Données de test insérées !");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});

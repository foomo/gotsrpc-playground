import {LandAnimals, Pet as PetType, Species, WaterAnimals} from "@/services/generated/vo-wof";

const getEmoticonForSpecies = (species: Species): string => {
  switch (species) {
    case LandAnimals.Cat:
      return "🐈";
    case LandAnimals.Dog:
      return "🐕";
    case WaterAnimals.Catfish:
      return "🐈🐡";
    case WaterAnimals.Dogfish:
      return "🐕🐡";
    default:
      return "🦕";
  }
};

export const Pet = (pet: PetType) => {
  return (
    <>
      <h3>{getEmoticonForSpecies(pet.species)} {pet.name}</h3>
      <p>
        Your pet is called {pet.name} and is a {pet.species}.
      </p>
    </>
  );
};

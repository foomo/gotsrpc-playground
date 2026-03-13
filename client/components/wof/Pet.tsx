import {LandAnimals, Pet as PetType, Species, WaterAnimals} from "@/services/generated/vo-wof";

type SpeciesValue = Species[keyof Species];

const getEmoticonForSpecies = (species: SpeciesValue): string => {
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
      <h3>{getEmoticonForSpecies(pet.species as unknown as SpeciesValue)} {pet.name}</h3>
      <p>
        Your pet is called {pet.name} and is a {String(pet.species)}.
      </p>
    </>
  );
};

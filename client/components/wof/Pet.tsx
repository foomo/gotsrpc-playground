import { Pet as PetType, Species } from "@/services/generated/vo-wof";

const getEmoticonForSpecies = (species: Species): string => {
  switch (species) {
    case Species.Cat:
      return "🐈";
    case Species.Dog:
      return "🐕";
    case Species.Fish:
      return "🐡";
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

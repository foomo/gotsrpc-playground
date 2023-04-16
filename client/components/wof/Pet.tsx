import { Pet as PetType } from "@/services/generated/vo-wof";

export const Pet = (pet: PetType) => {
    return (
      <>
        <h3>🐈 {pet.name}</h3>
        <p>
          Your pet is called {pet.name} and is a {pet.species}.
        </p>
      </>
    );
  };
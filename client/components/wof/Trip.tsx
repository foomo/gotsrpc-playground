import { Trip as TripType} from "@/services/generated/vo-wof";

export const Trip = (trip: TripType) => {
    return (
      <>
        <h3>🛩️ {trip.name}</h3>
        <p>{trip.description}</p>
      </>
    );
  };
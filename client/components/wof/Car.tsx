import { Car as CarType } from "@/services/generated/vo-wof";

export const Car = (car: CarType) => {
    return (
      <>
        <h3>
          🚗 {car.brand} {car.model}
        </h3>
        <table>
          <tr>
            <td>model</td>
            <td>{car.model}</td>
          </tr>
          <tr>
            <td>brand</td>
            <td>{car.brand}</td>
          </tr>
          <tr>
            <td>power</td>
            <td>{car.power}</td>
          </tr>
          <tr>
            <td>number of seats</td>
            <td>{car.seats}</td>
          </tr>
        </table>
      </>
    );
  };
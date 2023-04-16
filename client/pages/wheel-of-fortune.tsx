import { Car } from "@/components/wof/Car";
import { Trip } from "@/components/wof/Trip";
import { Pet } from "@/components/wof/Pet";
import { ServiceClient } from "@/services/generated/client-wof";

import classes from "@/styles/Wof.module.css";
import { useState } from "react";
import { Price } from "@/services/generated/vo-wof";
import { getClientWithTransportLog, useTransportLogStore } from "@/services/transportWithLog";

const NoPriceComp = () => {
  return <div>No Price</div>;
};

const getComponentForPrice = (
  price?: Price
): React.FunctionComponent<Price> => {
  switch (price?.kind) {
    case "Car":
      return Car as React.FunctionComponent<Price>;
    case "Trip":
      return Trip as React.FunctionComponent<Price>;
    case "Pet":
      return Pet as React.FunctionComponent<Price>;
    default:
      return NoPriceComp;
  }
};

const client = getClientWithTransportLog(ServiceClient);

const WheelOfFortune = () => {
  const numRunningCalls = useTransportLogStore(
    (state) => state.numRunningCalls
  );

  const [price, setPrice] = useState<Price>(undefined);

  const PriceComp = getComponentForPrice(price);

  return (
    <div>
      <aside>This example shows gotsrpc&apos;s union feature</aside>
      <button
        onClick={(_) => {
          client.spin().then(setPrice);
          setPrice(undefined);
        }}
      >
        spin the wheel of fortune to win a price 🎰
      </button>
      {numRunningCalls > 0 && <p>the wheel of fortune is spinning ...</p>}
      {price && (
        <div className={classes.price}>
          Your price is a ({price.kind})
          <PriceComp {...price} />
        </div>
      )}
    </div>
  );
};

export default WheelOfFortune;

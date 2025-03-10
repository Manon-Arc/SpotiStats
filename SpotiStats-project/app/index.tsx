import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

import { getData, storeData } from "~/hook/localStorage";

export default function Home() {
  const [onBoarding, setOnBoarding] = useState<boolean | null>(null);

  useEffect(() => {
    const getStorage = async () => {
      const onboarded = await getData("ONBOARDED");
      if (!onboarded) {
        await storeData("true", "ONBOARDED");
        setOnBoarding(false);
      } else {
        setOnBoarding(true);
      }
    };

    getStorage();
  }, []);

  if (onBoarding === null) return null; // Prevent rendering before state is set
  if (!onBoarding) return <Redirect href="/onBoarding" />;

  return <Redirect href="/(tabs)/home" />;
}

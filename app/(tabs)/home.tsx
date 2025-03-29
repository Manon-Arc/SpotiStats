import { useEffect } from "react";
import { useCurrentTrack } from "@api/getCurrentTrack";
import { useStore } from "~/store/zustand";
import HomeScreen from "@screen/HomeScreen";

export default function Home() {
  const setCurrentTrack = useStore((state) => state.setCurrentTrack)
  const currentTrack = useCurrentTrack(1000)
  console.log(currentTrack)
  // Récupérer les setters depuis le store
  // const {
  //   setCurrentTrack
  // } = useStore(state => ({
  //   setCurrentTrack: state.setCurrentTrack
  // }));

  // Récupérer le morceau en cours
  //const currentTrackData = useCurrentTrack(10000); // Rafraîchissement toutes les 5 secondes

  useEffect(() => {

    // Mettre à jour le morceau en cours
    if (currentTrack?.data) {
      setCurrentTrack(currentTrack.data)

    }
  }, [
    currentTrack,
    // setCurrentTrack
  ]);

  return <HomeScreen />;
}
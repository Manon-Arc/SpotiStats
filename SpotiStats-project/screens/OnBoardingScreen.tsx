import HorizontalSlider from "~/components/HorizontalSlider";

const slides = [
  {
    Titre: "Découvrez vos habitudes d'écoute",
    Desc: "Analysez et comprenez votre musique préférée",
    ImageURL: require("~/assets/onBoarding-1.png"),
  },
  {
    Titre: "Parcourez vos tops du moment",
    Desc: "Explorez vos classements et titres du moment",
    ImageURL: require("~/assets/onBoarding-2.png"),
  },
  {
    Titre: "Explorez vos genres préférés",
    Desc: "Découvrez quels styles musicaux rythment votre quotidien",
    ImageURL: require("~/assets/onBoarding-3.png"),
  },
];

export default function OnBoardingScreen() {
  return <HorizontalSlider slides={slides} />;
}

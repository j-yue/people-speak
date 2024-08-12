import { useEffect } from "react";
import rochelle from "../assets/rochelle.png";
import armando from "../assets/armando.png";
import beatrice from "../assets/beatrice.png";
import emily from "../assets/emily.png";
import mary from "../assets/mary.png";
import roger from "../assets/roger.png";
import florence from "../assets/florence.png";
import candice from "../assets/candice.png";
import jeremy from "../assets/jeremy.png";
import sophie from "../assets/sophie.png";
import daniel from "../assets/daniel.png";
import glorp from "../assets/glorp.png";

const examplePersonaList = [
  {
    name: "Glorp, ??",
    description:
      "Glorp is a gelatinous, shape-shifting undercover alien. Glorp was stranded after losing communication with their spaceship. To survive, Glorp takes on odd jobs like serving coffee and selling souvenirs. It is hard for Glorp to understand human culture, especially the concept of money. But Glorp must endure and scrape by while finding a way back home.",
    variationCount: 2,
    uuid: "a5fea17e-ad25-45cf-b480-c9e9623bca29",
    isEnabled: false,
    img: glorp,
  },
  {
    name: "Rochelle, 41",
    description:
      "A high performing VP at a tech company. She is very busy tries to automate as much of her life as she can so that she doesn’t have to spend time on small tasks. Wants to save for the future but doesn’t have time to learn how to.",
    variationCount: 2,
    uuid: "a5fea17e-ad25-45cf-b480-c9e9623bca27",
    isEnabled: false,
    img: rochelle,
  },
  {
    name: "Armando, 63",
    description:
      "Worked hard his whole career and was able to retire at 60. He spends his time traveling the world with his wife. Does not want to think about finances but hopes that his investments can generate income for him.",
    variationCount: 3,
    uuid: "0e1359a6-8be3-47cf-a9a7-09f87bfa6700",
    isEnabled: false,
    img: armando,
  },
  {
    name: "Beatrice, 19",
    description:
      "A college student who works part time on campus to pay for college. She is trying to save money for a car and is worried about the state of the economy and her future.",
    variationCount: 2,
    uuid: "973add8d-449b-4681-9d7c-ab87d29a806b",
    isEnabled: false,
    img: beatrice,
  },
  {
    name: "Emily, 30",
    description:
      "Wants to start a family in 3 years and wants to start preparing financially right now. Kids are expensive. ",
    variationCount: 1,
    uuid: "f4116209-a7fb-4707-86fc-86848d5cf23f",
    isEnabled: false,
    img: emily,
  },
  {
    name: "Mary, 31",
    description:
      "Works a remote job in tech that allows her to travel the world. She primarily works out of low cost of living countries. On her free time likes to experience the local culture.",
    variationCount: 2,
    uuid: "0a775c5a-e424-4298-a33c-ca46fac9bc67",
    isEnabled: false,
    img: mary,
  },
  {
    name: "Roger, 28",
    description:
      "A freelance actor in the entertainment industry. Income is sporadic, just like his lifestyle. Doesn’t own many things so that he can easily travel when required for work. Looking for some stability in his finances.",
    variationCount: 2,
    uuid: "e9cc8274-5859-4068-a4fd-2ef77e9ce912",
    isEnabled: false,
    img: roger,
  },
  {
    name: "Calvin, 39",
    description:
      "Just purchased a home in the suburbs and commutes by train to the city to the office he has been at for the last 12 years. Lives a very frugal and routine lifestyle.",
    variationCount: 2,
    uuid: "676d553f-6eda-42b8-b499-bc098841c915",
    isEnabled: false,
    img: "",
  },
  {
    name: "Florence, 27",
    description:
      "An artist making a living off art commissions and royalties. Her income fluctuates a lot from month to month, but she wants to consistently save and build wealth for the future.",
    variationCount: 2,
    uuid: "a494dfda-1092-4101-8cd3-e8ae65a09a1f",
    isEnabled: false,
    img: florence,
  },
  {
    name: "Candice, 72",
    description:
      "A retired widow, likes spending time with her grandkids and reading. She wants to leave an impact on her family and community.",
    variationCount: 2,
    uuid: "d3ecae2c-26be-42cd-a174-c245d1835f3d",
    isEnabled: false,
    img: candice,
  },
  {
    name: "Jeremy, 45",
    description:
      "Entrepreneur who owns a boring but stable business. He is financially comfortable, and wants to grow his wealth conservatively.",
    variationCount: 2,
    uuid: "e94ee99a-a847-4dca-b299-e26d981763dc",
    isEnabled: false,
    img: jeremy,
  },
  {
    name: "Sophie, 24",
    description:
      "White collar professional, graduated from a top school and now working in a large city. Wants to set herself up for a financial prosperous future.",
    variationCount: 2,
    uuid: "838a966a-490e-4d3d-9e9b-a3d080c591f7",
    isEnabled: false,
    img: sophie,
  },
  {
    name: "Daniel, 48",
    description:
      "Works a blue collar job. Focused on self improvement. Spends a lot of time trying to improve his skills, increase his income and be a better person.",
    variationCount: 2,
    uuid: "d14f1b50-99b7-4fff-a8af-5b20c10f88f2",
    isEnabled: false,
    img: daniel,
  },
];

export const useLocalStorage = (setList) => {
  useEffect(() => {
    localStorage.setItem("personaList", JSON.stringify(examplePersonaList));
    setList(JSON.parse(localStorage.getItem("personaList") || "[]"));
  }, []);
};

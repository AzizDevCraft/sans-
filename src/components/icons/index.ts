import Cloud from "./cloud";
import Salad from "./salad";
import Croissant from "./croissant";
import GymWeight from "./gymWeight";
import Goutte from "./goutte";
import Bouclier from "./bouclier";
import Etoiles from "./etoiles";
import Midi from "./midi";
import Flamme from "./flammes";
import Batterie from "./batterie";
import Bouteille from "./bouteille";
import Nature from "./nature";
import Flash from "./flash";
import Cookies from "./cookies";
import Rocket from "./rocket";

export const iconRegistry = {
    CLOUD: Cloud,
    SALAD: Salad,
    CROISSANT: Croissant,
    GYM: GymWeight,
    GOUTTE: Goutte,
    BOUCLIER: Bouclier,
    ETOILES: Etoiles,
    MIDI: Midi,
    FLAMME: Flamme,
    BATTERIE: Batterie,
    BOUTEILLE: Bouteille,
    NATURE: Nature,
    ECLAIR: Flash,
    COOKIE: Cookies,
    ROCKET: Rocket
} as const 

export type iconName = keyof typeof iconRegistry

export function isIconName(value: string) {
  return value in iconRegistry
}

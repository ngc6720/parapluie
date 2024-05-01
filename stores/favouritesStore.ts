import { useLocalStorage } from "@vueuse/core";
import { skipHydrate } from "pinia";

export const useFavouritesStore = defineStore("favourites", () => {
  const weatherStore = useWeatherStore();

  let favourites = useLocalStorage("favourites", <Array<GeoData>>[]);

  let favouritesSorted = computed(() => {
    const copy = [...favourites.value];
    copy.sort((a, b) => a.name[0].localeCompare(b.name[0]));
    return copy;
  });

  function add() {
    if (!weatherStore.formatedData) return;

    const favourite: GeoData = {
      name: weatherStore.formatedData.name,
      coordinates: weatherStore.formatedData.coordinates,
    };

    const identical = (fav: GeoData) =>
      fav.coordinates[0] === favourite.coordinates[0] ||
      fav.coordinates[1] === favourite.coordinates[1];

    if (favourites.value.some(identical)) return;

    favourites.value.push(favourite);
  }

  function remove(fav: GeoData) {
    const index = favourites.value.indexOf(fav);
    favourites.value.splice(index, 1);
  }

  function select(fav: GeoData) {
    weatherStore.setParams(fav);
  }

  return {
    favourites: skipHydrate(favourites),
    favouritesSorted,
    add,
    select,
    remove,
  };
});

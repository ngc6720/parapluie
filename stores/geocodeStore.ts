const prefix = "scity-";

interface Result {
  info: AutocompleteResult;
  data: GeoData;
}
function hasData(unknownResult: any) {
  const { name, latitude, longitude } = unknownResult;
  return (
    typeof unknownResult === "object" &&
    typeof name === "string" &&
    typeof latitude === "number" &&
    typeof longitude === "number"
  );
}
function makeDataObject(result: any, i: number): Result {
  const { name, country, latitude, longitude } = result;
  return {
    info: {
      id: `${prefix}${i}`,
      name: country ? `${name}, ${country}` : `${name}`,
    },
    data: {
      name: [name, country],
      coordinates: [latitude, longitude],
    },
  };
}

export const useGeocodeStore = defineStore("geocode", () => {
  const weatherStore = useWeatherStore();

  let params = ref({
    count: 10,
    language: "en",
    format: "json",
    name: "",
  });

  const { data }: any = useFetch(
    "https://geocoding-api.open-meteo.com/v1/search",
    { method: "GET", params, immediate: false }
  );

  const results = computed((): Array<Result> => {
    if (!Array.isArray(data.value?.results)) return [];

    const results = data.value.results
      .map((result: any, i: number) =>
        hasData(result) ? makeDataObject(result, i) : null
      )
      .filter((el: Result | null) => el !== null);

    return results;
  });

  function update(value: string) {
    params.value.name = value;
  }

  function select(id: string) {
    const geoData = results.value.find((result) => result.info.id === id)?.data;
    if (!geoData) return;
    weatherStore.setParams(geoData);
  }

  return { data, results, update, select };
});

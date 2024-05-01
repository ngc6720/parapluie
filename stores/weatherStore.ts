export const useWeatherStore = defineStore("weather", () => {
  let params = ref({
    latitude: 0,
    longitude: 0,
    hourly: "rain",
    start_date: "",
    end_date: "",
  });

  const res: any = useFetch("https://api.open-meteo.com/v1/meteofrance", {
    method: "GET",
    params,
    immediate: false,
  });

  const { data } = res;
  const { dataView } = useDataView(res);
  let name = ref<Array<string>>([]);

  function setParams({ name: newName, coordinates: newCoordinates }: GeoData) {
    const [date1, date2] = toPaddedDateRange([new Date(), new Date()]);

    params.value = {
      ...params.value,
      ...{
        latitude: newCoordinates[0],
        longitude: newCoordinates[1],
        start_date: date1,
        end_date: date2,
      },
    };
    name.value = newName;
  }

  const formatedData = computed((): WeatherData | null => {
    if (data.value === null) {
      return null;
    }
    const offsetHours = new Date().getTimezoneOffset() / 60;

    return {
      name: name.value,
      date: data.value.hourly.time[24].split("T")[0] ?? "",
      time:
        arrTrimWithOffset(data.value.hourly.time, 24).map(
          (str: any) => str?.split("T")[1]
        ) ?? [],
      values: arrTrimWithOffset(data.value.hourly.rain, 24, offsetHours) ?? [],
      timezone: getLocaleTimezone(),
      unit: data.value.hourly_units[params.value.hourly]
        ? `${params.value.hourly} (${
            data.value.hourly_units[params.value.hourly]
          })`
        : "",
      coordinates: [data.value.latitude, data.value.longitude],
    };
  });

  return { data, dataView, name, formatedData, setParams };
});

import type { DataView } from "~/types/type";

export function useDataView({ data, error, pending, status }: any) {
  const view: DataView = {
    idle: false,
    pending: false,
    error: false,
    data: false,
  };

  let dataView = ref(view);

  watchEffect(() => {
    if (status.value === "idle")
      dataView.value = { ...view, ...{ idle: true } };
    else if (pending.value) dataView.value = { ...view, ...{ pending: true } };
    else if (error.value) dataView.value = { ...view, ...{ error: true } };
    else if (data.value) dataView.value = { ...view, ...{ data: true } };
  });

  return { dataView };
}

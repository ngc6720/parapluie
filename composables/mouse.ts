export function useMouse(target: any) {
  const x = ref(0);
  const y = ref(0);
  const xNorm = ref(0);
  const yNorm = ref(0);

  useEvent(target, "mousemove", (event: any) => {
    const rect = event.target.getBoundingClientRect();
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    x.value = event.clientX - rect.left;
    y.value = event.clientY - rect.top;
    xNorm.value = x.value / width;
    yNorm.value = y.value / height;
  });

  return { x, y, xNorm, yNorm };
}

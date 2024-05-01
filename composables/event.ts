export function useEvent(target: Ref<any>, event: string, callback: any) {
  onMounted(() => target.value.addEventListener(event, callback));
  onUnmounted(
    () => target.value && target.value.removeEventListener(event, callback)
  );
}

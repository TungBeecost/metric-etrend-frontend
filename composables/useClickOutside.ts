export default function useClickOutside(component: any, callback: any, excludeComponent?: any) {
  // fail early if any of the required params is missing
  if (!component) {
    throw new Error("A target component has to be provided.");
  }

  if (!callback) {
    throw new Error("A callback has to be provided.");
  }

  const listener = (event: Event) => {
    if (
      event.target === component.value ||
      event.composedPath().includes(component.value) ||
      (excludeComponent && (event.target === excludeComponent.value || event.composedPath().includes(excludeComponent.value)))
    ) {
      return;
    }
    if (typeof callback === "function") {
      callback();
    }
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });
}

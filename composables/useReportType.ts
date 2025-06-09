import { computed } from 'vue';
import { useRoute } from '#app';

export function useReportType() {
  const route = useRoute();

  const isXuHuongReport = computed(() => {
    return route.params.slug?.includes('xu-huong');
  });

  return {
    isXuHuongReport
  };
}
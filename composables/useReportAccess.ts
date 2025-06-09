// useReportAccess.ts
import { ref } from 'vue';

const isHideContent = ref(true);

export function useReportAccess() {
    const setHideContent = (value: boolean) => {
        console.log('Setting isHideContent to:', value);
        isHideContent.value = value;
    };

    return {
        isHideContent,
        setHideContent
    };
}
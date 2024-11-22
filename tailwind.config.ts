import type {Config} from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                orange: {
                    50: '#fff7ed',
                    100: '#feedd6',
                    200: '#fcd6ac',
                    300: '#f9b978',
                    400: '#f69041',
                    500: '#f3721c',
                    600: '#e85912',
                    700: '#bd4111',
                    800: '#973515',
                    900: '#792d15',
                    950: '#411409',
                }
            }
        }
    }
}

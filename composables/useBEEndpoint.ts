export default function useBEEndpoint(endpoint: string) {
  const config = useRuntimeConfig();

  return `${config.public.apiBase}${endpoint}`;
}

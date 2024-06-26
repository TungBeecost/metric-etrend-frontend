export default function useSearchReport() {
  const fetchSearch = async (value: string) => {
    console.log(`Searching ${value}...`);
  };

  const fetchSuggest = async (value: string) => {
    console.log(`Suggesting ${value}...`);

    return [];
  };

  return { fetchSearch, fetchSuggest };
}

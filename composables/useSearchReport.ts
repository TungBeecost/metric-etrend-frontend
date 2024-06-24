export default function useSearchReport() {
  const handleSearch = async (value: string) => {
    console.log(`Searching ${value}...`);
  };

  const handleSuggest = async (value: string) => {
    console.log(`Suggesting ${value}...`);

    return [];
  };

  return { handleSearch, handleSuggest };
}

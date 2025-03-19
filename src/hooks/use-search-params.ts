import { useQueryState, parseAsString } from "nuqs";

const useSearchParams = (key: string) => {
  return useQueryState(
    key,
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );
};

export { useSearchParams };

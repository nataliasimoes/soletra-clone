import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import wordsData from "~/data/words.json";

export const useWordStore = defineStore("wordStore", () => {
  const words = useStorage("board", wordsData);
  const userWords = useStorage<String[]>("userWords", []);

  const totalWords = computed(() => userWords.value.length);

  function checkWord(word: string) {
    const wordIndex = words.value.findIndex(
      (w) =>
        w
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") === word.toLowerCase()
    );
    if (wordIndex === -1) {
      return false;
    }

    if (userWords.value.includes(word)) {
      return 1;
    }

    userWords.value.push(word);
    return 2;
  }

  return {
    words,
    userWords,
    totalWords,
    checkWord,
  };
});

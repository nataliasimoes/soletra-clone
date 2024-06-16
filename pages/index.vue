<script setup lang="ts">
import { useWordStore } from "@/store/WordStore";
const wordStore = useWordStore();
const { totalWords, words, userWords } = storeToRefs(wordStore);
const text = ref("");
const pontuacao = ref(0);

function alreadyFound(word: string): boolean {
  return userWords.value.includes(
    word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  );
}

function submit() {
  if (countLetters(text.value) < 3) {
    callAlert("A palavra precisa ter no mínimo 3 letras");
    return;
  }

  // verificar se o text tem a letra A, caso não tenha, dá um erro
  if (!text.value.includes("A")) {
    callAlert("A palavra precisa conter a letra central");
    return;
  }

  const wordExists = wordStore.checkWord(text.value);
  if (wordExists) {
    if (wordExists === 1) {
      callAlert("Essa palavra já foi encontrada");
    } else {
      const letters = countLetters(text.value);
      const points = calculatePoints(letters);
      pontuacao.value += points;
      callAlert(`Boa, +${points} pontos!`);
    }
  } else {
    callAlert("Essa palavra não esá no nosso banco de dados");
  }
  text.value = "";
}

function countLetters(word: string): number {
  const lowerCaseWord = word.toLowerCase();

  let letterCount = 0;

  for (let i = 0; i < lowerCaseWord.length; i++) {
    if (lowerCaseWord[i] >= "a" && lowerCaseWord[i] <= "z") {
      letterCount++;
    }
  }

  return letterCount;
}

const calculatePoints = (letters: number) => {
  if (letters === 4) {
    return 1;
  } else {
    return countLetters(text.value);
  }
};

const alert = ref(false);
const alertText = ref("");
function callAlert(text: string) {
  alertText.value = text;
  alert.value = true;
  setTimeout(() => {
    alert.value = false;
  }, 1000);
}
</script>

<template>
  <UContainer>
    <div class="text-center mb-5 flex justify-center">
      <UInput
        id="input"
        color="primary"
        variant="none"
        v-model="text"
        size="xl"
        placeholder=""
        class="input-text board"
        v-if="!alert"
        style="text-align: center"
      />
    </div>
    <div>
      <UAlert :title="alertText" v-if="alert" />
    </div>
    <div class="block w-44 mx-auto">
      <div class="flex justify-between">
        <UButton
          size="md"
          color="green"
          variant="outline"
          label="L"
          :trailing="false"
          class="rounded-full h-10 w-10 flex justify-center items-center ml-6"
          @click="text += 'L'"
        />
        <UButton
          size="md"
          color="green"
          variant="outline"
          label="N"
          :trailing="false"
          class="rounded-full h-10 w-10 flex justify-center items-center mr-6"
          @click="text += 'N'"
        />
      </div>
      <div class="flex justify-between mt-4 mb-4">
        <UButton
          size="md"
          color="green"
          variant="outline"
          label="T"
          :trailing="false"
          class="rounded-full h-10 w-10 flex justify-center items-center"
          @click="text += 'T'"
        />
        <UButton
          size="md"
          color="green"
          variant="solid"
          label="A"
          :trailing="false"
          class="rounded-full h-10 w-10 flex justify-center items-center"
          @click="text += 'A'"
        />
        <UButton
          size="md"
          color="green"
          variant="outline"
          label="I"
          :trailing="false"
          class="rounded-full h-10 w-10 flex justify-center items-center"
          @click="text += 'I'"
        />
      </div>
      <div class="flex justify-between">
        <UButton
          size="md"
          color="green"
          variant="outline"
          label="O"
          :trailing="false"
          class="rounded-full h-10 w-10 flex justify-center items-center ml-6"
          @click="text += 'O'"
        />
        <UButton
          size="md"
          color="green"
          variant="outline"
          label="F"
          :trailing="false"
          class="rounded-full h-10 w-10 flex justify-center items-center mr-6"
          @click="text += 'F'"
        />
      </div>
    </div>

    <div class="flex justify-between mt-10">
      <UButton
        size="md"
        color="green"
        variant="solid"
        label="Apagar"
        :trailing="false"
        class="h-10 w-24 flex justify-center items-center"
        @click="text = text.slice(0, -1)"
      />
      <UButton
        size="md"
        color="green"
        icon="i-heroicons-arrow-path"
        variant="solid"
        :trailing="false"
        class="rounded-full h-10 w-10 flex justify-center items-center"
      />
      <UButton
        size="md"
        color="green"
        variant="solid"
        label="Confirmar"
        :trailing="false"
        class="h-10 w-15 flex justify-center items-center"
        @click="submit()"
      />
    </div>
    <div class="mt-4 flex">
      <p class="mr-2 text-green-700">{{ totalWords }}</p>
      <UProgress :value="totalWords" :max="23" class="mt-2" />
    </div>
    <div class="flex justify-between mt-5">
      <p>Palavras já encontradas</p>
      <UBadge :label="totalWords + `/23`" />
    </div>
    <div class="mt-5 grid grid-cols-2">
      <UInput
        color="green"
        variant="outline"
        class="mt-2 px-1"
        :placeholder="
          alreadyFound(word.toUpperCase())
            ? word
            : countLetters(word) + ' letras'
        "
        :value="alreadyFound(word.toUpperCase()) ? word : null"
        v-for="(word, index) in words"
        :key="word"
      />
    </div>
  </UContainer>
</template>

<style scoped>
.input-text {
  text-align: center;
}
</style>

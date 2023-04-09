<template>
  <main v-if="booksStore.books" class="container mx-auto">
    <div class="text-center flex justify-center flex-col">
      <h2 class="text-gray-700 font-medium">Runda</h2>
      <h1 class="text-gray-900 font-bold text-2xl">{{booksStore.round}} z {{booksStore.books.length}}</h1>
      <p class="text-gray-500 text-sm mt-2">Uzupełnij brakujące pola</p>
    </div>
    <div class="flex justify-center mt-6" v-if="!booksStore.gameStarted">
      <button @click="startGame" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Rozpocznij gre</button>
    </div>
    <div v-if="booksStore.round < booksStore.books.length + 1">
      <div class="game" v-if="actualBook">
        <table class="w-full text-sm text-left text-gray-500 shadow-lg mt-8 table-auto">
          <thead class="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th v-for="value in values" :key="value" scope="col" class="px-6 py-3">{{value}}</th>
          </tr>
          </thead>
          <tbody v-if="actualBook">
          <tr class="bg-white border-b">
            <template v-for="(value, key) in values" :key="key">
              <td class="px-6 py-4" v-if="key == fullField">{{actualBook[key]}}</td>
              <td class="px-6 py-4" v-else>
                <input type="text" name="" id="" :placeholder="value">
              </td>
            </template>
          </tr>
          <tr class="bg-white border-b bg-gray-50" v-if="seeAnswers">
            <td  v-for="(value, key) in values" :key="key" class="px-6 py-4">{{actualBook[key]}}</td>
          </tr>
          </tbody>
        </table>
        <div class="mt-6 flex justify-end">
          <button @click="seeAnswers = true" v-if="!seeAnswers" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Sprawdź odpowiedzi</button>
          <button @click="nextRound" v-if="seeAnswers" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Dalej</button>
        </div>
      </div>
    </div>
    <div>
      <div class="flex justify-center mt-6" v-if="booksStore.round > booksStore.books.length">
        <button @click="resetGame" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Zagraj jeszcze raz</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import {useBooksStore} from "@/stores/books";
import {ref} from "vue";
import values from "@/assets/values.json"

const booksStore = useBooksStore()

const actualBook = ref(null)

const fullField = ref(null)

const possibleToDraw = ref(['place', 'threads'])

const seeAnswers = ref(false)

const randomQueue = ref(null)

const startGame = () => {
  booksStore.gameStarted = true
  seeAnswers.value = false
  randomQueue.value = getRandomQueue(booksStore.books.length, booksStore.books.length)
  getRandomBook()
  getRandomFullField()
}

const resetGame = () => {
  booksStore.round = 0
  booksStore.gameStarted = false
}

const nextRound = () => {
  getRandomBook()
  getRandomFullField()

  seeAnswers.value = false
  booksStore.round++
}

const getRandomQueue = (range, count) => {
  if (count > range) {
    throw new Error("The count must not be greater than the range!");
  }

  let array = [];

  // Fill the array with numbers from the given range
  for (let i = 1; i <= range; i++) {
    array.push(i);
  }

  // Shuffle the elements in the array
  for (let i = 0; i < count; i++) {
    let randomIndex = Math.floor(Math.random() * (range - i));
    let temp = array[i];
    array[i] = array[i + randomIndex];
    array[i + randomIndex] = temp;
  }

  return array.slice(0, count);
}


// LOSOWANIE AKTUALNEJ KSIAZKI
const getRandomBook = () => {
  // const number = booksStore.randomNum(0, booksStore.books.length)
  // actualBook.value = booksStore.books[number - 1]
  actualBook.value = booksStore.books[randomQueue.value[0] - 1]
  randomQueue.value.splice(0, 1)
  console.log(randomQueue.value)
}

// LOSOWANIE UZUPELNIONEGO POLA
const getRandomFullField = () => {
  const fieldNumber = booksStore.randomNum(0, possibleToDraw.value.length)
  fullField.value = possibleToDraw.value[fieldNumber - 1]
}
</script>

<style scoped>

</style>
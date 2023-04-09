<template>
  <div class="w-full h-full bg-gray-900/40 fixed left-0 top-0 z-50 flex justify-center items-center">
    <div class="bg-white w-96 p-8 rounded">
      <input placeholder="Epoka" v-model="era" />
      <input placeholder="Autor" v-model="author" />
      <input placeholder="Tytuł" v-model="title" />
      <input placeholder="Bohater" v-model="character" />
      <input placeholder="Gatunek" v-model="species" />
      <input placeholder="REKWIZYT / MIEJSCE / TERMIN" v-model="place" />
      <input placeholder="PROBLEMATYKA / WĄTKI" v-model="threads" />
      <div class="flex gap-3">
        <button class="bg-gray-100">Close</button>
        <button class="bg-indigo-600 text-white" @click="addBook">Dodaj</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { collection, addDoc } from "firebase/firestore";
import {db} from "@/firebase/config";

const era = ref('')
const author = ref('')
const title = ref('')
const character = ref('')
const species = ref('')
const place = ref('')
const threads = ref('')

const addBook = async () => {
  const docRef = await addDoc(collection(db, "books"), {
    era: era.value,
    author: author.value,
    title: title.value,
    character: character.value,
    species: species.value,
    place: place.value,
    threads: threads.value,
  });
  console.log(docRef)
  era.value = ''
  author.value = ''
  title.value = ''
  character.value = ''
  species.value = ''
  place.value = ''
  threads.value = ''
}
</script>

<style scoped>
input {
  @apply p-2 border mb-4 w-full rounded
}

button {
  @apply w-full p-2 rounded
}
</style>
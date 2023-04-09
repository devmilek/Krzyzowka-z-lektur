<template>
  <main>
    <div class="container mx-auto p-2">
      <div class="flex justify-center mb-6">
        <router-link to="/play" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Graj</router-link>
      </div>
      <table class="w-full text-sm text-left text-gray-500 shadow-lg mb-10 overflow-scroll" >
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th v-for="value in values" :key="value" scope="col" class="px-6 py-3">{{value}}</th>
          </tr>
        </thead>
        <tbody v-if="bookStore.books">
          <tr class="bg-white border-b" v-for="book in bookStore.books" :key="book.title">
            <td class="px-6 py-4" v-for="(value, key) in values" :key="key">{{book[key]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import axios from "axios";
import {onMounted} from "vue";
import {ref, reactive} from "vue";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import {db} from "@/firebase/config";
import values from '@/assets/values.json'
import {useBooksStore} from "@/stores/books";

const books = ref(null)

const bookStore = useBooksStore()

onMounted(() => {
  getBooks()
  // getValues()
})

const getBooks = async () => {
  const q = query(collection(db, "books"), orderBy("era"));
  const querySnapshot = await getDocs(q);
  let rawBooks = []
  await querySnapshot.forEach((doc) => {
    rawBooks.push(doc.data())
  });
  books.value = rawBooks

}
const getValues = async () => {
  const response = await axios.get('http://localhost:3000/values')
  values.value = response.data
}
</script>
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "@/firebase/config";

export const useBooksStore = defineStore('books', () => {
  const books = ref(null)

  const getBooks = async () => {
    const q = query(collection(db, "books"), orderBy("era"));
    const querySnapshot = await getDocs(q);
    let rawBooks = []
    await querySnapshot.forEach((doc) => {
      rawBooks.push(doc.data())
    });
    books.value = rawBooks
  }

  const round = ref(1)

  function randomNum(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const gameStarted = ref(false)

  return { books, getBooks, round, randomNum, gameStarted }
})

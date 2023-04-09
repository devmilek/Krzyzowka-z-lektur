<script setup>
import {useBooksStore} from "@/stores/books";
import AddBookModal from "@/components/AddBookModal.vue";

const bookStore = useBooksStore()

bookStore.getBooks()
</script>

<template>
  <header class="flex items-center justify-center mb-6 pt-8">
    <img src="@/assets/icons/book-open.svg" class="mr-4">
    <h1 class="gray-900 text-3xl font-bold">Krzyżówka z lektur</h1>
  </header>
  <RouterView />
<!--  <AddBookModal />-->
</template>

<style>
body {
  @apply bg-gray-50
}
</style>

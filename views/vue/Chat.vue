<template>
  <div id="chat">
    <span>{{word1}} {{word2}}</span>
  </div>
</template>

<script>
export default {
  name: "chat",
  data: () => {
    return {
      word1: "Hello",
      word2: "World"
    };
  }
};
</script>
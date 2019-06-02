<template>
  <nav class="navbar navbar-light">
    <div class="container">Foo</div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RwvHeader',
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated']),
  },
};
</script>

<style scoped>
.button {
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
}

.buttonClose {
  padding: 4em;
  background: papayawhip;
}
</style>

<!-- Using CSS modules -->
<style module>
.button {
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
}

.buttonClose {
  background-color: red;
}
</style>


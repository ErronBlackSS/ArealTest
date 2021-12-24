<template>
  <div class="header-main">
    <ul class="nav-bar">
      <li><router-link to="/"> Currency list</router-link></li>
      <li><router-link to="/conversion">Currency Converter</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style>
body {
  margin: auto;
  background: aliceblue;
}
ul {
  list-style-type: none;
  margin: 0 40%;
  padding-left: 0;
  width: 200px;
  background-color: #f1f1f1;
}
li a {
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}
li a:hover {
  background-color: #555;
  color: white;
}
.header-main {
  background: aquamarine;
}
</style>
<template>
  <div id="app">

    <connection v-if="verif===false"></connection>

    <section v-if="errored">Pas de contenu wsh</section>
    <section v-else>
      <spinner v-if="loading">Loading</spinner>

      <section id="screen" v-else>{{ this.contenuHTML }}</section>
    </section>

  </div>
</template>




<script>
import Connection from "./components/Connection";
import Spinner from "./components/spinner";
import axios from "axios";
import showdown from "showdown";
export default {
  name: 'app',

  components: {Spinner, Connection},

  data () {
    return {
      verif: false,
      token: null,
      url: null,
      contenuMD: null,
      contenuHTML: null,

      errored: false,
      loading: false,
    }
  },

  methods: {
    isVerified(){
      return this.verif;
    },

    getMarkdown(){
      axios
        .get(this.url)
        .then(response => {
          console.log(response.data.markdown);
          this.contenuMD = response.data.markdown;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally( () => { this.loading = false; this.markdownToHtml(); } );
    },

    markdownToHtml(){
      let converter = new showdown.Converter();
      this.contenuHTML = converter.makeHtml(this.contenuMD);
    },

  },

  created() {
    setInterval(() => {
      if(this.isVerified()) this.getMarkdown();
    }, 3000);
  }
}
</script>






<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

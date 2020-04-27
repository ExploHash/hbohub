<template>
   <a-list style="margin-left: -25px; margin-right: -25px;" bordered itemLayout="vertical" size="large" :pagination="pagination" :dataSource="favourites">
      <a-list-item slot="renderItem" slot-scope="id" key="id">
        <img slot="extra" height="150" alt="logo" :src="'instellingslogos/' + $global.findLogo(hboData[id].brin)" />
        <a-descriptions :title="hboData[id].opleidingsnaam" :description="hboData[id].opleidingsinstelling">
          <a-descriptions-item :span="3">{{ hboData[id].opleidingsinstelling }}</a-descriptions-item>
          <a-descriptions-item label="Type">{{ hboData[id].opleidingstype }}</a-descriptions-item>
          <a-descriptions-item label="Vorm">{{ hboData[id].opleidingsvorm }}</a-descriptions-item>
          <a-descriptions-item label="Categorie">{{ hboData[id].hoofdcategorie }}</a-descriptions-item>
          <a-descriptions-item label="Provincie">{{ hboData[id].provincie }}</a-descriptions-item>
          <a-descriptions-item label="Gemeente">{{ hboData[id].gemeentenaam }}</a-descriptions-item>
          <a-descriptions-item label="Opleidingscode">{{ hboData[id].opleidingscode }}</a-descriptions-item>
        </a-descriptions>
        <a-button type="primary" target="_blank" :href="$global.getSearch(hboData[id])">Zoek opleiding website</a-button>
        <a-button type="danger" @click="toggleFavourite(hboData[id].id)" icon="cross">Verwijder van favorieten</a-button>
      </a-list-item>
    </a-list>
</template>



<script>
export default {
  computed: {
    favourites(){
      return this.$store.state.favourites;
    },
    hboData(){
      return this.$store.state.hboData;
    }
  },
  data: function() {
    return {
      pagination: {
        pageSize: 7
      }
    };
  },
  methods: {
    toggleFavourite(id){
      this.$store.commit("toggleFavourite", id);
      localStorage.favourites = JSON.stringify(this.favourites);
    }
  },
  mounted(){
    this.$store.commit("setFavourites", localStorage.favourites ? JSON.parse(localStorage.favourites) : [])
  }
};
</script>
<style>
</style>

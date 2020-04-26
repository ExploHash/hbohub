<template>
  <!-- <main> -->
   <a-list style="margin-left: -25px; margin-right: -25px;" bordered itemLayout="vertical" size="large" :pagination="pagination" :dataSource="favourites">
      <a-list-item slot="renderItem" slot-scope="id" key="id">
        <img slot="extra" height="150" alt="logo" :src="'instellingslogos/' + findLogo(hboData[id].brin)" />
        <a-descriptions :title="hboData[id].opleidingsnaam" :description="hboData[id].opleidingsinstelling">
          <a-descriptions-item :span="3">{{ hboData[id].opleidingsinstelling }}</a-descriptions-item>
          <a-descriptions-item label="Type">{{ hboData[id].opleidingstype }}</a-descriptions-item>
          <a-descriptions-item label="Vorm">{{ hboData[id].opleidingsvorm }}</a-descriptions-item>
          <a-descriptions-item label="Categorie">{{ hboData[id].hoofdcategorie }}</a-descriptions-item>
          <a-descriptions-item label="Provincie">{{ hboData[id].provincie }}</a-descriptions-item>
          <a-descriptions-item label="Gemeente">{{ hboData[id].gemeentenaam }}</a-descriptions-item>
          <a-descriptions-item label="Opleidingscode">{{ hboData[id].opleidingscode }}</a-descriptions-item>
        </a-descriptions>
        <a-button type="primary" target="_blank" :href="getSearch(hboData[id])">Zoek opleiding website</a-button>
        <a-button type="danger" @click="addFavourite(hboData[id].id)" icon="cross">Verwijder van favorieten</a-button>
      </a-list-item>
    </a-list>
  <!-- </main> -->
</template>



<script>
import hboData from "~/assets/data.json";
import instellingenData from "~/assets/instellingen.json";

export default {
  mounted(){
    if(localStorage.favourites){
      this.favourites = JSON.parse(localStorage.favourites);
    }
  },
  created(){
    this.hboData = hboData;
  },
  watch: {
    favourites(newData) {
      localStorage.favourites = JSON.stringify(newData);
    }
  },
  data: function() {
    return {
      pagination: {
        pageSize: 7,
      },
      hboData: [],
      favourites: []
    };
  },
  methods: {
    findLogo(brin){
      return instellingenData.find(id => id.brin === brin).imagename;
    },
    getSearch(opleiding){
      let searchTerms = ["opleidingsnaam", "opleidingsvorm", "opleidingstype"]
      return "http://www.google.com/search?q=opleiding " + "site:" + instellingenData.find(id => id.brin === opleiding.brin).url + searchTerms.reduce((acc, val) => {acc += " " + encodeURIComponent(opleiding[val]); return acc;}, "") + "&btnI";
    },
    addFavourite(id){
      if(this.favourites.includes(id)){
        this.favourites = this.favourites.filter(favourite => favourite !== id);
      }else{
        this.favourites.push(id);
      }
    },
  }
};
</script>
<style>
  /* .ant-list {
    margin-left: -25px;
    margin-right: -25px;
  } */
</style>

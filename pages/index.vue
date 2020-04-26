<template>
    <a-row :gutter="[50,0]">
      <a-col class="filterbox" :span="6">
        <div class="filter">
          <h3>Zoeken</h3>
          <a-input v-model="searchterms" @change="applyFilters" placeholder="Zoeken in opleidingen" />
        </div>

        <div class="filter" v-for="(filterValues, filterName) in filters" v-bind:key="filterName">
          <h3>{{ filterName }}</h3>
          <div v-bind:key="filterValue" v-for="(state, filterValue) in filterValues">
            <a-checkbox @change="selectFilter(filterName,filterValue)">{{ filterValue }}</a-checkbox>
          </div>
        </div>
      </a-col>

      <a-col :span="18">
        <a-list bordered itemLayout="vertical" size="large" :pagination="pagination" :dataSource="results">
          <div slot="header"><b>{{ results.length }}</b> opleidingen gevonden.</div>
          <a-list-item slot="renderItem" slot-scope="opleiding" key="opleiding.id">
            <img slot="extra" height="150" alt="logo" :src="'instellingslogos/' + findLogo(opleiding.brin)" />
            <a-descriptions :title="opleiding.opleidingsnaam" :description="opleiding.opleidingsinstelling">
              <a-descriptions-item :span="3">{{ opleiding.opleidingsinstelling }}</a-descriptions-item>
              <a-descriptions-item label="Type">{{ opleiding.opleidingstype }}</a-descriptions-item>
              <a-descriptions-item label="Vorm">{{ opleiding.opleidingsvorm }}</a-descriptions-item>
              <a-descriptions-item label="Categorie">{{ opleiding.hoofdcategorie }}</a-descriptions-item>
              <a-descriptions-item label="Provincie">{{ opleiding.provincie }}</a-descriptions-item>
              <a-descriptions-item label="Gemeente">{{ opleiding.gemeentenaam }}</a-descriptions-item>
              <a-descriptions-item label="Opleidingscode">{{ opleiding.opleidingscode }}</a-descriptions-item>
            </a-descriptions>
            <a-button type="primary" target="_blank" :href="getSearch(opleiding)">Zoek opleiding website</a-button>
            <a-button :type="favourites.includes(opleiding.id) ? 'danger' : 'default'" @click="addFavourite(opleiding.id)" icon="heart">Favoriet</a-button>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
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
  watch: {
    favourites(newData) {
      localStorage.favourites = JSON.stringify(newData);
    }
  },
  created() {
    this.calculateFilters();
    this.applyFilters();
  },
  data: function() {
    return {
      pagination: {
        pageSize: 7,
      },
      results: [],
      favourites: [],
      searchterms: "",
      filternames: [
        "opleidingstype",
        "opleidingsvorm",
        "hoofdcategorie",
        "provincie",
        "opleidingsinstelling"
      ],
      filters: {}
    };
  },
  methods: {
    addFavourite(id){
      if(this.favourites.includes(id)){
        this.favourites = this.favourites.filter(favourite => favourite !== id);
      }else{
        this.favourites.push(id);
      }
    },
    selectFilter(filter, value) {
      this.filters[filter][value] = this.filters[filter][value] !== true;
      this.applyFilters();
    },
    calculateFilters() {
      hboData.forEach(row => {
        this.filternames.forEach(filter => {
          if (!this.filters[filter]) this.filters[filter] = {};
          if (!this.filters[filter][row[filter]]) {
            this.filters[filter][row[filter]] = false;
          }
        });
      });
    },
    findLogo(brin){
      return instellingenData.find(id => id.brin === brin).imagename;
    },
    getSearch(opleiding){
      let searchTerms = ["opleidingsnaam", "opleidingsvorm", "opleidingstype"]
      return "http://www.google.com/search?q=opleiding " + "site:" + instellingenData.find(id => id.brin === opleiding.brin).url + searchTerms.reduce((acc, val) => {acc += " " + encodeURIComponent(opleiding[val]); return acc;}, "") + "&btnI";
    },
    applyFilters(){
      //First find emptyfilters
      let emptyFilters = [];
      Object.entries(this.filters).forEach(([filterName, filterValues]) => {
        if(Object.entries(this.filters[filterName]).every(([index, value]) => !value)){
          emptyFilters.push(filterName);
        }
      });
      //Filter
      this.results = hboData.filter(row => {
        return Object.entries(this.filters).every(([filterName, filterValues]) => {
          return (emptyFilters.includes(filterName) || Object.entries(filterValues).find(([filterValue, state]) => {
            return state && row[filterName] === filterValue;
          })) && this.searchterms.toLowerCase().split(" ").some(term => row.opleidingsnaam.toLowerCase().includes(term) || row.opleidingsinstelling.toLowerCase().includes(term))
        });
      });
    }
  }
};
</script>

<style>
main > aside {
  position: relative;
  top: 0px;
  left: 0px;
  display: block;
  float: left;
  width: 300px;
  height: 100%;
}

.filter {
  margin-bottom: 20px;
}

.filter h3 {
  text-transform: capitalize;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
}

.ant-list-item {
  padding: 20px;
}

.ant-checkbox-wrapper > span, .ant-descriptions-item-content {
  text-transform: capitalize;
}

.filterbox {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding-top: 15px;
}
</style>

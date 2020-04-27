<template>
    <a-row :gutter="[50,0]">
      <a-col class="filterbox" :span="6">
        <a id="resetButton" @click="resetFilters">Reset</a> 
        <div class="filter">
          <h3>Zoeken</h3>
          <a-input v-model="searchTerms" placeholder="Zoeken in opleidingen" />
        </div>

        <div class="filter" v-for="(filterValues, filterName) in filters" v-bind:key="filterName">
          <h3>{{ filterName }}</h3>
          <div v-bind:key="filterValue" v-for="(state, filterValue) in filterValues">
            <a-checkbox :checked="filters[filterName][filterValue]" @change="selectFilter(filterName,filterValue)">{{ filterValue }}</a-checkbox>
          </div>
        </div>
      </a-col>

      <a-col :span="18">
        <a-list bordered itemLayout="vertical" size="large" :pagination="pagination" :dataSource="results">
          <div slot="header"><b>{{ results.length }}</b> opleidingen gevonden.</div>
          <a-list-item slot="renderItem" slot-scope="opleiding" key="opleiding.id">
            <img slot="extra" height="150" alt="logo" :src="'instellingslogos/' + $global.findLogo(opleiding.brin)" />
            <a-descriptions :title="opleiding.opleidingsnaam" :description="opleiding.opleidingsinstelling">
              <a-descriptions-item :span="3">{{ opleiding.opleidingsinstelling }}</a-descriptions-item>
              <a-descriptions-item label="Type">{{ opleiding.opleidingstype }}</a-descriptions-item>
              <a-descriptions-item label="Vorm">{{ opleiding.opleidingsvorm }}</a-descriptions-item>
              <a-descriptions-item label="Categorie"><span class="elli">{{ opleiding.hoofdcategorie }}</span></a-descriptions-item>
              <a-descriptions-item label="Provincie">{{ opleiding.provincie }}</a-descriptions-item>
              <a-descriptions-item label="Gemeente">{{ opleiding.gemeentenaam }}</a-descriptions-item>
              <a-descriptions-item label="Opleidingscode">{{ opleiding.opleidingscode }}</a-descriptions-item>
            </a-descriptions>
            <a-button type="primary" target="_blank" :href="$global.getSearch(opleiding)">Zoek opleiding website</a-button>
            <a-button :type="favourites.includes(opleiding.id) ? 'danger' : 'default'" @click="toggleFavourite(opleiding.id)" icon="heart">Favoriet</a-button>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
</template>



<script>
export default {
  data: function() {
    return {
      pagination: {
        pageSize: 7
      },
    };
  },
  computed: {
    searchTerms: {
      get(){
        return this.$store.state.searchTerms;
      },
      set(value){
        this.$store.dispatch("setSearchTerm", value);
      }
    },
    results(){
      return this.$store.state.results;
    },
    filters(){
      return this.$store.state.filters;
    },
    favourites(){
      return this.$store.state.favourites;
    }
  },
  mounted(){
    this.$store.commit("setFavourites", localStorage.favourites ? JSON.parse(localStorage.favourites) : [])
  },
  methods: {
    toggleFavourite(id){
      this.$store.commit("toggleFavourite", id);
      localStorage.favourites = JSON.stringify(this.favourites);
    },
    selectFilter(filterName, filterValue) {
      this.$store.dispatch("filterEvent", {filterName, filterValue});
    },
    resetFilters(){
      this.$store.dispatch("calculateFilters");
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

#resetButton {
  position: absolute;
  right: 0px;
  margin-right: 20px;
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

.elli {
  position: absolute;
  width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  margin-top: -14px;
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

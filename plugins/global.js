import Vue from 'vue'
import instellingenData from "~/assets/instellingen.json";

export default (c) => {
  Vue.prototype.$global = {
    findLogo(brin){
      return instellingenData.find(id => id.brin === brin).imagename;
    },
    getSearch(opleiding){
      let searchTerms = ["opleidingsnaam", "opleidingsvorm", "opleidingstype"]
      return "http://www.google.com/search?q=opleiding " + "site:" + instellingenData.find(id => id.brin === opleiding.brin).url + searchTerms.reduce((acc, val) => {acc += " " + encodeURIComponent(opleiding[val]); return acc;}, "") + "&btnI";
    }
  }
}
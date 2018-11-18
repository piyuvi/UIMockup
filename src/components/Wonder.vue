<template>
<v-app>
  <div class="loader">
  <v-progress-circular
      indeterminate
      color="primary"
      v-if="isLoading"
    ></v-progress-circular>
  </div>
  <v-toolbar class="topHeader">
    <v-toolbar-title><img src="https://rupeek.com/images/logo.svg" height="70" width="125" style="margin-top: 12px;"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon></v-toolbar-side-icon>
  </v-toolbar>
  <v-flex>
  <v-toolbar class="bottomHeader" flat>
    <v-toolbar-title :fullscreen="$vuetify.breakpoint.xs">
      <v-autocomplete
      flat
      v-model="searchInput"
      :items="wonders"
      :loading="isLoading"
      :search-input.sync="search"
      clearable
      item-text="place"
      item-value="id"
      label="Search by Name"
      prepend-inner-icon="search"
      solo
    ></v-autocomplete>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title :fullscreen="$vuetify.breakpoint.xs">
      Total Likes: {{this.sessionLiked}}
    </v-toolbar-title>
    <v-toolbar-title :fullscreen="$vuetify.breakpoint.xs">
      Total API Hits: {{this.apiHits}}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title >
      <v-select
      flat
          :items="items"
          label="Sort By"
          v-model="selectedSort"
          solo
        ></v-select>
    </v-toolbar-title>
  </v-toolbar>
  </v-flex>
  <br/>
  <v-container fluid grid-list-md>
  <v-layout row wrap v-if="sevenWonders">
    <v-flex xs12 sm5 md6 v-for = "(wonder,index) in sevenWonders" :key="index">
      <v-hover>
        <v-card slot-scope="{ hover }"
          color="gray">
          <v-img
            :src=wonder.imageURL
          >
          <v-card v-if="hover" class="d-flex transition-fast-in-fast-out white darken-1 v-card--reveal gray--text .title"
            style="text-align:justify;height: 100%;opacity: 0.9;" :fullscreen="$vuetify.breakpoint.xsOnly">
               <v-card-text>
                 <v-btn icon style="float:right" @click="callLiked(wonder)" @click.stop>
                    <v-icon v-if="!wonder.clicked">favorite_border</v-icon>
                    <v-icon v-if="wonder.clicked" style="color='green'">favorite</v-icon>
                    {{wonder.likes}}
                  </v-btn>
                  <p class="text-xs-center title mt-5">{{wonder.place}}</p>
                  <p class="text-xs-center subheading">{{wonder.description}}</p>
               </v-card-text>
          </v-card>
          </v-img>
          <v-card-title primary-title>
              <v-layout row wrap>
              <v-flex>
                <h3 style="display:flex;">Ratings
                <v-rating v-model="wonder.ratings" half-increments color="orange" background-color="black" readonly></v-rating>
                <v-spacer></v-spacer> {{wonder.place}}
                </h3>
              </v-flex>
              </v-layout>
            </v-card-title>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
  </v-container>
</v-app>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Wonder',
  data () {
    return {
      items: ['Ratings', 'Likes'],
      selectedSort: '',
      isLoading: true,
      wonders: [],
      totalLikes: 0,
      sessionLiked: 0,
      apiHits: 0,
      clicked: false,
      searchInput: '',
      searchedArray: []
    }
  },
  computed: {
    sevenWonders () {
      let wonderArray = []
      this.wonders.filter((won) => {
        if (won.id === this.searchInput) {
          wonderArray.push(won)
        }
      })
      if (this.searchInput) {
        return wonderArray
      } else {
        let sortParam = this.selectedSort || this.items[0]
        this.sortArray(this.wonders, sortParam.toLowerCase())
        return this.wonders
      }
    }
  },
  mounted () {
    // this.selectedSort = this.items[0]
    axios.get('https://www.mocky.io/v2/5bdd28dd32000075008c6227')
      .then(res => {
        if (res.data) {
          this.wonders = JSON.parse(sessionStorage.getItem('likedArray')) || res.data.data
          this.wonders.map((wonder) => {
            this.totalLikes += wonder.likes
            if (!wonder.hasOwnProperty('clicked')) {
              wonder['clicked'] = false
            }
          })
          this.sessionLiked = sessionStorage.getItem('totalLiked') || this.totalLikes
          sessionStorage.setItem('totalLiked', this.sessionLiked)
          if (this.apiHits === 0) {
            if (sessionStorage.getItem('apiHits') !== null) {
              this.apiHits = +sessionStorage.getItem('apiHits') + 1
            } else {
              this.apiHits = ++this.apiHits
            }
          } else {
            this.apiHits++
          }
          sessionStorage.setItem('apiHits', this.apiHits)
          this.isLoading = false
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => (this.isLoading = false))
  },
  beforeDestroy () {
  },
  methods: {
    callLiked (wonder) {
      this.wonders.map((won) => {
        if (won.id === wonder.id) {
          if (!won['clicked']) {
            won.likes++
            won['clicked'] = true
            this.sessionLiked = +sessionStorage.getItem('totalLiked') + 1
          } else {
            won.likes--
            won['clicked'] = false
            this.sessionLiked = +sessionStorage.getItem('totalLiked') - 1
          }
          sessionStorage.setItem('totalLiked', this.sessionLiked)
        }
      })
      sessionStorage.setItem('likedArray', JSON.stringify(this.wonders))
    },
    sortArray (arr, param) {
      arr.sort(function (a, b) {
        let keyA = a[param]
        let keyB = b[param]
        if (keyA < keyB) return 1
        if (keyA > keyB) return -1
        return 0
      })
    }
  }
}
</script>

<style>
 .topHeader{
      margin-top:-58px !important;
  background-color: white !important;
 }
 .bottomHeader{
   margin-top: -20px;
   background-color: lightgrey !important;
 }
 .searchtext{
   background-color: white;
 }
 .theme--light.v-text-field--solo-inverted.v-text-field--solo .v-input__slot{
   background-color: white;
 }
 .theme--light.v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot{
   background-color:lightgray;
 }
 .v-input__slot{
    width: 400px;
    margin-top: 5px;
 }
 .v-rating{
    margin-left: 10px;
    margin-top: -7px;
  }
  .white {
    background-color: rgba(255, 255, 255, 0.555)!important;
  }
  .theme--light.v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot input {
    color: #3e2b2b;
  }
  .loader{
    z-index:10;position:absolute; top:50%; left: 50%;
  }

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->

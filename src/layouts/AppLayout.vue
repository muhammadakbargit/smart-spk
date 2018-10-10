<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
    <v-toolbar flat v-show="currentUser">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-bold">{{ userProfile.first_name }} {{ userProfile.last_name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
      <v-list dense>
        <v-list-tile ripple v-for="item in items" :key="item.id" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-bold">{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile ripple v-show="currentUser" @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-bold">
              Logout
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue" dark fixed app flat>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>SMAN 3 Purbalingga</v-toolbar-title>
    </v-toolbar>
    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  const fb = require('../firebase/firebaseConfig.js')

  export default {
    data () {
      return {
        drawer: true,
        image: require('../assets/Capture.png'),
        fab: false
      }
    },
    computed: {
      ...mapGetters(['currentUser', 'userProfile', 'items']),
    },
    methods: {
      logout(){
        fb.auth.signOut().then(() => {
          this.$store.dispatch('clearData')
          this.$router.push('/login')
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
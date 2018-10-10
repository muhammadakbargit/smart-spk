<template>
  <v-container fluid fill-height>
    <v-layout align-start justify-center>
      <v-flex xs12 sm10 md8>
        <v-card>
          <v-toolbar flat dark color="blue">
            <v-toolbar-title>Login Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field required v-model="loginForm.email" :rules="emailRules" prepend-icon="mail" name="email" label="Email" type="text"></v-text-field>
              <v-text-field required v-model="loginForm.password" :rules="passwordRules" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>  
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="login" :disabled="!valid" flat color="blue">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const fb = require('../firebase/firebaseConfig.js')

export default {
  data(){
    return {
      valid: true,
      loginForm: {
        email: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ],
    }
  },
  methods: {
    login(){
      if(this.$refs.form.validate()){
        fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
          this.$store.commit('SET_CURRENT_USER', user.user)
          this.$store.dispatch('fetchUserProfile')
          this.$router.push('/dashboard')
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>


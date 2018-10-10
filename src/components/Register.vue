<template>
  <v-container fluid fill-height>
    <v-layout align-start justify-center>
      <v-flex xs12 md12 sm10>
        <v-card>
          <v-toolbar flat dark color="blue">
            <v-toolbar-title>Register Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-container grid-list-md fluid>
                <v-layout wrap align-center>
                  <v-flex xs12 sm6 d-flex>
                    <v-text-field v-model="registerForm.first_name" :rules="first_nameRules" name="first_name" label="First Name" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 d-flex>
                    <v-text-field v-model="registerForm.last_name" name="last_name" :rules="last_nameRules" label="Last Name" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 d-flex>
                    <v-text-field v-model="registerForm.email" name="email" :rules="emailRules" label="Email" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 d-flex>
                    <v-text-field v-model="registerForm.password" :rules="passwordRules" name="password" label="Password" type="password"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 d-flex>
                    <v-text-field v-model="registerForm.confirm_password" :rules="confirm_passwordRules" name="confirm_password" label="Confirm Password" type="password"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 d-flex>
                    <v-text-field v-model="registerForm.position" name="position" :rules="positionRules" label="Position" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 d-flex>
                    <v-text-field v-model="registerForm.mapel" name="mapel" :rules="mapelRules" label="Mapel" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 d-flex>
                    <v-text-field v-model="registerForm.wakes" name="wakes" label="Wakes" :rules="wakesRules" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 d-flex>
                    <v-text-field v-model="registerForm.dob" name="dob" label="Date of Birth" :rules="dobRules" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 d-flex>
                    <v-text-field v-model="registerForm.address" name="address" label="Address" :rules="addressRules" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 d-flex>
                    <v-text-field v-model="registerForm.phone_number" name="phone_number" :rules="phone_numberRules" label="Phone Number" type="text"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="register" flat color="blue" :disabled="!valid">Register</v-btn>
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
      registerForm: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        position: '',
        mapel: '',
        wakes: '',
        dob: '',
        address: '',
        phone_number: ''
      },
      first_nameRules: [
        v => !!v || 'First Name is required',
      ],
      last_nameRules: [
        v => !!v || 'Last Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Min 6 characters'
      ],
      confirm_passwordRules: [
        v => !!v || 'Confirm Password is required',
        v => (v === this.registerForm.password) || 'Confirm Password does not match the Password'
      ],
      positionRules: [
        v => !!v || 'Position is required',
      ],
      mapelRules: [
        v => !!v || 'Mapel is required',
      ],
      wakesRules: [
        v => !!v || 'Wakes is required',
      ],
      dobRules: [
        v => !!v || 'Date of Birth is required',
      ],
      addressRules: [
        v => !!v || 'Address is required',
      ],
      phone_numberRules: [
        v => !!v || 'Phone Number is required',
      ],
    }
  },
  methods: {
    register(){
      if(this.$refs.form.validate()){
        fb.auth.createUserWithEmailAndPassword(this.registerForm.email, this.registerForm.password).then(user => {
          this.$store.commit('SET_CURRENT_USER', user.user)
          fb.usersCollection.doc(user.user.uid).set({
            first_name: this.registerForm.first_name,
            last_name: this.registerForm.last_name,
            email: this.registerForm.email,
            position: this.registerForm.position,
            mapel: this.registerForm.mapel,
            wakes: this.registerForm.wakes,
            address: this.registerForm.address,
            phone_number: this.registerForm.phone_number,
          }).then(() => {
            this.$store.dispatch('fetchUserProfile')
            this.$router.push('/dashboard')
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }
  } 
}
</script>


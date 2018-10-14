'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('../firebase/firebaseConfig.js')

Vue.use(Vuex)

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('SET_CURRENT_USER', user)
    store.dispatch('fetchUserProfile')
  }
})

export const store = new Vuex.Store({
  state: {
    layout: 'app-layout',
    currentUser: null,
    userProfile: {},
    items: [
      { id: 1, icon: 'home', text: 'Welcome', link: '/', auth: false },
      { id: 2, icon: 'exit_to_app', text: 'Login', link: '/login', auth: false },
      { id: 3, icon: 'info', text: 'Information', link: '/information', auth: false },
      { id: 4, icon: 'dashboard', text: 'Dashboard', link: '/dashboard', auth: true },
      { id: 5, icon: 'person_add', text: 'Register', link: '/register', auth: true },
      { id: 6, icon: 'work', text: 'Kriteria', link: '/criteria', auth: true },
      { id: 7, icon: 'people', text: 'Siswa', link: '/siswa', auth: true },
      { id: 8, icon: 'view_list', text: 'Alternatif', link: '/alternatif', auth: true },
      { id: 9, icon: 'poll', text: 'Ranking', link: '/ranking', auth: true },
    ],
    criterias: [],
    students: [],
    alternatives: [],
    rankings: []
  },
  mutations: {
    SET_LAYOUT(state, payload) {
      state.layout = payload
    },
    SET_CURRENT_USER(state, payload){
      state.currentUser = payload
    },
    SET_USER_PROFILE(state, payload){
      state.userProfile = payload
    },
    SET_CRITERIAS(state, payload){
      state.criterias = payload
    },
    SET_STUDENTS(state, payload){
      state.students = payload
    },
    SET_ALTERNATIVES(state, payload){
      state.alternatives = payload
    },
    SET_RANKINGS(state, payload){
      state.rankings = payload
    }
  },
  getters: {
    layout(state) {
      return state.layout
    },
    userProfile(state){
      return state.userProfile
    },
    currentUser(state){
      return state.currentUser
    },
    items(state){
      if(state.currentUser != null){
        return state.items.filter((item) => {
          return item.auth == true
        })
      } else {
        return state.items.filter((item) => {
          return item.auth == false
        })
      }
    },
    criterias(state){
      return state.criterias
    },
    students(state){
      return state.students
    },
    alternatives(state){
      return state.alternatives
    },
    rankings(state){
      return state.rankings
    }
  },
  actions: {
    fetchUserProfile({commit, state}){
      fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
        commit('SET_USER_PROFILE', res.data())
      }).catch(err => {
        console.log(err)
      })
    },
    clearData({commit}){
      commit('SET_CURRENT_USER', null)
      commit('SET_USER_PROFILE', {})
    },
    fetchStudents({commit}){
      const students = []
      fb.studentsCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          students.push({
            id: doc.id,
            nis: doc.data().nis,
            name: doc.data().name,
            class: doc.data().class,
            place_born: doc.data().place_born,
            dob: doc.data().dob,
            address: doc.data().address,
            parent_name: doc.data().parent_name,
            parent_phone_number: doc.data().parent_phone_number,
            
            rerata_raport : doc.data().rerata_raport,
            rerata_uas : doc.data().rerata_uas,
            persentase_kehadiran : doc.data().persentase_kehadiran,
            prestasi_akademik : doc.data().prestasi_akademik,
            prestasi_non_akademik : doc.data().prestasi_non_akademik,
            kepribadian : doc.data().kepribadian,
            catatan_pelanggaran : doc.data().catatan_pelanggaran,
            penghasilan_ortu : doc.data().penghasilan_ortu,
          })
        })
        commit('SET_STUDENTS', students)
      }).catch(err => {
        console.log(err)
      })
    },
    fetchCriterias({commit}){
      const criterias = []
      fb.criteriasCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          criterias.push({id: doc.id, name: doc.data().name, bobot: doc.data().bobot})
        })
        commit('SET_CRITERIAS', criterias)
      }).catch(err => {
        console.log(err)
      })
    },
    fetchAlternatives({commit}){
      fb.alternativesCollection.orderBy('final_value', 'desc').get().then((querySnapshot) => {
        const alternatives = []
        querySnapshot.forEach((alternatif) => {
          fb.studentsCollection.doc(alternatif.data().student).get().then((student) => {
            alternatives.push({ id:  alternatif.id, final_value: alternatif.data().final_value, student: student.data()})
          })
        })
        commit('SET_ALTERNATIVES', alternatives)
      }).catch(err => {
        console.log(err)
      })
    },
    fetchRankings({commit}){
      fb.rankingsCollection.orderBy('final_value', 'desc').get().then((querySnapshot) => {
        const rankings = []
        querySnapshot.forEach((ranking) => {
          fb.studentsCollection.doc(ranking.data().student).get().then((student) => {
            rankings.push({ id:  ranking.id, final_value: ranking.data().final_value, student: student.data()})
          })
        })
        commit('SET_RANKINGS', rankings)
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
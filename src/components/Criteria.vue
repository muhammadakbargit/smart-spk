<template>
  <v-container grid-list-md>
    <v-layout column>
      <v-flex xs12>
        <template>
          <v-card flat>
            <v-card-title>
              <span class="title blue--text">Daftar Kriteria</span>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="criterias"
              :rows-per-page-items="rows_per_items"
              item-key="name"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-center">{{ props.item.bobot }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        rows_per_items: [10,25,50,100,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
        headers: [
          { text: 'Nama Kriteria', align: 'left', value: 'name' },
          { text: 'Bobot', align: 'center', value: 'bobot' }
        ],
      }
    },
    created(){
      this.$store.dispatch('fetchCriterias')
    },
    computed: {
      criterias(){
        return this.$store.getters.criterias
      }
    }
  }
</script>
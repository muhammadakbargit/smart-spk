<template>
  <v-container grid-list-md>
    <v-layout column>
      <v-flex xs12>
        <template>
          <v-card flat>
            <v-card-title>
              <span class="title blue--text">Daftar Alternatif</span>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="alternatives"
              :rows-per-page-items="rows_per_items"
              item-key="id"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="text-xs-left">{{ props.item.student.nis }}</td>
                  <td class="text-xs-left">{{ props.item.student.name }}</td>
                  <td class="text-xs-center">{{ props.item.final_value }}</td>
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
          { text: 'NIS', sortable: false, align: 'left', value: 'student.nis' },
          { text: 'Nama Siswa', sortable: false, align: 'left', value: 'student.name' },
          { text: 'Nilai Akhir', align: 'center', sortable: false, value: 'final_value' },
        ],
      }
    },
    created(){
      this.$store.dispatch('fetchAlternatives')
    },
    computed: {
      alternatives(){
        return this.$store.getters.alternatives
      }
    }
  }
</script>
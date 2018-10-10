<template>
  <v-container>
      <v-layout align-start>
        <v-flex>
          <span class="title blue--text">Hasil Seleksi Penerimaan Beasiswa Pendidikan</span>
        </v-flex>
      </v-layout>
      <br>
    
    <v-data-table
      :headers="headers"
      :items="results"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.no }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.class }}</td>
        <td class="text-xs-center">{{ props.item.score }}</td>
        <td class="text-xs-center">{{ props.item.ranking }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        headers: [
          { text: 'No', align: 'left', value: 'no'},
          { text: 'Nama', align: 'center', sortable: false, value: 'name' },
          { text: 'Kelas', align: 'center', value: 'class' },
          { text: 'Total Score', align: 'center', value: 'score' },
          { text: 'Ranking', align: 'center', value: 'ranking' },
        ],
        results: [
          {
            no: 1,
            name: 'John Doe',
            class: 'MIPA 1',
            score: 340,
            ranking: 1,
          },
          {
            no: 2,
            name: 'Alex Turner',
            class: 'MIPA 2',
            score: 330,
            ranking: 2,
          },
          {
            no: 3,
            name: 'Billy Joe',
            class: 'MIPA 3',
            score: 300,
            ranking: 3,
          },
          {
            no: 4,
            name: 'Green Day',
            class: 'MIPA 4',
            score: 290,
            ranking: 4,
          },
          {
            no: 5,
            name: 'Qpad',
            class: 'MIPA 1',
            score: 285,
            ranking: 5,
          },
        ]
      }
    }
  }
</script>
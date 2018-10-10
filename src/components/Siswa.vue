<template>
  <v-container grid-list-md>
    <v-layout column>
      <v-flex xs12>
        <template>
          <v-card flat>
            <v-card-title>
              <v-flex xs6 md2>
                <span class="title blue--text">Daftar Siswa</span>
              </v-flex>
              <v-flex xs6 md4>
                <v-btn @click.native="dialog = !dialog" color="primary" dark>Add Student</v-btn>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                >
                </v-text-field>
              </v-flex>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="students"
              :search="search"
              item-key="nis"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td>{{ props.item.nis }}</td>
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-left">{{ props.item.class }}</td>
                  <td class="text-xs-left">{{ props.item.place_born }}</td>
                  <td class="text-xs-left">{{ props.item.dob }}</td>
                  <td class="text-xs-left">{{ props.item.address }}</td>
                  <td class="text-xs-left">{{ props.item.parent_name }}</td>
                  <td class="text-xs-left">{{ props.item.parent_phone_number }}</td>
                  <td class="text-xs-center">
                    <v-tooltip bottom>
                    <v-icon class="pr-1" slot="activator" @click="props.expanded = !props.expanded" small>
                      visibility
                    </v-icon>
                    <span>View Detail</span>
                    </v-tooltip>
                    <v-icon class="pr-1" small>
                      edit
                    </v-icon>
                    <v-icon small>
                      delete
                    </v-icon>
                  </td>
                </tr>
              </template>
              <template slot="expand" slot-scope="props">
                <v-card flat dark color="blue">
                  <v-card-text>
                    Catatan Pelanggaran : {{ props.item.catatan_pelanggaran }}<br>
                    Kepribadian : {{ props.item.kepribadian }}<br>
                    Penghasilan Orang Tua : {{ props.item.penghasilan_ortu }}<br>
                    Persentasi Kehadiran : {{ props.item.persentase_kehadiran }}<br>
                    Prestasi Akademik : {{ props.item.prestasi_akademik }}<br>
                    Prestasi Non Akademik : {{ props.item.prestasi_non_akademik }}<br>
                    Rata - Rata Nilai Raport : {{ props.item.rerata_raport }}<br>
                    Rata - Rata Nilai UAS : {{ props.item.rerata_uas }}
                  </v-card-text>
                </v-card>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="blue" flat>
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="save">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container grid-list-md fluid>
          <v-layout wrap align-center>
            <v-flex xs12 d-flex>
              <span class="subheading blue--text">Data Diri</span>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-text-field name="nis" v-model="newStudent.nis" label="Nomor Induk Siswa" type="text"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-text-field name="name" v-model="newStudent.name" label="Nama" type="text"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-text-field name="place_born" v-model="newStudent.place_born" label="Tempat Lahir" type="text"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-text-field name="dob" v-model="newStudent.dob" label="Tanggal Lahir" type="text"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-text-field name="class" v-model="newStudent.class" label="Kelas" type="text"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-text-field name="address" v-model="newStudent.address" label="Alamat" type="text"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-text-field name="parent_name" v-model="newStudent.parent_name" label="Nama Orang Tua" type="text"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-text-field name="parent_phone_number" v-model="newStudent.parent_phone_number" label="No Hp Orang Tua" type="text"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-container grid-list-md fluid>
          <v-layout wrap align-center>
            <v-flex xs12 d-flex>
              <span class="subheading blue--text">Penilaian</span>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-text-field label="Catatan Pelanggaran" v-model="newStudent.catatan_pelanggaran" type="number"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-select :items="personalities" v-model="newStudent.kepribadian" label="Kepribadian"></v-select>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-text-field label="Penghasilan Orang Tua" v-model="newStudent.penghasilan_ortu" type="number"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-text-field label="Persentase Kehadiran" v-model="newStudent.persentase_kehadiran" type="number"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-select :items="awards" v-model="newStudent.prestasi_akademik" label="Prestasi Akademik"></v-select>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-select :items="awards" v-model="newStudent.prestasi_non_akademik" label="Prestasi Non Akademik"></v-select>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-text-field label="Rata - Rata Nilai Raport" v-model="newStudent.rerata_raport" type="number"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-text-field label="Rata - Rata Nilai UAS" v-model="newStudent.rerata_uas" type="number"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  const fb = require('../firebase/firebaseConfig.js')
  export default {
    data () {
      return {
        dialog: false,
        search: '',
        headers: [
          { text: 'NIS', value: 'nis' },
          { text: 'Nama', value: 'name' },
          { text: 'Kelas', value: 'class' },
          { text: 'Tempat Lahir', value: 'place_born' },
          { text: 'Tanggal Lahir', value: 'dob' },
          { text: 'Alamat', value: 'address' },
          { text: 'Nama Ortu', value: 'parent_name' },
          { text: 'No Hp Ortu', value: 'parent_phone_number' },
          { text: 'Aksi', align: 'center', value: '' },
        ],
        awards: ['Tidak Ada', 'Kecamatan', 'Kabupaten', 'Provinsi', 'Nasional/Internasional'],
        personalities: ['Kurang', 'Cukup', 'Baik', 'Sangat Baik'],
        newStudent: {
          nis: '',
          name: '',
          place_born: '',
          dob: '',
          class: '',
          address: '',
          parent_name: '',
          parent_phone_number: '',

          catatan_pelanggaran: 0,
          kepribadian: '',
          penghasilan_ortu: 0,
          persentase_kehadiran: 0,
          prestasi_akademik: '',
          prestasi_non_akademik: '',
          rerata_raport: 0,
          rerata_uas: 0
        },
        nilaiPerhitungan: {
          catatan_pelanggaran : 0,
          kepribadian : 0,
          penghasilan_ortu : 0,
          persentase_kehadiran : 0,
          prestasi_akademik : 0,
          prestasi_non_akademik : 0,
          rerata_raport : 0,
          rerata_uas : 0,
        }
      }
    },
    created(){
      this.$store.dispatch('fetchStudents')
      this.$store.dispatch('fetchCriterias')
    },
    computed: {
      students(){
        return this.$store.getters.students
      },
      criterias(){
        return this.$store.getters.criterias
      }
    },
    methods: {
      save(){
        fb.studentsCollection.add({
          nis: this.newStudent.nis,
          name: this.newStudent.name,
          class: this.newStudent.class,
          address: this.newStudent.address,
          place_born: this.newStudent.place_born,
          dob: this.newStudent.dob,
          parent_name: this.newStudent.parent_name,
          parent_phone_number: this.newStudent.parent_phone_number,

          catatan_pelanggaran: this.newStudent.catatan_pelanggaran,
          kepribadian: this.newStudent.kepribadian,
          prestasi_akademik: this.newStudent.prestasi_akademik,
          prestasi_non_akademik: this.newStudent.prestasi_non_akademik,
          penghasilan_ortu: this.newStudent.penghasilan_ortu,
          persentase_kehadiran: this.newStudent.persentase_kehadiran,
          rerata_raport: this.newStudent.rerata_raport,
          rerata_uas: this.newStudent.rerata_uas,
        }).then(ref => {
          this.proses_criterias(ref.id)
        }).catch(err => {
          console.log(err)
        })
        this.dialog = false
      },
      proses_criterias(student_id){
        this.criterias.forEach(value => {
          switch (value.name) {
            case 'Catatan Pelanggaran':
              this.catatan_pelanggaran(value.bobot)
              break;
            case 'Kepribadian':
              this.kepribadian(value.bobot)
              break;
            case 'Penghasilan Orang Tua':
              this.penghasilan_ortu(value.bobot)
              break;
            case 'Persentase Kehadiran':
              this.persentase_kehadiran(value.bobot)
              break;
            case 'Prestasi Akademik':
              this.prestasi_akademik(value.bobot)
              break;
            case 'Prestasi Non Akademik':
              this.prestasi_non_akademik(value.bobot)
              break;
            case 'Rata - Rata Nilai Raport':
              this.rerata_raport(value.bobot)
              break;
            case 'Rata - Rata Nilai UAS':
              this.rerata_uas(value.bobot)
              break;
            default:
              break; 
          }
        });
        var final_value = this.nilaiPerhitungan.catatan_pelanggaran + this.nilaiPerhitungan.kepribadian + this.nilaiPerhitungan.persentase_kehadiran + this.nilaiPerhitungan.penghasilan_ortu + this.nilaiPerhitungan.prestasi_akademik + this.nilaiPerhitungan.prestasi_non_akademik + this.nilaiPerhitungan.rerata_raport + this.nilaiPerhitungan.rerata_uas
        // console.log(final_value)
        fb.alternativesCollection.add({
          final_value: final_value,
          student: fb.db.doc(`/students/${student_id}`)
        })
      },
      catatan_pelanggaran(bobot){
        let x = 0
        if(this.newStudent.catatan_pelanggaran >= 75 && this.newStudent.catatan_pelanggaran <= 100){
          x = 0
        } else if (this.newStudent.catatan_pelanggaran >= 50 && this.newStudent.catatan_pelanggaran <= 74){
          x = 25
        } else if (this.newStudent.catatan_pelanggaran >= 25 && this.newStudent.catatan_pelanggaran <= 49){
          x = 75
        } else {
          x = 100
        }
        this.nilaiPerhitungan.catatan_pelanggaran = x * bobot / 100
        console.log(this.nilaiPerhitungan.catatan_pelanggaran)
      },
      kepribadian(bobot){
        let x = 0
        if(this.newStudent.kepribadian == 'Sangat Baik'){
          x = 100
        } else if (this.newStudent.kepribadian == 'Baik'){
          x = 75
        } else if (this.newStudent.kepribadian == 'Cukup'){
          x = 25
        } else {
          x = 0
        }
        this.nilaiPerhitungan.kepribadian = x * bobot / 100
        console.log(this.nilaiPerhitungan.kepribadian)
      },
      penghasilan_ortu(bobot){
        let x = 0
        if(this.newStudent.penghasilan_ortu > 10000000){
          x = 0
        } else if (this.newStudent.penghasilan_ortu >= 5000000 && this.newStudent.penghasilan_ortu <= 10000000){
          x = 25
        } else if (this.newStudent.penghasilan_ortu >= 2000000 && this.newStudent.penghasilan_ortu <= 4999999){
          x = 75
        } else {
          x = 100
        }
        this.nilaiPerhitungan.penghasilan_ortu = x * bobot / 100
        console.log(this.nilaiPerhitungan.penghasilan_ortu)
      },
      persentase_kehadiran(bobot){
        let x = 0
        if(this.newStudent.persentase_kehadiran >= 95 && this.newStudent.persentase_kehadiran <= 100){
          x = 100
        } else if (this.newStudent.persentase_kehadiran >= 80 && this.newStudent.persentase_kehadiran <= 94){
          x = 50
        } else {
          x = 0
        }
        this.nilaiPerhitungan.persentase_kehadiran = x * bobot / 100
        console.log(this.nilaiPerhitungan.persentase_kehadiran)
      },
      prestasi_akademik(bobot){
        let x = 0
        if(this.newStudent.prestasi_akademik == 'Nasional/Internasional'){
          x = 100
        } else if (this.newStudent.prestasi_akademik == 'Provinsi'){
          x = 75
        } else if (this.newStudent.prestasi_akademik == 'Kabupaten'){
          x = 50
        } else if (this.newStudent.prestasi_akademik == 'Kecamatan') {
          x = 25
        } else {
          x = 0
        }
        this.nilaiPerhitungan.prestasi_akademik = x * bobot / 100
        console.log(this.nilaiPerhitungan.prestasi_akademik)
      },
      prestasi_non_akademik(bobot){
        let x = 0
        if(this.newStudent.prestasi_non_akademik == 'Nasional/Internasional'){
          x = 100
        } else if (this.newStudent.prestasi_non_akademik == 'Provinsi'){
          x = 75
        } else if (this.newStudent.prestasi_non_akademik == 'Kabupaten'){
          x = 50
        } else if (this.newStudent.prestasi_non_akademik == 'Kecamatan') {
          x = 25
        } else {
          x = 0
        }
        this.nilaiPerhitungan.prestasi_non_akademik = x * bobot / 100
        console.log(this.nilaiPerhitungan.prestasi_non_akademik)
      },
      rerata_raport(bobot){
        let x = 0
        if(this.newStudent.rerata_raport >= 95 && this.newStudent.rerata_raport <= 100){
          x = 100
        } else if (this.newStudent.rerata_raport >= 90 && this.newStudent.rerata_raport <= 94){
          x = 75
        } else if (this.newStudent.rerata_raport >= 85 && this.newStudent.rerata_raport <= 89){
          x = 50
        } else if (this.newStudent.rerata_raport >= 80 && this.newStudent.rerata_raport <= 84) {
          x = 25
        } else {
          x = 0
        }
        this.nilaiPerhitungan.rerata_raport = x * bobot / 100
        console.log(this.nilaiPerhitungan.rerata_raport)
      },
      rerata_uas(bobot){
        let x = 0
        if(this.newStudent.rerata_uas >= 95 && this.newStudent.rerata_uas <= 100){
          x = 100
        } else if (this.newStudent.rerata_uas >= 90 && this.newStudent.rerata_uas <= 94){
          x = 75
        } else if (this.newStudent.rerata_uas >= 85 && this.newStudent.rerata_uas <= 89){
          x = 50
        } else if (this.newStudent.rerata_uas >= 80 && this.newStudent.rerata_uas <= 84) {
          x = 25
        } else {
          x = 0
        }
        this.nilaiPerhitungan.rerata_uas = x * bobot / 100
        console.log(this.nilaiPerhitungan.rerata_uas)
      }
    }
  }
</script>
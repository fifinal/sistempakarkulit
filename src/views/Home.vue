<template>
  <div class="row">
    <div class="col-md-8 ml-auto mr-auto" v-if="pertanyaan">
      <div class="card">
        <div class="card-header card-header-info text-center display-4">Jawab pertanyaan dibawah ini</div>
        <div class="card-body">
          <h5
            class="text-center display-4"
            v-if="diagnosa.kode_diagnosa!=null"
          >{{diagnosa.kode_diagnosa +". "+ diagnosa.pertanyaan}}</h5>

          <div class="form-group text-center">
            <button class="btn btn-success btn-lg" @click="pilihYa">YA</button>
            <button class="btn btn-danger btn-lg" @click="pilihTidak">TIDAK</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-8 ml-auto mr-auto" v-if="!pertanyaan">
      <div class="card">
        <div class="card-header card-header-tabs card-header-success">
          <div class="nav-tabs-navigation">
            <div class="nav-tabs-wrapper">
              <span class="nav-tabs-title display-4">Hasil Diagnosa:</span>
              <ul class="nav nav-tabs" data-tabs="tabs">
                <li class="nav-item">
                  <a class="nav-link active" href="#profile" data-toggle="tab">
                    <i class="material-icons">bug_report</i> Penyakit
                    <div class="ripple-container"></div>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#messages" data-toggle="tab">
                    <i class="material-icons">info</i> Info
                    <div class="ripple-container"></div>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#settings" data-toggle="tab">
                    <i class="material-icons">add</i> Pengobatan
                    <div class="ripple-container"></div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div class="tab-pane active" id="profile">
              <h4>Berikut gejala yang anda alami :</h4>
              <table class="table">
                <tbody>
                  <tr v-for="(gejala,i) in gejalaTerpilih" :key="gejala.kode_diagnosa">
                    <td>{{ i+1 }}</td>
                    <td>{{ gejala.pertanyaan }}</td>
                    <td>ya</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <h4>Sistem mendeteksi penyakit anda adalah :</h4>
              <h2 class="text-danger text-center">{{penyakit.nama_penyakit}}</h2>
            </div>
            <div class="tab-pane" id="messages">
              <h5 class="text-center display-4">{{penyakit.info_penyakit}}</h5>
            </div>
            <div class="tab-pane" id="settings">
              <h5 class="text-center display-4">{{penyakit.pengobatan}}</h5>
            </div>
          </div>
          <div class="form-group text-center">
            <button class="btn btn-info btn-round" @click="reset">Selesai</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
  name: "home",
  props: {
    msg: String
  },
  data() {
    return {
      pertanyaan: true,
      jawabanUser: [],
      gejalaTerpilih: [],
      diagnosa: {
        id: null,
        kode_diagnosa: null,
        pertanyaan: null,
        jawaban_ya: null,
        jawaban_tidak: null
      },
      penyakit: {
        kode_penyakit: null,
        nama_penyakit: null,
        info_penyakit: null,
        pengobatan: null
      },
      listDiagnosa: [],
      listPasien: [],
      listPenyakit: []
    };
  },
  firestore() {
    return {
      listDiagnosa: db.collection("diagnosa"),
      listPenyakit: db.collection("penyakit"),
      listPasien: db.collection("pasien")
    };
  },
  created() {
    this.$binding("listDiagnosa", db.collection("diagnosa")).then(user => {
      this.diagnosa = this.listDiagnosa[0];
    });
  },
  mounted() {},
  computed: {},
  methods: {
    pilihYa() {
      this.gejalaTerpilih.push(this.diagnosa);
      if (this.diagnosa.jawaban_ya.toLowerCase().includes("p")) {
        this.tampilSolusi(this.diagnosa.jawaban_ya);
      } else {
        this.tampilPertanyaan(this.diagnosa.jawaban_ya);
      }
    },
    pilihTidak() {
      if (this.diagnosa.jawaban_tidak.toLowerCase().includes("p")) {
        this.tampilSolusi(this.diagnosa.jawaban_tidak);
      } else {
        this.tampilPertanyaan(this.diagnosa.jawaban_tidak);
      }
    },
    tampilPertanyaan(kodeGejala) {
      this.jawabanUser = this.listDiagnosa.filter(
        data => data.kode_diagnosa == kodeGejala
      );
      this.diagnosa = this.jawabanUser[0];
    },
    tampilSolusi(idPenyakit) {
      this.pertanyaan = false;
      this.penyakit = this.listPenyakit.filter(
        data => data.kode_penyakit == idPenyakit
      )[0];
      this.$firestore.listPasien
        .doc(this.$route.params.id)
        .update({ kode_penyakit: idPenyakit, tanggal: new Date() });
    },
    reset() {
      this.gejalaTerpilih = [];
      this.pertanyaan = true;
      this.diagnosa = this.listDiagnosa[0];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/material-dashboard.css?v=2.1.0";
</style>

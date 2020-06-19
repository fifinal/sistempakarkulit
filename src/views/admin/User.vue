<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header card-header-info">
          <div class="d-flex align-items-center">
            <h4 class="card-title">Table {{namaHalaman}}</h4>
          </div>
          <p class="card-category">
            <input type="text" value v-model="keyword" class="form-control" placeholder="Search..." />
          </p>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table id="table-penyakit" class="display table table-hover">
              <thead>
                <tr>
                  <th @click="sortBy('nama')" class="cursor">Nama</th>
                  <th @click="sortBy('alamat')" class="cursor">Alamat</th>
                  <th @click="sortBy('umur')" class="cursor">Umur</th>
                  <th @click="sortBy('penyakit')" class="cursor">Penyakit</th>
                  <th @click="sortBy('tanggal')" class="cursor">Tanggal</th>
                  <th style="width: 10%">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(p,i) in pasienList" :key="i">
                  <td>{{p.nama}}</td>
                  <td>{{p.alamat}}</td>
                  <td>{{p.umur}}</td>
                  <td>
                    {{p.kode_penyakit}}
                    <button
                      type="button"
                      rel="tooltip"
                      title="Lihat Nama Penyakit"
                      class="btn btn-primary btn-link btn-sm"
                      @click="lihatNamaPenyakit(p.kode_penyakit)"
                    >
                      <i class="fa fa-eye"></i>
                    </button>
                  </td>
                  <td>{{new Date(p.tanggal.seconds*1000).toDateString()}}</td>
                  <td class="td-actions text-center">
                    <button
                      type="button"
                      data-toggle="tooltip"
                      title="hapus"
                      class="btn btn-link btn-danger"
                      data-original-title="Remove"
                      @click="hapusPasien(p)"
                    >
                      <i class="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../../firebase";
export default {
  name: "user",
  data() {
    return {
      modal: null,
      load: null,
      namaHalaman: "Pasien",
      keyword: null,
      pasien: {
        id: null,
        nama: null,
        alamat: null,
        kelamin: null,
        umur: null,
        kode_penyakit: null,
        tanggal: null
      },
      tablePasient: [],
      tablePenyakit: [],
      kolomAksi: null
    };
  },
  firestore() {
    return {
      tablePasien: db.collection("pasien"),
      tablePenyakit: db.collection("penyakit")
    };
  },
  created() {
    this.load = true;
  },
  mounted() {},
  computed: {
    pasienList() {
      return this.tablePasien.filter(p => {
        if (this.keyword === null || this.keyword === "") return p;
        else
          return (
            p.id.includes(this.keyword) ||
            p.nama.includes(this.keyword) ||
            p.alamat.includes(this.keyword) ||
            p.umur.includes(this.keyword)
          );
      });
    }
  },
  methods: {
    sortBy(prop) {
      this.tablePasien.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    notif(color, text) {
      $.notify(
        {
          icon: "add_alert",
          message: text
        },
        {
          type: color,
          timer: 2000,
          placement: {
            from: "top",
            align: "right"
          }
        }
      );
    },
    lihatNamaPenyakit(kode_penyakit) {
      let penyakit = this.tablePenyakit.filter(
        result => (result.kode_penyakit = kode_penyakit)
      );
      this.notif("danger", "Penyakit : " + penyakit[0].nama_penyakit);
    },
    hapusPasien(pasien) {
      Swal.fire({
        title: "Apakah anda yakin ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.tablePasien
            .doc(pasien.id)
            .delete()
            .then(() => {
              this.notif("danger", "Berhasil Dihapus");
            });
        }
      });
    },

    reset() {
      this.pasien = {
        nama: null,
        alamat: null,
        kelamin: null,
        umur: null,
        kode_penyakit: null,
        tanggal: null
      };
    }
  }
};
</script>

<style scoped>
h5.modal-title {
  color: black;
  font-weight: bold;
}
.cursor {
  cursor: pointer;
}
</style>

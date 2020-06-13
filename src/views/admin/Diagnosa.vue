<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header card-header-info">
          <div class="d-flex align-items-center">
            <h4 class="card-title">Table {{namaHalaman}}</h4>
            <button
              class="btn btn-success btn-round ml-auto"
              data-toggle="modal"
              :data-target="'#'+idModal"
              @click="addModal"
            >
              <i class="fa fa-plus"></i>
              Tambah {{namaHalaman}}
            </button>
          </div>
          <p class="card-category">
            <input type="text" value v-model="keyword" class="form-control" placeholder="Search..." />
          </p>
        </div>
        <div class="card-body">
          <!-- Modal -->
          <div class="modal fade" :id="idModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header no-bd">
                  <h5 class="modal-title">
                    <span class="fw-mediumbold">{{modal}}</span>
                    <span class="fw-light">{{namaHalaman}}</span>
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label for="kode_diagnosa" class="placeholder">Kode Diagnosa</label>
                          <select
                            id="kode_diagnosa"
                            class="form-control"
                            v-model="gejala"
                            @change="change('kode_diagnosa')"
                          >
                            <option
                              v-for="gejala in tableGejala"
                              v-bind:value="gejala"
                              :key="gejala.kode_gejala"
                            >{{gejala.kode_gejala}}</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="pertanyaan" class="placeholder">Pertanyaan</label>
                          <input
                            id="pertanyaan"
                            v-model="diagnosa.pertanyaan"
                            type="text"
                            class="form-control input-border-bottom"
                            placeholder="Pertanyaan..."
                          />
                        </div>
                        <div class="form-group">
                          <label for="jawaban_ya" class="placeholder">Ya</label>
                          <select
                            id="jawaban_ya"
                            class="form-control"
                            v-model="diagnosa.jawaban_ya"
                            @change="change('jawaban_ya')"
                          >
                            <option
                              v-for="gejala in tableGejala"
                              v-bind:value="gejala.kode_gejala"
                              :key="gejala.kode_gejala"
                            >[{{gejala.kode_gejala}}] {{ gejala.nama_gejala }}</option>
                            <option
                              v-for="penyakit in tablePenyakit"
                              v-bind:value="penyakit.kode_penyakit"
                              :key="penyakit.kode_penyakit"
                            >[{{penyakit.kode_penyakit}}] {{ penyakit.nama_penyakit }}</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="jawaban_tidak" class="placeholder">Tidak</label>
                          <select
                            id="jawaban_tidak"
                            class="form-control"
                            v-model="diagnosa.jawaban_tidak"
                            @change="change('jawaban_tidak')"
                          >
                            <option
                              v-for="gejala in tableGejala"
                              v-bind:value="gejala.kode_gejala"
                              :key="gejala.kode_gejala"
                            >[{{gejala.kode_gejala}}] {{ gejala.nama_gejala }}</option>
                            <option
                              v-for="penyakit in tablePenyakit"
                              v-bind:value="penyakit.kode_penyakit"
                              :key="penyakit.kode_penyakit"
                            >[{{penyakit.kode_penyakit}}] {{ penyakit.nama_penyakit }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer no-bd">
                  <button
                    type="button"
                    @click="tambahDiagnosa"
                    id="addRowButton"
                    class="btn btn-secondary"
                    v-if="modal=='tambah'"
                  >Tambah</button>
                  <button
                    type="button"
                    @click="updateDiagnosa"
                    id="updateRowButton"
                    class="btn btn-primary"
                    v-if="modal=='update'"
                  >Update</button>
                </div>
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table id="table-diagnosa" class="display table table-striped table-hover">
              <thead>
                <tr>
                  <th class="card-dark bg-info-gradient skew-shadow">Kode Diagnosa</th>
                  <th class="card-dark bg-info-gradient skew-shadow">Pertanyaan</th>
                  <th class="card-dark bg-info-gradient skew-shadow">Ya</th>
                  <th class="card-dark bg-info-gradient skew-shadow">Tidak</th>
                  <th class="card-dark bg-info-gradient skew-shadow" style="width: 10%">Action</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th class="card-dark bg-info-gradient skew-shadow">Kode Diagnosa</th>
                  <th class="card-dark bg-info-gradient skew-shadow">Pertanyaan</th>
                  <th class="card-dark bg-info-gradient skew-shadow">Ya</th>
                  <th class="card-dark bg-info-gradient skew-shadow">Tidak</th>
                  <th class="card-dark bg-info-gradient skew-shadow">Action</th>
                </tr>
              </tfoot>
              <tbody>
                <tr v-if="load">
                  <td>Tunggu Load Data ....</td>
                </tr>
                <tr v-else v-for="(g,i) in tableDiagnosa" :key="i">
                  <td>{{g.kode_diagnosa}}</td>
                  <td>{{g.pertanyaan}}</td>
                  <td>{{g.jawaban_ya}}</td>
                  <td>{{g.jawaban_tidak}}</td>
                  <td class="td-actions text-right">
                    <button
                      type="button"
                      rel="tooltip"
                      title="Edit"
                      class="btn btn-primary btn-link btn-sm"
                      @click="editDiagnosa(g)"
                    >
                      <i class="fa fa-edit"></i>
                    </button>
                    <button
                      type="button"
                      data-toggle="tooltip"
                      title="hapus"
                      class="btn btn-link btn-danger"
                      data-original-title="Remove"
                      @click="hapusDiagnosa(g)"
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
  name: "diagnosa",
  data() {
    return {
      keyword: null,
      load: null,
      modal: null,
      namaHalaman: "Diagnosa",
      idModal: "modalDiagnosa",
      gejala: null,
      arrData: [],
      diagnosa: {
        kode_diagnosa: null,
        pertanyaan: null,
        jawaban_ya: null,
        jawaban_tidak: null
      },
      tableDiagnosa: []
    };
  },
  firestore() {
    return {
      tableDiagnosa: db.collection("diagnosa"),
      tableGejala: db.collection("Gejala"),
      tablePenyakit: db.collection("penyakit")
    };
  },
  created() {
    this.load = true;
  },
  mounted() {
    this.$binding("Diagnosa", db.collection("diagnosa")).then(user => {
      let users = user.map(obj => {
        return [
          obj.kode_diagnosa,
          obj.pertanyaan,
          obj.jawaban_ya,
          obj.jawaban_tidak
        ];
      });
      this.load = false;
    });
  },
  methods: {
    change(param) {
      if (param == "kode_diagnosa") {
        this.diagnosa.kode_diagnosa = this.gejala.kode_gejala;
        this.diagnosa.pertanyaan = this.gejala.nama_gejala;
        console.log(this.gejala);
      }
    },
    addModal() {
      this.modal = "tambah";
      this.reset();
    },

    editDiagnosa(diagnosa) {
      this.modal = "update";
      $("#" + this.idModal).modal("show");
      // document.getElementById('kode_diagnosa').disabled=true;
      this.diagnosa.kode_diagnosa = diagnosa.kode_diagnosa;
      this.diagnosa.pertanyaan = diagnosa.pertanyaan;
      this.diagnosa.jawaban_ya = diagnosa.jawaban_ya;
      this.diagnosa.jawaban_tidak = diagnosa.jawaban_tidak;
    },

    hapusDiagnosa(diagnosa) {
      Swal.fire({
        title: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.tableDiagnosa
            .doc(diagnosa.kode_diagnosa)
            .delete()
            .then(() => {
              Toast.fire({
                type: "success",
                title: "Berhasil Dihapus"
              });
            });
        }
      });
    },

    updateDiagnosa() {
      const btnUpdate = document.getElementById("updateRowButton");
      btnUpdate.disabled = true;
      this.$firestore.tableDiagnosa
        .doc(this.diagnosa.kode_diagnosa)
        .update(this.diagnosa)
        .then(() => {
          btnUpdate.disabled = false;
          $("#" + this.idModal).modal("hide");
          this.reset();
          Toast.fire({
            type: "success",
            title: "Berhasil Diupdate"
          });
        });
    },

    tambahDiagnosa() {
      const btnTambah = document.getElementById("addRowButton");
      btnTambah.disabled = true;
      this.diagnosa.pertanyaan += " ?";
      this.$firestore.tableDiagnosa
        .doc(this.diagnosa.kode_diagnosa)
        .set(this.diagnosa)
        .then(() => {
          btnTambah.disabled = false;
          $("#" + this.idModal).modal("hide");
          this.reset();
          Toast.fire({
            type: "success",
            title: "Berhasil Ditambahkan"
          });
          this.reset();
        });
    },

    reset() {
      document.getElementById("kode_diagnosa").disabled = false;
      this.gejala = null;
      this.diagnosa = {
        kode_diagnosa: null,
        pertanyaan: null,
        jawaban_ya: null,
        jawaban_tidak: null
      };
    }
  }
};
</script>

<style>
h5.modal-title {
  color: black;
  font-weight: bold;
}
.cursor {
  cursor: pointer;
}
</style>

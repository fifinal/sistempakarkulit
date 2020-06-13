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
              <div class="modal-content" data-background-color="dark">
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
                        <div class="form-group form-group-default">
                          <label for="kode_gejala" class="placeholder">Kode Gejala</label>
                          <input
                            id="kode_gejala"
                            v-model="gejala.kode_gejala"
                            type="text"
                            class="form-control"
                            placeholder="kode gejala..."
                          />
                        </div>
                        <div class="form-group form-group-default">
                          <label for="nama_gejala" class="placeholder">Nama Gejala</label>
                          <input
                            id="nama_gejala"
                            v-model="gejala.nama_gejala"
                            type="text"
                            class="form-control"
                            placeholder="nama gejala..."
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer no-bd">
                  <button
                    type="button"
                    @click="tambahGejala"
                    id="addRowButton"
                    class="btn btn-success"
                    v-if="modal=='tambah'"
                  >Tambah</button>
                  <button
                    type="button"
                    @click="updateGejala"
                    id="updateRowButton"
                    class="btn btn-warning"
                    v-if="modal=='update'"
                  >Update</button>
                </div>
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table id="table-gejala" class="display table table-hover">
              <thead>
                <tr>
                  <th @click="sortBy('kode_gejala')" class="cursor">Kode Gejala</th>
                  <th @click="sortBy('nama_gejala')" class="cursor">Nama Gejala</th>
                  <th style="width: 10%">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(g,i) in gejalaList" :key="i">
                  <td>{{g.kode_gejala}}</td>
                  <td>{{g.nama_gejala}}</td>
                  <td class="td-actions text-right">
                    <button
                      type="button"
                      rel="tooltip"
                      title="Edit"
                      class="btn btn-primary btn-link btn-sm"
                      @click="editGejala(g)"
                    >
                      <i class="fa fa-edit"></i>
                    </button>
                    <button
                      type="button"
                      data-toggle="tooltip"
                      title="hapus"
                      class="btn btn-link btn-danger"
                      data-original-title="Remove"
                      @click="hapusGejala(g)"
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
  name: "gejala",
  data() {
    return {
      modal: null,
      load: null,
      namaHalaman: "Gejala",
      idModal: "modalGejala",
      keyword: null,
      gejala: {
        kode_gejala: null,
        nama_gejala: null
      },
      tableGejala: [],
      kolomAksi: null
    };
  },
  firestore() {
    return {
      tableGejala: db.collection("Gejala")
    };
  },
  created() {
    this.load = true;
  },
  mounted() {},
  computed: {
    gejalaList() {
      return this.tableGejala.filter(g => {
        if (this.keyword === null || this.keyword === "") return g;
        else
          return (
            g.kode_gejala.includes(this.keyword) ||
            g.nama_gejala.includes(this.keyword)
          );
      });
    }
  },
  methods: {
    sortBy(prop) {
      this.tableGejala.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    addModal() {
      this.modal = "tambah";
      this.reset();
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
    editGejala(gejala) {
      this.modal = "update";
      $("#" + this.idModal).modal("show");
      this.gejala = gejala;
    },

    hapusGejala(gejala) {
      Swal.fire({
        title: "Apakah anda yakin ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.tableGejala
            .doc(gejala.kode_gejala)
            .delete()
            .then(() => {
              this.notif("danger", "Berhasil Dihapus");
            });
        }
      });
    },

    updateGejala(e) {
      e.target.disabled = true;
      this.$firestore.tableGejala
        .doc(this.gejala.kode_gejala)
        .update(this.gejala)
        .then(() => {
          e.target.disabled = false;
          this.notif("success", "Berhasil Diupdate");
          this.reset();
          $("#" + this.idModal).modal("hide");
        });
    },

    tambahGejala(e) {
      e.target.disabled = true;
      this.$firestore.tableGejala
        .doc(this.gejala.kode_gejala)
        .set(this.gejala)
        .then(() => {
          $("#" + this.idModal).modal("hide");
          e.target.disabled = false;
          this.reset();
          this.notif("success", "Berhasil Ditambahkan");
        });
    },

    reset() {
      this.gejala = {
        kode_gejala: null,
        nama_gejala: null,
        bobot: null
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

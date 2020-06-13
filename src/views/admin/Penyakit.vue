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
                          <input
                            id="kode_penyakit"
                            v-model="penyakit.kode_penyakit"
                            type="text"
                            class="form-control"
                            placeholder="kode penyakit..."
                          />
                        </div>
                        <div class="form-group form-group-default">
                          <input
                            id="nama_penyakit"
                            v-model="penyakit.nama_penyakit"
                            type="text"
                            class="form-control"
                            placeholder="nama penyakit..."
                          />
                        </div>
                        <div class="form-group form-group-default">
                          <textarea
                            id="info_penyakit"
                            v-model="penyakit.info_penyakit"
                            class="form-control"
                            placeholder="info penyakit..."
                          />
                        </div>
                        <div class="form-group form-group-default">
                          <textarea
                            id="pengobatan"
                            v-model="penyakit.pengobatan"
                            class="form-control"
                            placeholder="pengobatan..."
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer no-bd">
                  <button
                    type="button"
                    @click="tambahPenyakit"
                    id="addRowButton"
                    class="btn btn-success"
                    v-if="modal=='tambah'"
                  >Tambah</button>
                  <button
                    type="button"
                    @click="updatePenyakit"
                    id="updateRowButton"
                    class="btn btn-warning"
                    v-if="modal=='update'"
                  >Update</button>
                </div>
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table id="table-penyakit" class="display table table-hover">
              <thead>
                <tr>
                  <th style="width: 10%" @click="sortBy('kode_penyakit')" class="cursor">Kode</th>
                  <th @click="sortBy('nama_penyakit')" class="cursor">Nama Penyakit</th>
                  <th @click="sortBy('nama_penyakit')" class="cursor">Info Penyakit</th>
                  <th @click="sortBy('nama_penyakit')" class="cursor">Pengobatan</th>
                  <th style="width: 5%">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(p,i) in penyakitList" :key="i">
                  <td>{{p.kode_penyakit}}</td>
                  <td>{{p.nama_penyakit}}</td>
                  <td>{{p.info_penyakit}}</td>
                  <td>{{p.pengobatan}}</td>
                  <td class="td-actions text-right">
                    <button
                      type="button"
                      rel="tooltip"
                      title="Edit"
                      class="btn btn-primary btn-link btn-sm"
                      @click="editPenyakit(p)"
                    >
                      <i class="fa fa-edit"></i>
                    </button>
                    <button
                      type="button"
                      data-toggle="tooltip"
                      title="hapus"
                      class="btn btn-link btn-danger"
                      data-original-title="Remove"
                      @click="hapusPenyakit(p)"
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
  name: "penyakit",
  data() {
    return {
      modal: null,
      load: null,
      namaHalaman: "Penyakit",
      idModal: "modalPenyakit",
      keyword: null,
      penyakit: {
        kode_penyakit: null,
        nama_penyakit: null,
        info_penyakit: null,
        pengobatan: null
      },
      tablePenyakit: [],
      kolomAksi: null
    };
  },
  firestore() {
    return {
      tablePenyakit: db.collection("penyakit")
    };
  },
  created() {
    this.load = true;
  },
  mounted() {},
  computed: {
    penyakitList() {
      return this.tablePenyakit.filter(p => {
        if (this.keyword === null || this.keyword === "") return p;
        else
          return (
            p.kode_penyakit.includes(this.keyword) ||
            p.nama_penyakit.includes(this.keyword)
          );
      });
    }
  },
  methods: {
    sortBy(prop) {
      this.tablePenyakit.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
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
    editPenyakit(penyakit) {
      this.modal = "update";
      $("#" + this.idModal).modal("show");
      this.penyakit = penyakit;
    },

    hapusPenyakit(penyakit) {
      Swal.fire({
        title: "Apakah anda yakin ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.tablePenyakit
            .doc(penyakit.kode_penyakit)
            .delete()
            .then(() => {
              this.notif("danger", "Berhasil Dihapus");
            });
        }
      });
    },

    updatePenyakit(e) {
      e.target.disabled = true;
      this.$firestore.tablePenyakit
        .doc(this.penyakit.kode_penyakit)
        .update(this.penyakit)
        .then(() => {
          e.target.disabled = false;
          this.notif("success", "Berhasil Diupdate");
          this.reset();
          $("#" + this.idModal).modal("hide");
        });
    },

    tambahPenyakit(e) {
      e.target.disabled = true;
      this.$firestore.tablePenyakit
        .doc(this.penyakit.kode_penyakit)
        .set(this.penyakit)
        .then(() => {
          $("#" + this.idModal).modal("hide");
          e.target.disabled = false;
          this.reset();
          this.notif("success", "Berhasil Ditambahkan");
        });
    },

    reset() {
      this.penyakit = {
        kode_penyakit: null,
        nama_penyakit: null,
        info_penyakit: null,
        pengobatan: null
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

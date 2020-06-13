<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="d-flex align-items-center">
            <h4 class="card-title align-center">{{namaHalaman}}</h4>
            <button
              class="btn btn-secondary btn-round ml-auto"
              data-toggle="modal"
              :data-target="'#'+idModal"
              @click="addModal"
            >
              <i class="fa fa-plus"></i>
              Tambah {{namaHalaman}}
            </button>
          </div>
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
                        <div class="form-group">
                          <label for="nama_lengkap">Nama Lengkap</label>
                          <input
                            type="text"
                            class="form-control"
                            id="nama_lengkap"
                            v-model="admin.nama"
                            placeholder="Enter nama"
                          />
                        </div>
                        <div class="form-group">
                          <label for="alamat">alamat</label>
                          <input
                            type="text"
                            class="form-control"
                            id="alamat"
                            v-model="admin.alamat"
                            placeholder="Enter alamat"
                          />
                        </div>
                        <div class="form-group">
                          <label for="alamat_email">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            id="alamat_email"
                            v-model="admin.email"
                            placeholder="Enter email"
                          />
                        </div>
                        <div class="form-group">
                          <label for="foto_admin">Foto</label>
                          <div class="input-group">
                            <div class="custom-file">
                              <input
                                type="file"
                                class="custom-file-input"
                                @change="upload"
                                id="foto_admin"
                              />
                              <label class="custom-file-label" for="foto_admin">Choose file</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer no-bd">
                  <button
                    type="button"
                    @click="tambahAdmin"
                    id="addRowButton"
                    class="btn btn-secondary"
                    v-if="modal=='tambah'"
                  >Tambah</button>
                  <button
                    type="button"
                    @click="updateAdmin"
                    id="updateRowButton"
                    class="btn btn-primary"
                    v-if="modal=='update'"
                  >Update</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4" v-for="(a,i) in tableAdmin" :key="i">
              <div class="card card-profile">
                <div class="card-avatar">
                  <a :href="a.images">
                    <img class="img" :src="a.images" />
                  </a>
                </div>
                <div class="card-body">
                  <p class="card-category text-gray">{{a.email}}</p>
                  <h4 class="card-title">{{a.nama}}</h4>
                  <p class="card-description">{{a.alamat}}</p>
                  <button @click="editAdmin(a)" class="btn btn-primary btn-round">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../../firebase";
export default {
  name: "akun",
  data() {
    return {
      modal: null,
      load: null,
      namaHalaman: "Admin",
      idModal: "modalAdmin",
      arrData: [],
      admin: {
        nama: null,
        alamat: null,
        email: null,
        images: null
      },
      tableAdmin: [],
      kolomAksi: null
    };
  },
  firestore() {
    return {
      tableAdmin: db.collection("profiles")
    };
  },
  created() {
    this.load = true;
  },
  mounted() {},
  methods: {
    upload(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        let storageRef = fb
          .storage()
          .ref("profile/" + Math.random() + "_" + file.name);
        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {},
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.profile.images = downloadURL;
              Toast.fire({
                type: "success",
                title: "Upload berhasil!"
              });
            });
          }
        );
      }
    },
    pushSkill(e) {
      e.preventDefault();
      this.skills.push(this.skill);
      this.skill = "";
      console.log(this.skills);
    },
    submitProfile(e) {
      e.preventDefault();
      this.$firestore.profile.set(this.profile).then(() => {
        Toast.fire({
          type: "success",
          title: "Berhasil disimpan!"
        });
      });
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
    editAdmin(admin) {
      this.modal = "update";
      $("#" + this.idModal).modal("show");
      this.admin = admin;
    },

    hapusAdmin(admin) {
      Swal.fire({
        title: "Apakah anda yakin ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.tableAdmin
            .doc(admin.kode_admin)
            .delete()
            .then(() => {
              this.notif("danger", "Berhasil Dihapus");
            });
        }
      });
    },

    updateAdmin(e) {
      e.target.disabled = true;
      this.$firestore.tableAdmin
        .doc(this.admin.kode_admin)
        .update(this.admin)
        .then(() => {
          e.target.disabled = false;
          this.notif("success", "Berhasil Diupdate");
          this.reset();
          $("#" + this.idModal).modal("hide");
        });
    },

    tambahAdmin(e) {
      e.target.disabled = true;
      this.$firestore.tableAdmin
        .doc(this.admin.kode_admin)
        .set(this.admin)
        .then(() => {
          $("#" + this.idModal).modal("hide");
          e.target.disabled = false;
          this.reset();
          this.notif("success", "Berhasil Ditambahkan");
        });
    },

    reset() {
      this.admin = {
        nama: null,
        alamat: null,
        email: null,
        images: null
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
</style>

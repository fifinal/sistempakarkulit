<template>
  <div class="row">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header card-header-primary">
          <h4 class="card-title">Edit Profile</h4>
          <p class="card-category">Complete your profile</p>
        </div>
        <div class="card-body">
          <form role="form">
            <div class="card-body">
              <div class="form-group">
                <label for="nama_lengkap">Nama Lengkap</label>
                <input
                  type="text"
                  class="form-control"
                  id="nama_lengkap"
                  v-model="profile.nama"
                  placeholder="Enter nama"
                />
              </div>
              <div class="form-group">
                <label for="alamat">alamat</label>
                <input
                  type="text"
                  class="form-control"
                  id="alamat"
                  v-model="profile.alamat"
                  placeholder="Enter alamat"
                />
              </div>
              <div class="form-group">
                <label for="alamat_email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="alamat_email"
                  v-model="profile.email"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group">
                <label for="foto_profile">Foto</label>
                <div class="input-group">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" @change="upload" id="foto_profile" />
                    <label class="custom-file-label" for="foto_profile">Choose file</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button type="submit" class="btn btn-primary" @click="submitProfile">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card card-profile">
        <div class="card-avatar">
          <a :href="profile.images">
            <img class="img" :src="profile.images" />
          </a>
        </div>
        <div class="card-body">
          <h6 class="card-category text-gray">{{profile.email}}</h6>
          <h4 class="card-title">{{profile.nama}}</h4>
          <p class="card-description">{{profile.alamat}}</p>
          <a href="#pablo" class="btn btn-primary btn-round">Follow</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fb, db } from "../../firebase";

export default {
  name: "edit-profile",
  data() {
    return {
      namaHalaman: "My Profile",
      profile: {}
    };
  },
  firestore() {
    let user = fb.auth().currentUser;
    this.email = user.email;
    this.id = user.uid;
    return {
      profile: db.collection("profiles").doc(this.id)
    };
  },
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
    }
  }
};
</script>

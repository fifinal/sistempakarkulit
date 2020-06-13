<template>
  <div class="row">
    <div class="col-md-3">
      <!-- Profile Image -->
      <div class="card card-outline">
        <div class="card-body box-profile">
          <div class="text-center">
            <img
              class="profile-user-img img-fluid img-circle"
              :src="profile.images"
              alt="User profile picture"
            />
          </div>

          <h3 class="profile-username text-center">{{profile.nama}}</h3>

          <p class="text-muted text-center">{{profile.email}}</p>

          <router-link to="/admin/edit-profile" class="btn btn-primary btn-block">
            <b>Edit Profile</b>
          </router-link>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->

      <!-- About Me Box -->

      <!-- /.card -->
    </div>
    <!-- /.col -->
    <div class="col-md-9">
      <div class="card">
        <div class="card-header card-dark bg-info-gradient skew-shadow">
          <h3 class="card-title">About Me</h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <strong>
            <i class="fa fa-book mr-1"></i> Education
          </strong>

          <p
            class="text-muted"
          >B.S. in Computer Science from the University of Tennessee at Knoxville</p>

          <hr />

          <strong>
            <i class="fa fa-map-marker mr-1"></i> Alamat
          </strong>

          <p class="text-muted">{{profile.alamat}}</p>

          <hr />

          <strong>
            <i class="fa fa-pencil mr-1"></i> Skills
          </strong>

          <p class="text-muted">
            <span class="tag tag-danger">UI Design</span>
            <span class="tag tag-success">Coding</span>
            <span class="tag tag-info">Javascript</span>
            <span class="tag tag-warning">PHP</span>
            <span class="tag tag-primary">Node.js</span>
          </p>

          <hr />
        </div>
        <!-- /.card-body -->
      </div>
    </div>
    <!-- /.col -->
  </div>
</template>
<script>
import { fb, db } from "../../firebase";

export default {
  name: "profile",
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
  created() {}
};
</script>

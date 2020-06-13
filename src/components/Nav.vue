<template>
  <nav class="navbar navbar-expand-lg navbar-absolute fixed-top">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <router-link class="navbar-brand" to="/admin">Dashboard</router-link>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        aria-controls="navigation-index"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="sr-only">Toggle navigation</span>
        <span class="navbar-toggler-icon icon-bar"></span>
        <span class="navbar-toggler-icon icon-bar"></span>
        <span class="navbar-toggler-icon icon-bar"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <form class="navbar-form">
          <div class="input-group no-border">
            <input type="text" value class="form-control" placeholder="Search..." />
            <button type="submit" class="btn btn-white btn-round btn-just-icon">
              <i class="material-icons">search</i>
              <div class="ripple-container"></div>
            </button>
          </div>
        </form>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/edit-profile">
              <i class="material-icons">person</i>
              <p class="d-lg-none d-md-block">Account</p>
            </router-link>
          </li>
          <li class="nav-item">
            <button class="btn btn-danger" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { fb, db } from "../firebase";

export default {
  name: "Nav",
  data() {
    return {
      email: null
    };
  },
  created() {
    let user = fb.auth().currentUser;
    this.email = "s.fifinalamsyah@gamail.com";
    // console.log(user.uid);
  },
  methods: {
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.replace("../login");
        })
        .catch(err => {
          console.log(err);
        });
    },
    bukanavbar() {
      // console.log(document.getElementsByTagName('html'))
    }
  }
};
</script>
<style scoped>
a {
  cursor: pointer;
}
</style>

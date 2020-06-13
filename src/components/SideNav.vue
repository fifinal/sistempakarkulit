<template>
  <div class="sidebar" data-color="purple" data-background-color="white">
    <!--
        Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

        Tip 2: you can also add an image using data-image tag
    -->
    <div class="logo">
      <router-link to="/" class="simple-text logo-normal">Sistem Pakar Kulit</router-link>
    </div>
    <div class="sidebar-wrapper">
      <ul class="nav" @click="linkActive">
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/dashboard">
            <i class="fas fa-home"></i>
            <p>Dashboard</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/gejala">
            <i class="fas fa-layer-group"></i>
            <p>Gejala</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/penyakit">
            <i class="fas fa-layer-group"></i>
            <p>Penyakit</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/diagnosa">
            <i class="fas fa-database"></i>
            <p>Diagnosa</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/user">
            <i class="fas fa-users"></i>
            <p>User</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/akun">
            <i class="fas fa-users"></i>
            <p>Akun</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <!--   <div class="sidebar sidebar-style-2" data-background-color="dark2">
    <div class="sidebar-wrapper scrollbar scrollbar-inner">
      <div class="sidebar-content">
        <div class="user">
          <div class="avatar-sm float-left mr-2">
            <img :src=profile.images :alt=profile.nama class="avatar-img rounded-circle">
          </div>
          <div class="info">
            <a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
              <span>
                {{profile.nama}}
                <span class="user-level">Administrator</span>
                <span class="caret"></span>
              </span>
            </a>
            <div class="clearfix"></div>

            <div class="collapse in" id="collapseExample">
              <ul class="nav">
                <li>
                  <router-link to="/admin/profile">
                    <span class="link-collapse">My Profile</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/admin/edit-profile">
                    <span class="link-collapse">Edit Profile</span>
                  </router-link>
                </li>
                <li>
                  <a href="#" @click.prevent="logout">
                    <span class="link-collapse">Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul class="nav nav-primary">
          <li class="nav-item">
            <router-link data-toggle="collapse" to="/admin" class="collapsed" aria-expanded="false">
              <i class="fas fa-home"></i>
              <p>Dashboard</p>
            </router-link>
          </li>
          <li class="nav-item">
            <a data-toggle="collapse" href="#master">
              <i class="fas fa-layer-group"></i>
              <p>Master</p>
              <span class="caret"></span>
            </a>
            <div class="collapse" id="master">
              <ul class="nav nav-collapse">
                <li>
                  <router-link to="/admin/gejala">
                    <span class="sub-item">Gejala</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/admin/penyakit">
                    <span class="sub-item">Penyakit</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a data-toggle="collapse" href="#rule">
              <i class="fas fa-database"></i>
              <p>Basis Pengetahuan</p>
              <span class="caret"></span>
            </a>
            <div class="collapse" id="rule">
              <ul class="nav nav-collapse">
                <li>
                  <router-link to="/admin/diagnosa">
                    <span class="sub-item">Diagnosa</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
            <li class="nav-item">
            <a data-toggle="collapse" href="#akun">
              <i class="fas fa-users"></i>
              <p>Akun</p>
              <span class="caret"></span>
            </a>
            <div class="collapse" id="akun">
              <ul class="nav nav-collapse">
                <li>
                  <router-link to="/admin/akun">
                    <span class="sub-item">Admin</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/admin/user">
                    <span class="sub-item">Pasien</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>-->
</template>
<script>
import { fb, db } from "../firebase";

export default {
  name: "SideNav",
  data() {
    return {
      profile: {},
      active: null
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
  created() {
    this.active = this.$router.options.linkActiveClass;
  },
  mounted() {},
  updated() {},
  methods: {
    linkActive(e) {
      document
        .querySelectorAll(".nav>.nav-item")
        .forEach(e => (e.classList = "nav-item"));
      e.target.parentElement.parentElement.classList += " active";
    }
  }
};
</script>

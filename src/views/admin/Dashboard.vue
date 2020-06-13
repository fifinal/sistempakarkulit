<template>
  <div>
    <div class="page-inner mt--5">
      <div class="row">
        <div class="col-md-4">
          <div class="card card-stats">
            <div class="card-header card-header-info card-header-icon">
              <div class="card-icon">
                <i class="fas fa-layer-group"></i>
              </div>
              <p class="card-category">Penyakit</p>
              <h3 class="card-title">{{penyakit.length}}</h3>
            </div>
            <div class="card-footer">
              <div class="stats text-info">
                <i class="fas fa-layer-group"></i>

                <router-link to="/admin/penyakit">Read more</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-stats">
            <div class="card-header card-header-info card-header-icon">
              <div class="card-icon">
                <i class="fas fa-layer-group"></i>
              </div>
              <p class="card-category">Gejala</p>
              <h3 class="card-title">{{gejala.length}}</h3>
            </div>
            <div class="card-footer">
              <div class="stats text-info">
                <i class="fas fa-layer-group"></i>
                <router-link to="/admin/gejala">Read more</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-stats">
            <div class="card-header card-header-danger card-header-icon">
              <div class="card-icon">
                <i class="fas fa-database"></i>
              </div>
              <p class="card-category">Rule</p>
              <h3 class="card-title">{{rule.length}}</h3>
            </div>
            <div class="card-footer">
              <div class="stats text-info">
                <i class="fas fa-database"></i>
                <router-link to="/admin/diagnosa">Read more</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-stats">
            <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="fas fa-users"></i>
              </div>
              <p class="card-category">User</p>
              <h3 class="card-title">{{pasien.length}}</h3>
            </div>
            <div class="card-footer">
              <div class="stats text-info">
                <i class="fas fa-users"></i>
                <router-link to="/admin/user">Read more</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-stats">
            <div class="card-header card-header-primary card-header-icon">
              <div class="card-icon">
                <i class="fas fa-users"></i>
              </div>
              <p class="card-category">Admin</p>
              <h3 class="card-title">{{admin.length}}</h3>
            </div>
            <div class="card-footer">
              <div class="stats text-info">
                <i class="fas fa-users"></i>
                <router-link to="/admin/akun">Read more</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-dark skew-shadow">
              <h4 class="card-title text-white">Informasi Aplikasi</h4>
            </div>
            <div class="card-body">
              <ul class="nav nav-pills nav-default" id="pills-tab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="pills-ginjal-tab"
                    data-toggle="pill"
                    href="#pills-ginjal"
                    role="tab"
                    aria-controls="pills-ginjal"
                    aria-selected="true"
                  >Penyakit Kulit</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="pills-sistem-pakar-tab"
                    data-toggle="pill"
                    href="#pills-sistem-pakar"
                    role="tab"
                    aria-controls="pills-sistem-pakar"
                    aria-selected="false"
                  >Sistem Pakar</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="pills-metode-tab"
                    data-toggle="pill"
                    href="#pills-metode"
                    role="tab"
                    aria-controls="pills-metode"
                    aria-selected="false"
                  >Forward Chaining</a>
                </li>
              </ul>
              <div class="tab-content mt-2 mb-3" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-ginjal"
                  role="tabpanel"
                  aria-labelledby="pills-ginjal-tab"
                  contenteditable="true"
                  @keyup.enter="tabInfo"
                ></div>
                <div
                  class="tab-pane fade"
                  id="pills-sistem-pakar"
                  role="tabpanel"
                  aria-labelledby="pills-sistem-pakar-tab"
                >
                  <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
                  <p>The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way.</p>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-metode"
                  role="tabpanel"
                  aria-labelledby="pills-metode-tab"
                >
                  <p>Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.</p>

                  <p>But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their</p>
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
  name: "dashboard",
  data() {
    return {
      penyakit: [],
      gejala: [],
      rule: [],
      pasien: [],
      admin: [],
      infoPenyakit: []
    };
  },
  firestore() {
    return {
      penyakit: db.collection("penyakit"),
      gejala: db.collection("Gejala"),
      rule: db.collection("diagnosa"),
      pasien: db.collection("pasien"),
      admin: db.collection("profiles"),
      infoPenyakit: db.collection("infoPenyakit")
    };
  },
  mounted() {},
  methods: {
    link(path) {
      this.$router.replace(path);
    },
    tabInfo(e) {
      console.log(e.target.innerHTML);
      e.target.blur();
    }
  }
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
<template>
  <div class="login row">
    <div class="col-md-4 ml-auto mr-auto">
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="pills-home-tab"
                data-toggle="pill"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
              >Login</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="pills-login-tab"
            >
              <h5 class="text-center">Silahkan Login</h5>
              <div class="form-group bmd-form-group">
                <label for="email" class="">Email</label>
                <input type="email" v-model="email" class="form-control" id="email" />
                <small class="form-text text-muted"></small>
              </div>
              <div class="form-group bmd-form-group">
                <label for="password" class="">Password</label>
                <input
                  type="password"
                  @keyup.enter="login"
                  v-model="password"
                  class="form-control"
                  id="password"
                />
              </div>

              <div class="form-group">
                <button class="btn btn-info" @click="login">LOGIN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
  name: "login",
  props: {
    msg: String
  },
  data() {
    return {
      nama: null,
      email: null,
      password: null
    };
  },
  created() {},
  mounted() {},
  methods: {
    login() {
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          Toast.fire({
            type: "success",
            title: "Login berhasil!"
          });
          this.$router.replace("admin");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            Swal.fire({
              title: "Error!!",
              text: "Password salah",
              type: "error"
            });
          } else {
            Swal.fire({
              title: "Error!!",
              text: errorMessage,
              type: "error"
            });
          }
        });
    },
    register() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          db.collection("profiles")
            .doc(user.user.uid)
            .set({
              nama: this.nama,
              email: this.email
            })
            .then(function() {
              Toast.fire({
                type: "success",
                title: "Registrasi berhasil!"
              });
            })
            .catch(function(error) {
              Toast.fire({
                type: "error",
                title: "Registrasi gagal!!!"
              });
            });
          this.$router.replace("admin");
        })
        .catch(function(error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            Swal.fire({
              title: "Error!!",
              text: "Password terlalu lemah",
              type: "error"
            });
          } else if (errorCode == "auth/email-already-in-use") {
            Swal.fire({
              title: "Error!!",
              text: "Email Sudah digunakan",
              type: "error"
            });
          } else {
            Toast.fire({
              type: "error",
              title: "error!!"
            });
          }
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  margin-top: 10vh;
}
</style>

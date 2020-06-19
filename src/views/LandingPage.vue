<template>
  <div>
    <section class="menu" id="menu1-9">
      <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute text-white">
        <div class="container">
          <div class="navbar-wrapper">
            <router-link class="navbar-brand" to="/">Sistem Pakar Kulit</router-link>
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
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" to="/login">
                  <p class="btn btn-round btn-secondary">Login</p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>

    <section id="header2-1">
      <div class="container text-black">
        <div class="row">
          <div class="col-md-10 ml-auto mr-auto content-header text-center">
            <h1 class="pb-3 display-2 judul">SISTEM PAKAR KULIT</h1>

            <h3
              class="pb-3 display-5"
            >Penyebab dan gejala penyakit kulit bervariasi. Ada penyakit kulit yang terasa gatal atau nyeri, ada juga yang hanya membuat kulit jadi tidak enak dipandang. Penyakit kulit pun bisa ringan, bisa juga berbahaya hingga berpotensi mengancam nyawa.</h3>
            <div class>
              <button
                class="btn btn-info btn-round btn-lg"
                data-toggle="modal"
                data-target="#diagnosa"
              >MULAI DIAGNOSA</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="diagnosa" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content" data-background-color="dark">
            <div class="modal-header no-bd">
              <h5 class="modal-title">
                Form Pasien
                <span class="fw-mediumbold"></span>
                <span class="fw-light"></span>
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
                        id="nama"
                        type="text"
                        v-model="pasien.nama"
                        class="form-control"
                        placeholder="Nama..."
                      />
                    </div>
                    <div class="form-group form-group-default">
                      <input
                        id="alamat"
                        type="text"
                        v-model="pasien.alamat"
                        class="form-control"
                        placeholder="Alamat..."
                      />
                    </div>
                    <div class="form-group form-group-default">
                      <input
                        id="umur"
                        type="number"
                        v-model="pasien.umur"
                        class="form-control"
                        placeholder="Umur..."
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer no-bd">
              <button
                type="button"
                id="addRowButton"
                @click="tambahPasien"
                class="btn btn-success"
              >Mulai</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class id="content1">
      <div class="container p-5 color-white">
        <div class="media-container-row">
          <div class="title col-12 col-md-8 ml-auto mr-auto text-center">
            <h2 class="align-center pb-3 mbr-fonts-style display-2">SISTEM PAKAR</h2>
            <h3
              class="-subtitle align-center mbr-light mbr-fonts-style display-5"
            >sistem informasi yang berisi pengetahuan seorang pakar sehingga dapat digunakan untuk konsultasi. Pengetahuan seorang pakar yang dimiliki oleh Sistem Pakar ini digunakan sebagi dasar untuk menjawab pertanyaan (konsultasi)..</h3>
          </div>
        </div>
      </div>
    </section>

    <section class id="content2">
      <div class="container">
        <div class="media-container-row">
          <div class="col-12 col-md-8 ml-auto mr-auto display-7">
            <blockquote>
              <strong>
                <em>Kulit merupakan organ terbesar pada tubuh.</em>
              </strong> Fungsinya untuk melindungi tubuh dari bakteri, virus, dan sinar matahari, membantu mengatur suhu tubuh, merasakan sensasi sentuhan dan nyeri, serta menghasilkan vitamin D.
              Sebagai bagian terluar tubuh yang menerima berbagai paparan dari lingkungan, kulit dapat dengan mudah mengalami gangguan atau penyakit. Penyakit kulit dapat muncul secara tak terduga, dan banyak orang menganggap penyebabnya selalu berkaitan dengan kebersihan tubuh yang buruk. Padahal, ada banyak faktor yang bisa menyebabkan munculnya penyakit kulit.
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <section class id="content3">
      <div class="container p-5">
        <div class="media-container-row">
          <div class="counter-container col-12 col-md-8 ml-auto mr-auto display-7">
            <ol class="p-2">
              <li class="p-2">
                <strong>MOBILE FRIENDLY</strong> - no special actions required, all sites you make with
                Mobirise are mobile-friendly. You don't have to create a special mobile version of your
                site, it will adapt automagically.
                <a
                  href="https://mobirise.co/"
                >Try it now!</a>
              </li>
              <li class="p-2">
                <strong>EASY AND SIMPLE</strong> - cut down the development time with drag-and-drop website
                builder. Drop the blocks into the page, edit content inline and publish - no technical
                skills required.
                <a
                  href="https://mobirise.co/"
                >Try it now!</a>
              </li>
              <li class="p-2">
                <strong>UNIQUE STYLES</strong> - choose from the large selection of latest pre-made blocks -
                full-screen intro, bootstrap carousel, content slider, responsive image gallery with
                lightbox, parallax scrolling, video backgrounds, hamburger menu, sticky header and more.
                <a
                  href="https://mobirise.co/"
                >Try it now!</a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>s
  </div>
</template>

<script>
import { fb, db } from "../firebase";
export default {
  name: "diagnosa",
  data() {
    return {
      pasien: {
        nama: null,
        alamat: null,
        kelamin: null,
        umur: null,
        kode_penyakit: null,
        tanggal: null
      }
    };
  },
  firestore() {
    return {
      pasiens: db.collection("pasien")
    };
  },
  created() {
    this.load = true;
  },
  methods: {
    tambahPasien() {
      let docRef = this.$firestore.pasiens.doc();
      docRef.set(this.pasien).then(() => {
        $("#diagnosa").modal("hide");
        this.reset();
        this.$router.push({ name: "home", params: { id: docRef.id } });
      });
    },

    reset() {
      this.pasien = {
        nama: null,
        alamat: null,
        kelamin: null,
        umur: null,
        kode_penyakit: null,
        tanggal: null
      };
    }
  }
};
</script>

   
<style scoped>
#header2-1 {
  background-image: url(../assets/images/1.jpg);
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  height: 100vh;
  padding-top: 150px;
  /* color: #ffffff; */
}
.content-header {
  /* background: rgba(0, 0, 0, 0.5); */
}
.navbar-brand {
  font-size: 24px;
}
.judul {
  font-weight: bold;
}
#content2 {
  background-image: url(../assets/images/bgpakar.jpg);
  background-position: center;
  background-attachment: fixed;
  padding: 60px;
  color: black;
  font-size: 18px;
}
#content4 {
  background-color: #00bcd4;
  padding: 60px;
  color: white;
  font-size: 18px;
}
blockquote {
  border-left: solid rgb(7, 150, 90) 2px;
  padding: 20px;
}
</style>
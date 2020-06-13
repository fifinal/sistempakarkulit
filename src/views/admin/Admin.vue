<template>
  <div class="wrapper">
    <SideNav></SideNav>
    <div class="main-panel">
      <Nav></Nav>
      <div class="content">
        <div class="container-fluid">
          <router-view />
        </div>
      </div>
      <footer class="footer">
        <div class="container-fluid">
          <nav class="float-left"></nav>
          <div class="copyright float-right">
            &copy;
            {{new Date().getFullYear()}} by
            <a href target="_blank"></a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import Nav from "@/components/Nav.vue";
import SideNav from "@/components/SideNav.vue";
export default {
  components: { Nav, SideNav },
  name: "admin",
  mounted() {},
  methods: {}
};
</script>
<style>
</style>
<template>
  <footer class="footer">
    <div class="container-sm">
      <div class="footer-social-wrapper">
        <a
          v-for="item in socialItems"
          :key="item.id"
          :href="item.href"
          class="footer-social-item"
        >
          <img :src="item.icon" />
        </a>
      </div>
      <div class="navbar-footer">
        <li
          v-for="navbarItem in navabrFooterItems"
          :key="navbarItem.id"
          class="navbar-footer-item"
        >
          <a href="/" class="text-14">
            {{ navbarItem.name }}
          </a>
        </li>
      </div>
      <div class="copy-right">
        <p class="text-center mb-5 opacity-50 font-300">
          © 2022 mrtehran.com All Rights Reserved. Persian Music Service 24/7
        </p>
        <p class="text-center opacity-50 font-300">
          MrTehran's website is registered in samandehi.ir.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import "./style.scss";
export default {
  data() {
    return {
      socialItems: [
        {
          id: 1,
          icon: require("@/assets/Images/get_it_on_google_play.png"),
          href: "/",
        },
        {
          id: 2,
          icon: require("@/assets/Images/get_it_on_app_store.png"),
          href: "/",
        },
      ],
      navabrFooterItems: [
        {
          id: 1,
          name: "Applications",
          path: "",
        },
        {
          id: 2,
          name: "Instagram",
          path: "",
        },
        {
          id: 3,
          name: "Contact US",
          path: "",
        },
        {
          id: 4,
          name: "Contact US",
          path: "",
        },
        {
          id: 5,
          name: "FAQ & Help ",
          path: "",
        },
        {
          id: 6,
          name: "Privacy Policy",
          path: "",
        },
        {
          id: 7,
          name: "Terms of Service",
          path: "",
        },
        {
          id: 8,
          name: "DMCA",
          path: "",
        },
      ],
    };
  },
};
</script>

<style>
</style>
import { aP as Popper, au as axios } from "./vuetify-EeS5qzD-.js";
import "./bootstrap-BJGpzKVK.js";
window.Popper = Popper;
window.axios = axios;
window.scope = "affiliate";
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
  window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
  console.error("CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token");
}
//# sourceMappingURL=bootstrap-DAzZxGcG.js.map

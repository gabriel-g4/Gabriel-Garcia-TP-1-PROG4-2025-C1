
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'C:/Program Files/Git/Gabriel-Garcia-TP-1-PROG4-2025-C1',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/Program%20Files/Git/Gabriel-Garcia-TP-1-PROG4-2025-C1/bienvenida",
    "route": "/Program%20Files/Git/Gabriel-Garcia-TP-1-PROG4-2025-C1"
  },
  {
    "renderMode": 2,
    "route": "/Program%20Files/Git/Gabriel-Garcia-TP-1-PROG4-2025-C1/bienvenida"
  },
  {
    "renderMode": 2,
    "route": "/Program%20Files/Git/Gabriel-Garcia-TP-1-PROG4-2025-C1/login"
  },
  {
    "renderMode": 2,
    "route": "/Program%20Files/Git/Gabriel-Garcia-TP-1-PROG4-2025-C1/quien-soy"
  },
  {
    "renderMode": 2,
    "route": "/Program%20Files/Git/Gabriel-Garcia-TP-1-PROG4-2025-C1/registro"
  },
  {
    "renderMode": 2,
    "redirectTo": "/Program%20Files/Git/Gabriel-Garcia-TP-1-PROG4-2025-C1/bienvenida",
    "route": "/Program%20Files/Git/Gabriel-Garcia-TP-1-PROG4-2025-C1/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23832, hash: '12ae7f7965f90d764c93c7ee86c6f2b082400bc2dcaeffb7ddc665d274627115', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17406, hash: '7ad6fa9ea9399e42716c4f422423c97a0a77d4a049326a77cf9f4a38ebf22706', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-ZTGBSJYP.css': {size: 7065, hash: 'okg3ZNh+KSA', text: () => import('./assets-chunks/styles-ZTGBSJYP_css.mjs').then(m => m.default)}
  },
};

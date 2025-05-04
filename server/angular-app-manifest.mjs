
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'C:/Program Files/Git/Gabriel-Garcia-TP-1-PROG4-2025-C1/',
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
    'index.csr.html': {size: 23833, hash: '9e82d60e00703e3fc031bf3471311e72f3828c18e31d92a5e601e391ee11bdbb', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17407, hash: '4efc7470205265cd1b9a94ee66f75f888ff0188d56a991982423ff2261359374', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-ZTGBSJYP.css': {size: 7065, hash: 'okg3ZNh+KSA', text: () => import('./assets-chunks/styles-ZTGBSJYP_css.mjs').then(m => m.default)}
  },
};

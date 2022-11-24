import { createApp } from 'vue'
import gql from 'graphql-tag';

import './style.css'
import App from './App.vue'
import router from './router';
import { apolloProvider } from './vue-apollo';
// import moduleName from '';

const app = createApp(App);

app.use(router).use(VueApollo).mount('#app')

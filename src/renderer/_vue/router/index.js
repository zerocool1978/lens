import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";
import { whatsNew } from './routeguard'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/_vue/components/LandingPage').default,
      meta: {
        routeguard: [
          // guards in priority order; the first one to catch will trigger something
          whatsNew,
        ],
      }
    },
    {
      path: '/preferences',
      name: 'preferences-page',
      component: require('@/_vue/components/PreferencesPage').default,
    },
    {
      path: '/workspaces',
      name: 'workspaces-page',
      component: require('@/_vue/components/WorkspacesPage').default,
      props: true,
    },
    {
      path: '/add-workspace',
      name: 'add-workspace-page',
      component: require('@/_vue/components/AddWorkspacePage').default,
      props: true,
    },
    {
      path: '/edit-workspace',
      name: 'edit-workspace-page',
      component: require('@/_vue/components/EditWorkspacePage').default,
      props: true,
    },
    {
      path: '/clusters/:id',
      name: 'cluster-page',
      component: require('@/_vue/components/ClusterPage').default,
      props: true,
    },
    {
      path: '/clusters/:id/settings',
      name: 'cluster-settings-page',
      component: require('@/_vue/components/ClusterSettings').default,
      props: true,
    },
    {
      path: "/add-cluster",
      name: "add-cluster-page",
      component: require('@/_vue/components/AddClusterPage').default,
      props: true,
    },
    {
      path: "/whats-new",
      name: "whats-new-page",
      component: require('@/_vue/components/WhatsNewPage').default,
      props: true,
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {

  // guard routes
  if(to.meta && to.meta.routeguard && to.meta.routeguard.length > 0){

    let guardNext;
    to.meta.routeguard.forEach(guard => {
      if(!guardNext) guardNext = guard(to, from, store);
    });

    if(guardNext) {
      next(guardNext);
    } else {
      next();
    }

  }

  next();

});

export default router;

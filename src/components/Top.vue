/** A component to wrap all components that should be present in the HTML-header
    note: When naming this component 'Header' instead of 'Top' the page will break.
    Native HTML-Tag names are not allowed for Vue components. **/

<template>
  <header>
    <nav class="navbar-container navbar-dark bg-primary mb-3 border-bottom">
      <div class="content-wrapper navbar navbar-expand-sm">
        <app-link class="navbar-brand d-inline-block" :to="{ path: '/'}">
          <div class="project-title-container">                    
            <img src="@/assets/img/piveau-logo-white.svg" class="piveau-logo">
          </div>
        </app-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <app-link class="nav-link" :to="{ path: '/datasets'}">
                Datasets
              </app-link>
            </li>
            <li class="nav-item">
              <app-link class="nav-link" :to="{ path: '/catalogues'}">
                Catalogues
              </app-link>
            </li>
          </ul>
        </div>
      </div>
      
    </nav>
  </header>
</template>

<script>
import AppLink from './AppLink';

export default {
  name: 'top',
  components: {
    appLink: AppLink,
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';

  .navbar-container {
    .navbar {
      .project-title-container {
        margin-right: 2rem;
        position: inline-block;
        vertical-align: top;
        text-align: right;

        .piveau-logo {
            width: 120px;
          }
          .project-name {
          text-transform: uppercase;
          font-size: 0.8em;
          font-weight: bold;
          margin-top: -10px;
        }
      }

      .navbar-nav {
        font-size: 1.1rem;
        font-weight: bold;
        .nav-link.active {
          color: $white;
        }
      }
    }
  }
  

  .brand-name {
    line-height: 48px;
  }
</style>

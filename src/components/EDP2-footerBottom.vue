<template>
  <div class="edp2-footer-bottom container-fluid">
    <div class="row">
      <div class="col-md-12 col-lg-6 offset-lg-6">
        <ul class="menu clearfix list-group list-group-flush list-unstyled">
          <li class="leaf nav-item small mx-0">
            <app-link class="nav-link p-0"
                      :path="`/${$i18n.locale}/newsletter/subscribe`">{{ $t('message.footer.links.newsletter') }}</app-link>
          </li>
          <li class="leaf nav-item small mx-0">
            <app-link class="nav-link p-0"
                      :path="`/${$i18n.locale}/faq`">{{ $t('message.footer.links.faq') }}</app-link>
          </li>
          <li class="leaf nav-item small mx-0">
            <app-link class="nav-link p-0"
                      :path="`/${$i18n.locale}/search/site`">{{ $t('message.footer.links.search') }}</app-link>
          </li>
          <li class="leaf nav-item small mx-0">
            <app-link class="nav-link p-0"
                      :path="`/${$i18n.locale}/feedback/form`">{{ $t('message.footer.links.contact') }}</app-link>
          </li>
          <li class="leaf nav-item small mx-0">
            <app-link class="nav-link p-0"
                      :path="`/${$i18n.locale}/cookies`">{{ $t('message.footer.links.cookies') }}</app-link>
          </li>
          <li class="leaf nav-item small mx-0">
            <app-link class="nav-link p-0"
                      :path="`/${$i18n.locale}/legal-notice`">{{ $t('message.footer.links.legalNotice') }}</app-link>
          </li>
          <li class="last leaf nav-item small mx-0">
            <app-link class="nav-link p-0"
                      :path="`/sparql-manager/${$i18n.locale}/user`">{{ $t('message.footer.links.login') }}</app-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AppLink from './AppLink';

export default {
  name: 'EDP2-footerBottom',
  components: {
    appLink: AppLink,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
  @import '../../node_modules/bootstrap/scss/bootstrap.scss';

  // FOOTER BOTTOM
  .edp2-footer-bottom {
    font-family: "Open Sans",Helvetica,Arial,sans-serif;
    background-color: #015196;

    * {
      color: #99B1CB;
    }
    .row > div {
      padding-top: 5px;
      padding-bottom: 0;

      ul {
        text-align: right;
      }
    }
    ul {
      padding: 5px 0 0 0;
      margin-bottom: 10px;

      &.menu {
        display: block;
        border: medium none;
        list-style: outside none none;
      }

      & ol {
        margin-top: 0;
      }
      li:after {
        content: " |";
      }
      li:last-of-type:after {
        content: "";
      }
      li {
        display: inline-block;
        font-size: 12px;
        margin-left: 5px;

        a {
          background: none;
          border: 0;
          padding: 0;
          display: inline-block;

          &:hover {
            color: #ffffff;
          }
        }

        &.leaf {
          padding: 0;
          list-style-type: square;
        }
      }
    }
  }

  // MEDIA QUERIES
  @media (max-width: 992px) {
    .edp2-footer-bottom, .edp2-footer-bottom .menu {
      text-align: center !important;
    }
  }
</style>

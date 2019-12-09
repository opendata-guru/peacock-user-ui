<template>
  <div class="edp2-footer-top container-fluid">
    <div class="row">
      <div class="col-md-12 col-lg-4">
        <div class="funded-by">
          <img src="../assets/img/funded-by.png">
          <p>{{ $t('message.footer.fundedBy') }}</p>
        </div>
      </div>
      <div class="col-md-12 col-lg-4">
        <div class="newsletter">
          <strong>{{ $t('message.footer.newsletter') }}</strong>
          <label for="simplenews-block-form-39">{{ $t('message.footer.newsletterText') }}</label>
          <form id="simplenews-block-form-39"
                class="simplenews-subscribe"
                action="/"
                method="post"
                accept-charset="UTF-8">
            <div>
              <div class="form-item form-type-textfield form-item-mail">
                <label for="edit-mail">
                  E-mail
                  <span class="form-required"
                        title="This field is required.">*</span>
                </label>
                <input id="edit-mail"
                       class="form-control form-text required"
                       placeholder="name@example.com"
                       type="text"
                       name="mail"
                       value=""
                       size="20"
                       maxlength="128">
              </div>
              <input id="edit-submit--2"
                     class="edp2-newsletter-sub form-submit btn btn-default"
                     type="submit"
                     name="op" value="Subscribe">
              <input type="hidden"
                     name="form_build_id"
                     value="form-0woYgF2ew4Hh-wGJ7wt6BkDler0OtDTL9XdR94uUnsc">
              <input type="hidden"
                     name="form_id"
                     value="simplenews_block_form_39">
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-12 col-lg-4">
        <div class="follow-us">
          <strong>{{ $t('message.footer.followUs') }}</strong>
          <app-link :to="`${facebookURL}`"
                    target="_blank">
            <font-awesome-icon class="fa"
                               :icon="{ prefix: 'fab', iconName: 'facebook-f' }"></font-awesome-icon>
          </app-link>
          <app-link :to="`${twitterURL}`"
                    target="_blank">
            <font-awesome-icon class="fa"
                               :icon="{ prefix: 'fab', iconName: 'twitter' }"></font-awesome-icon>
          </app-link>
          <app-link :to="`${linkedinURL}`"
                    target="_blank">
            <font-awesome-icon class="fa"
                               :icon="{ prefix: 'fab', iconName: 'linkedin-in' }"></font-awesome-icon>
          </app-link>
        </div>
      </div>
      <div class="col-md-12 col-md-offset-0 col-lg-7 offset-lg-4 sub-footer">
        <div class="region region-footer">
          <div id="block-block-4"
               class="block block-block panel panel-default clearfix">
            <div class="panel-body content">
              <font-awesome-icon class="mt-1 fa"
                                 :icon="{ prefix: 'fas', iconName: 'comment' }"></font-awesome-icon>
              <p>
                <app-link class="edp2-help-improve-link"
                          :path="`/${$i18n.locale}/feedback/form?type=4`">
                  <strong>{{ $t('message.footer.helpUsImprove') }}</strong>
                  <br>
                  {{ $t('message.footer.helpUsImproveText') }}
                </app-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppLink from './AppLink';

  export default {
    name: 'EDP2-footerTop',
    components: {
      appLink: AppLink,
    },
    data() {
      return {
        facebookURL: 'https://www.facebook.com/EuropeanDataPortal',
        twitterURL: 'https://twitter.com/EU_DataPortal',
        linkedinURL: 'https://www.linkedin.com/groups/8428984/',
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../node_modules/bootstrap/scss/bootstrap.scss';

  // FOOTER TOP
  .edp2-footer-top {
    font-family: "Open Sans",Helvetica,Arial,sans-serif;
    margin-top: 0;
    background: #0f66a0 none repeat scroll 0 0;
    border-top: 0 none;
    font-size: 90%;
    margin-bottom: 0;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;

    .funded-by {
      padding-top: 40px;

      img {
        float: left;
        margin-left: 20px;
        margin-right: 10px;
      }
      p {
        float: left;
        color: #fff;
        font-size: 12px;
        width: 100px;
        text-align: left;
        top: 5px;
        position: relative;
      }
    }
    .newsletter {
      text-align: left;
      color: #FFF;

      strong {
        font-size: 14px;
        margin-bottom: 15px;
        display: block;
      }
      label {
        color: #fff;
        font-weight: normal;
      }
      .form-item {
        width: calc(70% - 5px);
        display: inline-block;
        margin-top: 10px;
        margin-bottom: 10px;
        float: left;
      }
      .form-control {
        display: block;
        font-size: 14px;
        line-height: 1.42857143;
        background: #fff none;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
      }
      form label {
        display: none;
      }
      .form-item input[type=text] {
        height: 30px;
        border-radius: 0;
        width: 100%;
        margin-top: 0px;
        padding: 7px;
        color: #000;
        border: 1px solid white;
      }
      input[type=submit] {
        line-height: 18px;
        margin-top: 10px;
        margin-left: 2px;
        float: left;
        border-radius: 0;
        width: calc(30% - 5px);
        background-color: #fff;
        color: #0f66a0 !important;
        font-weight: bold;
        border: 1px solid white;
        display: inline-block;
        padding: 5px;
        font-size: 0.9em;
      }
    }
    .follow-us {
      text-align: left;

      strong {
        color: white;
        display: block;
        font-size: 14px;
        margin-bottom: 20px;
      }
      a {
        margin-right: 10px;
      }
    }
    .fa {
      background-color: white;
      width: 30px;
      height: 30px;
      color: #0F66A0;
      font-size: 15px;
      text-align: center;
      padding: 7px;
    }
    .sub-footer {
      .region {
        border-top: 1px solid #2481C4;
        margin-top: 20px;
      }
      .panel {
        margin-bottom: 10px;
        text-align: left;
      }
      .block {
        background-color: transparent;
        border: none;

        * {
          color: #bee3ff;
        }

        .fa path {
          color: #0F66A0;
        }
      }
      .panel-body {
        display: flex;
        padding: 20px 0 0 0;

        p {
          margin-left: 10px;
        }
      }
      strong:before {
        margin-right: 10px;
        height: 30px;
        float: left;
        width: 30px;
        padding-left: 4px;
        font: normal normal normal 24px/1 FontAwesome;
        color: #0F66A0;
        background-color: white;
      }
      .edp2-help-improve-link {
        font-size: 0.9em;
      }
    }
  }
  // MEDIA QUERIES
  @media (max-width: 992px) {
    .edp2-footer-top {
      .funded-by {
        overflow: hidden;
        padding: 20px 0;
      }
      .funded-by img {
        margin-left: 0;
      }
      .newsletter {
        border-top: 1px solid #2481C4;
        padding-top: 15px;
        width: 100%;
        padding-bottom: 15px;
        overflow: hidden;
      }
      .follow-us {
        border-top: 1px solid #2481C4;
        padding-top: 15px;
      }
    }
  }
  @media (min-width: 768px){
    .edp2-footer-top .newsletter {
      width: 90%;
    }
  }
</style>

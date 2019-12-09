<template>
  <div class="edp2-topnav-wrapper container-fluid mb-3" id="edp2-header">
    <div class="row edp2-header">
      <div class="col-auto">
        <app-link class="edp2-home-link"
                  :path="`/${$i18n.locale}`">
          <div class="mt-3 d-flex flex-row">
            <img class="edp-logo ml-3" src="../assets/img/edplogo.png" alt="European data portal logo">
            <div class="edp-title d-flex flex-column ml-3 mt-1">
              <div class="edp-title-top">{{ $t('message.header.european') }}</div>
              <div class="edp-title-bottom">{{ $t('message.header.dataPortal') }}</div>
            </div>
          </div>
        </app-link>
      </div>
      <div class="col">
        <div class="row">
          <div class="col justify-content-end">
            <ul class="nav subnav justify-content-end mt-1 d-none d-lg-flex position-absolute fixed-top">
              <li class="nav-item small">
                <app-link class="nav-link p-0"
                          :path="`/${$i18n.locale}/newsletter/subscribe`">
                  {{ $t('message.header.subnav.newsletter') }}
                </app-link>
              </li>
              <li class="nav-item small">
                <app-link :path="`/${$i18n.locale}/faq`" class="nav-link p-0">
                  {{ $t('message.header.subnav.faq') }}
                </app-link>
              </li>
              <li class="nav-item small">
                <app-link :path="`/${$i18n.locale}/search/site`" class="nav-link p-0">
                  {{ $t('message.header.subnav.search') }}
                </app-link>
              </li>
              <li class="nav-item small">
                <app-link class="nav-link p-0"
                          :path="`/${$i18n.locale}/feedback/form`">
                  {{ $t('message.header.subnav.contact') }}
                </app-link>
              </li>
              <li class="nav-item small">
                <app-link class="nav-link p-0"
                          :path="`/${$i18n.locale}/cookies`">
                  {{ $t('message.header.subnav.cookies') }}
                </app-link>
              </li>
              <li class="nav-item small">
                <app-link class="nav-link p-0"
                          :path="`/${$i18n.locale}/legal-notice`">
                  {{ $t('message.header.subnav.legalNotice') }}
                </app-link>
              </li>
              <li class="nav-item small">
                <!-- <a v-if="!authenticated" @click="$router.push(`/login?locale=${$i18n.locale}`)" class="nav-link p-0 login">{{ $t('message.header.subnav.login') }}</a> -->
                 <a v-if="!authenticated" v-on:click="login()" class="nav-link p-0 login">{{ $t('message.header.subnav.login') }}</a>
                <a v-if="authenticated" v-on:click="logout()" class="nav-link p-0 login">{{ $t('message.header.subnav.logout') }}</a>
              </li>
            </ul>
          </div>
          <div class="col-auto d-flex justify-content-end">
            <language-selector></language-selector>
          </div>
        </div>
        <div class="row d-flex justify-content-end">
          <div class="col-lg-5 col-md-8 d-none d-md-block">
            <search-bar></search-bar>
          </div>
        </div>
      </div>
    </div>
    <div class="row edp2-breadcrumb d-none d-md-block">
      <small class="ml-2">
          <app-link class="edp2-breadcrumb-link"
                    :path="`/${$i18n.locale}`">
            {{ `${$t('message.header.european')} ${$t('message.header.dataPortal')}` }}
          </app-link>
      </small>
      <small v-if="showDatasets || showDatasetDetailsDataset || showDatasetDetailsCategories || showDatasetDetailsSimilarDatasets || showDatasetDetailsActivityStream">
        <span class="edp2-breadcrumb-arrow">></span>
        <app-link class="edp2-breadcrumb-link"
                  :to="{ path: '/datasets', query: Object.assign({}, { locale: $route.query.locale }) }">
          {{ `${$t('message.header.navigation.data.datasets')}` }}
        </app-link>
      </small>
      <small v-if="showDatasetDetailsDataset || showDatasetDetailsCategories || showDatasetDetailsSimilarDatasets || showDatasetDetailsActivityStream">
        <span class="edp2-breadcrumb-arrow">></span>
        <app-link class="edp2-breadcrumb-link text-truncate"
                  :to="{ path: `/datasets/${getID}`, query: Object.assign({}, { locale: $route.query.locale }) }">
          {{ truncate(getTranslationFor(getTitle), 30) }}
        </app-link>
      </small>
      <small v-if="showDatasetDetailsCategories">
        <span class="edp2-breadcrumb-arrow">></span>
        <app-link class="edp2-breadcrumb-link"
                  :to="{ path: `/datasets/${getID}/categories`, query: Object.assign({}, { locale: $route.query.locale }) }">
          {{ `${$t('message.datasetDetails.subnav.categories')}` }}
        </app-link>
      </small>
      <small v-if="showDatasetDetailsSimilarDatasets">
        <span class="edp2-breadcrumb-arrow">></span>
        <app-link class="edp2-breadcrumb-link"
                  :to="{ path: `/datasets/${getID}/similarDatasets`, query: Object.assign({}, { locale: $route.query.locale }) }">
          {{ `${$t('message.datasetDetails.subnav.similarDatasets')}` }}
        </app-link>
      </small>
      <small v-if="showDatasetDetailsActivityStream">
        <span class="edp2-breadcrumb-arrow">></span>
        <app-link class="edp2-breadcrumb-link"
                  :to="{ path: `/datasets/${getID}/activityStream`, query: Object.assign({}, { locale: $route.query.locale }) }">
          {{ `${$t('message.datasetDetails.subnav.activityStream')}` }}
        </app-link>
      </small>
      <small v-if="showCatalogueName || showCatalogues">
        <span class="edp2-breadcrumb-arrow">></span>
        <app-link class="edp2-breadcrumb-link"
                  :to="{ path: '/catalogues', query: Object.assign({}, { locale: $route.query.locale }) }">
          {{ `${$t('message.header.navigation.data.catalogues')}` }}
        </app-link>
      </small>
      <small v-if="showCatalogueName">
        <span class="edp2-breadcrumb-arrow">></span>
        <app-link class="edp2-breadcrumb-link text-truncate"
                  :to="{ path: '/datasets', query: Object.assign({}, { locale: $route.query.locale, showcataloguedetails: 'true' }) }">
          {{ truncate(getTranslationFor(getCatalogTitle($route.query.catalog)), 30) }}
        </app-link>
      </small>
    </div>
    <div class="row">
      <nav class="navbar navbar-expand-md w-100 h-100 p-0 edp2-topnav">
        <app-link class="navbar-brand p-0 m-0 d-none d-md-block edp2-topnav-home"
                  :path="`/${$i18n.locale}`">
          <i class="material-icons w-100 text-center">home</i>
        </app-link>
        <ul class="navbar-nav nav-fill w-100 h-100 justify-content-between flex-row d-none d-md-flex">
            <li class="nav-item dropdown edp2-topnav-dropdown">
              <app-link id="edp2-topnav-dropdown-1"
                        class="nav-link dropdown-toggle"
                        fragment="#"
                        data-toggle="dropdown">
                {{ $t('message.header.navigation.whatWeDo.title') }}
              </app-link>
              <div class="dropdown-menu border-0 w-100 mt-0 edp2-topnav-dropdown-container" aria-labelledby="edp2-topnav-dropdown-1">
                <ul class="d-flex flex-row justify-content-center px-3">
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/what-we-do/our-activities`"
                              role="button">
                      {{ $t('message.header.navigation.whatWeDo.ourActivities') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/dashboard`"
                              role="button">
                      {{ $t('message.header.navigation.whatWeDo.openDataMaturity') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/what-we-do/factsheets-and-reports`"
                              role="button">
                      {{ $t('message.header.navigation.whatWeDo.factsheetsAndReports') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/what-we-do/highlights-archive`"
                              role="button">
                      {{ $t('message.header.navigation.whatWeDo.featuredHighlights') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/what-we-do/calendar`"
                              role="button">
                      {{ $t('message.header.navigation.whatWeDo.calendar') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/what-we-do/articles-archive`"
                              role="button">
                      {{ $t('message.header.navigation.whatWeDo.news') }}
                    </app-link>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item dropdown edp2-topnav-dropdown">
              <app-link id="edp2-topnav-dropdown-2"
                        class="nav-link dropdown-toggle"
                        fragment="#"
                        data-toggle="dropdown">
                {{ $t('message.header.navigation.data.title') }}
              </app-link>
              <div class="dropdown-menu border-0 w-100 mt-0 edp2-topnav-dropdown-container"
                   aria-labelledby="edp2-topnav-dropdown-2">
                <ul class="d-flex flex-row justify-content-center px-3">
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :to="{ path: '/datasets', query: Object.assign({}, { locale: $route.query.locale }) }"
                              role="button">
                      {{ $t('message.header.navigation.data.datasets') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :to="{ path: '/catalogues', query: Object.assign({}, { locale: $route.query.locale }) }"
                              role="button">
                      {{ $t('message.header.navigation.data.catalogues') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/mqa?locale=${$i18n.locale}`"
                              role="button">
                      {{ $t('message.header.navigation.data.metadataQuality') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/content/filter-licenses`"
                              role="button">
                      {{ $t('message.header.navigation.data.licensingAssistant') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/sparql-manager/${$i18n.locale}/`"
                              role="button">
                      {{ $t('message.header.navigation.data.sparqlManager') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/catalogue-statistics/CurrentState?locale=${$i18n.locale}`"
                              role="button">
                      {{ $t('message.header.navigation.data.statistics') }}
                    </app-link>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item dropdown edp2-topnav-dropdown">
              <app-link id="edp2-topnav-dropdown-3"
                        class="nav-link dropdown-toggle"
                        fragment="#"
                        data-toggle="dropdown">
                {{ $t('message.header.navigation.providingData.title') }}
              </app-link>
              <div class="dropdown-menu border-0 w-100 mt-0 edp2-topnav-dropdown-container"
                   aria-labelledby="edp2-topnav-dropdown-3">
                <ul class="d-flex flex-row justify-content-center px-3">
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/providing-data/goldbook`"
                              role="button">
                      {{ $t('message.header.navigation.providingData.practicalGuide') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :to="{ path: '/catalogues', query: Object.assign({}, { locale: $route.query.locale }) }"
                              role="button">
                      {{ $t('message.header.navigation.providingData.cataloguesHarvestedByUs') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/providing-data/how-to-be-harvested-by-us`"
                              role="button">
                      {{ $t('message.header.navigation.providingData.beHarvestedByUs') }}
                    </app-link>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item dropdown edp2-topnav-dropdown">
              <app-link id="edp2-topnav-dropdown-4"
                        class="nav-link dropdown-toggle"
                        fragment="#"
                        data-toggle="dropdown">
                {{ $t('message.header.navigation.usingData.title') }}
              </app-link>
              <div class="dropdown-menu border-0 w-100 mt-0 edp2-topnav-dropdown-container"
                   aria-labelledby="edp2-topnav-dropdown-4">
                <ul class="d-flex flex-row justify-content-center px-3">
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/using-data/benefits-of-open-data`"
                              role="button">
                      {{ $t('message.header.navigation.usingData.benefitsOfUsingData') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/using-data/using-data-checklist`"
                              role="button">
                      {{ $t('message.header.navigation.usingData.checklistForUsingData') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/using-data/use-cases`"
                              role="button">
                      {{ $t('message.header.navigation.usingData.useCases') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/using-data/tell-us-your-story`"
                              role="button">
                      {{ $t('message.header.navigation.usingData.tellUsYourStory') }}
                    </app-link>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item dropdown edp2-topnav-dropdown">
              <app-link id="edp2-topnav-dropdown-5"
                        class="nav-link dropdown-toggle"
                        fragment="#"
                        data-toggle="dropdown">
                {{ $t('message.header.navigation.resources.title') }}
              </app-link>
              <div class="dropdown-menu border-0 w-100 mt-0 edp2-topnav-dropdown-container"
                   aria-labelledby="edp2-topnav-dropdown-5">
                <ul class="d-flex flex-row justify-content-center px-3">
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/resources/elearning`"
                              role="button">
                      {{ $t('message.header.navigation.resources.elearning') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/resources/training-companion`"
                              role="button">
                      {{ $t('message.header.navigation.resources.trainingCompanion') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/resources/more-training-materials`"
                              role="button">
                      {{ $t('message.header.navigation.resources.moreTrainingMaterial') }}
                    </app-link>
                  </li>
                  <li class="dropdown-item p-0 mx-1">
                    <app-link class="nav-link btn rounded edp2-topnav-dropdown-button"
                              :path="`/${$i18n.locale}/resources/reports-about-open-data`"
                              role="button">
                      {{ $t('message.header.navigation.resources.reportsAboutOpenData') }}
                    </app-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
      </nav>
      <nav class="navbar navbar-expand-md w-100 edp2-topnav-mobile d-md-none d-flex justify-content-end">
        <button class="navbar-toggler rounded collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#navbarToggle"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <div class="arrow"></div>
        </button>
        <div id="navbarToggle"
             class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <app-link class="nav-link"
                        :path="`/${$i18n.locale}`">
                <i class="material-icons w-100 text-center">home</i>
              </app-link>
            </li>
            <div class="dropdown-divider"></div>
            <li class="nav-item">
              <app-link class="nav-link"
                        fragment="#">
                {{ $t('message.header.navigation.whatWeDo.title') }}
              </app-link>
              <ul class="navbar-nav ml-3">
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/what-we-do/our-activities`">
                    {{ $t('message.header.navigation.whatWeDo.ourActivities') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/dashboard`">
                    {{ $t('message.header.navigation.whatWeDo.openDataMaturity') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/what-we-do/factsheets-and-reports`">
                    {{ $t('message.header.navigation.whatWeDo.factsheetsAndReports') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/what-we-do/highlights-archive`">
                    {{ $t('message.header.navigation.whatWeDo.featuredHighlights') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/what-we-do/calendar`">
                    {{ $t('message.header.navigation.whatWeDo.calendar') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/what-we-do/articles-archive`">
                    {{ $t('message.header.navigation.whatWeDo.news') }}
                  </app-link>
                </li>
              </ul>
            </li>
            <div class="dropdown-divider"></div>
            <li class="nav-item active">
              <app-link class="nav-link"
                        fragment="#">
                {{ $t('message.header.navigation.data.title') }}
              </app-link>
              <ul class="navbar-nav ml-3">
                <li class="nav-item">
                  <app-link class="nav-link"
                            :to="{ path: 'datasets', query: Object.assign({}, { locale: $route.query.locale }) }">
                    {{ $t('message.header.navigation.data.datasets') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :to="{ path: 'catalogues', query: Object.assign({}, { locale: $route.query.locale }) }">
                  {{ $t('message.header.navigation.data.catalogues') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/mqa?locale=${$i18n.locale}`">
                    {{ $t('message.header.navigation.data.metadataQuality') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/content/filter-licenses`">
                    {{ $t('message.header.navigation.data.licensingAssistant') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/sparql-manager/${$i18n.locale}/`">
                    {{ $t('message.header.navigation.data.sparqlManager') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/catalogue-statistics/CurrentState?locale=${$i18n.locale}`">
                    {{ $t('message.header.navigation.data.statistics') }}
                  </app-link>
                </li>
              </ul>
            </li>
            <div class="dropdown-divider"></div>
            <li class="nav-item active">
              <app-link class="nav-link"
                        fragment="#">
                {{ $t('message.header.navigation.providingData.title') }}
              </app-link>
              <ul class="navbar-nav ml-3">
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/providing-data/goldbook`">
                    {{ $t('message.header.navigation.providingData.practicalGuide') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/data/#/catalogues?locale=${$i18n.locale}`">
                    {{ $t('message.header.navigation.providingData.cataloguesHarvestedByUs') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/providing-data/how-to-be-harvested-by-us`">
                    {{ $t('message.header.navigation.providingData.beHarvestedByUs') }}
                  </app-link>
                </li>
              </ul>
            </li>
            <div class="dropdown-divider"></div>
            <li class="nav-item active">
              <app-link class="nav-link"
                        fragment="#">
                {{ $t('message.header.navigation.usingData.title') }}
              </app-link>
              <ul class="navbar-nav ml-3">
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/using-data/benefits-of-open-data`">
                    {{ $t('message.header.navigation.usingData.benefitsOfUsingData') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/using-data/using-data-checklist`">
                    {{ $t('message.header.navigation.usingData.checklistForUsingData') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/using-data/use-cases`">
                    {{ $t('message.header.navigation.usingData.useCases') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/using-data/tell-us-your-story`">
                    {{ $t('message.header.navigation.usingData.tellUsYourStory') }}
                  </app-link>
                </li>
              </ul>
            </li>
            <div class="dropdown-divider"></div>
            <li class="nav-item active">
              <app-link class="nav-link"
                        fragment="#">
                {{ $t('message.header.navigation.resources.title') }}
              </app-link>
              <ul class="navbar-nav ml-3">
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/resources/elearning`">
                    {{ $t('message.header.navigation.resources.elearning') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/resources/training-companion`">
                    {{ $t('message.header.navigation.resources.trainingCompanion') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/resources/more-training-materials`">
                    {{ $t('message.header.navigation.resources.moreTrainingMaterial') }}
                  </app-link>
                </li>
                <li class="nav-item">
                  <app-link class="nav-link"
                            :path="`/${$i18n.locale}/resources/reports-about-open-data`">
                    {{ $t('message.header.navigation.resources.reportsAboutOpenData') }}
                  </app-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
// import Actions and Getters from Store Module
import { mapGetters, mapActions } from 'vuex';
/* eslint-disable */
import AppLink from './AppLink';
import LanguageSelector from './LanguageSelector';
import SearchBar from './SearchBar';
import { getTranslationFor, truncate } from '../utils/helpers';

export default {
  name: 'topnav',
  components: {
    languageSelector: LanguageSelector,
    searchBar: SearchBar,
    appLink: AppLink,
  },
  dependencies: 'authService',
  data() {
    return {
      rootURL: 'https://www.europeandataportal.eu/',
      showDatasets: false,
      showDatasetDetailsDataset: false,
      showDatasetDetailsCategories: false,
      showDatasetDetailsSimilarDatasets: false,
      showDatasetDetailsActivityStream: false,
      showCatalogues: false,
      showCatalogueName: false,
      authenticated: false,
    };
  },
  computed: {
    // import store-getters
    ...mapGetters('datasetDetails', [
      'getID',
      'getTitle',
    ]),
    ...mapGetters('catalogues', [
      'getCatalogues',
    ]),
    ...mapGetters('auth', [
      'securityAuth',
    ]),
    currentRoute() {
      return this.$store.getters.getCurrentRoute;
    },
    isAuthenticated() {
      return this.authService.isAuthenticated(this.securityAuth);
    },
    login() {
      if(this.$env.keycloak.enableLogin) {
        this.authService.init();
      }
    }

  },
  methods: {
    ...mapActions('auth', [
      'authLogout',
    ]),
    getTranslationFor,
    truncate,
    getCatalogTitle(catalogID) {
      for (const catalog of this.getCatalogues) {
        if (catalog.id === catalogID) return catalog.title;
      }
      return undefined;
    },
    logout() {
      this.$Progress.start();
      this.authService.logout(this.securityAuth, window.location.origin);
      this.authLogout();
      this.$Progress.finish();
    },
  },
  watch: {
    isAuthenticated: function() {
      this.authenticated = this.authService.isAuthenticated(this.securityAuth);
    },
    currentRoute: function() {
      this.showDatasets = this.$router.currentRoute.name === 'Datasets' && this.$route.query.showcataloguedetails !== 'true';
      this.showDatasetDetailsDataset = this.$router.currentRoute.name === 'DatasetDetailsDataset';
      this.showDatasetDetailsCategories = this.$router.currentRoute.name === 'DatasetDetailsCategories';
      this.showDatasetDetailsSimilarDatasets = this.$router.currentRoute.name === 'DatasetDetailsSimilarDatasets';
      this.showDatasetDetailsActivityStream = this.$router.currentRoute.name === 'DatasetDetailsActivityStream';
      this.showCatalogues = this.$router.currentRoute.name === 'Catalogues';
      this.showCatalogueName = this.$router.currentRoute.name === 'Datasets' && this.$route.query.showcataloguedetails === 'true';
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../node_modules/bootstrap/scss/bootstrap.scss';

  #edp2-header {
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
    .edp2-header {
      height: 90px;
      background-color: white;
      .edp2-home-link {
        &:hover {
          text-decoration: none;
        }
      }
      .subnav {
        .nav-item {
          a {
            color: #0065a2;
          }
          &:not(:last-child) a::after {
            content: "|";
            color: #0065a2;
            padding-left: 5px;
            padding-right: 5px;
          }
        }

      }
      .edp-title {
        font-size: 24px;
        color: #0065a2;
        text-transform: uppercase;
        line-height: 1.1;
        .edp-title-bottom {
          font-weight: 700;
        }
      }
      .edp-logo {
        width:  62px;
        height: 62px;
      }
    }
    .edp2-breadcrumb {
      height: 23px;
      background-color: #074A8B;
      .edp2-breadcrumb-arrow {
        color: white;
      }
      .edp2-breadcrumb-link {
        color: white;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .login{
       color: white;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
    }
    .edp2-topnav {
      background-color: #0065a2;
      height: 56px;
      .edp2-topnav-home {
        background-color: #1986DC;
        width: 54px;
        height: 56px;
        line-height: 46px;
        i {
          vertical-align: middle;
        }
      }
      .edp2-topnav-dropdown {
        position: static;
        &.show {
          .dropdown-toggle {
            background-color: #1986DC;
          }
        }
        .dropdown-toggle {
          line-height: 40px;
        }
        .edp2-topnav-dropdown-container {
          border-radius: 0;
          background-color: #1986DC;
          ul {
            li {
              .edp2-topnav-dropdown-button {
                color: white;
                background-color: #289dfa;
                &:hover {
                  background-color: #0065a2;
                  cursor: pointer;
                }
              }
              &:hover {
                background: transparent;
              }
            }
          }
        }
      }
      a {
        color: white;
      }
    }
    .edp2-topnav-mobile {
      background-color: #0065a2;
      .navbar-collapse {
        background-color: #0065a2;
      }
      button {
        color: white;
        background-color: #074a8b;
        border: 1px solid white;
        padding: 12px 10px 11px;
        .arrow {
          width: 0;
          height: 0;
          border-left: 11px solid transparent;
          border-right: 11px solid transparent;
          border-top: 11px solid #f5f5f5;
          color: white;
        }
        &.collapsed {
          .arrow {
            border-top: none;
            border-bottom: 11px solid #f5f5f5;
            box-shadow: 0 1px 0 rgba(0, .25, 0, 0);
          }
        }
      }
      .nav-item {
        ul {
          .nav-link {
            font-size: .9em;
          }
        }
        .nav-link {
          color: white;
        }
      }
      .dropdown-divider {
        border-color: #2481C4;
      }
    }
    @media (max-width: 991.98px) {
      .edp2-topnav {
        font-size: small;
        .nav-link {
          font-size: small;
        }
      }
    }
  }
</style>

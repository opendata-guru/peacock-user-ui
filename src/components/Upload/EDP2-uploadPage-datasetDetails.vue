<!-- @license Copyright 2019 Fraunhofer FOKUS
              Modifications copyright 2021-2022 Thomas Tursics
              SPDX-License-Identifier: Apache-2.0
-->

<template>
  <div class="col-12">
    <!-- DATASET -->
    <div class="row mb-3">
      <div class="col-12">
        <div class="row">
          <div class="col-1 my-auto pr-0 text-end" @click="toggleDataset()">
              <span class="arrow text-primary" v-if="!datasetVisible">
                <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'angle-down' }"></font-awesome-icon>
              </span>
            <span class="arrow text-primary" v-else>
                <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'angle-up' }"></font-awesome-icon>
              </span>
          </div>
          <div class="col-10 py-2 text-left">
            <h3 class="heading" @click="toggleDataset()">{{ $t('message.metadata.dataset') }}</h3>
          </div>
          <div class="col-10 offset-1" v-show="datasetVisible">
            <div class="input-group mb-2">
              <input class="form-control w-100"
                     name="Title"
                     type="text"
                     :placeholder="$t('message.metadata.title')"
                     :aria-label="$t('message.metadata.title')"
                     aria-describedby="title"
                     v-model="title"
                     v-validate="{required: true, regex: /^[a-zA-Z0-9 ]*$/ }">
              <br>
              <div class="alert alert-danger w-100" role="alert" v-if="errors.first('Title')">
                {{ errors.first('Title') }}
              </div>
            </div>
            <div class="input-group mb-2">
              <textarea class="form-control w-100"
                        name="Description"
                        type="text"
                        :placeholder="$t('message.metadata.description')"
                        :aria-label="$t('message.metadata.description')"
                        v-model="description"
                        v-validate="'required'"/>
              <div class="alert alert-danger w-100" role="alert" v-if="errors.first('Description')">
                {{ errors.first('Description') }}
              </div>
            </div>
            <div class="input-group mb-2">
              <input class="form-control w-100"
                     name="Keywords"
                     type="text"
                     :placeholder="$t('message.datasetFacets.facets.keywords')"
                     :aria-label="$t('message.metadata.keywords')"
                     v-model="keywords"/>
                     <!-- v-validate="'required'"/>
              <div class="alert alert-danger w-100" role="alert" v-if="errors.first('Keywords')">
                {{ errors.first('Keywords') }}
              </div> -->
            </div>

              <div class="input-group mb-2">
                <input v-if="$route.params.catalog" class="form-control w-100"
                     name="Keywords"
                     type="text"
                     :placeholder="$route.params.catalog"
                     :aria-label="$t('message.metadata.keywords')"
                     v-model="catalogue"
                     disabled/>

                <select v-else class="custom-select w-100"
                        name="Catalogue"
                        v-model="catalogue"
                        v-validate="'required'">
                  <option selected disabled>{{ $t('message.metadata.chooseCatalogue') }} ...</option>
                  <option v-for="catalog in filterDuplicate(catalogues)" :key="catalog">{{replace(catalog)}}</option>
                </select>

                <div class="alert alert-danger w-100" role="alert" v-if="errors.first('Catalogue')">
                  {{ errors.first('Catalogue') }}
                </div>
            </div>


            <div class="overflow-auto border p-3" style="height:200px">
              <h6>{{ $t('message.metadata.chooseCategory') }}:</h6>
              <div class="custom-control custom-checkbox" v-for="(category, index) of categories">
                <input type="checkbox" class="custom-control-input" :id="`category${index}`" @click="addCategory(category)">
                <label class="custom-control-label" :for="`category${index}`">{{ category }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CONTACT POINT -->
    <div class="row mb-3">
      <div class="col-12">
        <div class="row">
          <div class="col-1 my-auto pr-0 text-end" @click="toggleContactPoint()">
              <span class="arrow text-primary" v-if="!contactPointVisible">
                <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'angle-down' }"></font-awesome-icon>
              </span>
            <span class="arrow text-primary" v-else>
                <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'angle-up' }"></font-awesome-icon>
              </span>
          </div>
          <div class="col-10 py-2 text-left">
            <h3 class="heading" @click="toggleContactPoint()">{{ $t('message.metadata.contactPoints') }}</h3>
          </div>
          <div class="col-10 offset-1" v-if="contactPointVisible">
            <div class="input-group mb-2">
              <select class="custom-select w-100"
                      name="Contact Type"
                      v-model="contact.type">
                      <!-- v-validate="'required'"> -->
                <option selected disabled>{{ $t('message.metadata.chooseType') }} ...</option>
                <option>Individual</option>
                <option>Organisation</option>
              </select>
              <!-- <div class="alert alert-danger w-100" role="alert" v-if="errors.first('Contact Type')">
                {{ errors.first('Contact Type') }}
              </div> -->
            </div>
            <div class="input-group mb-2">
              <input class="form-control w-100"
                     name="Contact Name"
                     type="text"
                     :placeholder="$t('message.metadata.name')"
                     :aria-label="$t('message.metadata.name')"
                     v-model="contact.name">
                     <!-- v-validate="'required'">
              <div class="alert alert-danger w-100" role="alert" v-if="errors.first('Contact Name')">
                {{ errors.first('Contact Name') }}
              </div> -->
            </div>
            <div class="input-group mb-2">
              <input class="form-control w-100"
                     name="Contact Email"
                     type="email"
                     :placeholder="$t('message.metadata.email')"
                     :aria-label="$t('message.metadata.chooseType')"
                     v-model="contact.email"
                     v-validate="'email'">
              <div class="alert alert-danger w-100" role="alert" v-if="errors.first('Contact Email')">
                {{ errors.first('Contact Email') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PUBLISHER -->
    <div class="row mb-3">
      <div class="col-12">
        <div class="row">
          <div class="col-1 my-auto pr-0 text-end" @click="togglePublisher()">
              <span class="arrow text-primary" v-if="!publisherVisible">
                <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'angle-down' }"></font-awesome-icon>
              </span>
            <span class="arrow text-primary" v-else>
                <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'angle-up' }"></font-awesome-icon>
              </span>
          </div>
          <div class="col-10 py-2 text-left">
            <h3 class="heading" @click="togglePublisher()">{{ $t('message.metadata.publisher') }}</h3>
          </div>
          <div class="col-10 offset-1" v-if="publisherVisible">
            <div class="input-group mb-2">
              <select class="custom-select w-100"
                      name="Publisher Type"
                      v-model="publisher.type">
                      <!-- v-validate="'required'"> -->
                <option selected disabled>{{ $t('message.metadata.chooseType') }} ...</option>
                <option>Individual</option>
                <option>Organisation</option>
              </select>
              <!-- <div class="alert alert-danger w-100" role="alert" v-if="errors.first('Publisher Type')">
                {{ errors.first('Publisher Type') }}
              </div> -->
            </div>
            <div class="input-group mb-2">
              <input class="form-control w-100"
                     name="Publisher Name"
                     type="text"
                     :placeholder="$t('message.metadata.name')"
                     :aria-label="$t('message.metadata.chooseType')"
                     v-model="publisher.name">
                     <!-- v-validate="'required'">
              <div class="alert alert-danger w-100" role="alert" v-if="errors.first('Publisher Name')">
                {{ errors.first('Publisher Name') }}
              </div> -->
            </div>
            <div class="input-group mb-2">
              <input class="form-control w-100"
                     name="Publisher Homepage"
                     type="text"
                     :placeholder="$t('message.metadata.homepage')"
                     :aria-label="$t('message.metadata.homepage')"
                     v-model="publisher.homepage"
                     v-validate="{url: {require_protocol: true }}">
              <div class="alert alert-danger w-100" role="alert" v-if="errors.first('Publisher Homepage')">
                {{ errors.first('Publisher Homepage') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- PAGINATION -->
    <nav class="mt-5" aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled">
          <button class="btn page-link" tabindex="-1">{{ $t('message.pagination.previous') }}</button>
        </li>
        <li class="page-item">
          <button class="btn page-link" @click="next()">{{ $t('message.pagination.next') }}</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { decode } from '../../utils/jwt';

  export default {
    name: 'DataSetDetails',
    dependencies: 'authService',
    computed: {
      ...mapGetters('auth', [
        'securityAuth',
        'getRTPToken',
      ]),
    },
    data() {
      return {
        datasetVisible: true,
        contactPointVisible: true,
        publisherVisible: true,
        catalogues: [],
        catalogue: 'Choose a Catalogue ...',
        title: '',
        description: '',
        keywords: '',
        categories: [
          'Environment',
          'Agriculture, fisheries, forestry and food',
          'Economy and finance',
          'Education, culture and sport',
          'Energy',
          'Government and public sector',
          'Health',
          'International issues',
          'Justice, legal system and public safety',
          'Provisional data',
          'Regions and cities',
          'Population and society',
          'Science and technology',
          'Transport',
        ],
        category: [],
        contact: {
          type: 'Choose a Type ...',
          name: '',
          email: '',
        },
        publisher: {
          type: 'Choose a Type ...',
          name: '',
          homepage: '',
        },
      };
    },
    created() {
      const decoded = decode(this.getRTPToken);
      this.getCatalogs(decoded);
      // data check when create dataset from catalog
      if (this.$route.params.catalog) {
        this.catalogue = this.$route.params.catalog;
      }
      // Laguage parsing still need to be done
      // data check when edit dataset called
      // route params are
      // {
      //   id: getID,
      //   title: getTitle,
      //   description: getDescription,
      //   keywords: getKeywords,
      //   catalog: getCatalog.id,
      //   catagory: getCategories,
      //   contact_point: getContactPoints,
      //   publisher: getPublisher,
      //   distributions: getDistributions,
      // }
      if (this.$route.params.title) {
        this.title = this.$route.params.title.en;
      }
      if (this.$route.params.description) {
        this.description = this.$route.params.description.en;
      }
      // if (this.$route.params.catagory) {
      //   this.$route.params.catagory.forEach((value) => {
      //     this.category.push(value.title);
      //   });
      // }
      // multiple contact point need to be handle using foreach for now using array at 0
      if (typeof this.$route.params.contact_point !== 'undefined' && this.$route.params.contact_point.length > 0) {
        this.contact.type = this.$route.params.contact_point[0].type;
        this.contact.name = this.$route.params.contact_point[0].name;
        this.contact.email = (this.$route.params.contact_point[0].email).replace('mailto:', '');
      }
      if (this.$route.params.publisher) {
        this.publisher.type = (this.$route.params.publisher.type === '' || typeof this.$route.params.publisher.type === 'undefined') ? 'Choose a Type ...' : this.$route.params.publisher.type;
        this.publisher.name = (this.$route.params.publisher.name === '' || typeof this.$route.params.publisher.name === 'undefined') ? '' : this.$route.params.publisher.name;
        this.publisher.homepage = (this.$route.params.publisher.resource === '' || typeof this.$route.params.publisher.resource === 'undefined') ? '' : this.$route.params.publisher.resource;
        // hack fix for linked_data not mapped with search API (as per Fabian Kirstein 12/08/2019)
        if (this.$route.params.publisher.email) {
          this.publisher.homepage = (this.$route.params.publisher.email === '' || typeof this.$route.params.publisher.email === 'undefined') ? '' : this.$route.params.publisher.email;
        }
      }
      if (this.$route.params.keywords) {
        this.$route.params.keywords.forEach((keyword) => {
          if (this.keywords === '') {
            this.keywords = keyword.title;
          } else {
            this.keywords = `${this.keywords},${keyword.title}`;
          }
        });
      }
    },
    methods: {
      ...mapActions('upload', [
        'setStep',
        'addDatasetDetails',
      ]),
      addCategory(category) {
        this.category.push(category);
      },
      getToken() {
        return this.authService.getToken(this.securityAuth);
      },
      decode,
      filterDuplicate(obj) {
        return [...new Set(obj)];
      },
      replace(str) {
        return str.replace('https://europeandataportal.eu/id/catalogue/', '');
      },
      getCatalogs(jwtObj) {
        // get the allowed catalogue to create datased
        // update permission can create dataset
        jwtObj.authorization.permissions.forEach((permission) => {
          permission.scopes.forEach((scope) => {
            if (scope === 'update') {
              this.catalogues.push(permission.rsname);
            }
          });
        });
      },
      toggleDataset() {
        this.datasetVisible = !this.datasetVisible;
      },
      toggleContactPoint() {
        this.contactPointVisible = !this.contactPointVisible;
      },
      togglePublisher() {
        this.publisherVisible = !this.publisherVisible;
      },
      next() {
        // Check Values of Select Inputs
        if (this.contact.type === 'Choose a Type ...') this.contact.type = '';
        if (this.publisher.type === 'Choose a Type ...') this.publisher.type = '';
        if (this.catalogue === 'Choose a Catalogue ...') this.catalogue = '';
        // Validate
        this.$validator.validate().then((valid) => {
          if (valid) {
            // Add Dataset Details
            const dataset = {
              title: this.title.replace(/  +/g, ' '), // remove double or more space
              description: this.description,
              keywords: this.keywords === '' ? null : this.keywords.trim().split(','),
              category: this.category,
              contact: this.contact,
              publisher: this.publisher,
              catalogue: this.catalogue,
            };
            this.addDatasetDetails(dataset);
            // Navigate to Step 2
            this.setStep(2);
          } else {
            // Show all errors
            this.datasetVisible = true;
            this.contactPointVisible = true;
            this.publisherVisible = true;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .custom-select {
    -webkit-appearance: none !important;
  }
</style>

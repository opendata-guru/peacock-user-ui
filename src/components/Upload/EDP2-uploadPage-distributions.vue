<template>
  <div class="col-12">
    <!-- ERROR MESSAGE -->
    <div class="row">
      <div class="col-10 offset-1">
        <div class="alert alert-danger w-100" role="alert" v-if="error">
          {{ error }}
        </div>
      </div>
    </div>

    <!-- ADD DISTRIBUTION FORM -->
    <div class="row mb-3">
      <div class="col-1 my-auto pr-0 text-right" @click="toggleDistribution()">
            <span class="arrow text-primary" v-if="!distributionVisible">
              <i class="material-icons">keyboard_arrow_down</i>
            </span>
        <span class="arrow text-primary" v-else>
              <i class="material-icons">keyboard_arrow_up</i>
            </span>
      </div>
      <div class="col-10 py-2 text-left">
        <h3 class="heading" @click="toggleDistribution()">{{ $t('message.metadata.distribution') }}</h3>
      </div>
      <div class="col-10 offset-1" v-if="distributionVisible">
        <div class="input-group mb-2">
          <input class="form-control w-100"
                 name="Title"
                 type="text"
                 :placeholder="$t('message.metadata.title')"
                 :aria-label="$t('message.metadata.title')"
                 aria-describedby="title"
                 v-model="distribution.title"
                 v-validate="'required'">
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
                    aria-describedby="description"
                    v-model="distribution.description">
          </textarea>
          <br>
        </div>
        <div class="input-group mb-2">
          <select class="custom-select w-100"
                  name="Format"
                  v-model="distribution.format">
            <option disabled>{{ $t('message.metadata.chooseFormat') }} ...</option>
            <option selected value="">Unknown Format</option>
            <option v-for="format in formatVocabulary" :value="format">{{ format.substring(format.lastIndexOf('/') + 1) }}</option>
          </select>
        </div>
        <div class="input-group mb-2">
          <input class="form-control w-100"
                 name="Licence"
                 type="text"
                 :placeholder="$t('message.metadata.license')"
                 :aria-label="$t('message.metadata.license')"
                 aria-describedby="licence"
                 v-model="distribution.licence">
          <br>
        </div>
        <div class="input-group mb-2">
          <div class="w-100" v-if="useDownloadURL">
            <input class="form-control"
                   :class="{ 'is-invalid': errors.first('DownloadURL') }"
                   name="DownloadURL"
                   type="text"
                   :placeholder="$t('message.metadata.downloadUrl')"
                   :aria-label="$t('message.metadata.downloadUrl')"
                   aria-describedby="downloadUrl"
                   v-model="distribution.downloadUrl"
                   v-validate="{ url: { require_protocol: true }}">
            <div class="invalid-feedback" v-if="errors.first('DownloadURL')">
              {{ errors.first('DownloadURL') }}
            </div>
            <br>
          </div>
          <br>
        </div>
        <div class="custom-control custom-checkbox w-100">
          <input id="useDownloadURL" type="checkbox" class="custom-control-input" @click="useDownloadURL = !useDownloadURL">
          <label for="useDownloadURL" class="custom-control-label">
            Provide a Download URL instead of uploading a file!
          </label>
        </div>
        <button class="btn btn-primary mt-2" @click='addDistributions()'>
          {{ $t('message.metadata.addDistribution')}}
        </button>
      </div>
    </div>

    <!-- LIST OF ADDED DISTRIBUTIONS -->
    <div class="row mb-3" v-if="distributions.length > 0">
      <div class="col-12">
        <div class="row mb-5">
          <div class="col-1 my-auto pr-0 text-right" @click="toggleDistributionList()">
          <span class="arrow text-primary" v-if="!distributionListVisible">
            <i class="material-icons">keyboard_arrow_down</i>
          </span>
            <span class="arrow text-primary" v-else>
            <i class="material-icons">keyboard_arrow_up</i>
          </span>
          </div>
          <div class="col-10 py-2 text-left">
            <h3 class="heading" @click="toggleDistributionList()">{{ $t('message.metadata.distributions') }} ( {{ distributions.length }} )</h3>
          </div>
          <div class="col-12" v-for="distribution in distributions" v-if="distributionListVisible">
            <!-- DISTRIBUTION -->
            <li class="row">
              <span class="d-inline-block col-md-1 col-2 pr-md-1 pr-0 m-md-0 m-auto">
                <div class="circle float-md-right text-center text-white text-truncate"
                     :type="distribution.format.substring(distribution.format.lastIndexOf('/') + 1)"
                     :title="distribution.format.substring(distribution.format.lastIndexOf('/') + 1)">
                  <span>{{ distribution.format.substring(distribution.format.lastIndexOf('/') + 1) }}</span>
                </div>
              </span>
              <span class="col-10">
                <span class="row">
                  <span class="d-inline-block col-10">
                    <h6 class="m-0">{{ distribution.title }}</h6>
                    <span class="mt-2 d-block text-muted text-truncate">
                      <small>
                        {{ distribution.description }}
                      </small>
                    </span>
                    <small class="mt-2 d-block">
                      <span class="font-weight-bold">
                        {{ $t('message.metadata.license') }} : {{ distribution.licence }}
                      </span>
                    </small>
                  </span>
                  <span class="d-inline-block col-1">
                    <button class="btn btn-primary" data-toggle="modal" @click="editDistribution(distribution)" data-target="#updateModal">{{ $t('message.datasetDetails.edit') }}</button>
                  </span>
                  <span class="d-inline-block col-1">
                    <button class="btn btn-danger" data-toggle="modal" @click="editDistribution(distribution)" data-target="#deleteModal">{{ $t('message.datasetDetails.delete') }}</button>
                  </span>
                </span>
              </span>
            </li>
            <hr>
          </div>
        </div>
      </div>
    </div>

    <!-- UPDATE DISTRIBUTION MODAL -->
    <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true" v-if="updatingDistribution">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateModalLabel">{{distributionEdit.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="col-10 offset-1">
              <div class="input-group mb-2">
                <input class="form-control w-100"
                       name="UpdateTitle"
                       type="text"
                       :placeholder="$t('message.metadata.title')"
                       :aria-label="$t('message.metadata.title')"
                       aria-describedby="title"
                       v-model="distributionEdit.title"
                       v-validate="'required'">
                <br>
                <div class="alert alert-danger w-100" role="alert" v-if="errors.first('UpdateTitle')">
                  {{ errors.first('UpdateTitle') }}
                </div>
              </div>
              <div class="input-group mb-2">
                        <textarea class="form-control w-100"
                                  name="UpdateDescription"
                                  type="text"
                                  :placeholder="$t('message.metadata.description')"
                                  :aria-label="$t('message.metadata.description')"
                                  aria-describedby="description"
                                  v-model="distributionEdit.description">
                        </textarea>
              </div>
              <div class="input-group mb-2">
                <input class="form-control w-100"
                       name="UpdateFormat"
                       type="text"
                       :placeholder="$t('message.metadata.format')"
                       :aria-label="$t('message.metadata.format')"
                       aria-describedby="format"
                       v-model="distributionEdit.format">
              </div>
              <div class="input-group mb-2">
                <input class="form-control w-100"
                       name="UpdateLicence"
                       type="text"
                       :placeholder="$t('message.metadata.license')"
                       :aria-label="$t('message.metadata.license')"
                       aria-describedby="licence"
                       v-model="distributionEdit.licence">
              </div>
              <div class="input-group mb-2">
                <input class="form-control w-100"
                       name="UpdateDownloadURL"
                       type="text"
                       :placeholder="$t('message.metadata.downloadUrl')"
                       :aria-label="$t('message.metadata.downloadUrl')"
                       aria-describedby="downloadUrl"
                       v-model="distributionEdit.downloadUrl"
                       v-validate="{ url: { require_protocol: true }}">
                <div class="invalid-feedback" v-if="errors.first('UpdateDownloadURL')">
                  {{ errors.first('UpdateDownloadURL') }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" data-dismiss="modal" class="btn btn-primary" @click="updateDistribution(distributionEdit)">Update</button>
          </div>
        </div>
      </div>
    </div>

    <!-- DELETE DISTRIBUTION MODAL -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Are you sure you want to delete this item?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div v-if="error" class="modal-body">
            <div class="alert alert-danger w-100" role="alert">
              {{ error }}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
            <button type="button" @click="deleteDistribution(distributionEdit)" data-dismiss="modal" class="btn btn-primary">Yes</button>
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
  /* eslint-disable no-console, quotes */
  import { mapActions, mapGetters } from 'vuex';
  import { normalize } from '../../utils/helpers';
  import fileTypes from '../../../static/MDR_fileTypes.json';

  export default {
    name: 'Distribution',
    dependencies: ['uploadService', 'authService'],
    computed: {
      ...mapGetters('auth', [
        'securityAuth',
        'getRTPToken',
      ]),
      ...mapGetters('upload', [
        'getTitle',
        'getDescription',
        'getKeywords',
        'getCategory',
        'getContactInfo',
        'getPublisherInfo',
        'getCatalogue',
      ]),
      formatVocabulary() {
        return fileTypes['@graph'].map(fileType => fileType['@id']);
      },
      useOnlyDownloadURL() {
        let onlyDownloadURLsUsed = true;
        this.distributions.forEach((dist) => {
          // Return false if there exists a distribution without downloadUrl
          if (!dist.downloadUrl) onlyDownloadURLsUsed = false;
        });
        // Return true if all downloadUrls are set
        return onlyDownloadURLsUsed;
      },
      updatingDistribution() {
        return document.getElementById('updateModal')
          ? document.getElementById('updateModal').classList.contains('show')
          : false;
      },
    },
    data() {
      return {
        error: '',
        useDownloadURL: false,
        distributionVisible: true,
        distributionListVisible: false,
        distributions: [],
        distribution: {
          title: '',
          description: '',
          format: 'Choose a Format ...',
          licence: '',
          downloadUrl: '',
        },
        distributionEdit: {
          oldTitle: '',
          title: '',
          description: '',
          format: 'Choose a Format ...',
          licence: '',
        },
      };
    },
    created() {
      // TODO: language translation has to be handled for now only EN is used
      if (typeof this.$route.params.distributions !== 'undefined' && this.$route.params.distributions.length > 0) {
        this.$route.params.distributions.forEach((elements) => {
          console.log('elements : ' + JSON.stringify(elements)); // eslint-disable-line
          const distribution = {
            title: elements.title.en,
            description: elements.description.en,
            format: elements.format.title,
            licence: elements.licence.title,
          };
          this.distributions.push(distribution);
        });
      }
    },
    methods: {
      ...mapActions('upload', [
        'setStep',
        'addDistribution',
        'addApiUploadData',
      ]),
      normalize,
      editDistribution(distribution) {
        this.distributionEdit.oldTitle = distribution.title;
        this.distributionEdit.title = distribution.title;
        this.distributionEdit.description = distribution.description;
        this.distributionEdit.format = distribution.format;
        this.distributionEdit.licence = distribution.licence;
        this.distributionEdit.downloadUrl = distribution.downloadUrl;
      },
      deleteDistribution(distribution) {
        const index = this.distributions.findIndex(dist => dist.title === distribution.title);
        if (index !== undefined) {
          this.distributions.splice(index, 1);
        }
      },
      /* eslint-disable */
      updateDistribution(distribution) {
       /* eslint-disable no-param-reassign */
        this.distributions.forEach((element, index) => {
          if (element.title === distribution.oldTitle) {
            element.title = distribution.title;
            element.description = distribution.description;
            element.format = distribution.format;
            element.licence = distribution.licence;
            element.downloadUrl = distribution.downloadUrl;
          }
        });
      },
      toggleDistribution() {
        this.distributionVisible = !this.distributionVisible;
      },
      toggleDistributionList() {
        this.distributionListVisible = !this.distributionListVisible;
      },
      formatDate(date) {
        return `${date.getFullYear()}-${this.makeTwoDigit((date.getMonth() + 1))}-`
                + `${this.makeTwoDigit(date.getDate())}T${this.makeTwoDigit(date.getHours())}:`
                + `${this.makeTwoDigit(date.getMinutes())}:${this.makeTwoDigit(date.getSeconds())}`;
      },
      makeTwoDigit(obj) {
        if (obj.toString().length === 1) {
          return `0${obj.toString()}`;
        }
        return obj.toString();
      },
      themeMapping(categories) {
        const theme = [];
        categories.forEach((category) => {
          if (category === 'Environment') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/ENVI' });
          }
          if (category === 'Agriculture, fisheries, forestry and food') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/AGRI' });
          }
          if (category === 'Economy and finance') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/ECON' });
          }
          if (category === 'Education, culture and sport') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/EDUC' });
          }
          if (category === 'Energy') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/ENER' });
          }
          if (category === 'Government and public sector') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/GOVE' });
          }
          if (category === 'Health') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/HEAL' });
          }
          if (category === 'International issues') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/INTR' });
          }
          if (category === 'Justice, legal system and public safety') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/JUST' });
          }
          if (category === 'Provisional data') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/OP_DATPRO' });
          }
          if (category === 'Regions and cities') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/REGI' });
          }
          if (category === 'Population and society') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/SOCI' });
          }
          if (category === 'Science and technology') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/TECH' });
          }
          if (category === 'Transport') {
            theme.push({ '@id': 'http://publications.europa.eu/resource/authority/data-theme/TRAN' });
          }
        });
        return theme;
      },
      addDistributions() {
        this.$validator.validate().then((valid) => {
          if (valid) {
            // Add Distribution
            const distribution = {
              title: this.distribution.title,
              description: this.distribution.description,
              format: this.distribution.format,
              licence: this.distribution.licence,
              downloadUrl: this.distribution.downloadUrl,
            };
            this.distributions.push(distribution);
            this.addDistribution(distribution);
            // Show Distributions List
            this.distributionListVisible = true;
            // Empty fields for the next input
            this.distribution.title = '';
            this.distribution.description = '';
            this.distribution.format = '';
            this.distribution.licence = '';
            this.distribution.downloadUrl = '';
            this.$validator.reset();
          } else alert('NOT VALID');
        });
      },
      reverseString(str) {
        return str.split("").reverse().join("");
      },
      next() {
        /* eslint-disable */
         const rdf =  {
              "@context": {
                "dc": "http://purl.org/dc/elements/1.1/",
                "dcat": "http://www.w3.org/ns/dcat#",
                "dct": "http://purl.org/dc/terms/",
                "dcterms": "http://purl.org/dc/terms/",
                "edp": "https://europeandataportal.eu/voc#",
                "foaf": "http://xmlns.com/foaf/0.1/",
                "locn": "http://www.w3.org/ns/locn#",
                "owl": "http://www.w3.org/2002/07/owl#",
                "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
                "schema": "http://schema.org/",
                "skos": "http://www.w3.org/2004/02/skos/core#",
                "time": "http://www.w3.org/2006/time",
                "vcard": "http://www.w3.org/2006/vcard/ns#",
                "xsd": "http://www.w3.org/2001/XMLSchema#"
              },
              "@graph": [
                {
                  "@id": "https://test.de/dataset111",
                  "@type": "dcat:Dataset",
                  "dcat:distribution": [
                  ],
                  "dcterms:description": this.getDescription,
                  "dcterms:issued": {
                    "@type": "xsd:dateTime",
                    "@value": this.formatDate(new Date()),
                  },
                  "dcterms:language": {
                    "@id": "http://publications.europa.eu/resource/authority/language/ENG"
                  },
                  "dcterms:modified": {
                    "@type": "xsd:dateTime",
                    "@value": this.formatDate(new Date())
                  },
                  "dcterms:title": this.getTitle
                }
              ]
            };
            const token = this.authService.getToken(this.securityAuth);

            //check if distribution exist or not
            if (Array.isArray(this.distributions) && this.distributions.length) {
              let tempresourceCount = 1;
                this.distributions.forEach(distribution => {
                  let dist = {
                            "@id": "https://test.de/dataset111/resource/"+tempresourceCount,
                            "@type": "dcat:Distribution",
                            "dcterms:license": distribution.licence,
                            "dcterms:description": distribution.description,
                            "dcterms:format": { "@id": distribution.format },
                            "dcterms:title": distribution.title,
                            "dcat:accessURL": { "@id": distribution.downloadUrl },
                          };
                    let id = {
                            "@id": "https://test.de/dataset111/resource/"+tempresourceCount
                          };
                  rdf["@graph"].push(dist);
                  rdf["@graph"][0]["dcat:distribution"].push(id);
                  tempresourceCount++;
              });

              //adding keywords in RDF
              if (Array.isArray(this.getKeywords) && this.getKeywords.length > 0 && this.getKeywords[0] != "") {
                rdf["@graph"][0]["dcat:keyword"] = this.getKeywords;
              }

              //adding contact point in RDF
              if (this.getContactInfo.type != '' && this.getContactInfo.name != '' && this.getContactInfo.email != '') {
                const contactPoint = {
                  "@type" : `vcard:${this.getContactInfo.type}`,
                  "vcard:fn": this.getContactInfo.name,
                  "vcard:hasEmail": {
                    "@id": `mailto:${this.getContactInfo.email}`
                  }
                }
                rdf["@graph"][0]["dcat:contactPoint"] = contactPoint;
              }

              //adding publisher in RDF
              if (this.getPublisherInfo.name != '' && this.getPublisherInfo.type != '' && this.getPublisherInfo.homepage != '') {
                const publisherInfo = {
                  "@type": `http://xmlns.com/foaf/0.1/${this.getPublisherInfo.type}`,
                  "foaf:homepage":
                  {
                    "@id": this.getPublisherInfo.homepage,
                    "@type": "@id"
                  },
                  "foaf:name": this.getPublisherInfo.name
                };
                rdf["@graph"][0]["dct:publisher"] = publisherInfo;
              }

              //adding the categories in RDF
            if (Array.isArray(this.getCategory) && this.getCategory.length) {
              rdf["@graph"][0]["dcat:theme"] = this.themeMapping(this.getCategory);
            }
            // upload metadata to api
              let datasetTitle = (this.getTitle.toLowerCase()).replace(/[^a-zA-Z0-9]/g,'-');
              this.$Progress.start();
              console.log('RDF is: ' + JSON.stringify(rdf)); // eslint-disable-line
              this.authService.refreshToken(this.securityAuth).then((token) => {
                this.authService.getRTPToken(token).then((rtpToken) => {

                  // check if the route param has mandatory field Title, which comes only after clicking EDIT button
                  // when edit dataset, first delete dataset then create again (as per fabian (06/09/2019))
                  if (this.$route.params.title) {
                    // delete and create implementation need to be discussed
                    // normalizing dataset ID (as per torben jastrow 17/07/2019)
                    let datasetId = this.$route.params.title.en.replace(/\s+/g, '-').toLowerCase();
                    datasetId = this.normalize(datasetId);
                    this.uploadService.deleteDistribution(datasetId, this.getCatalogue, rtpToken.data.access_token).then((res) => {
                      return res;
                    }).then((res) => {
                      // check if deleted successfully
                      if(res.status === 200) {
                        //create a new dataset
                        this.uploadService.upload(datasetTitle, this.getCatalogue, rdf, rtpToken.data.access_token, !this.useOnlyDownloadURL).then((result) => {
                        this.$Progress.finish();
                        this.addApiUploadData(result.data);
                        // Finish upload and go to review page, if no files have to be uploaded
                        this.setStep(this.useOnlyDownloadURL ? 4 : 3);
                        }).catch((err) => {
                          this.error = `error : ${err.response.status} ${err.response.statusText}`;
                          this.$Progress.fail();
                        });
                      } else {
                        // error if not delete
                        this.error = `error : ${res.status} ${res.statusText}`;
                        this.$Progress.fail();
                      }
                    })
                  } else {
                    // create dataset
                    this.uploadService.upload(datasetTitle, this.getCatalogue, rdf, rtpToken.data.access_token, !this.useOnlyDownloadURL).then((result) => {
                    this.$Progress.finish();
                    this.addApiUploadData(result.data);
                    // Finish upload and go to review page, if no files have to be uploaded
                    this.setStep(this.useOnlyDownloadURL ? 4 : 3);
                    }).catch((err) => {
                      this.error = `error : ${err.response.status} ${err.response.statusText}`;
                      this.$Progress.fail();
                  });
                  }
                });
              });
            } else {
                this.error = `error : Please add at least one distribution.`;
            }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .custom-select {
    -webkit-appearance: none !important;
  }
</style>

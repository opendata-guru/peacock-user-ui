# Customize Styles

You can customize the style of apertos-frontend by reassigning Sass-variable values defined and used by the [Bulma](http://bulma.io/documentation/overview/start/) design framework and apertos-frontend.

##### 1. See the provided [_custom_bulma_variables.sass](https://gitlab.fokus.fraunhofer.de/apertos/apertos-frontend/blob/develop/guides/styles/_custom_bulma_variables.sass) and [_custom_vars.sass](https://gitlab.fokus.fraunhofer.de/apertos/apertos-frontend/blob/develop/guides/styles/_custom_vars.sass) sample files and copy the content into your ```custom_bulma_variables.sass``` and ```custom_vars.sass``` files. 

If you did not create  _custom_vars.sass_ and _custom_bulma_variables.sass_ already, create them.

These mentioned files above contain the default values used by apertos-frontend. Each variable can be reassigend to change the related styles.


##### 2. Ensure the files names are _custom_vars.sass_ and _custom_bulma_variables.sass_ and your projects filestructure looks like this
myProject<br />
|-- apertos-frontend<br />
|-- myAdapters<br />
|-- glue-config.js<br />
|-- custom_vars.sass<br />
`-- custom_bulma_variables.sass<br />

.. Viaduct-UI documentation master file, created by
   sphinx-quickstart on Tue Apr 24 15:05:53 2018.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Viaduct-UI
==========

.. toctree::
   :maxdepth: 2
   :caption: Contents:

Project Setup
=============

Install `Node.js and NPM <https://nodejs.org/en/>`_ on your system

Create a directory for your project::

$ mkdir myApp

Clone or download the `Viaduct-UI repository <https://gitlab.fokus.fraunhofer.de/viaduct/viaduct-ui>`_::

  $ cd myApp
  $ git clone git@gitlab.fokus.fraunhofer.de:viaduct/viaduct-ui.git

Install NPM packages::

  $ cd viaduct-ui
  $ npm install

Implement a Viaduct-UI-Adapter or use an existing one. It's recommended to store it on the root of your project directory.

| Prepare your configuration files.
| Go to ``viaduct-ui/user-config`` and duplicate ``glue-config.sample.js``, ``custom_theme.sample.scss`` and ``i18n/i18n.sample.json``.
| Remove `.sample` from their name and ensure a ``glue-config.js``, a ``custom_theme.scss`` and a ``i18n/i18n.json file`` exists on the same level as the sample files.

::

  $ cd viaduct-ui/user-config
  $ cp glue-config.sample.js glue-config.js
  $ cp custom_theme.sample.scss custom_theme.scss
  $ cp i18n/i18n.sample.json i18n/i18n.json

| Open ``glue-config.js`` and change the adapter import paths to the relative location of the adapters you want to use.
| For example if you stored them in ``myApp/myAdapters/src/`` the import paths should look like this

::

  import datasetService from '../../myAdapters/src/datasets';
  import distributionService from '../../myAdapters/src/distributions';
  import datastoreService from '../../myAdapters/src/datastore';
  import mapService from '../../myAdapters/src/map';

Configure paths to your Viaduct-UI configuration files by copying the ``viaduct-ui/config/user-configs.sample.js`` file and renaming it to ``user-configs.js``.
Unless you want to change the default location of your configuration files there's no need to touch the file.::

  $ cd viaduct-ui/config
  $ cp user-configs.sample.js user-configs.js

Add your custom imprint page to the core application. Go to ``viaduct-ui/src/components/user``, copy ``userImprint.sample.vue`` and rename it to ``userImprint.vue``.
Open ``userImprint.vue`` and implement your Imprint page. Be sure that the ``userImprint.vue`` file exists before building the app.

::

  $ cd viaduct-ui/src/components/user
  $ cp userImprint.sample.js userImprint.js

Build for development
=====================

Open a terminal in the ``viaduct-ui`` directory and run::

  $ npm run dev

| This will start a local webserver on ``port 8080``.
| Open a browser and visit ``http://localhost:8080`` to see the app.
| Hot Module Replacement is supported. The page will update automatically when files are changed.

Build for Production
=====================

Open a terminal in the ``viaduct-ui`` directory and run::

  $ npm run build

| This will optimize files for production and store the bundle in ``viaduct-ui/dist``
| Deploy the contents of ``viaduct-ui/dist`` on your webserver.
..
  Indices and tables
  ==================

  * :ref:`genindex`
  * :ref:`modindex`
  * :ref:`search`

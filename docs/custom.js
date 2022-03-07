CONFIG_APP_TITLE = 'Demo Data Portal';
CONFIG_APP_HEADER_LOGO_TEXT = CONFIG_APP_TITLE;
CONFIG_APP_AUTH_SERVICE = 'zero';
CONFIG_APP_ROUTER_REDIRECT_ROOT_TO = 'Welcome';

CONFIG_APP_ROUTER_BASE = '/peacock-user-ui/';
CONFIG_APP_ROUTER_LIB_BASE = 'https://unpkg.com/peacock-user-ui@latest/dist/';

CONFIG_APP_HEADER_NAV_1_URL = 'https://opendata-guru.github.io/peacock-user-ui/european.html';
CONFIG_APP_HEADER_NAV_1_TITLE = 'European data';
CONFIG_APP_HEADER_NAV_2_URL = 'https://opendata-guru.github.io/peacock-user-ui/govdata.html';
CONFIG_APP_HEADER_NAV_2_TITLE = 'govdata';

CONFIG_APP_ROUTER_ROUTE_1_NAME = 'Welcome';
CONFIG_APP_ROUTER_ROUTE_1_PATH = '/index.html';
CONFIG_APP_ROUTER_ROUTE_1_FILE = '/peacock-user-ui/page-welcome.html';
CONFIG_APP_ROUTER_ROUTE_1_REQUIRES_AUTH = false;

CONFIG_APP_ROUTER_ROUTE_2_NAME = 'european';
CONFIG_APP_ROUTER_ROUTE_2_PATH = '/european.html';
CONFIG_APP_ROUTER_ROUTE_2_COMPONENT = 'Datasets';
CONFIG_APP_ROUTER_ROUTE_2_REQUIRES_AUTH = false;

CONFIG_APP_ROUTER_ROUTE_3_NAME = 'govdata';
CONFIG_APP_ROUTER_ROUTE_3_PATH = '/govdata.html';
CONFIG_APP_ROUTER_ROUTE_3_COMPONENT = 'Datasets';
CONFIG_APP_ROUTER_ROUTE_3_REQUIRES_AUTH = false;

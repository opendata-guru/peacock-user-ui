/**
 * @author Dennis Ritter
 * @created 12.12.2017
 * @description File Type visualization processing.
 */

const fileTypes = {
  getFileTypeColor: (type) => {
    switch (type.toLowerCase()) {
    case 'csv':
    case 'xls':
    case 'xlsx':
      return { 'is-success': true };
    case 'html':
    case 'xml':
      return { 'is-link': true };
    case 'json':
    case 'json-stat':
      return { 'is-info': true };
    case 'img':
    case 'png':
    case 'svg':
    case 'jpg':
    case 'jpeg':
      return { 'is-warning': true };
    case 'pdf':
      return { 'is-danger': true };
    default:
      return { 'is-dark': true };
    }
  },
};
export default fileTypes;

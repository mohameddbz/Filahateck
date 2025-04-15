// src/utils/api/getRoute.js
export const getApiUrl = (indice) => {
  switch (indice) {
    case '1':
      return 'http://localhost:5000/api/images/imageNdwi';
    case '2':
      return 'http://localhost:5000/api/images/imageNdvi';
    case '3':
      return 'http://localhost:5000/api/images/imageNdre';
    case '4':
      return 'http://localhost:5000/api/images/imageNdmi';
    case '5':
      return 'http://localhost:5000/api/images/imageMsavi';
    default:
      return '';
  }
};

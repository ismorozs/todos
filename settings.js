const path = require('path');

const DEFAULT_pageNum = 1;
const DEFAULT_sortField = 'id';
const DEFAULT_sortDirection = 'asc';

const ALLOWED_IMAGE_EXTENSIONS = ['jpeg', 'jpg', 'png'];

const ALLOWED_IMAGE_TYPES = ALLOWED_IMAGE_EXTENSIONS.map((ext) => 'image/' + ext);
const ALLOWED_IMAGE_EXTENSIONS_REGEXP =  new RegExp( "\\.(" + ALLOWED_IMAGE_EXTENSIONS.join('|') + ")$" );

const IMAGES_FOLDER = '/images/';

module.exports = {
  ITEMS_PER_PAGE: 3,
  URL_PATH_PROPS: ['pageNum', 'sortField', 'sortDirection'],
  DEFAULT_pageNum,
  DEFAULT_sortField,
  DEFAULT_sortDirection,
  DEFAULT_ROUTE: `/${DEFAULT_pageNum}/${DEFAULT_sortField}/desc`,
  RANDOM_IMAGE_URL: 'https://picsum.photos/150/150?random=',
  ALLOWED_IMAGE_TYPES,
  ALLOWED_IMAGE_EXTENSIONS_REGEXP,
  IMAGES_FOLDER,
  ABS_IMAGES_FOLDER: path.resolve(__dirname, 'dist') + IMAGES_FOLDER,
  DEFAULT_PORT: 3000,
  DEFAULT_VERSION_NUMBER: 0,
  DEFAULT_GENERATED_TODOS_NUMBER: 100,
};

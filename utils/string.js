const vnA = /á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi;
const vnE = /é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi;
const vnI = /i|í|ì|ỉ|ĩ|ị/gi;
const vnO = /ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi;
const vnU = /ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi;
const vnY = /ý|ỳ|ỷ|ỹ|ỵ/gi;
const vnD = /đ/gi;
const spaces = /\s+/g;
const nonWordChars = /[^\w-]+/g;
const multipleHyphens = /--+/g;
const startingHyphens = /^-+/;
const endingHyphens = /-+$/;

const removeVietnameseAccents = str => str
  .replace(vnA, 'a')
  .replace(vnE, 'e')
  .replace(vnI, 'i')
  .replace(vnO, 'o')
  .replace(vnU, 'u')
  .replace(vnY, 'y')
  .replace(vnD, 'd');

const slugify = str => removeVietnameseAccents(str.toString().toLowerCase())
  .replace(spaces, '-')
  .replace(nonWordChars, '')
  .replace(multipleHyphens, '-')
  .replace(startingHyphens, '')
  .replace(endingHyphens, '');

module.exports = {
  removeVietnameseAccents,
  slugify,
};

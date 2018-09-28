const a_VN = /á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi;
const e_VN = /é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi;
const i_VN = /i|í|ì|ỉ|ĩ|ị/gi;
const o_VN = /ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi;
const u_VN = /ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi;
const y_VN = /ý|ỳ|ỷ|ỹ|ỵ/gi;
const d_VN = /đ/gi;
const spaces = /\s+/g;
const nonWordChars = /[^\w\-]+/g;
const multipleHyphens = /\-\-+/g;
const startingHyphens = /^-+/;
const endingHyphens = /-+$/;

const removeVietnameseAccents = (str) => {
    return str.replace(a_VN, 'a')
        .replace(e_VN, 'e')
        .replace(i_VN, 'i')
        .replace(o_VN, 'o')
        .replace(u_VN, 'u')
        .replace(y_VN, 'y')
        .replace(d_VN, 'd');
};

const slugify = (str) => {
    return removeVietnameseAccents(str.toString().toLowerCase())
        .replace(spaces, '-')
        .replace(nonWordChars, '')
        .replace(multipleHyphens, '-')
        .replace(startingHyphens, '')
        .replace(endingHyphens, '');
};

module.exports = {
    removeVietnameseAccents,
    slugify
};

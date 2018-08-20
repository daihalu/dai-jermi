exports.createKey = (query) => {
    const prefix = 'posts';
    const conditions = query.author + '-' + query.category + '-'
                     + query._updatedDate + '-' + query._approved;
    const projection = query.fields ? query.fields.split(',').sort().join() : '';
    const sort = query.sort ? query.sort.split(',').sort().join() : '';
    const pagination = query.page + '-' + query.pageSize;
    return `${prefix}:${conditions}:${projection}:${sort}:${pagination}`;
};

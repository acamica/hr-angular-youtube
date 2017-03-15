module.exports = function (stream) {
    return new Promise(function (resolve, reject) {
        let data;
        stream.on('data', d => data = d);
        stream.on('end', () => resolve(data));
        stream.on('error', reject);
    });
};

const URL = 'https://api.douban.com';
let Ajax = {
    get: function(opt) {
        $.ajax({
            type: 'get',
            url: URL+opt.url,
            data: opt.data,
            dataType: 'jsonp',
            success: opt.success
        })
    },
    post: function() {
        $.ajax({
            type: 'post',
            url: URL+opt.url,
            data: opt.data,
            dataType: 'jsonp',
            success: opt.success
        })
    }
}
module.exports = Ajax;
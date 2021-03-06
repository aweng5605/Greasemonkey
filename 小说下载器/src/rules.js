const rules = new Map([
    ["www.yruan.com", {
        bookname() { return document.querySelector('#info > h1:nth-child(1)').innerText.trim() },
        author() { return document.querySelector('#info > p:nth-child(2)').innerText.replace(/作\s+者:/, '').trim() },
        intro() { return convertDomNode(document.querySelector('#intro > p'))[0] },
        linkList() { return document.querySelectorAll('div.box_con div#list dl dd a') },
        coverUrl() { return document.querySelector('#fmimg > img').src },
        chapterName: function(doc) { return doc.querySelector('.bookname > h1:nth-child(1)').innerText.trim() },
        content: function(doc) { return doc.querySelector('#content') },
    }],
    ["www.jingcaiyuedu.com", {
        bookname() { return document.querySelector('div.row.text-center.mb10 > h1:nth-child(1)').innerText.trim() },
        author() { return document.querySelector('div.row.text-center.mb10 a[href^="/novel/"]').innerText.trim() },
        intro: async() => {
            const indexUrl = document.location.href.replace(/\/list.html$/, '.html');
            return (crossPage(indexUrl, "convertDomNode(doc.querySelector('#bookIntro'))[0]"))
        },
        linkList() { return document.querySelectorAll('dd.col-md-4 > a') },
        coverUrl: async() => {
            const indexUrl = document.location.href.replace(/\/list.html$/, '.html');
            return (crossPage(indexUrl, "doc.querySelector('.panel-body img').getAttribute('data-original')"))
        },
        chapterName: function(doc) { return doc.querySelector('h1.readTitle').innerText.trim() },
        content: function(doc) {
            let c = doc.querySelector('#htmlContent');
            let ad = c.querySelector('p:nth-child(1)');
            if (ad && ad.innerText.includes('精彩小说网')) { ad.remove() }
            return c
        },
    }],
    ["www.shuquge.com", {
        bookname() { return document.querySelector('.info > h2').innerText.trim() },
        author() { return document.querySelector('.small > span:nth-child(1)').innerText.replace(/作者：/, '').trim() },
        intro() {
            let iNode = document.querySelector('.intro');
            iNode.innerHTML = iNode.innerHTML.replace(/推荐地址：http:\/\/www.shuquge.com\/txt\/\d+\/index\.html/, '');
            return convertDomNode(iNode)[0];
        },
        linkList() { return includeLatestChapter('.listmain > dl:nth-child(1)') },
        coverUrl() { return document.querySelector('.info > .cover > img').src },
        chapterName: function(doc) { return doc.querySelector('.content > h1:nth-child(1)').innerText.trim() },
        content: function(doc) {
            let content = doc.querySelector('#content');
            content.innerHTML = content.innerHTML.replace('请记住本书首发域名：www.shuquge.com。书趣阁_笔趣阁手机版阅读网址：m.shuquge.com', '').replace(/http:\/\/www.shuquge.com\/txt\/\d+\/\d+\.html/, '');
            return content
        },
    }],
    ["www.dingdiann.com", {
        bookname() { return document.querySelector('#info > h1:nth-child(1)').innerText.trim() },
        author() { return document.querySelector('#info > p:nth-child(2)').innerText.replace(/作\s+者：/, '').trim() },
        intro() { return convertDomNode(document.querySelector('#intro'))[0] },
        linkList() { return includeLatestChapter('#list > dl') },
        coverUrl() { return document.querySelector('#fmimg > img').src },
        chapterName: function(doc) { return doc.querySelector('.bookname > h1:nth-child(1)').innerText.trim() },
        content: function(doc) {
            let content = doc.querySelector('#content');
            let ad = '<div align="center"><a href="javascript:postError();" style="text-align:center;color:red;">章节错误,点此举报(免注册)</a>,举报后维护人员会在两分钟内校正章节内容,请耐心等待,并刷新页面。</div>';
            content.innerHTML = content.innerHTML.replace(ad, '').replace(/http:\/\/www.shuquge.com\/txt\/\d+\/\d+\.html/, '');
            return content
        },
    }],
    ["www.fpzw.com", {
        bookname() { return document.querySelector('#title > h1:nth-child(1)').innerText.trim() },
        author() { return document.querySelector('.author > a:nth-child(1)').innerText.trim() },
        intro: async() => {
            const indexUrl = document.location.href.replace(/xiaoshuo\/\d+\//, '');
            const charset = 'GBK';
            return (crossPage(indexUrl, "convertDomNode(doc.querySelector('.wright .Text'))[0]", charset))
        },
        linkList() { return includeLatestChapter('.book') },
        coverUrl: async() => {
            const indexUrl = document.location.href.replace(/xiaoshuo\/\d+\//, '');
            const charset = 'GBK';
            return (crossPage(indexUrl, "doc.querySelector('div.bortable.wleft > img').src", charset))
        },
        chapterName: function(doc) { return doc.querySelector('h2').innerText.trim() },
        content: function(doc) {
            let content = doc.querySelector('.Text');
            rm('.Text > a:nth-child(1)', false, content);
            rm('.Text > font[color="#F00"]', false, content);
            rm('strong.top_book', false, content);
            return content
        },
        charset: 'GBK',
    }],
    ["www.hetushu.com", {
        bookname() { return document.querySelector('.book_info > h2').innerText.trim() },
        author() { return document.querySelector('.book_info > div:nth-child(3) > a:nth-child(1)').innerText.trim() },
        intro() { return convertDomNode(document.querySelector('.intro'))[0] },
        linkList() { return document.querySelectorAll('#dir dd a') },
        coverUrl() { return document.querySelector('.book_info > img').src },
        chapterName: function(doc) { return doc.querySelector('#content .h2').innerText.trim() },
        content: function(doc) {
            let content = doc.querySelector('#content');
            rm('h2', true, content);
            return content
        },
    }],
    ["www.biquwo.org", {
        bookname() { return document.querySelector('#info > h1').innerText.trim() },
        author() { return document.querySelector('#info > p:nth-child(2)').innerText.replace(/作\s+者：/, '').trim() },
        intro() { return convertDomNode(document.querySelector('#intro'))[0] },
        linkList() { return includeLatestChapter('#list > dl:nth-child(1)') },
        coverUrl() { return document.querySelector('#fmimg > img').src },
        chapterName: function(doc) { return doc.querySelector('.bookname > h1:nth-child(1)').innerText.trim() },
        content: function(doc) { return doc.querySelector('#content') },
    }],
    ["www.xkzw.org", {
        bookname() { return document.querySelector('#info > h1').innerText.trim() },
        author() { return document.querySelector('#info > p:nth-child(2)').innerText.replace(/作\s+者：/, '').trim() },
        intro() { return convertDomNode(document.querySelector('#intro'))[0] },
        linkList() {
            let showmore = document.querySelector('#showMore a');
            let showmoreJS = showmore.href.replace('javascript:', '');
            if (!showmore.innerText.includes('点击关闭')) {
                eval(showmoreJS);
            }
            return document.querySelectorAll('.list dd > a')
        },
        coverUrl() { return document.querySelector('#fmimg > img').src },
        chapterName: function(doc) { return doc.querySelector('.bookname > h1:nth-child(1)').innerText.trim() },
        content: async function(doc) {
            const CryptoJS = await loadCryptoJs();
            runEval(CryptoJS);
            return doc.querySelector('#content')

            function runEval(CryptoJS) {
                // 以下部分来自 http://www.xkzw.org/js/c.js 中的去除混淆后的解密代码
                // 本人将原代码中 document 修改为 doc
                function gettt1(str, keyStr, ivStr) { var key = CryptoJS.enc.Utf8.parse(keyStr); var iv = CryptoJS.enc.Utf8.parse(ivStr); var encryptedHexStr = CryptoJS.enc.Hex.parse(str); var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr); var decrypt = CryptoJS.DES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }); var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8); return decryptedStr.toString() };

                function gettt2(str, keyStr, ivStr) { var key = CryptoJS.enc.Utf8.parse(keyStr); var iv = CryptoJS.enc.Utf8.parse(ivStr); var encryptedHexStr = CryptoJS.enc.Hex.parse(str); var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr); var decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }); var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8); return decryptedStr.toString() };

                function gettt3(str, keyStr, ivStr) { var key = CryptoJS.enc.Utf8.parse(keyStr); var iv = CryptoJS.enc.Utf8.parse(ivStr); var encryptedHexStr = CryptoJS.enc.Hex.parse(str); var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr); var decrypt = CryptoJS.RC4.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }); var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8); return decryptedStr.toString() };

                function getttn(str, keyStr, ivStr) { var key = CryptoJS.enc.Utf8.parse(keyStr); var iv = CryptoJS.enc.Utf8.parse(ivStr); var encryptedHexStr = CryptoJS.enc.Hex.parse(str); var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr); var decrypt = CryptoJS.TripleDES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }); var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8); return decryptedStr.toString() };

                function showttt1(doc) {
                    var obj = doc.getElementById("other");
                    var objTips = doc.getElementById("contenttips");
                    if (obj) {
                        var content = obj.innerHTML.trim();
                        var type = parseInt(content.substring(0, 1));
                        var key;
                        var iv;
                        if (type == 1) {
                            key = content.substring(1, 9);
                            iv = content.substring(9, 17);
                            content = content.substring(17);
                            obj.innerHTML = gettt1(content, key, iv);
                            obj.style.display = "block";
                            if (objTips) { objTips.style.display = "none" }
                        } else if (type == 2) {
                            key = content.substring(1, 33);
                            iv = content.substring(33, 49);
                            content = content.substring(49);
                            obj.innerHTML = gettt2(content, key, iv);
                            obj.style.display = "block";
                            if (objTips) { objTips.style.display = "none" }
                        } else if (type == 3) {
                            key = content.substring(1, 9);
                            iv = content.substring(9, 17);
                            content = content.substring(17);
                            obj.innerHTML = gettt3(content, key, iv);
                            obj.style.display = "block";
                            if (objTips) { objTips.style.display = "none" }
                        } else {
                            key = content.substring(1, 25);
                            iv = content.substring(25, 33);
                            content = content.substring(33);
                            obj.innerHTML = getttn(content, key, iv);
                            obj.style.display = "block";
                            if (objTips) { objTips.style.display = "none" }
                        }
                    }
                };
                showttt1(doc);
            }
        },
    }],
    ["www.shouda8.com", {
        bookname() { return document.querySelector('.bread-crumbs > li:nth-child(4)').innerText.replace('最新章节列表', '').trim() },
        author() { return document.querySelector('div.bookname > h1 > em').innerText.replace('作者：', '').trim() },
        intro() {
            let intro = document.querySelector('.intro');
            rm('.book_keywords');
            rm('script', true);
            rm('#cambrian0');
            return convertDomNode(intro)[0]
        },
        linkList() { return document.querySelectorAll('.link_14 > dl dd a') },
        coverUrl() { return document.querySelector('.pic > img:nth-child(1)').src },
        chapterName: function(doc) { return doc.querySelector('.kfyd > h2:nth-child(1)').innerText.trim() },
        content: function(doc) {
            let content = doc.querySelector('#content');
            rm('p:last-child', false, content);
            return content
        },
    }],
    ["book.qidian.com", {
        bookname() { return document.querySelector('.book-info > h1 > em').innerText.trim() },
        author() { return document.querySelector('.book-info .writer').innerText.replace(/作\s+者:/, '').trim() },
        intro() { return convertDomNode(document.querySelector('.book-info-detail .book-intro'))[0] },
        linkList: async() => {
            return new Promise((resolve, reject) => {
                let list;
                const getLiLength = () => document.querySelectorAll('#j-catalogWrap li').length;
                const getlinkList = () => document.querySelectorAll('.volume-wrap ul.cf li a:not([href^="//vipreader"]');
                if (getLiLength() !== 0) {
                    list = getlinkList();
                    setTimeout(() => {
                        if (getLiLength() !== 0) {
                            list = getlinkList();
                            resolve(list);
                        } else {
                            reject(new Error("Can't found linkList."));
                        }
                    }, 3000)
                } else {
                    list = getlinkList();
                    resolve(list);
                }
            })
        },
        coverUrl() { return document.querySelector('#bookImg > img').src },
        chapterName: function(doc) { return doc.querySelector('.j_chapterName > .content-wrap').innerText.trim() },
        content: function(doc) { return doc.querySelector('.read-content') },
        CORS: true,
    }],
    ["www.ciweimao.com", {
        bookname() { return document.querySelector('.book-catalog .hd h3').innerText.trim(); },
        author() { return document.querySelector('.book-catalog .hd > p > a').innerText.trim(); },
        intro: async() => {
            const bookid = unsafeWindow.HB.book.book_id;
            const indexUrl = 'https://www.ciweimao.com/book/' + bookid;
            return (crossPage(indexUrl, "convertDomNode(doc.querySelector('.book-intro-cnt .book-desc'))[0]"));
        },
        linkList() {
            document.querySelectorAll('.book-chapter-list > li > a > i').forEach(i => i.parentElement.classList.add('not_download'));
            return document.querySelectorAll('.book-chapter-list > li > a:not(.not_download)');
        },
        coverUrl: async() => {
            const bookid = unsafeWindow.HB.book.book_id;
            const indexUrl = 'https://www.ciweimao.com/book/' + bookid;
            return (crossPage(indexUrl, "doc.querySelector('.cover > img').src"));
        },
        chapterName: function(doc) {
            rm('h3.chapter i', false, doc);
            return doc.querySelector('h3.chapter').innerText.trim();
        },
        content: async function(doc) {
            const CryptoJS = await loadCryptoJs();

            const url = doc.baseURI;
            const chapter_id = url.split('/').slice(-1)[0];

            let _chapter_author_says = doc.querySelectorAll('#J_BookCnt .chapter.author_say');
            let div_chapter_author_say;
            if (_chapter_author_says.length !== 0) {
                let hr = document.createElement('hr');
                div_chapter_author_say = document.createElement('div');
                div_chapter_author_say.appendChild(hr);
                for (let _chapter_author_say of _chapter_author_says) {
                    rm('i', true, _chapter_author_say);
                    div_chapter_author_say.appendChild(_chapter_author_say);
                }
            }

            let content = document.createElement('div');
            let decryptDate;
            while (true) {
                if (!window.lock) {
                    window.lock = true;
                    decryptDate = await chapterDecrypt(chapter_id, url).catch(error => {
                        console.error(error);
                        chapterDecrypt(chapter_id, url);
                    }).catch(error => { window.lock = false; });
                    window.lock = false;
                    break;
                } else {
                    await sleep(17);
                }
            }
            content.innerHTML = decryptDate;
            rm('.chapter span', true, content);
            if (_chapter_author_says.length !== 0) { content.appendChild(div_chapter_author_say); }
            return content;


            async function chapterDecrypt(chapter_id, refererUrl) {
                const rootPath = 'https://www.ciweimao.com/';
                const access_key_url = rootPath + "chapter/ajax_get_session_code";
                const chapter_content_url = rootPath + "chapter/get_book_chapter_detail_info";

                console.log(`请求 ${access_key_url} Referer ${refererUrl}`);
                const access_key_obj = await gfetch(access_key_url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Referer': refererUrl,
                        'Origin': 'https://www.ciweimao.com',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    data: `chapter_id=${chapter_id}`,
                    responseType: 'json'
                }).then(response => response.response);
                const chapter_access_key = access_key_obj.chapter_access_key;

                console.log(`请求 ${chapter_content_url} Referer ${refererUrl}`);
                const chapter_content_obj = await gfetch(chapter_content_url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Referer': refererUrl,
                        'Origin': 'https://www.ciweimao.com',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    data: `chapter_id=${chapter_id}&chapter_access_key=${chapter_access_key}`,
                    responseType: 'json'
                }).then(response => response.response);

                if (chapter_content_obj.code !== 100000) { console.error(chapter_content_obj); throw new Error(`下载 ${refererUrl} 失败`) }
                return decrypt({
                    'content': chapter_content_obj.chapter_content,
                    'keys': chapter_content_obj.encryt_keys,
                    'accessKey': chapter_access_key
                })
            }

            function decrypt(item) {
                var message = item.content;
                var keys = item.keys;
                var len = item.keys.length;
                var accessKey = item.accessKey;
                var accessKeyList = accessKey.split("");
                var charsNotLatinNum = accessKeyList.length;

                var output = new Array;
                output.push(keys[accessKeyList[charsNotLatinNum - 1].charCodeAt(0) % len]);
                output.push(keys[accessKeyList[0].charCodeAt(0) % len]);

                for (let i = 0; i < output.length; i++) {
                    message = atob(message);
                    var data = output[i];
                    var iv = btoa(message.substr(0, 16));
                    var keys255 = btoa(message.substr(16));
                    var pass = CryptoJS.format.OpenSSL.parse(keys255);
                    message = CryptoJS.AES.decrypt(pass, CryptoJS.enc.Base64.parse(data), {
                        iv: CryptoJS.enc.Base64.parse(iv),
                        format: CryptoJS.format.OpenSSL
                    });
                    if (i < output.length - 1) {
                        message = message.toString(CryptoJS.enc.Base64);
                        message = atob(message);
                    }
                }
                return message.toString(CryptoJS.enc.Utf8);
            }
        },
        maxConcurrency: 3,
    }],
]);
/**
 * Signs the URL so it can be fetched normally.
 * The user agent given to this function MUST 
 * be the same when performing the actual request.
 * @param {*} url 
 * @param {*} userAgent
 * @returns A signed URL
 */
function VM86(url, userAgent) {
  if (!url || !userAgent) return new Error("URL and UserAgent must be specified.")

  const msToken = "zGoEuZ69o_ZzPDWycrasRv-Jl5wUPnCESJBOcas3AQp-gU5YTYxmggRxjRRTW9HI9nyp7OUBo6WtwrP9ziEAagNsOnVnZ5Agoi4FYuigRhejhecMYufslhBTMqMWlwLSQgVNz-mNOZUHQeW1332tqSMyDw=="
  const initHash = 'd41d8cd98f00b204e9800998ecf8427e';
  //const verifyFp = document.cookie.match(/s_v_web_id=(\w+)/); // verify fp
  function VM66(baseUrl, params) {
    let queryString = "";
    let paramString = "";

    for (let i = 0; i < params.length; i++) {
      if (i % 2 === 0)
        paramString = params[i];
      else
        queryString += `&${paramString}=${params[i]}`;
    }
    let resultUrl = baseUrl;

    if (queryString.length > 1) {
      queryString = queryString.substring(1);

      const hasExistingQuery = baseUrl.includes('?');
      const separator = hasExistingQuery ? '&' : '?';

      resultUrl += separator + queryString;
    }
    return resultUrl;
  }

  function VM67(url) {
    return url.substr(url.indexOf("?") + 1) // get query string
  }

  function VM108(arg0, arg1) {
    const buffer = new Uint8Array(3);

    buffer[0] = Math.floor(arg0 / 256);
    buffer[1] = arg0 % 256;
    buffer[2] = arg1 % 256;

    return String.fromCharCode.apply(null, buffer);
  }
  url = VM66(url, ['msToken', msToken]) // append msToken as query parameter;
  const query = VM67(url)


  var MD5 = function(str) {
    d = unescape(encodeURIComponent(str))
    var r = M(V(Y(X(d), 8 * d.length)));
    return r.toLowerCase()
  };

  function M(d) {
    for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++) _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(
      15 & _);
    return f
  }

  function X(d) {
    for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
    for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
    return _
  }

  function V(d) {
    for (var _ = "", m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
    return _
  }

  function Y(d, _) {
    d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
    for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
      var h = m,
        t = f,
        g = r,
        e = i;
      f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = m d5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[
          n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r,
          i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_f f(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m,
        d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -16 5796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -4055 37848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14,
        -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n +
        10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m,
        f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487),
        f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_i i(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -10 51523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n +
        4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e)
    }
    return Array(m, f, r, i)
  }

  function md5_cmn(d, _, m, f, r, i) {
    return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m)
  }

  function md5_ff(d, _, m, f, r, i, n) {
    return md5_cmn(_ & m | ~_ & f, d, _, r, i, n)
  }

  function md5_gg(d, _, m, f, r, i, n) {
    return md5_cmn(_ & f | m & ~f, d, _, r, i, n)
  }

  function md5_hh(d, _, m, f, r, i, n) {
    return md5_cmn(_ ^ m ^ f, d, _, r, i, n)
  }

  function md5_ii(d, _, m, f, r, i, n) {
    return md5_cmn(m ^ (_ | ~f), d, _, r, i, n)
  }

  function safe_add(d, _) {
    var m = (65535 & d) + (65535 & _);
    return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
  }

  function bit_rol(d, _) {
    return d << _ | d >>> 32 - _
  }

  var Kb = {}
  var Lb = "0123456789abcdef".split("")
  var Mb = [],
    Nb = [];
  for (var i = 0; i < 256; i++) {
    Mb[i] = Lb[i >> 4 & 15] + Lb[15 & i]
    if (i < 16)
      if (i < 10)
        Nb[48 + i] = i;
      else
        Nb[87 + i] = i;
  }

  Kb.encode = function(e) {
    for (var t = e.length, r = "", n = 0; n < t;) r += Mb[e[n++]];
    return r;
  }
  Kb.decode = function(e) {
    for (var t = e.length >> 1, r = t << 1, n = new Uint8Array(t), o = 0, a = 0; a < r;) n[o++] = Nb[e.charCodeAt(a++)] << 4 | Nb[e.charCodeAt(a++)];
    return n;
  }
  const hash1 = MD5(query);
  const decode1 = Kb.decode(hash1); // executionStack[11]
  const hash2 = MD5(decode1);
  const decode2 = Kb.decode(hash2); // executionStack[12]

  const initHashDecoded = Kb.decode(initHash);
  const hashInitHashDecoded = MD5(initHashDecoded)
  const decodeHashInitHashDecoded = Kb.decode(hashInitHashDecoded);

  const initEncryptionKey = VM108(1, 0);

  // RC4 encryption algo
  function Ab24(e, t) {
    var u, r, n = [],
      o = 0,
      a = "";

    for (var i = 0; i < 256; i++) n[i] = i;
    for (var s = 0; s < 256; s++) {
      o = (o + n[s] + e.charCodeAt(s % e.length)) % 256
      r = n[s]
      n[s] = n[o]
      n[o] = r;
    }
    u = 0
    o = 0;
    for (var l = 0; l < t.length; l++) {
      o = (o + n[u = (u + 1) % 256]) % 256
      r = n[u]
      n[u] = n[o]
      n[o] = r
      a += String.fromCharCode(255 & (t.charCodeAt(l) ^ n[(n[u] + n[o]) % 256]));
    }
    return a;
  }

  function VM231(text, baseIndex) {
    const bases = {
      "s0": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      "s1": "Dkdpgh4ZKsQB80/Mfvw36XI1R25+WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=",
      "s2": "Dkdpgh4ZKsQB80/Mfvw36XI1R25-WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe="
    }
    const base = bases[baseIndex];

    let result = "";
    let i = 0;
    while (i + 3 <= text.length) {
      const char1 = text.charCodeAt(i++) & 0xFF;
      const char2 = text.charCodeAt(i++) & 0xFF;
      const char3 = text.charCodeAt(i++) & 0xFF;

      const triplet = (char1 << 16) | (char2 << 8) | char3;

      result += base.charAt((triplet >> 18) & 0x3F);
      result += base.charAt((triplet >> 12) & 0x3F);
      result += base.charAt((triplet >> 6) & 0x3F);
      result += base.charAt(triplet & 0x3F);
    }

    if (i < text.length) {
      const char1 = text.charCodeAt(i++) & 0xFF;
      const remaining = (char1 << 16) |
        (i < text.length ? (text.charCodeAt(i++) & 0xFF) << 8 : 0);

      result += base.charAt((remaining >> 18) & 0x3F);
      result += base.charAt((remaining >> 12) & 0x3F);

      if (i < text.length) {
        result += base.charAt((remaining >> 6) & 0x3F);
      } else {
        result += "=";
      }
      result += "=";
    }
    return result;

  }

  const encryptedUserAgent = Ab24(initEncryptionKey, userAgent)
  const encodedEncryptedUserAgent = VM231(encryptedUserAgent, 's0')
  const hashEncodedEncryptedUserAgent = MD5(encodedEncryptedUserAgent);
  const decodeHashEncodedEncryptedUserAgent = Kb.decode(hashEncodedEncryptedUserAgent);

  const now = new Date().getTime() / 1000;

  const valuesArray = [
    64,
    1 / 256,
    1 % 256,
    0,
    decode2[14],
    decode2[15],
    decodeHashInitHashDecoded[14],
    decodeHashInitHashDecoded[15],
    decodeHashEncodedEncryptedUserAgent[14],
    decodeHashEncodedEncryptedUserAgent[15],
    (now >> 24) & 0xFF,
    (now >> 16) & 0xFF,
    (now >> 8) & 0xFF,
    now & 0xFF,
    (1508145731 >> 24) & 0xFF,
    (1508145731 >> 16) & 0xFF,
    (1508145731 >> 8) & 0xFF,
    1508145731 & 0xFF
  ];

  const key = valuesArray.reduce((prev, curr) => prev ^ curr, 0);

  const valuesArray2 = [
    valuesArray[0],
    valuesArray[2],
    valuesArray[4],
    valuesArray[6],
    valuesArray[8],
    valuesArray[10],
    valuesArray[12],
    valuesArray[14],
    valuesArray[16],
    key,
    valuesArray[1],
    valuesArray[3],
    valuesArray[5],
    valuesArray[7],
    valuesArray[9],
    valuesArray[11],
    valuesArray[13],
    valuesArray[15],
    valuesArray[17],
  ]

  function VM112(array) {
    const buffer = new Uint8Array(19);

    buffer[0] = array[0];
    buffer[1] = array[10];
    buffer[2] = array[1];
    buffer[3] = array[11];
    buffer[4] = array[2];
    buffer[5] = array[12];
    buffer[6] = array[3];
    buffer[7] = array[13];
    buffer[8] = array[4];
    buffer[9] = array[14];
    buffer[10] = array[5];
    buffer[11] = array[15];
    buffer[12] = array[6];
    buffer[13] = array[16];
    buffer[14] = array[7];
    buffer[15] = array[17];
    buffer[16] = array[8];
    buffer[17] = array[18];
    buffer[18] = array[9];

    return String.fromCharCode.apply(null, buffer)
  }

  function VM109(arg0) {
    return String.fromCharCode(arg0);
  }


  const str = VM112(valuesArray2);

  const strKey = VM109(255);

  const ans = Ab24(strKey, str);

  function VM110(arg0, arg1, arg2) {
    return VM109(arg0) + VM109(arg1) + arg2;
  }

  const X_Bogus = VM231(VM110(2, 255, ans), "s2");

  url = VM66(url, ["X-Bogus", X_Bogus]);

  // try get content-type by url or options
  // we going to be sending comments so we just return www
  function VM95(url, options) {
    return "application/x-www-form-urlencoded";
  }

  function VM94(applicationType = VM95()) {
    return contentType === "application/x-www-form-urlencoded" ||
      contentType === "application/json";
  }

  // check if theres body and return it
  // theres no body for posting comments so dont need this
  function VM96() {}


  function VM189(url, arg1, arg2) {
    const now = "" + (new Date().getTime()) / 1000 >>> 0;

    function Ab41(e, t) {
      for (var r = 0; r < t.length; r++) e = 65599 * (e ^ t.charCodeAt(r)) >>> 0;
      return e;
    }
    const encryptedNow = Ab41(0, "" + now)

    const urlNoProtocol = 'www.tiktok.com/@/video/' // location.href.substring(location.protocol.length + 2)

    const encryptedProtocol = Ab41(encryptedNow, urlNoProtocol) % 65521

    const encoded = (((encryptedProtocol * 65521) ^ now) >>> 0).toString(2);

    const encodedClamped = "10000000110000" + encoded.substring(encoded.length - 32).padEnd(32, "0");

    const intEncodedClamped = parseInt(encodedClamped, 2)

    const encryptedIntEncodedClamped = Ab41(0, "" + intEncodedClamped)

    function Ab72({
      url
    }) {
      if (!url) return {};
      const match = url.match(/\?(\w+=.*&?)*/);
      const queryString = match ? match[0].substring(1) : "";
      const paramsArray = queryString ? queryString.split("&") : null;
      const params = {};
      if (paramsArray) {
        for (const param of paramsArray) {
          const [key, value] = param.split("=");
          if (key) params[key] = value;
        }
      }
      return params;
    }

    function Ab49(params) {
      if (!params || "{}" === JSON.stringify(params)) return "";

      function Ab4(e) {
        function pf(e) {
          return pf = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
          } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
          }, pf(e);
        }
        var n, r, t, Va;
        Va = [null], t = !{
          toString: null
        }.propertyIsEnumerable("toString"), r = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
        if ("string" == typeof e) return Array.from(Array(e.length).keys()).map(function(e) {
          return e + "";
        });
        if ("number" == typeof e) return [];
        if ("function" != typeof e && ("object" !== pf(e) || Va[0] === e)) throw new TypeError("Object.keys called on non-object");
        n = [];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && n.push(o);
        if (t)
          for (var a = 0; a < r.length; a++) Object.prototype.hasOwnProperty.call(e, r[a]) && n.push(r[a]);
        return n;
      }

      const sortedParams = Ab4(params).sort();
      let str = "";
      for (let i = 0; i < sortedParams.length; i++)
        str += [sortedParams[i]] + "=" + params[sortedParams[i]] + "&";

      return str;
    }

    // url without param query
    function Ab7({
      url
    }) {
      var t, Wa;
      return Wa = [0, 0, 1], t = url || "", t = (t = -Wa[2] !== (t = t.replace(Wa[0], "")).indexOf("?") ? t.substr(Wa[1], t.indexOf("?")) : t) || "/";
    }

    const newUrl = Ab49(Ab72(url)) + "pathname=" + Ab7(url) + "&tt_webid=&uuid=";

    const constant = 1508145731; // VM189 index: 537, looks this doesn't change at all
    function VM190(arg0) {
      let value = arg0 & 63;
      let charCode;
      if (value < 26) {
        charCode = 65;
      } else if (value < 52) {
        charCode = 71;
      } else if (value < 62) {
        charCode = -4;
      } else {
        charCode = -17;
      }
      return String.fromCharCode(charCode + value);
    }

    function VM191(int) {
      return VM190(int >> 24) +
        VM190(int >> 18) +
        VM190(int >> 12) +
        VM190(int >> 6) +
        VM190(int)
    }

    function VM193(int, encrypted) {
      return VM191(encrypted << 28 | int >>> 4);
    }

    function VM192(int) {
      return VM191(int >> 2);
    }

    function VM194(int, encrypted) {
      return VM191(encrypted << 26 | int >>> 6) + VM190(int);
    }
    const a = VM192(intEncodedClamped)
    const b = (intEncodedClamped / 4294967296) >>> 0;
    const c = VM191(intEncodedClamped << 28 | b >>> 4);
    const d = a + c;

    const e = (constant ^ intEncodedClamped);

    const encrypted = (Ab41(encryptedIntEncodedClamped, userAgent) % 65521) << 16 |
      Ab41(encryptedIntEncodedClamped, newUrl) % 65521;

    const feVersion = 2;
    const f = (1 << 8) | (feVersion << 4); // 1 is from environment checker

    const initital_signature = "_02B4Z6wo00001" + d + VM194(e, b) + VM192(encrypted) + VM193(f ^ intEncodedClamped, encrypted) + VM191(encryptedProtocol);

    function checkSum(checkSum, str) {
      for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        if (charCode >= 55296 && charCode <= 56319 && i < str.length - 1) {
          let nextCharCode = str.charCodeAt(i + 1);
          if (nextCharCode >= 56320 && nextCharCode <= 57343) {
            charCode = ((charCode & 0x3FF) << 10) + (nextCharCode & 0x3FF) + 0x10000;
            i++;
          }
        }
        checkSum = (65599 * checkSum + charCode) >>> 0;
      }
      return checkSum;
    }

    const sign_checkSum = checkSum(0, initital_signature).toString(16);

    const signature = initital_signature + sign_checkSum.slice(sign_checkSum.length - 2, sign_checkSum.length);

    return signature;
  }

  const signature = VM189({
    url
  }, undefined, "forreal");

  url = VM66(url, ['_signature', signature])

  return url;

}

module.exports = VM86;

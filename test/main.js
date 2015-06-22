/*global CryptoJS*/
var t24enda = {
    cjf: {
        stringify: function (cp) {
            "use strict";
            var j = {ct: cp.ciphertext.toString(CryptoJS.enc.Base64)};
            if (cp.iv) { j.iv = cp.iv.toString(); }
            if (cp.salt) { j.s = cp.salt.toString(); }
            return JSON.stringify(j);
        },
        parse: function (js) {
            "use strict";
            var j = JSON.parse(js),
                cp = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
            if (j.iv) { cp.iv = CryptoJS.enc.Hex.parse(j.iv); }
            if (j.s) { cp.salt = CryptoJS.enc.Hex.parse(j.s); }
            return cp;
        }
    },
    enda: function (d) {
        "use strict";
        try {
            var s = typeof d === "object" ? JSON.stringify(d) : JSON.stringify(JSON.parse(d)),
                k = (new Date()).toJSON().substr(0, 10);
            return window.btoa(CryptoJS.AES.encrypt(s, k, {format: this.cjf}).toString());
        } catch (e0) {
            return e0.message;
        }
    }
};

import {message} from 'antd'

class cert {

    static INFO_TYPE = {
        CERT_CONTENT: 'CertContent',
        SERIAL_NUMBER: 'SerialNumber'
    };

    static BASE64_FORMAT_KEY = 'feitaike';

    static CryptoAgent = null;

    constructor() {
        cert.init();
    }

    static init() {
        try {
            const dom = document.createElement('div');
            dom.style.display = "none";
            if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf("Trident") >= 0){
                if (window.navigator.cpuClass === "x86") {
                    dom.innerHTML = `<object id="CryptoAgent" codebase="http://static.feitaike.com.cn/cert/CryptoKit.Paperless.x86.cab" classid="clsid:B64B695B-348D-400D-8D58-9AAB1DA5851A" />`;
                }else{
                    dom.innerHTML = `<object id="CryptoAgent" codebase="http://static.feitaike.com.cn/cert/CryptoKit.Paperless.x64.cab" classid="clsid:8BF7E683-630E-4B59-9E61-C996B671EBDF" />`;
                }
            }
            document.body.appendChild(dom);
            cert.CryptoAgent = document.getElementById('CryptoAgent') || null
        }catch (e) {
            console.error(e);
        }
    };

    static selectCert() {
        if(cert.CryptoAgent){
            try {
                if(cert.CryptoAgent.SelectCertificate('','','','')) {
                    return cert.CryptoAgent.GetSignCertInfo(cert.INFO_TYPE.SERIAL_NUMBER)
                }
                return false;
            }catch (e) {
                console.error('err', e);
                message.error(cert.CryptoAgent.GetLastErrorDesc());
                return false;
            }
        }else {
            message.error('当前浏览器不支持电子证书，请更换Internet Explorer浏览器！');
            return false
        }
    }

    static getCertInfo(type) {
        if(cert.CryptoAgent) {
            try {
                return cert.CryptoAgent.GetSignCertInfo(type)
            }catch (e) {
                console.error('err', e);
                message.error(cert.CryptoAgent.GetLastErrorDesc());
                return false;
            }
        } else {
            message.error('当前浏览器不支持电子证书，请更换Internet Explorer浏览器！');
            return false
        }
    }

    static sign(str) {
        try {
            return this.CryptoAgent.SignHashMsgPKCS7Detached(str, "SHA-1");
        }catch (e) {
            message.error(cert.CryptoAgent.GetLastErrorDesc());
            return false
        }
    }

    static base64Format(str) {
        return str.replace(/[+]/g, cert.BASE64_FORMAT_KEY);
    }

    static quickPreSign(params = {}) {
        params.serialNumber = cert.selectCert();
        if (!params.serialNumber) {
            return false
        }
        console.error(params);
        params.certContent = cert.base64Format(cert.getCertInfo(cert.INFO_TYPE.CERT_CONTENT));
        return params
    }

    static quickSign({pdfFileId, certInfo = {}}) {
        const {saSealInfoId, sessionId, pdfSealHash} = certInfo;
        const serialNumber = cert.getCertInfo(cert.INFO_TYPE.SERIAL_NUMBER);
        if(saSealInfoId) {
            const signature = cert.base64Format(cert.sign(pdfSealHash));
            return {pdfFileId, saSealInfoId, sessionId, signature, serialNumber}
        } else {
            return {pdfFileId, serialNumber}
        }
    }

}

export default cert
export default {
  setPLC(s) {
    return `${s}`;
  },
  getPLC(plcString) {
    if (!plcString || !plcString.length) {
      return {
        plcname: '',
        plcvalue: '',
      };
    }
    return {
      plcname: Number.isNaN(parseInt(plcString.charAt(0), 10)) ? plcString.charAt(0) : '',
      plcvalue: plcString.replace(/[^0-9]/ig, ''),
    };
  },
  isValidIP(ip) {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return reg.test(ip);
  },
  plcAddrOptions: [{
    label: 'D',
    value: 'D',
  }, {
    label: 'E',
    value: 'E',
  }, {
    label: 'C',
    value: 'C',
  }, {
    label: 'B',
    value: 'B',
  }, {
    label: 'A',
    value: 'A',
  }],
};

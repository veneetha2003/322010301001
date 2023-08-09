const axios = require('axios');

const timeout = 500; 

const geturl = async (url) => {
    try {
        const response = await axios.get(url, { timeout });
        if (response.status === 200) {
            return new Set(response.data.numbers || []);
        }
    } catch (error) {
        
    }
    return new Set();
};
const merging = async (urls) => {
    const unumber = new Set();
    for (const url of urls) {
        const numbers = await geturl(url);
        numbers.forEach((num) => unumber.add(num));
    }
    return Array.from(unumber).sort((a, b) => a - b);
};

(async () => {
    const testUrls = [
        'http://20.244.56.144/numbers/primes',
        'http://20.244.56.144/numbers/fibo',
        'http://20.244.56.144/numbers/odd'
    ];

    const mergenum = await merging(testUrls);
    console.log('Merged unique integers:', mergenum);
})();
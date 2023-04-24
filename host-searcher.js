class HostSearcher {
    constructor() {
        this.minSimilarity = 0.5;
        this.domainMinLength = 5;
        this.srcAndHref = document.querySelectorAll('[src],[href]');
        this.uniqueHosts = this.extractValues();
        this.uniqueHostsWithComa = this.uniqueHosts.join(',');
    }

    /**
     * @returns {*[]}
     */
    getUniqueHosts() {
        return this.uniqueHosts;
    }

    /**
     * @returns {string}
     */
    getUniqueHostsWithComa() {
        return this.uniqueHostsWithComa;
    }

    /**
     * @returns {number}
     */
    getMinSimilarity() {
        return this.minSimilarity;
    }

    /**
     * Domains extraction.
     * @returns {[]}
     */
    extractValues() {

        var currentDomain = location.hostname;

        var __this = this;
        var uniqueHosts = [];
        for (var i = 0; i < __this.srcAndHref.length; ++i) {
            var item = __this.srcAndHref[i];
            var value;
            var hostName;

            if (item.getAttribute('src') !== null) {
                value = item.getAttribute('src');
            }

            if (item.getAttribute('href') !== null) {
                value = item.getAttribute('href');
            }

            if (value.length > __this.domainMinLength &&
                value.indexOf('.') > -1) {

                var parser = document.createElement('a');
                parser.href = value;

                if (parser.hostname.length > __this.domainMinLength) {
                    hostName = parser.hostname;


                    if (uniqueHosts.indexOf(hostName) === -1 &&
                        hostName.indexOf('.') > -1) {

                        var similarity = __this.similarity(currentDomain, hostName);
                        if (similarity < __this.minSimilarity) {
                            /**
                             * Collecting hosts.
                             */
                            uniqueHosts.push(hostName);
                        }
                    }
                }
            }
        }

        return uniqueHosts;
    }

    /**
     * Similarity of strings.
     * @stackoverflow: https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
     * @param s1
     * @param s2
     * @returns {number}
     */
    similarity(s1, s2) {
        var longer = s1;
        var shorter = s2;

        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }

        var longerLength = longer.length;

        if (longerLength === 0) {
            return 1.0;
        }

        return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    /**
     * Stackoverflow
     * @param s1
     * @param s2
     * @returns {*}
     */
    editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = [];

        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i === 0) {
                    costs[j] = j;
                } else {
                    if (j > 0) {
                        var newValue = costs[j - 1];

                        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        }

                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }

            if (i > 0) {
                costs[s2.length] = lastValue;
            }
        }
        return costs[s2.length];
    }
}

var hostSearcher = new HostSearcher();
console.log('');
console.log('[[[ HOST SEARCHER ALL::  START ]]]');
console.log('');
console.log('Total: ', hostSearcher.getUniqueHosts().length);
console.log('');
console.log(hostSearcher.getUniqueHostsWithComa());
console.log('');
console.log('[[[ HOST SEARCHER ALL ::  END ]]]');

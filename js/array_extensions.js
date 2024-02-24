// Array Extensions

const ArrayExtensions = {
    toSentence: function(options = { connector: "and", skip_last_comma: false }) {
        switch (this.length) {
            case 0: return "";
            case 1: return String(this[0]);
            case 2: return `${this[0]} ${options.connector} ${this[1]}`;
            default:
                const last = this.pop();
                return `${this.join(', ')}${options.skip_last_comma ? '' : ','} ${options.connector} ${last}`;
        }
    },

    first: function() {
        return this[0];
    },

    last: function() {
        return this[this.length - 1];
    }
}

Object.assign(Array.prototype, ArrayExtensions);
// Inflector

class Inflector {
    static pluralize(word) {
        if (Inflections.uncountables.includes(word.toLowerCase()))
            return word;
        return Inflections.plurals.map(pair => word.replace(pair[0], pair[1]))
            .find(plural => word != plural) || word;
    }

    static singularize(word) {
        if (Inflections.uncountables.includes(word.toLowerCase()))
            return word;
        return Inflections.singulars.map(pair => word.replace(pair[0], pair[1]))
            .find(singular => word != singular) || word;
    }

    static ordinalize(number) {
        if ([...Array(3).keys()].map(i => i + 11).includes(number % 100)) {
            return number + "th";
        }
        switch (number % 10) {
            case 1: return number + "st";
            case 2: return number + "nd";
            case 3: return number + "rd";
            default: return number + "th";
        }
    }
}
var Inflections = {
    plurals: [],
    singulars: [],
    uncountables: [],

    plural: function(rule, replacement) {
        this.plurals.unshift([rule, replacement]);
    },
    singular: function(rule, replacement) {
        this.singulars.unshift([rule, replacement]);
    },
    irregular: function(singular, plural) {
        this.plural(new RegExp(singular.charAt(0) + singular.substring(1) + "$", "i"), "$1" + plural.substring(1));
        this.singular(new RegExp(plural.charAt(0) + plural.substring(1) + "$", "i"), "$1" + singular.substring(1));
    },
    uncountable: function(uncountable) {
        this.uncountables = [...this.uncountables, ...arguments];
    }
};

Inflections.plural(/$/, "s");
Inflections.plural(/s$/i, "s");
Inflections.plural(/(ax|test)is$/i, "$1es");
Inflections.plural(/(octop|vir)us$/i, "$1i");
Inflections.plural(/(alias|status)$/i, "$1es");
Inflections.plural(/(bu)s$/i, "$1ses");
Inflections.plural(/(buffal|tomat)o$/i, "$1oes");
Inflections.plural(/([ti])um$/i, "$1a");
Inflections.plural(/sis$/i, "ses");
Inflections.plural(/(?:([^f])fe|([lr])f)$/i, "$1$2ves");
Inflections.plural(/(hive)$/i, "$1s");
Inflections.plural(/([^aeiouy]|qu)y$/i, "$1ies");
Inflections.plural(/([^aeiouy]|qu)ies$/i, "$1y");
Inflections.plural(/(x|ch|ss|sh)$/i, "$1es");
Inflections.plural(/(matr|vert|ind)ix|ex$/i, "$1ices");
Inflections.plural(/([m|l])ouse$/i, "$1ice");
Inflections.plural(/^(ox)$/i, "$1en");
Inflections.plural(/(quiz)$/i, "$1zes");

Inflections.singular(/s$/i, '');
Inflections.singular(/(n)ews$/i, '$1ews');
Inflections.singular(/([ti])a$/i, '$1um');
Inflections.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1$2sis');
Inflections.singular(/(^analy)ses$/i, '$1sis');
Inflections.singular(/([^f])ves$/i, '$1fe');
Inflections.singular(/(hive)s$/i, '$1');
Inflections.singular(/(tive)s$/i, '$1');
Inflections.singular(/([lr])ves$/i, '$1f');
Inflections.singular(/([^aeiouy]|qu)ies$/i, '$1y');
Inflections.singular(/(s)eries$/i, '$1eries');
Inflections.singular(/(m)ovies$/i, '$1ovie');
Inflections.singular(/(x|ch|ss|sh)es$/i, '$1');
Inflections.singular(/([m|l])ice$/i, '$1ouse');
Inflections.singular(/(bus)es$/i, '$1');
Inflections.singular(/(o)es$/i, '$1');
Inflections.singular(/(shoe)s$/i, '$1');
Inflections.singular(/(cris|ax|test)es$/i, '$1is');
Inflections.singular(/([octop|vir])i$/i, '$1us');
Inflections.singular(/(alias|status)es$/i, '$1');
Inflections.singular(/^(ox)en/i, '$1');
Inflections.singular(/(vert|ind)ices$/i, '$1ex');
Inflections.singular(/(matr)ices$/i, '$1ix');
Inflections.singular(/(quiz)zes$/i, '$1');

Inflections.irregular("person", "people");
Inflections.irregular("man", "men");
Inflections.irregular("child", "children");
Inflections.irregular("sex", "sexes");
Inflections.irregular("move", "moves");

Inflections.uncountable("equipment", "information", "rice", "money", "species", "series", "fish", "sheep");

// String Extensions

String.prototype.pluralize = function() {
    return Inflector.pluralize(this.toString());
};

String.prototype.singularize = function() {
    return Inflector.singularize(this.toString());
};


// Number Extensions

Number.prototype.ordinalize = function() {
    return Inflector.ordinalize(this);
}


export {Inflector, Inflections};

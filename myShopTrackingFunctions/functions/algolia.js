const algoliasearch = require('algoliasearch');

class AlgoliaMyShopTracking {
    constructor(algoliaConfig) {
        const ALGOLIA_ID = algoliaConfig.app_id;
        const ALGOLIA_ADMIN_KEY = algoliaConfig.api_key;
        const ALGOLIA_SEARCH_KEY = algoliaConfig.search_key;
        const ALGOLIA_INDEX_NAME = 'products';

        this.client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

        this.index = this.client.initIndex(ALGOLIA_INDEX_NAME);
    }

    saveObjectAlgolia(snapshot) {
        const product = snapshot.data.data();
        product.objectID = snapshot.params.barcode;

        return this.index.saveObject(product);
    }
}

module.exports = AlgoliaMyShopTracking;
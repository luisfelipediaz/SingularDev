import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';
import * as functions from 'firebase-functions';

export class AlgoliaMyShopTracking {
    client: SearchClient;
    index: SearchIndex;
    constructor() {
        const algoliaConfig = functions.config().algolia;
        const ALGOLIA_ID = algoliaConfig.app_id;
        const ALGOLIA_ADMIN_KEY = algoliaConfig.api_key;
        const ALGOLIA_INDEX_NAME = 'products';

        this.client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

        this.index = this.client.initIndex(ALGOLIA_INDEX_NAME);
    }

    async saveObjectAlgolia(snapshot: any, params: any) {
        const product = { ...snapshot.data() };
        product.objectID = params.barcode;

        return await this.index.saveObject(product);
    }
}
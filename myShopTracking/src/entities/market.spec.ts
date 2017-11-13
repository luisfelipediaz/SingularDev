import { Market } from './market';


describe('Market Entities', () => {
    let market: Market;

    beforeEach(() => {
        market = new Market(null);
    });

    it('should be created', () => {
        expect(market instanceof Market).toBe(true);
    });

});
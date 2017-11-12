import { Market } from './market';
import { MarketServiceProvider } from '../providers/market-service/market-service';


describe('Market Entities', () => {
    let market: Market;

    beforeEach(() => {
        market = new Market(null);
    });

    it('should be created', () => {
        expect(market instanceof Market).toBe(true);
    });

});
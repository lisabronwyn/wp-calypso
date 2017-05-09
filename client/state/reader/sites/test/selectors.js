/**
 * External Dependencies
 */
import { expect } from 'chai';

/**
 * Internal Dependencies
 */
import { shouldSiteBeFetched } from '../selectors';

describe( 'selectors', () => {
	describe( 'shouldSiteBeFetched', () => {
		it( 'should return false if the fetch is queued', () => {
			expect( shouldSiteBeFetched( {
				reader: {
					sites: {
						queuedRequests: {
							1: true
						},
						items: {},
						lastUpdated: {},
					}
				}
			}, 1 ) ).to.be.false;
		} );

		it( 'should return false if the site is loaded and recent', () => {
			expect( shouldSiteBeFetched( {
				reader: {
					sites: {
						queuedRequests: {},
						items: {
							1: {}
						},
						lastUpdated: {
							1: Date.now()
						}
					}
				}
			}, 1 ) ).to.be.false;
		} );

		it( 'should return true if the site is loaded and was not updated recently', () => {
			expect( shouldSiteBeFetched( {
				reader: {
					sites: {
						queuedRequests: {},
						items: {
							1: {}
						},
						lastUpdated: {
							1: 100
						}
					}
				}
			}, 1 ) ).to.be.true;
		} );

		it( 'should return true if the site is not queued and not loaded', () => {
			expect( shouldSiteBeFetched( {
				reader: {
					sites: {
						queuedRequests: {},
						items: {},
						lastUpdated: {},
					}
				}
			}, 1 ) ).to.be.true;
		} );

		it( 'should still return true if another site is queued or loaded', () => {
			expect( shouldSiteBeFetched( {
				reader: {
					sites: {
						queuedRequests: {
							2: true
						},
						items: {
							2: {}
						},
						lastUpdated: {}
					}
				}
			}, 1 ) ).to.be.true;
		} );
	} );
} );

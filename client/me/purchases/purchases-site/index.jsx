/**
 * External dependencies
 */
import { connect } from 'react-redux';
import classNames from 'classnames';
import React from 'react';
import times from 'lodash/times';

/**
 * Internal dependencies
 */
import { getSite, isRequestingSites } from 'state/sites/selectors';
import QuerySites from 'components/data/query-sites';
import PurchaseItem from '../purchase-item';
import PurchaseSiteHeader from './header';

const PurchasesSite = ( { isPlaceholder, site, siteId, purchases, name, domain, slug } ) => {
	let items;

	if ( isPlaceholder ) {
		items = times( 2, index => (
			<PurchaseItem isPlaceholder key={ index } />
		) );
	} else {
		items = purchases.map( purchase => (
			<PurchaseItem
				key={ purchase.id }
				slug={ slug }
				purchase={ purchase } />
		) );
	}

	return (
		<div className={ classNames( 'purchases-site', { 'is-placeholder': isPlaceholder } ) }>
			<QuerySites siteId={ siteId } />
			<PurchaseSiteHeader
				siteId={ siteId }
				name={ name }
				domain={ domain }
				isPlaceholder={ isPlaceholder } />

			{ items }
		</div>
	);
};

PurchasesSite.propTypes = {
	isPlaceholder: React.PropTypes.bool,
	siteId: React.PropTypes.number,
	purchases: React.PropTypes.array,
	name: React.PropTypes.string,
	domain: React.PropTypes.string,
	slug: React.PropTypes.string,
};

export default connect(
	( state, { siteId } ) => ( {
		site: getSite( state, siteId ),
		hasLoadedSites: ! isRequestingSites( state ),
	} )
)( PurchasesSite );

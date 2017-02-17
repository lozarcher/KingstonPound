import reducer, { MapViewport } from '../../src/store/reducer/business'
var chai = require('chai');
var expect = chai.expect 
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);

const initialState = {
  businessList: [],
  businessListTimestamp: null,
  selectedBusinessId: undefined,
  closestBusinesses: [],
  mapViewport: MapViewport,
  forceRegion: MapViewport,
  searchMode: false,
  traderScreenBusinessId: undefined,
  geolocationStatus: null,
  businessListRef: null,
}

describe('Business reducer', () => {

	it('should return the initial state', () => {
	    expect(
	      	reducer(undefined, {})
	    ).to.deep.equal(initialState)
	  })

	it('should handle BUSINESS_LIST_RECEIVED', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/BUSINESS_LIST_RECEIVED',
	        	businessList: []
	      	})
	    ).to.containSubset({
		  	businessList: [],
		  	selectedBusinessId: undefined,
		  	closestBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	searchMode: false,
		  	traderScreenBusinessId: undefined,
		  	geolocationStatus: null,
		  	businessListRef: null,
		})
	})

	it('should handle BUSINESS_PROFILE_RECEIVED', () => {
	    expect(
	      	reducer({
			  	businessList: [{id: 0}, {id: 1}],
			  	businessListTimestamp: null,
			  	selectedBusinessId: undefined,
			  	closestBusinesses: [],
			  	mapViewport: MapViewport,
			  	forceRegion: MapViewport,
			  	searchMode: false,
			  	traderScreenBusinessId: undefined,
			  	geolocationStatus: null,
			  	businessListRef: null,
			}, {
	        	type: 'business/BUSINESS_PROFILE_RECEIVED',
	        	businessProfile: {id: 1}
	      	})
	    ).to.deep.equal({
		  	businessList: [{id: 0}, {id: 1, profilePopulated: true}],
		  	businessListTimestamp: null,
		  	selectedBusinessId: undefined,
		  	closestBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	searchMode: false,
		  	traderScreenBusinessId: undefined,
		  	geolocationStatus: null,
		  	businessListRef: null,
		})
	})

	it('should handle SELECTED_BUSINESS', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/SELECTED_BUSINESS',
	        	businessId: 0
	      	})
	    ).to.deep.equal({
		  	businessList: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: 0,
		  	closestBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	searchMode: false,
		  	traderScreenBusinessId: undefined,
		  	geolocationStatus: null,
		  	businessListRef: null,
		})
	})

	it('should handle SELECT_CLOSEST_BUSINESS', () => {
	    expect(
	      	reducer({
			  	businessList: [],
			  	businessListTimestamp: null,
			  	selectedBusinessId: 0,
			  	closestBusinesses: [{id: 1}, {id: 4}],
			  	mapViewport: MapViewport,
			  	forceRegion: MapViewport,
			  	searchMode: false,
			  	traderScreenBusinessId: undefined,
			  	geolocationStatus: null,
			  	businessListRef: null,
			}, {
	        	type: 'business/SELECT_CLOSEST_BUSINESS'
	      	})
	    ).to.deep.equal({
		  	businessList: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: 1,
		  	closestBusinesses: [{id: 1}, {id: 4}],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	searchMode: false,
		  	traderScreenBusinessId: undefined,
		  	geolocationStatus: null,
		  	businessListRef: null,
		})
	})

	it('should handle RESET_BUSINESSES', () => {
	    expect(
	      	reducer({
			  	businessList: [{id: 0}, {id: 1}],
			  	businessListTimestamp: null,
			  	selectedBusinessId: undefined,
			  	closestBusinesses: [{id: 1}, {id: 4}],
			  	mapViewport: MapViewport,
			  	forceRegion: MapViewport,
			  	searchMode: false,
			  	traderScreenBusinessId: 4,
			  	geolocationStatus: null,
			  	businessListRef: null,
			}, {
	        	type: 'business/RESET_BUSINESSES'
	      	})
	    ).to.deep.equal(initialState)
	})

	it('should handle SET_TRADER_SCREEN_ID', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/SET_TRADER_SCREEN_ID',
	        	id: 1
	      	})
	    ).to.deep.equal({
		  	businessList: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: undefined,
		  	closestBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	searchMode: false,
		  	traderScreenBusinessId: 1,
		  	geolocationStatus: null,
		  	businessListRef: null,
		})
	})

	it('should handle UPDATE_SEARCH_MODE', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/UPDATE_SEARCH_MODE',
	        	mode: true
	      	})
	    ).to.deep.equal({
		  	businessList: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: undefined,
		  	closestBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	searchMode: true,
		  	traderScreenBusinessId: undefined,
		  	geolocationStatus: null,
		  	businessListRef: null,
		})
	})

	it('should handle GEOLOCATION_FAILED', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/GEOLOCATION_FAILED'
	      	})
	    ).to.deep.equal({
		  	businessList: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: undefined,
		  	closestBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	searchMode: false,
		  	traderScreenBusinessId: undefined,
		  	geolocationStatus: false,
		  	businessListRef: null,
		})
	})

	it('should handle GEOLOCATION_SUCCESS', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/GEOLOCATION_SUCCESS',
	        	location: 'here'
	      	})
	    ).to.deep.equal({
		  	businessList: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: undefined,
		  	closestBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	searchMode: false,
		  	traderScreenBusinessId: undefined,
		  	geolocationStatus: 'here',
		  	businessListRef: null,
		})
	})

	it('should handle REGISTER_BUSINESS_LIST', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/REGISTER_BUSINESS_LIST',
	        	ref: 'here'
	      	})
	    ).to.deep.equal({
		  	businessList: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: undefined,
		  	closestBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	searchMode: false,
		  	traderScreenBusinessId: undefined,
		  	geolocationStatus: null,
		  	businessListRef: 'here',
		})
	})

	it('should handle navigation/NAVIGATE_TO_TAB', () => {
	    expect(
	      	reducer({
			  	businessList: [],
			  	businessListTimestamp: null,
			  	selectedBusinessId: undefined,
			  	closestBusinesses: [],
			  	mapViewport: MapViewport,
			  	forceRegion: MapViewport,
			  	searchMode: true,
			  	traderScreenBusinessId: undefined,
			  	geolocationStatus: null,
			  	businessListRef: null,
			}, {
	        	type: 'navigation/NAVIGATE_TO_TAB'
	      	})
	    ).to.deep.equal(initialState)
	})
})

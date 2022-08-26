import utils from '@bigcommerce/stencil-utils';
import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';

export default class Category extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);
    }

    setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
        $element.attr({
            role: roleType,
            'aria-live': ariaLiveStatus,
        });
    }

    makeShopByPriceFilterAccessible() {
        if (!$('[data-shop-by-price]').length) return;

        if ($('.navList-action').hasClass('is-active')) {
            $('a.navList-action.is-active').focus();
        }

        $('a.navList-action').on('click', () => this.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive'));
    }

    onReady() {
        this.productArray = {};
        this.loadProducts();
        this.arrangeFocusOnSortBy();
        this.checkCart();

        $('[data-button-type="add-cart"]').on('click', (e) => this.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite'));

        this.makeShopByPriceFilterAccessible();

        compareProducts(this.context);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        $('a.reset-btn').on('click', () => this.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite'));

        //HOVER START
        this.hoverCounter = 1;
        // because jquery uses "this", we need to redefine in order to call a class function within a jquery event
        let self = this;
        $('li.product').hover(function() {
            let productId = $(this).find('button.quickview').data('productId');
            self.productImageAltHandler(productId, $(this));
        });

        $('button.add-all-to-cart').on('click', () => {
            const productId = $('button.quickview').data('productId');
            this.addToCart(productId);
        });

        $('button.remove-all-from-cart').on('click', () => {
            this.deleteCart();
        });

        this.ariaNotifyNoProducts();
    }

    checkCart() {
        utils.api.cart.getCart({}, (err, resp) => {
            if (resp.id) {
                $('button.remove-all-from-cart').css('display', 'block');
                $('button.remove-all-from-cart').attr('cart', resp.id);
            }
        });
    }

    addToCart(productId) {
        let form = new FormData();
        form.append('product_id', productId);
        form.append('qty[]', 1);

        utils.api.cart.itemAdd(form, (err, resp) => {
            if (!err) {
                window.location.href = '/cart.php'
            }
        });
    }

    deleteCart() {
        let cartId = $('button.remove-all-from-cart').attr('cart');

        fetch(`${window.location.origin}/api/storefront/carts/${cartId}`, {method: 'delete'})
        .then((response) => {
            if (response.status == 204) {
                location.reload();
            } else {
                console.log('Failed to remove cart');
            }
        })
    }

    loadProducts() {
        //for each product
        $('li.product').each((i) => {
            let currentElem = $('li.product')[i];
            let productId = $(currentElem).find('button.quickview').data('productId');

            utils.api.product.getById(productId, {}, (err, resp) => {
                //assign product details (main/alt imgs) to the product array
                const parser = new DOMParser();
                const productDOM = parser.parseFromString(resp, 'text/html');
                const mainImageObject = productDOM.getElementsByClassName('productView-thumbnail-link')[0];
                const altImageObject = productDOM.getElementsByClassName('productView-thumbnail-link')[1];
                this.productArray[productId] = {
                    mainImg: mainImageObject.href,
                    altImg: altImageObject.href
                }
            });
        });
    }

    productImageAltHandler(productId, element) {
        if (this.hoverCounter == 0) {
            $(element).find('img.card-image')[0].setAttribute('srcset', `${this.productArray[productId].mainImg} 2560w`);
            this.hoverCounter = 1;
        } else {
            $(element).find('img.card-image')[0].setAttribute('srcset', `${this.productArray[productId].altImg} 2560w`);
            this.hoverCounter = 0;
        }
    }

    ariaNotifyNoProducts() {
        const $noProductsMessage = $('[data-no-products-notification]');
        if ($noProductsMessage.length) {
            $noProductsMessage.focus();
        }
    }

    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });
    }
}

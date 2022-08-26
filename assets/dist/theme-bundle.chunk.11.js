(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);

  function Category(context) {
    var _this;

    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);
    return _this;
  }

  var _proto = Category.prototype;

  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      'aria-live': ariaLiveStatus
    });
  };

  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;

    if (!$('[data-shop-by-price]').length) return;

    if ($('.navList-action').hasClass('is-active')) {
      $('a.navList-action.is-active').focus();
    }

    $('a.navList-action').on('click', function () {
      return _this2.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive');
    });
  };

  _proto.onReady = function onReady() {
    var _this3 = this;

    this.productArray = {};
    this.loadProducts();
    this.arrangeFocusOnSortBy();
    this.checkCart();
    $('[data-button-type="add-cart"]').on('click', function (e) {
      return _this3.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite');
    });
    this.makeShopByPriceFilterAccessible();
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }

    $('a.reset-btn').on('click', function () {
      return _this3.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite');
    }); //HOVER START

    this.hoverCounter = 1; // because jquery uses "this", we need to redefine in order to call a class function within a jquery event

    var self = this;
    $('li.product').hover(function () {
      var productId = $(this).find('button.quickview').data('productId');
      self.productImageAltHandler(productId, $(this));
    });
    $('button.add-all-to-cart').on('click', function () {
      var productId = $('button.quickview').data('productId');

      _this3.addToCart(productId);
    });
    $('button.remove-all-from-cart').on('click', function () {
      _this3.deleteCart();
    });
    this.ariaNotifyNoProducts();
  };

  _proto.checkCart = function checkCart() {
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.getCart({}, function (err, resp) {
      if (resp.id) {
        $('button.remove-all-from-cart').css('display', 'block');
        $('button.remove-all-from-cart').attr('cart', resp.id);
      }
    });
  };

  _proto.addToCart = function addToCart(productId) {
    var form = new FormData();
    form.append('product_id', productId);
    form.append('qty[]', 1);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.itemAdd(form, function (err, resp) {
      if (!err) {
        window.location.href = '/cart.php';
      }
    });
  };

  _proto.deleteCart = function deleteCart() {
    var cartId = $('button.remove-all-from-cart').attr('cart');
    fetch(window.location.origin + "/api/storefront/carts/" + cartId, {
      method: 'delete'
    }).then(function (response) {
      if (response.status == 204) {
        location.reload();
      } else {
        console.log('Failed to remove cart');
      }
    });
  };

  _proto.loadProducts = function loadProducts() {
    var _this4 = this;

    //for each product
    $('li.product').each(function (i) {
      var currentElem = $('li.product')[i];
      var productId = $(currentElem).find('button.quickview').data('productId');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById(productId, {}, function (err, resp) {
        //assign product details (main/alt imgs) to the product array
        var parser = new DOMParser();
        var productDOM = parser.parseFromString(resp, 'text/html');
        var mainImageObject = productDOM.getElementsByClassName('productView-thumbnail-link')[0];
        var altImageObject = productDOM.getElementsByClassName('productView-thumbnail-link')[1];
        _this4.productArray[productId] = {
          mainImg: mainImageObject.href,
          altImg: altImageObject.href
        };
      });
    });
  };

  _proto.productImageAltHandler = function productImageAltHandler(productId, element) {
    if (this.hoverCounter == 0) {
      $(element).find('img.card-image')[0].setAttribute('srcset', this.productArray[productId].mainImg + " 2560w");
      this.hoverCounter = 1;
    } else {
      $(element).find('img.card-image')[0].setAttribute('srcset', this.productArray[productId].altImg + " 2560w");
      this.hoverCounter = 0;
    }
  };

  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $('[data-no-products-notification]');

    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
        onMinPriceError = _this$validationDicti.price_min_evaluation,
        onMaxPriceError = _this$validationDicti.price_max_evaluation,
        minPriceNotEntered = _this$validationDicti.price_min_not_entered,
        maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
        onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };

  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';

var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};

var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};
/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */


var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
      validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
      validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJzZXRMaXZlUmVnaW9uQXR0cmlidXRlcyIsIiRlbGVtZW50Iiwicm9sZVR5cGUiLCJhcmlhTGl2ZVN0YXR1cyIsImF0dHIiLCJyb2xlIiwibWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSIsIiQiLCJsZW5ndGgiLCJoYXNDbGFzcyIsImZvY3VzIiwib24iLCJvblJlYWR5IiwicHJvZHVjdEFycmF5IiwibG9hZFByb2R1Y3RzIiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCJjaGVja0NhcnQiLCJlIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiaG92ZXJDb3VudGVyIiwic2VsZiIsImhvdmVyIiwicHJvZHVjdElkIiwiZmluZCIsImRhdGEiLCJwcm9kdWN0SW1hZ2VBbHRIYW5kbGVyIiwiYWRkVG9DYXJ0IiwiZGVsZXRlQ2FydCIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwidXRpbHMiLCJhcGkiLCJjYXJ0IiwiZ2V0Q2FydCIsImVyciIsInJlc3AiLCJpZCIsImNzcyIsImZvcm0iLCJGb3JtRGF0YSIsImFwcGVuZCIsIml0ZW1BZGQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJjYXJ0SWQiLCJmZXRjaCIsIm9yaWdpbiIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsInN0YXR1cyIsInJlbG9hZCIsImNvbnNvbGUiLCJsb2ciLCJlYWNoIiwiaSIsImN1cnJlbnRFbGVtIiwicHJvZHVjdCIsImdldEJ5SWQiLCJwYXJzZXIiLCJET01QYXJzZXIiLCJwcm9kdWN0RE9NIiwicGFyc2VGcm9tU3RyaW5nIiwibWFpbkltYWdlT2JqZWN0IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImFsdEltYWdlT2JqZWN0IiwibWFpbkltZyIsImFsdEltZyIsImVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCIkbm9Qcm9kdWN0c01lc3NhZ2UiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwicHJvZHVjdHMiLCJsaW1pdCIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJzaWRlYmFyIiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJDYXRhbG9nUGFnZSIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJKU09OIiwicGFyc2UiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxROzs7QUFDakIsb0JBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDakIsb0NBQU1BLE9BQU47QUFDQSxVQUFLQyxvQkFBTCxHQUE0QkMsMEdBQTJCLENBQUNGLE9BQUQsQ0FBdkQ7QUFGaUI7QUFHcEI7Ozs7U0FFREcsdUIsR0FBQSxpQ0FBd0JDLFFBQXhCLEVBQWtDQyxRQUFsQyxFQUE0Q0MsY0FBNUMsRUFBNEQ7QUFDeERGLFlBQVEsQ0FBQ0csSUFBVCxDQUFjO0FBQ1ZDLFVBQUksRUFBRUgsUUFESTtBQUVWLG1CQUFhQztBQUZILEtBQWQ7QUFJSCxHOztTQUVERywrQixHQUFBLDJDQUFrQztBQUFBOztBQUM5QixRQUFJLENBQUNDLENBQUMsQ0FBQyxzQkFBRCxDQUFELENBQTBCQyxNQUEvQixFQUF1Qzs7QUFFdkMsUUFBSUQsQ0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJFLFFBQXJCLENBQThCLFdBQTlCLENBQUosRUFBZ0Q7QUFDNUNGLE9BQUMsQ0FBQyw0QkFBRCxDQUFELENBQWdDRyxLQUFoQztBQUNIOztBQUVESCxLQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQkksRUFBdEIsQ0FBeUIsT0FBekIsRUFBa0M7QUFBQSxhQUFNLE1BQUksQ0FBQ1gsdUJBQUwsQ0FBNkJPLENBQUMsQ0FBQywyQkFBRCxDQUE5QixFQUE2RCxRQUE3RCxFQUF1RSxXQUF2RSxDQUFOO0FBQUEsS0FBbEM7QUFDSCxHOztTQUVESyxPLEdBQUEs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QUNvRDFILE9BRHBELENBQzVDMEgsd0JBRDRDO0FBQUEsTUFDbEJDLGdDQURrQixHQUNvRDNILE9BRHBELENBQ2xCMkgsZ0NBRGtCO0FBQUEsTUFDZ0JDLCtCQURoQixHQUNvRDVILE9BRHBELENBQ2dCNEgsK0JBRGhCO0FBRXBELE1BQU1DLGdCQUFnQixHQUFHTixzQkFBc0IsQ0FBQ0csd0JBQUQsRUFBMkJDLGdDQUEzQixFQUE2REMsK0JBQTdELENBQS9DO0FBQ0EsTUFBTUUsYUFBYSxHQUFHVCxNQUFNLENBQUNVLE1BQVAsQ0FBY0YsZ0JBQWdCLENBQUNYLFlBQUQsQ0FBOUIsQ0FBdEI7QUFDQSxNQUFNYyxlQUFlLEdBQUdYLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZTyxnQkFBZ0IsQ0FBQ1gsWUFBRCxDQUE1QixFQUE0Q2UsR0FBNUMsQ0FBZ0QsVUFBQUMsR0FBRztBQUFBLFdBQUlBLEdBQUcsQ0FBQ0MsS0FBSixDQUFVLEdBQVYsRUFBZUMsR0FBZixFQUFKO0FBQUEsR0FBbkQsQ0FBeEI7QUFFQSxTQUFPSixlQUFlLENBQUNLLE1BQWhCLENBQXVCLFVBQUNDLEdBQUQsRUFBTUosR0FBTixFQUFXakUsQ0FBWCxFQUFpQjtBQUMzQ3FFLE9BQUcsQ0FBQ0osR0FBRCxDQUFILEdBQVdKLGFBQWEsQ0FBQzdELENBQUQsQ0FBeEI7QUFDQSxXQUFPcUUsR0FBUDtBQUNILEdBSE0sRUFHSixFQUhJLENBQVA7QUFJSCxDQVZNLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG4gICAgfVxuXG4gICAgc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJGVsZW1lbnQsIHJvbGVUeXBlLCBhcmlhTGl2ZVN0YXR1cykge1xuICAgICAgICAkZWxlbWVudC5hdHRyKHtcbiAgICAgICAgICAgIHJvbGU6IHJvbGVUeXBlLFxuICAgICAgICAgICAgJ2FyaWEtbGl2ZSc6IGFyaWFMaXZlU3RhdHVzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCkge1xuICAgICAgICBpZiAoISQoJ1tkYXRhLXNob3AtYnktcHJpY2VdJykubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCQoJy5uYXZMaXN0LWFjdGlvbicpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgJCgnYS5uYXZMaXN0LWFjdGlvbi5pcy1hY3RpdmUnKS5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYS5uYXZMaXN0LWFjdGlvbicpLm9uKCdjbGljaycsICgpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJCgnc3Bhbi5wcmljZS1maWx0ZXItbWVzc2FnZScpLCAnc3RhdHVzJywgJ2Fzc2VydGl2ZScpKTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLnByb2R1Y3RBcnJheSA9IHt9O1xuICAgICAgICB0aGlzLmxvYWRQcm9kdWN0cygpO1xuICAgICAgICB0aGlzLmFycmFuZ2VGb2N1c09uU29ydEJ5KCk7XG4gICAgICAgIHRoaXMuY2hlY2tDYXJ0KCk7XG5cbiAgICAgICAgJCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKCdjbGljaycsIChlKSA9PiB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksICdzdGF0dXMnLCAncG9saXRlJykpO1xuXG4gICAgICAgIHRoaXMubWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpO1xuXG4gICAgICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgIGlmICgkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYS5yZXNldC1idG4nKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNldExpdmVSZWdpb25zQXR0cmlidXRlcygkKCdzcGFuLnJlc2V0LW1lc3NhZ2UnKSwgJ3N0YXR1cycsICdwb2xpdGUnKSk7XG5cbiAgICAgICAgLy9IT1ZFUiBTVEFSVFxuICAgICAgICB0aGlzLmhvdmVyQ291bnRlciA9IDE7XG4gICAgICAgIC8vIGJlY2F1c2UganF1ZXJ5IHVzZXMgXCJ0aGlzXCIsIHdlIG5lZWQgdG8gcmVkZWZpbmUgaW4gb3JkZXIgdG8gY2FsbCBhIGNsYXNzIGZ1bmN0aW9uIHdpdGhpbiBhIGpxdWVyeSBldmVudFxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICQoJ2xpLnByb2R1Y3QnKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBwcm9kdWN0SWQgPSAkKHRoaXMpLmZpbmQoJ2J1dHRvbi5xdWlja3ZpZXcnKS5kYXRhKCdwcm9kdWN0SWQnKTtcbiAgICAgICAgICAgIHNlbGYucHJvZHVjdEltYWdlQWx0SGFuZGxlcihwcm9kdWN0SWQsICQodGhpcykpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdidXR0b24uYWRkLWFsbC10by1jYXJ0Jykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJCgnYnV0dG9uLnF1aWNrdmlldycpLmRhdGEoJ3Byb2R1Y3RJZCcpO1xuICAgICAgICAgICAgdGhpcy5hZGRUb0NhcnQocHJvZHVjdElkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnYnV0dG9uLnJlbW92ZS1hbGwtZnJvbS1jYXJ0Jykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZWxldGVDYXJ0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXJpYU5vdGlmeU5vUHJvZHVjdHMoKTtcbiAgICB9XG5cbiAgICBjaGVja0NhcnQoKSB7XG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldENhcnQoe30sIChlcnIsIHJlc3ApID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwLmlkKSB7XG4gICAgICAgICAgICAgICAgJCgnYnV0dG9uLnJlbW92ZS1hbGwtZnJvbS1jYXJ0JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICAgICAgJCgnYnV0dG9uLnJlbW92ZS1hbGwtZnJvbS1jYXJ0JykuYXR0cignY2FydCcsIHJlc3AuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRUb0NhcnQocHJvZHVjdElkKSB7XG4gICAgICAgIGxldCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGZvcm0uYXBwZW5kKCdwcm9kdWN0X2lkJywgcHJvZHVjdElkKTtcbiAgICAgICAgZm9ybS5hcHBlbmQoJ3F0eVtdJywgMSk7XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbUFkZChmb3JtLCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9jYXJ0LnBocCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlQ2FydCgpIHtcbiAgICAgICAgbGV0IGNhcnRJZCA9ICQoJ2J1dHRvbi5yZW1vdmUtYWxsLWZyb20tY2FydCcpLmF0dHIoJ2NhcnQnKTtcblxuICAgICAgICBmZXRjaChgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9hcGkvc3RvcmVmcm9udC9jYXJ0cy8ke2NhcnRJZH1gLCB7bWV0aG9kOiAnZGVsZXRlJ30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDQpIHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byByZW1vdmUgY2FydCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGxvYWRQcm9kdWN0cygpIHtcbiAgICAgICAgLy9mb3IgZWFjaCBwcm9kdWN0XG4gICAgICAgICQoJ2xpLnByb2R1Y3QnKS5lYWNoKChpKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3VycmVudEVsZW0gPSAkKCdsaS5wcm9kdWN0JylbaV07XG4gICAgICAgICAgICBsZXQgcHJvZHVjdElkID0gJChjdXJyZW50RWxlbSkuZmluZCgnYnV0dG9uLnF1aWNrdmlldycpLmRhdGEoJ3Byb2R1Y3RJZCcpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkKHByb2R1Y3RJZCwge30sIChlcnIsIHJlc3ApID0+IHtcbiAgICAgICAgICAgICAgICAvL2Fzc2lnbiBwcm9kdWN0IGRldGFpbHMgKG1haW4vYWx0IGltZ3MpIHRvIHRoZSBwcm9kdWN0IGFycmF5XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RET00gPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHJlc3AsICd0ZXh0L2h0bWwnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYWluSW1hZ2VPYmplY3QgPSBwcm9kdWN0RE9NLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2R1Y3RWaWV3LXRodW1ibmFpbC1saW5rJylbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgYWx0SW1hZ2VPYmplY3QgPSBwcm9kdWN0RE9NLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2R1Y3RWaWV3LXRodW1ibmFpbC1saW5rJylbMV07XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0QXJyYXlbcHJvZHVjdElkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbkltZzogbWFpbkltYWdlT2JqZWN0LmhyZWYsXG4gICAgICAgICAgICAgICAgICAgIGFsdEltZzogYWx0SW1hZ2VPYmplY3QuaHJlZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9kdWN0SW1hZ2VBbHRIYW5kbGVyKHByb2R1Y3RJZCwgZWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy5ob3ZlckNvdW50ZXIgPT0gMCkge1xuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCdpbWcuY2FyZC1pbWFnZScpWzBdLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgYCR7dGhpcy5wcm9kdWN0QXJyYXlbcHJvZHVjdElkXS5tYWluSW1nfSAyNTYwd2ApO1xuICAgICAgICAgICAgdGhpcy5ob3ZlckNvdW50ZXIgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCdpbWcuY2FyZC1pbWFnZScpWzBdLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgYCR7dGhpcy5wcm9kdWN0QXJyYXlbcHJvZHVjdElkXS5hbHRJbWd9IDI1NjB3YCk7XG4gICAgICAgICAgICB0aGlzLmhvdmVyQ291bnRlciA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcmlhTm90aWZ5Tm9Qcm9kdWN0cygpIHtcbiAgICAgICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJCgnW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXScpO1xuICAgICAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgJG5vUHJvZHVjdHNNZXNzYWdlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG4gICAgICAgIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICAgICAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb3JlOiAnY2F0ZWdvcnkvc2hvdy1tb3JlJyxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChyZXF1ZXN0T3B0aW9ucywgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgb25JbnZhbGlkUHJpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9
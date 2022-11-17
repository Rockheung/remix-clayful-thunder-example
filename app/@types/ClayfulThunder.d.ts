import type $ from "jquery";

type JQuerySelector = ReturnType<typeof $> | string;

export interface Thunder {
  (option: ThunderOption): Thunder;
  render(
    selector: JQuerySelector,
    componentName: ComponentName,
    option?: unknown,
    callback?: ThunderCallback,
  ): Thunder;
  options?: ThunderOption
}

type ThunderError = {
  default?: string
}

export type ThunderCallback = (
  err: ThunderError,
  { interfaces, context }: { interfaces: any; context: ThunderContext }
) => void;

export type ThunderContext = unknown;

// https://www.notion.so/69873807cb01478f8bd0510e56290095
type ThunderOption = { client: string } & Partial<{
  baseURL: string;
  // 일반 설정
  // https://www.loc.gov/standards/iso639-2/php/code_list.php
  language: string;
  // https://en.wikipedia.org/wiki/ISO_4217
  currency: string;
  // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  timezone: string;
  // Following navigator.language
  debugLanguage: "ko" | "en";
  // YYYY-MM-DD
  dateInputFormat: string;
  // '<http://example.org>
  root: string;
  header:
    | boolean
    | { items?: string[]; actions: Record<ComponentName, () => void> };
  authStorage: { customer: string; order: string };
  recaptcha: { sitekey: string };
  plugins: never;
  // https://github.com/Clayful/clayful-thunder/blob/master/locales/ko.js
  messages: Messages;
  listeners: Record<
    CustomerIdentity,
    (componentName: ComponentName, container: any, context: any) => void
  >;

  // 고객 관련 설정
  customerAvatar: boolean;
  customerDashboardLogout: boolean;
  customerIdentity: CustomerIdentity[];
  customerRegistrationFields: UnionRequire<CustomerInfo>[];
  customerUpdateFields: UnionRequire<CustomerInfo>[];
  socialApps: SocialApp[];
  confirmation: Partial<{
    customerDelete: boolean;
    couponDelete: boolean;
    reviewDelete: boolean;
    reviewCommentDelete: boolean;
  }>;
  legal: Partial<{
    registrationTerms: TermsAndPrivacy;
    registrationPrivacy: TermsAndPrivacy;
    orderTerms: TermsAndPrivacy;
    orderPrivacy: TermsAndPrivacy;
  }>;
  // 리뷰 관련 설정
  productReview: boolean;
  productReviewRating: boolean;
  productReviewComment: boolean;
  // 상품 관련 설정
  productLabels: ProductLabel[];
  productActions: ("add-to-cart" | "buy-now")[];
  productOptionSelector: "separated" | "combined";
  // 주문/정기 구독 관련 설정
  paymentMethods: {
    order?: PaymentMethod[];
    subscription?: PaymentMethod[];
  };
  subscriptionPlans: SubscriptionPlan[];
  refundReasonCategories: RefundReasonCategory[];
  customerOrderFields: UnionRequire<CustomerOrderField>[];
  recipientFields: UnionRequire<RecipientField>[];
  // https://www.notion.so/43cb1740b49c41ce9e653d267fe7fd7a
  addressDisabled: AddressDisable[];
  orderAuthFields: OrderAuthField[];
}>;

type OrderAuthField =
  | "userId"
  | "email"
  | "alias"
  | "name.first"
  | "name.last"
  | "name.full"
  | "mobile"
  | "phone";

type AddressDisable = "country" | "state" | "city" | "address1" | "postcode";

type RecipientField =
  | "name.first"
  | "name.last"
  | "name.full:required"
  | "mobile:required"
  | "phone";

type CustomerOrderField =
  | "name.first"
  | "name.last"
  | "name.full"
  | "email"
  | "mobile"
  | "phone";

type UnionRequire<U extends string> = U | `${U}:required`;

type RefundReasonCategory = {
  label: keyof Messages["order-request-refund"];
  shippingFee: {
    someItems: boolean;
    allItems: boolean;
  };
};

type SubscriptionPlan = { id: string } & (
  | {
      startsAt: "datepicker" | ((plan: any) => Date);
      time: string;
    }
  | { startsAt: "datepicker" | ((plan: any) => Date) }
);

type PaymentMethod = {
  id: string;
  label: string;
  cardFields: boolean;
  payLater: boolean;
  // following IMP.request_pay parameters: pg, pay_method
  meta?: {
    pg: string;
    payMethod: string;
  };
};

type ProductLabel = "unavailable" | "sold" | "discounted";

type SocialApp = "facebook" | "instagram" | "google" | "naver" | "kakao";

type CustomerIdentity =
  | "name.full"
  | "name.last"
  | "name.first"
  | "userId"
  | "alias"
  | "email";

type CustomerInfo =
  | "userId"
  | "email"
  | "password"
  | "alias"
  | "first"
  | "last"
  | "full"
  | "mobile"
  | "phone"
  | "gender"
  | "birthdate";

export type ComponentName =
  | "cart"
  | "catalog-slider"
  | "checkout"
  | "checkout-success"
  | "customer-coupons"
  | "customer-dashboard"
  | "customer-delete-account"
  | "customer-login"
  | "customer-register"
  | "customer-reset-password"
  | "customer-review"
  | "customer-review-comment"
  | "customer-review-comments"
  | "customer-reviews"
  | "customer-update"
  | "customer-update-address"
  | "customer-update-credential"
  | "customer-verification"
  | "order-detail"
  | "order-list"
  | "order-request-refund"
  | "product-detail"
  | "product-list"
  | "product-review"
  | "product-review-comments"
  | "product-review-writer"
  | "product-reviews"
  | "search-purchase"
  | "subscription-detail"
  | "subscription-list";

type TermsAndPrivacy = {
  link: string | null;
  text: string | null;
};

interface Messages
  extends Record<"general" | keyof ComponentName, Record<string, string>> {
  general: {
    previousMonth: string;
    nextMonth: string;
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
    sunday: string;
    sundayShort: string;
    monday: string;
    mondayShort: string;
    tuesday: string;
    tuesdayShort: string;
    wednesday: string;
    wednesdayShort: string;
    thursday: string;
    thursdayShort: string;
    friday: string;
    fridayShort: string;
    saturday: string;
    saturdayShort: string;
    copySucceeded: string;
    copyFailed: string;
  };
  "header-navigation": {
    login: string;
    register: string;
    logout: string;
    profile: string;
    searchOrder: string;
    cart: string;
  };
  "social-login": {
    loginByFacebook: string;
    loginByGoogle: string;
    loginByInstagram: string;
    loginByKakao: string;
    loginByNaver: string;
    registerByFacebook: string;
    registerByGoogle: string;
    registerByInstagram: string;
    registerByKakao: string;
    registerByNaver: string;
  };
  "customer-register": {
    register: string;
    userId: string;
    email: string;
    password: string;
    alias: string;
    firstName: string;
    lastName: string;
    fullName: string;
    mobile: string;
    phone: string;
    gender: string;
    noSelect: string;
    male: string;
    female: string;
    birthdate: string;
    year: string;
    month: string;
    date: string;
    required: string;
    agreeWithTerms: string;
    viewTerms: string;
    agreeWithPrivacy: string;
    viewPrivacy: string;
    agreeWithAll: string;
    doRegister: string;
    registerSuccess: string;
    registerFailed: string;
    duplicatedEmail: string;
    duplicatedUserId: string;
    userIdRequired: string;
    emailRequired: string;
    passwordRequired: string;
    aliasRequired: string;
    firstNameRequired: string;
    lastNameRequired: string;
    fullNameRequired: string;
    mobileRequired: string;
    phoneRequired: string;
    genderRequired: string;
    birthdateRequired: string;
    termsAgreementRequired: string;
    privacyAgreementRequired: string;
    invalidUserId: string;
    invalidEmail: string;
    invalidPassword: string;
    invalidAlias: string;
    invalidFirstName: string;
    invalidLastName: string;
    invalidFullName: string;
    invalidMobile: string;
    invalidPhone: string;
    invalidGender: string;
    invalidBirthdate: string;
  };
  "customer-login": {
    login: string;
    userIdOrEmail: string;
    password: string;
    doLogin: string;
    goToResetPassword: string;
    loginSuccess: string;
    loginFailed: string;
    notExistingCustomer: string;
    invalidPassword: string;
  };
  "customer-reset-password": {
    resetPassword: string;
    userIdOrEmail: string;
    requestEmail: string;
    requestEmailSuccess: string;
    newPassword: string;
    setPassword: string;
    setPasswordSuccess: string;
    setPasswordFailed: string;
    notExistingCustomer: string;
    customerWithoutEmail: string;
    requestEmailFailed: string;
    goToCustomerLogin: string;
  };
  "customer-verification": {
    verifyEmail: string;
    userIdOrEmail: string;
    requestEmail: string;
    requestEmailSuccess: string;
    finishVerification: string;
    verificationSuccess: string;
    verificationFailed: string;
    notExistingCustomer: string;
    customerWithoutEmail: string;
    requestEmailFailed: string;
  };
  "customer-dashboard": {
    customerInfo: string;
    customerAddress: string;
    orderList: string;
    subscriptionList: string;
    customerCoupons: string;
    customerReviews: string;
    customerReviewComments: string;
    customerDeleteAccount: string;
    customerLogout: string;
  };
  "customer-update": {
    customerInfo: string;
    backToCheckout: string;
    changeAvatar: string;
    userId: string;
    changeUserId: string;
    email: string;
    changeEmail: string;
    alias: string;
    firstName: string;
    lastName: string;
    fullName: string;
    mobile: string;
    phone: string;
    gender: string;
    noSelect: string;
    male: string;
    female: string;
    birthdate: string;
    year: string;
    month: string;
    date: string;
    required: string;
    doUpdate: string;
    changePassword: string;
    avatarUploadSuccess: string;
    avatarUploadFailed: string;
    updateSuccess: string;
    updateFailed: string;
    customerReadFailed: string;
    aliasRequired: string;
    firstNameRequired: string;
    lastNameRequired: string;
    fullNameRequired: string;
    mobileRequired: string;
    phoneRequired: string;
    genderRequired: string;
    birthdateRequired: string;
    invalidAlias: string;
    invalidFirstName: string;
    invalidLastName: string;
    invalidFullName: string;
    invalidMobile: string;
    invalidPhone: string;
    invalidGender: string;
    invalidBirthdate: string;
  };
  "customer-update-credential": {
    changeUserId: string;
    changeEmail: string;
    changePassword: string;
    newEmail: string;
    newPassword: string;
    newUserId: string;
    oldPassword: string;
    doChange: string;
    updateCustomer: string;
    updateSuccess: string;
    updateFailed: string;
    invalidPassword: string;
    duplicatedUserId: string;
    duplicatedEmail: string;
    invalidNewUserId: string;
    invalidNewEmail: string;
    invalidNewPassword: string;
  };
  "customer-update-address": {
    primaryAddress: string;
    required: string;
    firstName: string;
    lastName: string;
    fullName: string;
    mobile: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    address1: string;
    address2: string;
    postcode: string;
    searchAddress: string;
    setPrimaryAddress: string;
    updateSuccess: string;
    updateFailed: string;
    customerReadFailed: string;
    firstNameRequired: string;
    lastNameRequired: string;
    fullNameRequired: string;
    mobileRequired: string;
    phoneRequired: string;
    countryRequired: string;
    stateRequired: string;
    cityRequired: string;
    address1Required: string;
    address2Required: string;
    postcodeRequired: string;
    invalidFirstName: string;
    invalidLastName: string;
    invalidFullName: string;
    invalidMobile: string;
    invalidPhone: string;
    invalidCountry: string;
    invalidState: string;
    invalidCity: string;
    invalidAddress1: string;
    invalidAddress2: string;
    invalidPostcode: string;
  };
  "customer-delete-account": {
    deleteAccount: string;
    doDelete: string;
    deleteConfirm: string;
    deleteSuccess: string;
    deleteFailed: string;
  };
  "customer-coupons": {
    coupons: string;
    hasNoCoupons: string;
    productType: string;
    cartType: string;
    shippingType: string;
    valueDiscount: string;
    firstNOrdersDiscounted: string;
    lastNOrdersDiscounted: string;
    allOrdersDiscounted: string;
    minDiscount: string;
    maxDiscount: string;
    usedOnly: string;
    usedTogether: string;
    applicableProductPrice: string;
    applicableOrderTotal: string;
    applicableShipmentFee: string;
    greaterThanEqual: string;
    lessThanEqual: string;
    onlyForCertainProducts: string;
    onlyForCertainBrands: string;
    onlyForCertainCollections: string;
    canOnlyUsedFor: string;
    cannotUsedFor: string;
    expiresAt: string;
    withoutExpiration: string;
    inactiveCoupon: string;
    deleteCoupon: string;
    deleteSuccess: string;
    deleteConfirm: string;
    couponListFailed: string;
    couponDeleteFailed: string;
  };
  "customer-reviews": {
    reviewListFailed: string;
    customerReviews: string;
    noCustomerReviews: string;
    reviewWrittenAt: string;
    totalNCustomerFindHelpful: string;
    totalComment: string;
    viewReview: string;
  };
  "customer-review": {
    customerReview: string;
    backToReviews: string;
  };
  "customer-review-comments": {
    commentListFailed: string;
    customerComments: string;
    noCustomerComments: string;
    commentFor: string;
    commentWrittenAt: string;
    viewComment: string;
  };
  "customer-review-comment": {
    customerReviewComment: string;
    backToComments: string;
  };
  "product-list": {
    productListFailed: string;
    labelUnavailable: string;
    labelSoldOut: string;
    labelDiscounted: string;
  };
  "product-detail": {
    quantity: string;
    selectOption: string;
    selectVariant: string;
    selectedVariant: string;
    notExistingVariant: string;
    notAvailableVariant: string;
    soldOutVariant: string;
    selectShippingMethod: string;
    selectBundleItems: string;
    requiredBundle: string;
    addToCart: string;
    itemAddSuccess: string;
    variantRequired: string;
    invalidRequiredBundleItemQuantity: string;
    requiredBundleItemRequired: string;
    itemQuantityRequired: string;
    exceededItemQuantity: string;
    itemsExceeded: string;
    itemAddFailed: string;
    goToCart: string;
    buyNow: string;
    unavailableProduct: string;
    soldOutProduct: string;
    notExistingProduct: string;
    priceTotal: string;
    productReadFailed: string;
    productInfo: string;
    productReviews: string;
  };
  "product-review": {
    reviewReadFailed: string;
    deletedCustomer: string;
    reviewWrittenAt: string;
    totalNCustomerFindHelpful: string;
    readMore: string;
    addImage: string;
    imageUploadFailed: string;
    deleteImage: string;
    imageDeleteFailed: string;
    helpful: string;
    unhelpful: string;
    helpVoteSuccess: string;
    helpVoteFailed: string;
    duplicatedVote: string;
    writeComment: string;
    totalComment: string;
    editReview: string;
    saveReview: string;
    reviewSaveSuccess: string;
    reviewSaveFailed: string;
    titleRequired: string;
    deleteReview: string;
    deleteConfirm: string;
    deleteSuccess: string;
    deleteFailed: string;
    flagReview: string;
    flagSuccess: string;
    flagFailed: string;
    duplicatedFlag: string;
    loginRequired: string;
  };
  "product-reviews": {
    reviewListFailed: string;
    loginRequired: string;
    productReviews: string;
    totalNReviews: string;
    productRating: string;
    noProductReviews: string;
    writeReview: string;
  };
  "product-review-writer": {
    reviewRating: string;
    reviewTitle: string;
    reviewBody: string;
    addImage: string;
    imageUploadFailed: string;
    deleteImage: string;
    postReview: string;
    cancelReview: string;
    reviewPostSuccess: string;
    reviewPostFailed: string;
    reviewReadFailed: string;
    titleRequired: string;
    notPurchasedProduct: string;
  };
  "product-review-comments": {
    loginRequired: string;
    commentListFailed: string;
    noReviewComments: string;
    writeComment: string;
    commentBody: string;
    postComment: string;
    cancelComment: string;
    bodyRequired: string;
    commentPostSuccess: string;
    commentPostFailed: string;
    commentReadFailed: string;
    deletedCustomer: string;
    deletedCollaborator: string;
    commentWrittenAt: string;
    readMore: string;
    editComment: string;
    saveComment: string;
    saveSuccess: string;
    saveFailed: string;
    deleteComment: string;
    deleteConfirm: string;
    deleteSuccess: string;
    deleteFailed: string;
    flagComment: string;
    flagSuccess: string;
    flagFailed: string;
    duplicatedFlag: string;
  };
  cart: {
    cart: string;
    cartReadFailed: string;
    itemInfo: string;
    itemQuantity: string;
    itemPrice: string;
    deletedProduct: string;
    hasNoItems: string;
    itemOption: string;
    shippingMethod: string;
    noProduct: string;
    noVariant: string;
    notAvailableProduct: string;
    notAvailableVariant: string;
    soldOutVariant: string;
    exceededItemQuantity: string;
    shippingMethodRequired: string;
    nonShippableProduct: string;
    notSupportedShippingMethod: string;
    noBundleItem: string;
    requiredBundleItemRequired: string;
    invalidRequiredBundleItemQuantity: string;
    deleteItemFailed: string;
    applyChanges: string;
    itemUpdateFailed: string;
    itemTotal: string;
    doOrder: string;
    doSubscription: string;
    isEmptyCart: string;
    hasErredItem: string;
  };
  checkout: {
    checkoutPreparationFailed: string;
    invalidCartItemIncluded: string;
    invalidPostcode: string;
    startsTooEarly: string;
    cartCouponCategory: string;
    cartCouponPrice: string;
    cartUpdateFailed: string;
    confirmItems: string;
    backToCart: string;
    itemInfo: string;
    itemQuantity: string;
    itemPrice: string;
    itemOption: string;
    shippingMethod: string;
    appliedCoupon: string;
    selectProductCoupon: string;
    selectCartCoupon: string;
    alreadyDiscounted: string;
    mustBeOneQuantity: string;
    duplicatedCoupon: string;
    applyCoupons: string;
    finishApplyingCoupons: string;
    selectSubscriptionPlanFirst: string;
    required: string;
    setCustomer: string;
    customerFirstName: string;
    customerLastName: string;
    customerFullName: string;
    customerEmail: string;
    customerMobile: string;
    customerPhone: string;
    goToUpdateCustomer: string;
    sameForRecipient: string;
    customerFirstNameRequired: string;
    customerLastNameRequired: string;
    customerFullNameRequired: string;
    customerEmailRequired: string;
    customerMobileRequired: string;
    customerPhoneRequired: string;
    setShippingAddress: string;
    recipientInfo: string;
    addressFirstName: string;
    addressLastName: string;
    addressFullName: string;
    addressMobile: string;
    addressPhone: string;
    addressCountry: string;
    addressState: string;
    addressCity: string;
    addressAddress1: string;
    addressAddress2: string;
    addressPostcode: string;
    searchAddress: string;
    saveAsPrimaryAddress: string;
    applyCouponsFirst: string;
    applyAddress: string;
    doOrder: string;
    doSubscription: string;
    addressFirstNameRequired: string;
    addressLastNameRequired: string;
    addressFullNameRequired: string;
    addressMobileRequired: string;
    addressPhoneRequired: string;
    addressCountryRequired: string;
    addressStateRequired: string;
    addressCityRequired: string;
    addressAddress1Required: string;
    addressAddress2Required: string;
    addressPostcodeRequired: string;
    orderRequest: string;
    typeOrderRequest: string;
    subscription: string;
    subscriptionPlan: string;
    subscriptionPlanRequired: string;
    selectSubscriptionPlan: string;
    firstOrderStartsAt: string;
    secondOrderStartsAt: string;
    subscriptionStartsAtRequired: string;
    selectSubscriptionStartsAt: string;
    firstOrderIsImmediate: string;
    payment: string;
    orderSummary: string;
    subscriptionSummary: string;
    firstOrderSummary: string;
    firstNowOrder: string;
    restOrdersSummary: string;
    itemTotal: string;
    shippingTotal: string;
    taxTotal: string;
    orderTotal: string;
    agreeWithTerms: string;
    viewTerms: string;
    agreeWithPrivacy: string;
    viewPrivacy: string;
    agreeWithAll: string;
    termsAgreementRequired: string;
    privacyAgreementRequired: string;
    taxIncludedTip: string;
    taxExcludedTip: string;
    shippingFeeAndTaxTip: string;
    proceedOrder: string;
    proceedSubscription: string;
    checkoutFailed: string;
    checkoutProcessFailed: string;
    paymentFailed: string;
    scheduleFailed: string;
  };
  "payment-form": {
    paymentMethod: string;
    cardNumber: string;
    isCompanyCard: string;
    cardExpiration: string;
    cardPassword2: string;
    cardOwnerBirthdate: string;
    cardOwnerCompanyNumber: string;
    selectPaymentMethod: string;
    paymentMethodRequired: string;
    cardNumberRequired: string;
    cardExpirationMonthRequired: string;
    cardExpirationYearRequired: string;
    cardPassword2Required: string;
    cardOwnerRequired: string;
  };
  "checkout-success": {
    copyIdButton: string;
    orderSuccess: string;
    orderSuccessBody: string;
    orderInfo: string;
    orderId: string;
    orderTotalAmount: string;
    orderedAt: string;
    vbankInfo: string;
    vbankName: string;
    vbankAccount: string;
    vbankHolder: string;
    vbankExpiresAt: string;
    orderReadFailed: string;
    subscriptionSuccess: string;
    subscriptionSuccessBody: string;
    subscriptionInfo: string;
    subscriptionId: string;
    subscribedAt: string;
    subscriptionReadFailed: string;
    viewMoreDetails: string;
  };
  "search-purchase": {
    searchOrder: string;
    searchSubscription: string;
    orderId: string;
    subscriptionId: string;
    userId: string;
    alias: string;
    email: string;
    mobile: string;
    phone: string;
    firstName: string;
    lastName: string;
    fullName: string;
    doSearch: string;
    notExistingOrder: string;
    notExistingSubscription: string;
    invalidCustomerInfo: string;
    searchFailed: string;
    goToSearchOrder: string;
    goToSearchSubscription: string;
  };
  "order-list": {
    orderListFailed: string;
    orderList: string;
    orderId: string;
    orderItems: string;
    orderTotal: string;
    orderCreatedAt: string;
    restNItems: string;
    statusPlaced: string;
    statusCancelledByStore: string;
    statusCancelledByCustomer: string;
    statusPaid: string;
    statusUnderPaid: string;
    statusOverPaid: string;
    statusRefunded: string;
    statusPartiallyRefunded: string;
    statusUnderRefunded: string;
    statusOverRefunded: string;
    shippingStatusPending: string;
    shippingStatusShipped: string;
    shippingStatusArrived: string;
    shippingStatusReceived: string;
    orderSubscription: string;
  };
  "order-detail": {
    orderReadFailed: string;
    orderDetail: string;
    backToOrders: string;
    backToSubscription: string;
    orderBasicInfo: string;
    statusPlaced: string;
    statusCancelledByStore: string;
    statusCancelledByCustomer: string;
    statusPaid: string;
    statusUnderPaid: string;
    statusOverPaid: string;
    statusRefunded: string;
    statusPartiallyRefunded: string;
    statusUnderRefunded: string;
    statusOverRefunded: string;
    shippingStatusPending: string;
    shippingStatusShipped: string;
    shippingStatusArrived: string;
    shippingStatusReceived: string;
    orderSyncFailed: string;
    orderId: string;
    subscriptionId: string;
    orderCreatedAt: string;
    orderCancellation: string;
    orderRequest: string;
    cancellationDetail: string;
    cancellationReason: string;
    cancelOrder: string;
    startCancellation: string;
    invalidOrderStatus: string;
    cancellationFailed: string;
    cancellationSuccess: string;
    orderTransactionSummary: string;
    orderTotalPaid: string;
    orderTotalCancelled: string;
    orderTotalRefunded: string;
    vbankInfo: string;
    vbankName: string;
    vbankNumber: string;
    vbankAmount: string;
    vbankExpiresAt: string;
    processPayment: string;
    makePayment: string;
    paymentFailed: string;
    paymentSuccess: string;
    orderItemDetails: string;
    itemInfo: string;
    itemQuantity: string;
    itemPrice: string;
    itemOption: string;
    downloadFile: string;
    nTimesDownloaded: string;
    downloadExpiresAt: string;
    fullyUsedDownloadable: string;
    expiredDownloadable: string;
    refundedItem: string;
    shippingMethod: string;
    appliedCoupon: string;
    discountedBy: string;
    itemTotal: string;
    shippingTotal: string;
    taxTotal: string;
    taxIncluded: string;
    taxExcluded: string;
    orderTotal: string;
    orderCustomerInfo: string;
    orderCustomer: string;
    customerFirstName: string;
    customerLastName: string;
    customerFullName: string;
    customerEmail: string;
    customerMobile: string;
    customerPhone: string;
    orderShippingAddress: string;
    addressFirstName: string;
    addressLastName: string;
    addressFullName: string;
    addressMobile: string;
    addressPhone: string;
    addressCountry: string;
    addressState: string;
    addressCity: string;
    addressAddress1: string;
    addressAddress2: string;
    addressPostcode: string;
    orderRefunds: string;
    requestRefund: string;
    noRefunds: string;
    refundStatus: string;
    refundItems: string;
    refundTotal: string;
    refundStatusRequested: string;
    refundStatusCancelledByStore: string;
    refundStatusCancelledByCustomer: string;
    refundStatusAccepted: string;
    cancelRefund: string;
    invalidRefundStatus: string;
    refundCancellationFailed: string;
    refundCancellationSuccess: string;
    refundCancellationReason: string;
    refundItemTotal: string;
    refundShippingTotal: string;
    orderFulfillments: string;
    markAsReceived: string;
    markAsReceivedSuccess: string;
    markAsReceivedFailed: string;
    markAsNotReceived: string;
    markAsNotReceivedSuccess: string;
    markAsNotReceivedFailed: string;
    noFulfillments: string;
    fulfillmentStatus: string;
    fulfillmentItems: string;
    fulfillmentStatusPending: string;
    fulfillmentStatusShipped: string;
    fulfillmentStatusArrived: string;
    viewTracker: string;
  };
  "order-request-refund": {
    orderReadFailed: string;
    currencyReadFailed: string;
    orderRequestRefund: string;
    backToOrder: string;
    hasNoRefundableItem: string;
    refundItems: string;
    itemInfo: string;
    itemRefundQuantity: string;
    itemRefundAmount: string;
    itemOption: string;
    shippingMethod: string;
    addToRefund: string;
    removeFromRefund: string;
    refundSummary: string;
    refundReason: string;
    selectRefundReason: string;
    typeDetailedReason: string;
    totalSummary: string;
    selectReasonFirst: string;
    itemsTotal: string;
    shippingTotal: string;
    total: string;
    requestRefund: string;
    requestRefundSuccess: string;
    requestRefundFailed: string;
    invalidOrderStatus: string;
    atLeastOneItemRequired: string;
    reasonCategoryRequired: string;
  };
  "subscription-list": {
    subscriptionListFailed: string;
    subscriptionList: string;
    subscriptionId: string;
    subscriptionItems: string;
    subscriptionAmount: string;
    subscriptionPlan: string;
    subscriptionTime: string;
    restNItems: string;
    statusPending: string;
    statusScheduling: string;
    statusScheduled: string;
    statusCancelling: string;
    statusCancelledByStore: string;
    statusCancelledByCustomer: string;
  };
  "subscription-detail": {
    subscriptionReadFailed: string;
    subscriptionDetail: string;
    backToSubscriptions: string;
    backToOrder: string;
    subscriptionBasicInfo: string;
    statusPending: string;
    statusScheduling: string;
    statusScheduled: string;
    statusCancelling: string;
    statusCancelledByStore: string;
    statusCancelledByCustomer: string;
    subscriptionId: string;
    subscriptionPlan: string;
    subscriptionSyncFailed: string;
    subscriptionTimezone: string;
    subscriptionCreatedAt: string;
    subscriptionEndsAt: string;
    subscriptionCancellation: string;
    subscriptionRequest: string;
    cancellationDetail: string;
    cancellationReason: string;
    cancelSubscription: string;
    startCancellation: string;
    invalidSubscriptionStatus: string;
    cancellationFailed: string;
    cancellationSuccess: string;
    processPayment: string;
    makePayment: string;
    paymentFailed: string;
    schedulingFailed: string;
    schedulingSuccess: string;
    subscriptionItemDetails: string;
    itemInfo: string;
    itemQuantity: string;
    itemPrice: string;
    itemOption: string;
    shippingMethod: string;
    appliedCoupon: string;
    discountedBy: string;
    firstNTimesDiscounted: string;
    lastNTimesDiscounted: string;
    allDiscounted: string;
    subscriptionCustomerInfo: string;
    subscriptionCustomer: string;
    customerFirstName: string;
    customerLastName: string;
    customerFullName: string;
    customerEmail: string;
    customerMobile: string;
    customerPhone: string;
    subscriptionShippingAddress: string;
    addressFirstName: string;
    addressLastName: string;
    addressFullName: string;
    addressMobile: string;
    addressPhone: string;
    addressCountry: string;
    addressState: string;
    addressCity: string;
    addressAddress1: string;
    addressAddress2: string;
    addressPostcode: string;
    subscriptionSchedules: string;
    scheduleOrderId: string;
    scheduleStatusPending: string;
    scheduleStatusCancelled: string;
    scheduleStatusDone: string;
    scheduleTime: string;
    scheduleTotalAmount: string;
    scheduleNow: string;
    viewAllSchedules: string;
  };
}

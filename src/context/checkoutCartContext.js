import React from 'react';

const CheckoutCartContext = React.createContext([{}, () => {}]);

export const CheckoutCartProvider = CheckoutCartContext.Provider;
export const CheckoutCartConsumer = CheckoutCartContext.Consumer;
export default CheckoutCartContext;

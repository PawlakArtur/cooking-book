import React from 'react';

const DataContext = React.createContext({ productList: [], categoryList: [], userSettings: {}, loadingApp: true });

export default DataContext;

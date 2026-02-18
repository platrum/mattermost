// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {useIntl} from 'react-intl';
import styled from 'styled-components';
import {useCurrentProduct} from 'utils/products';

import Heading from '@mattermost/compass-components/components/heading'; // eslint-disable-line no-restricted-imports
import glyphMap, {ProductChannelsIcon} from '@mattermost/compass-icons/components';

const ProductBrandingContainer = styled.div`
    display: flex;
    align-items: center;

    > * + * {
        margin-left: 8px;
    }
`;

const ProductBranding = (): JSX.Element => {
    const {formatMessage} = useIntl();
    const currentProduct = useCurrentProduct();

    const Icon = currentProduct?.switcherIcon ? glyphMap[currentProduct.switcherIcon] : ProductChannelsIcon;

    return (
        <ProductBrandingContainer tabIndex={0}>
            <Icon size={24}/>
            <Heading
                element='h1'
                size={200}
                margin='none'
            >
                {currentProduct ? currentProduct.switcherText : formatMessage({id: 'sidebar_left.sidebar_channel_menu.channels', defaultMessage: 'Channels'})}
            </Heading>
        </ProductBrandingContainer>
    );
};

export default ProductBranding;

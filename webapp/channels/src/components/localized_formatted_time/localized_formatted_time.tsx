// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {useIntl} from 'react-intl';
import type {ComponentProps} from 'react';
import {FormattedTime} from 'react-intl';
import type {IntlShape} from 'react-intl';

import {formatLocalizedTime} from 'utils/i18n';

type Props = ComponentProps<typeof FormattedTime>;

export default function LocalizedFormattedTime({value, ...options}: Props): JSX.Element {
    const intl = useIntl();
    const formatOptions = options as Parameters<IntlShape['formatTime']>[1];

    return (
        <>{formatLocalizedTime(intl, value, formatOptions)}</>
    );
}

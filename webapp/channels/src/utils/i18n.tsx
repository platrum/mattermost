// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import type {IntlShape, MessageDescriptor} from 'react-intl';

export function isMessageDescriptor(descriptor: unknown): descriptor is MessageDescriptor {
    return Boolean(descriptor && (descriptor as MessageDescriptor).id);
}

export function getMonthLong(locale: string): 'short' | 'long' {
    if (locale === 'ko') {
        // Long and short are equivalent in Korean except long has a bug on IE11/Windows 7
        return 'short';
    }

    return 'long';
}

export function localizeRussianMeridiem(locale: string, text: string): string {
    if (!locale.toLowerCase().startsWith('ru')) {
        return text;
    }

    return text.
        replace(/\bAM\b/i, 'утра').
        replace(/\bPM\b/i, 'вечера');
}

export function formatLocalizedTime(
    intl: IntlShape,
    value: Parameters<IntlShape['formatTime']>[0],
    options?: Parameters<IntlShape['formatTime']>[1],
): string {
    return localizeRussianMeridiem(intl.locale, intl.formatTime(value, options));
}

/**
 * @deprecated Use react-intl methods such as formatMessage, FormattedMessage, defineMessage, defineMessages.
 */
export function t(v: string): string {
    return v;
}

export interface Message {
    id: string;
    defaultMessage: string;
    values?: Record<string, any>;
}

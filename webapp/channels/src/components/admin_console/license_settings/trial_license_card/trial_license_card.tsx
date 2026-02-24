// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import moment from 'moment-timezone';
import React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {useSelector} from 'react-redux';

import type {ClientLicense} from '@mattermost/types/config';
import type {GlobalState} from '@mattermost/types/store';

import {getBool} from 'mattermost-redux/selectors/entities/preferences';

import AlertBanner from 'components/alert_banner';
import ContactUsButton from 'components/announcement_bar/contact_sales/contact_us';
import FormattedMarkdownMessage from 'components/formatted_markdown_message';

import {Preferences} from 'utils/constants';
import {daysToLicenseExpire} from 'utils/license_utils';
import {getBrowserTimezone} from 'utils/timezone';

import './trial_license_card.scss';

export interface Props {
    license: ClientLicense;
}

const TrialLicenseCard: React.FC<Props> = ({license}: Props) => {
    const {locale} = useIntl();
    const isMilitaryTime = useSelector((state: GlobalState) =>
        getBool(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.USE_MILITARY_TIME, false));
    const currentDate = new Date();
    const endDate = new Date(parseInt(license?.ExpiresAt, 10));
    const daysToEndLicense = daysToLicenseExpire(license);
    const isRussianLocale = locale.toLowerCase().startsWith('ru');

    const messageBody = () => {
        if (currentDate.toDateString() === endDate.toDateString()) {
            const browserTimezone = getBrowserTimezone();
            const endOfDay = moment(endDate).tz(browserTimezone).locale(locale).endOf('day');
            const endOfDayText = (new Intl.DateTimeFormat(locale, {
                hour: 'numeric',
                minute: '2-digit',
                hour12: !isMilitaryTime,
                dayPeriod: isRussianLocale && !isMilitaryTime ? 'short' : undefined,
                timeZone: browserTimezone,
            } as any)).format(endOfDay.toDate()) + ` ${endOfDay.format('z')}`;
            return (
                <FormattedMarkdownMessage
                    id='admin.license.trialCard.description.expiringToday'
                    defaultMessage='Your free trial expires **Today at {time}**. Visit our customer portal to purchase a license now to continue using Mattermost Professional and Enterprise features after trial ends'
                    values={{
                        time: endOfDayText,
                    }}
                />
            );
        }

        return (
            <FormattedMarkdownMessage
                id='admin.license.trialCard.description'
                defaultMessage='Your free trial will expire in **{daysCount} {daysCount, plural, one {day} other {days}}**. Visit our customer portal to purchase a license now to continue using Mattermost Professional and Enterprise features after trial ends.'
                values={{
                    daysCount: daysToEndLicense,
                }}
            />
        );
    };

    const message = (
        <div className='RenewLicenseCard TrialLicense'>
            <div className='RenewLicenseCard__text'>
                <div className='RenewLicenseCard__text-description'>
                    {messageBody()}
                </div>
                <div className='RenewLicenseCard__buttons'>
                    <ContactUsButton
                        customClass='contact_us_primary_cta'
                    />
                </div>
            </div>
        </div>
    );

    const cardTitle = (
        <FormattedMessage
            id='admin.license.trialCard.licenseExpiring'
            defaultMessage='You’re currently on a free trial of our Mattermost Enterprise license.'
        />
    );
    return (
        <AlertBanner
            mode={'info'}
            title={cardTitle}
            message={message}
        />
    );
};

export default TrialLicenseCard;

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import isEmpty from 'lodash/isEmpty';
import moment from 'moment-timezone';
import React, {useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';

import type {GlobalState} from '@mattermost/types/store';

import {savePreferences} from 'mattermost-redux/actions/preferences';
import {getCurrentUser} from 'mattermost-redux/selectors/entities/common';
import {get as getPreference, getBool} from 'mattermost-redux/selectors/entities/preferences';

import AlertBanner from 'components/alert_banner';
import useOpenSalesLink from 'components/common/hooks/useOpenSalesLink';
import UpgradeLink from 'components/widgets/links/upgrade_link';

import {CloudBanners, Preferences} from 'utils/constants';
import {getBrowserTimezone} from 'utils/timezone';

import './cloud_trial_banner.scss';

export interface Props {
    trialEndDate: number;
}

const CloudTrialBanner = ({trialEndDate}: Props): JSX.Element | null => {
    const endDate = new Date(trialEndDate);
    const DISMISSED_DAYS = 10;
    const {formatMessage, locale} = useIntl();
    const isRussianLocale = locale.toLowerCase().startsWith('ru');
    const [openSalesLink] = useOpenSalesLink();
    const dispatch = useDispatch();
    const user = useSelector(getCurrentUser);
    const isMilitaryTime = useSelector((state: GlobalState) =>
        getBool(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.USE_MILITARY_TIME, false));
    const storedDismissedEndDate = useSelector((state: GlobalState) => getPreference(state, Preferences.CLOUD_TRIAL_BANNER, CloudBanners.UPGRADE_FROM_TRIAL));

    let shouldShowBanner = true;
    if (!isEmpty(storedDismissedEndDate)) {
        const today = moment();
        const storedDate = moment(Number(storedDismissedEndDate || 0));
        const diffDays = storedDate.diff(today, 'days');

        // the banner when dismissed, will be dismissed for 10 days
        const bannerIsStillDismissed = diffDays < 0;
        shouldShowBanner = storedDismissedEndDate && bannerIsStillDismissed;
    }

    const [showBanner, setShowBanner] = useState<boolean>(shouldShowBanner);

    if (trialEndDate === 0 || !showBanner) {
        return null;
    }

    const browserTimezone = getBrowserTimezone();
    const endOfDay = moment(endDate).tz(browserTimezone).locale(locale).endOf('day');
    const endOfDayText = (new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: !isMilitaryTime,
        dayPeriod: isRussianLocale && !isMilitaryTime ? 'short' : undefined,
        timeZone: browserTimezone,
    } as any)).format(endOfDay.toDate()) + ` ${endOfDay.format('z')}`;

    const onDismissBanner = () => {
        setShowBanner(false);
        const addTenDaysToToday = moment(new Date()).add(DISMISSED_DAYS, 'days').format('x');
        dispatch(savePreferences(user.id, [
            {
                category: Preferences.CLOUD_TRIAL_BANNER,
                name: CloudBanners.UPGRADE_FROM_TRIAL,
                user_id: user.id,
                value: addTenDaysToToday,
            },
        ]));
    };

    return (
        <AlertBanner
            mode={'info'}
            onDismiss={onDismissBanner}
            title={(
                <FormattedMessage
                    id='admin.subscription.cloudTrialCard.upgradeTitle'
                    defaultMessage='Upgrade to one of our paid plans to avoid Free plan data limits'
                />
            )}
            message={(
                <FormattedMessage
                    id='admin.subscription.cloudTrialCard.description'
                    defaultMessage='Your trial ends on {date} {time}. Upgrade to one of our paid plans with no limits.'
                    values={{
                        date: moment(endDate).locale(locale).format('MMM D, YYYY '),
                        time: endOfDayText,
                    }}
                />
            )}
            hideIcon={true}
            actionButtonLeft={(
                <UpgradeLink
                    buttonText={formatMessage({id: 'admin.subscription.cloudTrialCard.upgrade', defaultMessage: 'Upgrade'})}
                    styleButton={true}
                    telemetryInfo='billing_subscriptions_cloud_trial_banner'
                />
            )}
            actionButtonRight={(
                <button
                    onClick={openSalesLink}
                    className='AlertBanner__buttonRight'
                >
                    <FormattedMessage
                        id='admin.billing.subscription.privateCloudCard.contactSalesy'
                        defaultMessage={
                            'Contact sales'
                        }
                    />
                </button>
            )}
        />
    );
};

export default CloudTrialBanner;

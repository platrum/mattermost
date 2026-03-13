// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import type {Dispatch} from 'redux';
import timezones from 'timezones.json';

import {patchUser, updateMe} from 'mattermost-redux/actions/users';
import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {
    generateCurrentTimezoneLabel,
    getCurrentTimezoneLabel,
    getTimezoneForUserProfile,
} from 'mattermost-redux/selectors/entities/timezone';
import {getUserCurrentTimezone} from 'mattermost-redux/utils/timezone_utils';

import {isLanguageAvailable} from 'i18n/i18n';
import type {UserProfile} from '@mattermost/types/users';
import {getCurrentLocale} from 'selectors/i18n';
import type {GlobalState} from 'types/store';

import ManageTimezones from './manage_timezones';
import {localizeTimezoneLabel} from './timezone_translations';

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators({
            updateMe,
            patchUser,
        }, dispatch),
    };
}
function mapStateToProps(state: GlobalState, ownProps: {adminMode?: boolean; user: UserProfile}) {
    const config = getConfig(state);

    let locale = getCurrentLocale(state);
    if (ownProps.adminMode) {
        locale = ownProps.user.locale;
        if (!isLanguageAvailable(state, locale)) {
            locale = config.DefaultClientLocale as string;
        }
    }

    const rawTimezoneLabel = ownProps.adminMode ?
        generateCurrentTimezoneLabel(getUserCurrentTimezone(getTimezoneForUserProfile(ownProps.user))) :
        getCurrentTimezoneLabel(state);
    const timezoneLabel = localizeTimezoneLabel(rawTimezoneLabel, locale);

    return {
        locale,
        timezones,
        timezoneLabel,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageTimezones);

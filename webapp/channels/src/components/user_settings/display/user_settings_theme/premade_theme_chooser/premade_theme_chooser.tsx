// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {useIntl} from 'react-intl';

import {Preferences} from 'mattermost-redux/constants';
import type {Theme, ThemeKey} from 'mattermost-redux/selectors/entities/preferences';
import {changeOpacity} from 'mattermost-redux/utils/theme_utils';

import ThemeThumbnail from '../theme_thumbnail';

type Props = {
    theme: Theme;
    updateTheme: (theme: Theme) => void;
    allowedThemes: string[];
}

const PremadeThemeChooser = ({theme, updateTheme, allowedThemes = []}: Props) => {
    const intl = useIntl();
    const premadeThemes = [];
    const hasAllowedThemes = allowedThemes.length > 1 || (allowedThemes[0] && allowedThemes[0].trim().length > 0);
    const themeNameMessages: Record<ThemeKey, {id: string; defaultMessage: string}> = {
        denim: {id: 'admin.experimental.defaultTheme.options.denim', defaultMessage: 'Denim'},
        sapphire: {id: 'admin.experimental.defaultTheme.options.sapphire', defaultMessage: 'Sapphire'},
        quartz: {id: 'admin.experimental.defaultTheme.options.quartz', defaultMessage: 'Quartz'},
        indigo: {id: 'admin.experimental.defaultTheme.options.indigo', defaultMessage: 'Indigo'},
        onyx: {id: 'admin.experimental.defaultTheme.options.onyx', defaultMessage: 'Onyx'},
    };

    for (const k in Preferences.THEMES) {
        if (Preferences.THEMES.hasOwnProperty(k)) {
            if (hasAllowedThemes && allowedThemes.indexOf(k) < 0) {
                continue;
            }

            const premadeTheme: Theme = Object.assign({}, Preferences.THEMES[k as ThemeKey]);
            const themeName = intl.formatMessage(themeNameMessages[k as ThemeKey]);

            let activeClass = '';
            if (premadeTheme.type === theme.type) {
                activeClass = 'active';
            }

            premadeThemes.push(
                <div
                    className='col-xs-6 col-sm-3 premade-themes'
                    key={'premade-theme-key' + k}
                >
                    <div
                        id={`premadeTheme${premadeTheme.type?.replace(' ', '')}`}
                        className={activeClass}
                        onClick={() => updateTheme(premadeTheme)}
                    >
                        <label>
                            <ThemeThumbnail
                                themeKey={k}
                                themeName={themeName}
                                sidebarBg={premadeTheme.sidebarBg}
                                sidebarText={changeOpacity(premadeTheme.sidebarText, 0.48)}
                                sidebarUnreadText={premadeTheme.sidebarUnreadText}
                                onlineIndicator={premadeTheme.onlineIndicator}
                                awayIndicator={premadeTheme.awayIndicator}
                                dndIndicator={premadeTheme.dndIndicator}
                                centerChannelColor={changeOpacity(premadeTheme.centerChannelColor, 0.16)}
                                centerChannelBg={premadeTheme.centerChannelBg}
                                newMessageSeparator={premadeTheme.newMessageSeparator}
                                buttonBg={premadeTheme.buttonBg}
                            />
                            <div className='theme-label'>{themeName}</div>
                        </label>
                    </div>
                </div>,
            );
        }
    }

    return (
        <div className='row appearance-section'>
            <div className='clearfix'>
                {premadeThemes}
            </div>
        </div>
    );
};

export default PremadeThemeChooser;

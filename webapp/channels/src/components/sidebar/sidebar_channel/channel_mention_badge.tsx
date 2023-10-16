// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import classNames from 'classnames';
import React from 'react';

type Props = {
    unreadMentions: number;
    hasUrgent?: boolean;
    isUnread?: boolean;
};

export default function ChannelMentionBadge({unreadMentions, hasUrgent, isUnread}: Props) {
    if (unreadMentions > 0) {
        return (
            <span
                id='unreadMentions'
                className={classNames({badge: true, urgent: hasUrgent})}
            >
                {unreadMentions}
            </span>
        );
    }

    if (isUnread) {
        return (<span id='unreadMentions' className='badge' style={style.unread} />);
    }

    return null;
}

const style = {
    unread: {
        borderRadius: '20px',
        padding: '2px',
        minWidth: '12px',
        minHeight: '12px',
        marginTop: '4px',
    },
};

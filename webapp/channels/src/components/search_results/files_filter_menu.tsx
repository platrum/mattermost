// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';
import {localizeMessage} from 'utils/utils';

import {FilterVariantIcon} from '@mattermost/compass-icons/components';

import {IconContainer} from 'components/advanced_text_editor/formatting_bar/formatting_icon';
import OverlayTrigger from 'components/overlay_trigger';
import type {SearchFilterType} from 'components/search/types';
import Tooltip from 'components/tooltip';
import Menu from 'components/widgets/menu/menu';
import MenuWrapper from 'components/widgets/menu/menu_wrapper';

import './files_filter_menu.scss';

type Props = {
    selectedFilter: string;
    onFilter: (filter: SearchFilterType) => void;
};

export default function FilesFilterMenu(props: Props): JSX.Element {
    const toolTip = (
        <Tooltip
            id='files-filter-tooltip'
            className='hidden-xs'
        >
            <FormattedMessage
                id='channel_info_rhs.menu.files.filter'
                defaultMessage='Filter'
            />
        </Tooltip>
    );
    return (
        <div className='FilesFilterMenu'>
            <MenuWrapper>
                <OverlayTrigger
                    className='hidden-xs'
                    delayShow={500}
                    placement='top'
                    overlay={toolTip}
                    rootClose={true}
                >
                    <IconContainer
                        id='filesFilterButton'
                        className='action-icon dots-icon'
                        type='button'
                    >
                        {props.selectedFilter !== 'all' && <i className='icon-dot'/>}
                        <FilterVariantIcon
                            size={18}
                            color='currentColor'
                        />
                    </IconContainer>
                </OverlayTrigger>
                <Menu
                    ariaLabel={localizeMessage('search_results.files_filter_menu.menu', 'File menu')}
                    openLeft={true}
                >
                    <Menu.ItemAction
                        ariaLabel={localizeMessage('search_results.files_filter_menu.all', 'All file types')}
                        text={
                            <FormattedMessage
                                id='search_results.files_filter_menu.all'
                                defaultMessage='All file types'
                            />
                        }
                        onClick={() => props.onFilter('all')}
                        icon={props.selectedFilter === 'all' ? <i className='icon icon-check'/> : null}
                    />
                    <Menu.ItemAction
                        ariaLabel={localizeMessage('search_results.files_filter_menu.documents', 'Documents')}
                        text={
                            <FormattedMessage
                                id='search_results.files_filter_menu.documents'
                                defaultMessage='Documents'
                            />
                        }
                        onClick={() => props.onFilter('documents')}
                        icon={props.selectedFilter === 'documents' ? <i className='icon icon-check'/> : null}
                    />
                    <Menu.ItemAction
                        ariaLabel={localizeMessage('search_results.files_filter_menu.spreadsheets', 'Spreadsheets')}
                        text={
                            <FormattedMessage
                                id='search_results.files_filter_menu.spreadsheets'
                                defaultMessage='Spreadsheets'
                            />
                        }
                        onClick={() => props.onFilter('spreadsheets')}
                        icon={props.selectedFilter === 'spreadsheets' ? <i className='icon icon-check'/> : null}
                    />
                    <Menu.ItemAction
                        ariaLabel={localizeMessage('search_results.files_filter_menu.presentations', 'Presentations')}
                        text={
                            <FormattedMessage
                                id='search_results.files_filter_menu.presentations'
                                defaultMessage='Presentations'
                            />
                        }
                        onClick={() => props.onFilter('presentations')}
                        icon={props.selectedFilter === 'presentations' ? <i className='icon icon-check'/> : null}
                    />
                    <Menu.ItemAction
                        ariaLabel={localizeMessage('search_results.files_filter_menu.code', 'Code')}
                        text={
                            <FormattedMessage
                                id='search_results.files_filter_menu.code'
                                defaultMessage='Code'
                            />
                        }
                        onClick={() => props.onFilter('code')}
                        icon={props.selectedFilter === 'code' ? <i className='icon icon-check'/> : null}
                    />
                    <Menu.ItemAction
                        ariaLabel={localizeMessage('search_results.files_filter_menu.images', 'Images')}
                        text={
                            <FormattedMessage
                                id='search_results.files_filter_menu.images'
                                defaultMessage='Images'
                            />
                        }
                        onClick={() => props.onFilter('images')}
                        icon={props.selectedFilter === 'images' ? <i className='icon icon-check'/> : null}
                    />
                    <Menu.ItemAction
                        ariaLabel={localizeMessage('search_results.files_filter_menu.audio', 'Audio')}
                        text={
                            <FormattedMessage
                                id='search_results.files_filter_menu.audio'
                                defaultMessage='Audio'
                            />
                        }
                        onClick={() => props.onFilter('audio')}
                        icon={props.selectedFilter === 'audio' ? <i className='icon icon-check'/> : null}
                    />
                    <Menu.ItemAction
                        ariaLabel={localizeMessage('search_results.files_filter_menu.videos', 'Videos')}
                        text={
                            <FormattedMessage
                                id='search_results.files_filter_menu.videos'
                                defaultMessage='Videos'
                            />
                        }
                        onClick={() => props.onFilter('video')}
                        icon={props.selectedFilter === 'video' ? <i className='icon icon-check'/> : null}
                    />
                </Menu>
            </MenuWrapper>
        </div>
    );
}

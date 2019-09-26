import React, { Component } from 'react';
import { Query } from '@apollo/react-components'
import { gql } from 'apollo-boost'
import { Breadcrumb, Col, Row } from 'react-bootstrap';

import Videos from './Videos';
import FiltersMenu from './FiltersMenu';
import VideoWhereId from '../video_search/VideoWhereId';
import VideosWhereUrl from '../video_search/VideosWhereUrl';

export const CURRENT_PUBLISHER_QUERY = gql`
    query publisher {
        currentPublisher @client {
            id
            name
            description
        }
    }
`

class Publisher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendable: "BOTH",
            video_where_id: {
                active: false,
                id: ""
            },
            videos_where_url: {
                active: false,
                url: ""
            },
            vid_selectors: {
                publisher_id: false,
                pub_video_id: false,
                uploader: false,
                description: false,
                publish_date: false,
                is_recommendable: false,
                is_manual_recommendable: false,
                external_data: false,
                item_type: false,
                has_expired: false,
                was_crawled: false,
                update_time: false,
                start_date: false,
                create_time: false
            },
            channel_selectors: {
                show_channels: false
            },
            crawlaud_selectors: {
                id: false,
                publisher: false,
                pub_item_id: false,
                item_type: false,
                first_successful_processing: false,
                last_successful_processing: false,
                last_upload: false,
                error_message: false,
                nonrecommendable_reason: false,
                source: false,
                last_crawl_reason: false,
                first_nonrecommendable_time: false
            },
            crawlinstr_selectors: {
                id: false,
                lock_id: false,
                lock_time: false,
                num_strikes: false,
                last_strike_date: false,
                next_crawl: false,
                next_crawl_reason: false
            }
        }

        this.updateFiltersState = this.updateFiltersState.bind(this);
        this.updateRecommendableState = this.updateRecommendableState.bind(this)
        this.updateVideoWhereId = this.updateVideoWhereId.bind(this)
        this.updateVideosWhereUrl = this.updateVideosWhereUrl.bind(this)
    }

    updateRecommendableState(state) {
        this.setState({ recommendable: state })
    }

    updateVideoWhereId(video_where_id) {
        this.setState({ video_where_id, videos_where_url: { active: false, url: "" } })
    }

    updateVideosWhereUrl(videos_where_url) {
        this.setState({ videos_where_url, video_where_id: { active: false, id: "" } })
    }

    updateFiltersState(e, section) {
        const name = e.target.name,
        chkd = e.target.checked;

        this.setState({
            [section]: {
                ...this.state[section],
                [name]: chkd
            }
        })
    }

    render() {
        return (
            <Query query={CURRENT_PUBLISHER_QUERY}>
                {({data, error, loading}) => {
                    if (loading) return <p>loading...</p>
                    if (error) return <p>Error!</p>

                    return (
                        <Row>
                            <Col md={9} className="left-container">
                                <Breadcrumb>
                                    <Breadcrumb.Item onClick={this.props.history.goBack}>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item active>{data.currentPublisher.description} ({data.currentPublisher.id})</Breadcrumb.Item>
                                </Breadcrumb>
                                {this.state.video_where_id.active && <VideoWhereId
                                    pub_id={this.props.match.params.id}
                                    pub_name={data.currentPublisher.name}
                                    video_id={this.state.video_where_id.id}
                                    vid_selectors={this.state.vid_selectors}
                                    channel_selectors={this.state.channel_selectors}
                                    crawlaud_selectors={this.state.crawlaud_selectors}
                                    crawlinstr_selectors={this.state.crawlinstr_selectors}
                                />}

                                {this.state.videos_where_url.active && <VideosWhereUrl
                                    pub_id={this.props.match.params.id}
                                    pub_name={data.currentPublisher.name}
                                    video_url={this.state.videos_where_url.url}
                                    vid_selectors={this.state.vid_selectors}
                                    channel_selectors={this.state.channel_selectors}
                                    crawlaud_selectors={this.state.crawlaud_selectors}
                                    crawlinstr_selectors={this.state.crawlinstr_selectors}
                                />}

                                {!(this.state.videos_where_url.active || this.state.video_where_id.active) && <Videos
                                    pub_id={this.props.match.params.id}
                                    pub_name={data.currentPublisher.name}
                                    recommendable_state={this.state.recommendable}
                                    video_id={this.state.video_id}
                                    vid_selectors={this.state.vid_selectors}
                                    channel_selectors={this.state.channel_selectors}
                                    crawlaud_selectors={this.state.crawlaud_selectors}
                                    crawlinstr_selectors={this.state.crawlinstr_selectors}
                                />}
                            </Col>
                            <FiltersMenu
                                vid_selectors={this.state.vid_selectors}
                                channel_selectors={this.state.channel_selectors}
                                crawlaud_selectors={this.state.crawlaud_selectors}
                                crawlinstr_selectors={this.state.crawlinstr_selectors}
                                handleInputChange={this.updateFiltersState}
                                recommendable_state={this.state.recommendable}
                                updateRecommendableState={this.updateRecommendableState}
                                updateVideoWhereId={this.updateVideoWhereId}
                                updateVideosWhereUrl={this.updateVideosWhereUrl}
                                resetSearchDisabled={!this.state.video_where_id.active && !this.state.videos_where_url.active}
                                resetSearch={(e) => {
                                    this.setState({
                                        video_where_id: {
                                            active: false,
                                            id: ""
                                        },
                                        videos_where_url: {
                                            active: false,
                                            url: ""
                                        }
                                    })
                                }}
                            />
                        </Row>
                    )
                }}
            </Query>
        );
    }
}

export default Publisher;

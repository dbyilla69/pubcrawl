import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Video from './Video';

export const ALL_VIDEOS_QUERY = gql`
    query ALL_VIDEOS_QUERY($publisher_id: Int!, $publisher_name: String!, $recommendable_filter: RecommendableFilter) {
        allVideos(publisher_id: $publisher_id, publisher_name: $publisher_name, recommendable_filter: $recommendable_filter) {
            edges {
                id
                title
                url
                thumbnail_url
                publisher_id
                pub_video_id
                uploader
                description
                publish_date
                is_recommendable
                is_manual_recommendable
                external_data
                item_type
                has_expired
                was_crawled
                update_time
                start_date
                create_time
                crawlerAuditData {
                    id
                    publisher
                    pub_item_id
                    item_type
                    first_successful_processing
                    last_successful_processing
                    last_upload
                    error_message
                    nonrecommendable_reason
                    source
                    last_crawl_reason
                    first_nonrecommendable_time
                }
                crawlerInstructionsData {
                    id
                    lock_id
                    lock_time
                    num_strikes
                    last_strike_date
                    next_crawl
                    next_crawl_reason
                }
                channelsData {
                    id
                    publisher_id
                    channel
                    display_ads_prob
                    is_reports_visible
                }
            }
        }
    }
`;

function Videos(props) {
    return (
        <Query
            query={ALL_VIDEOS_QUERY}
            variables={{
                publisher_id: Number(props.pub_id),
                publisher_name: props.pub_name,
                recommendable_filter: props.recommendable_state,
            }}
            fetchPolicy="cache-and-network"
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                console.log(props.recommendable_state);
                return (
                    <div className="videos-container">
                        {data && data.allVideos.edges.map((v) => {
                            return (
                            <Video
                                vidData={v}
                                channelsData={v.channelsData}
                                auditData={v.crawlerAuditData}
                                instructionData={v.crawlerInstructionsData}
                                vid_selectors={props.vid_selectors}
                                channel_selectors={props.channel_selectors}
                                crawlaud_selectors={props.crawlaud_selectors}
                                crawlinstr_selectors={props.crawlinstr_selectors}
                                key={v.id}
                            />
                        )})}
                    </div>
                );
            }}
        </Query>
    );
}

export default Videos;
